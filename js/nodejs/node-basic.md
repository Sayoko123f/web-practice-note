# Node.js 筆記
有關學習 Node.js 的一些紀錄。

## 建立資料夾
如果資料夾已經存在會報錯，如果不想報錯就在第二個參數物件加上 `recursive` 為 `true`
```js
import * as pfs from 'fs/promises';
import path from 'path';

const imageDirPath = './images';
pfs.mkdir(path.resolve(imageDirPath));
// pfs.mkdir(path.resolve(imageDirPath), { recursive: true });
```

## 下載檔案
使用非同步串流讀寫會比較省記憶體，也比較有效率：
```js
import axios from 'axios';
import { createWriteStream } from 'fs';
import stream from 'stream';
import { promisify } from 'util';

const finished = promisify(stream.finished);
export async function downloadFile(outputPath, url) {
    const writer = createWriteStream(outputPath);
    return axios({
        method: 'GET',
        url,
        responseType: 'stream'
    }).then(async res => {
        res.data.pipe(writer);
        return finished(writer);
    });
}

// How to call 
const url = 'https://**/logo.png';
downloadFile(path.resolve('logo.png'), url).then(res => {
    console.log(res);
}).catch(err => {
    console.log(err);
});
```

## 列出目錄下所有內容

```js
import fs from 'fs';
import path from 'path';

const rootpath = path.resolve('pathlike');

fs.readdir(rootpath, function (err, files) {
    if (err) {
        console.error(err);
        return;
    }
    console.log(files);
})
```