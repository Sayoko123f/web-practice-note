import puppeteer from "puppeteer"
import * as fs from "fs";
import * as pfs from "fs/promises";
import path from "path";
import stream from 'stream';
import { promisify } from 'util';
import mysql from "mysql2/promise";
import axios from "axios";

const saveDir = path.resolve('ascii');
async function init() {
    fs.mkdirSync(saveDir, { recursive: true });
}

/**
 * 
 * @param {string} p absolute path
 * @returns 
 */
async function isPathExists(p) {
    try {
        await pfs.stat(p);
        return true;
    } catch (err) {
        if (err.code === 'ENOENT') {
            return false;
        } else {
            throw err;
        }
    }
}

async function initDB() {
    const db = await mysql.createConnection({
        host: 'localhost',
        user: 'ascii',
        password: '123',
        database: 'ascii',
        port: 3306
    });
    db.execute(`CREATE TABLE IF NOT EXISTS recently (
        id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        src VARCHAR(2000) NOT NULL UNIQUE,
        href VARCHAR(2000) NOT NULL,
        description VARCHAR(2000) NOT NULL,
        reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );`);
    return db;
}

const finished = promisify(stream.finished);
async function downloadFile(outputPath, url) {
    const writer = fs.createWriteStream(outputPath);
    return axios({
        method: 'GET',
        url,
        responseType: 'stream'
    }).then(async res => {
        res.data.pipe(writer);
        return finished(writer);
    });
}

async function wait(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    })
}

(async () => {
    await init();
    const db = await initDB();
    const browser = await puppeteer.launch({ headless: false, devtools: true });
    const page = await browser.newPage();
    await page.setRequestInterception(true);
    page.on('request', (req) => {
        if (req.resourceType() == 'stylesheet' || req.resourceType() == 'font' || req.resourceType() == 'image') {
            req.abort();
        } else {
            req.continue();
        }
    });

    await page.evaluateOnNewDocument(() => {
        // Pass webdriver check
        Object.defineProperty(navigator, 'webdriver', {
            get: () => false,
        });
    });

    await page.evaluateOnNewDocument(() => {
        // Pass chrome check
        window.chrome = {
            runtime: {},
            // etc.
        };
    });

    await page.evaluateOnNewDocument(() => {
        //Pass notifications check
        const originalQuery = window.navigator.permissions.query;
        return window.navigator.permissions.query = (parameters) => (
            parameters.name === 'notifications' ?
                Promise.resolve({ state: Notification.permission }) :
                originalQuery(parameters)
        );
    });

    await page.evaluateOnNewDocument(() => {
        // Overwrite the `plugins` property to use a custom getter.
        Object.defineProperty(navigator, 'plugins', {
            // This just needs to have `length > 0` for the current test,
            // but we could mock the plugins too if necessary.
            get: () => [1, 2, 3, 4, 5],
        });
    });

    await page.evaluateOnNewDocument(() => {
        // Overwrite the `languages` property to use a custom getter.
        Object.defineProperty(navigator, 'languages', {
            get: () => ['en-US', 'en'],
        });
    });

    await page.setUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.82 Safari/537.36'
    );
    await page.goto('https://ascii2d.net/recently', { waitUntil: ["networkidle2", "domcontentloaded"] });
    const getData = async () => {
        await page.reload({ waitUntil: ["networkidle2", "domcontentloaded"] });
        return await page.evaluate(() => {
            const divs = document.querySelectorAll('div.col-xs-12.col-lg-8.col-xl-8>div.row');
            const arr = [];
            for (let i = 0; i < divs.length / 2; i++) {
                const as = divs[0 + i * 2].querySelectorAll('span.recently_header>a');
                const href = as[as.length - 1].getAttribute('href');
                // console.log(href);
                const src = divs[1 + i * 2].querySelector('div.image-box>img').getAttribute('src');
                // console.log(src);
                const desc = divs[1 + i * 2].querySelector('small.text-muted').textContent;
                // console.log(desc);
                arr.push({ src, href, desc });
            }
            return arr;
        });
    }

    const saveData = async (data) => {
        for (const item of data) {
            const sql = `INSERT IGNORE INTO recently (src,href,description)VALUES(${mysql.escape(item.src)},${mysql.escape(item.href)},${mysql.escape(item.desc)});`;
            // console.log('try sql:', sql);
            const result = await db.query(sql);
            if (result[0].affectedRows) {
                const filename = path.resolve(saveDir + item.src);
                try {
                    await pfs.mkdir(path.dirname(filename), { recursive: true });
                    await downloadFile(filename, `https://ascii2d.net/${item.src}`);
                } catch (err) {
                    console.warn(`Download ${item.src} failed:(`);
                    console.warn('filename:', filename);
                    console.warn(err.name);
                    console.warn(err.code);
                    console.warn(err.message);
                }
                await wait(100);
            }
        }
    }

    const run = async () => {
        const d = await getData();
        console.log('getdata length:', d.length);
        await saveData(d);
        setTimeout(run, 180 * 1000);
    }

    run();

    // await browser.close();
})();