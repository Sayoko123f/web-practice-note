/**
 * Export a plaintext .txt file.
 * @example
 * download("hello.txt","This is the content of my file :)");
 * @param {string} filename 
 * @param {string} text 
 */
function exportTxt(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

/**
 * Get method.
 * @param {string} url 
 */
function fetch_getMethod(url) {
    fetch(url, {
        method: 'GET'
    }).then((response) => {
        response.text().then((data) => {
            console.log(data);
        })
    })
}

/**
 * @example
 * fetch_postMethod('https://httpbin.org/post', {answer: 42})
 * .then(response => console.log(response)) // JSON from `response.json()` call
 * .catch(error => console.error(error))
 * @param {string} url 
 * @param {string} data 
 * @see {@link https://httpbin.org/}
 */
function fetch_postMethod(url, data) {
    // Default options are marked with *
    return fetch(url, {
        body: JSON.stringify(data), // must match 'Content-Type' header
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'omit', // include, same-origin, *omit
        headers: {
            'user-agent': 'Mozilla/4.0 MDN Example',
            'content-type': 'application/json'
        },
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'no-cors', // no-cors, cors, *same-origin
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // *client, no-referrer
    })
}

/**
 * Replace text in textarea.
 * @param {string} text 
 */
function replaceSelectedText(text) {
    var txtArea = document.getElementById('myTextArea');
    if (txtArea.selectionStart != undefined) {
        var startPos = txtArea.selectionStart;
        var endPos = txtArea.selectionEnd;
        //   selectedText = txtArea.value.substring(startPos, endPos);
        txtArea.value = txtArea.value.slice(0, startPos) + text + txtArea.value.slice(endPos);
    }
}

/**
 * Upload plaintext file.
 * @example
 * <input type="file" accept=".txt,.xml" onchange="handleFiles(this.files)">
 * @param {filelist} filelist 
 */
function handleTxtFile(filelist) {
    var reader = new FileReader();
    console.log(filelist[0].name)
    reader.onload = function () {
        console.log(reader.result);
    }
    reader.readAsText(filelist[0]);
}

/**
 * Upload and preview image.
 * @example
 * <input type="file" accept=".jpg,.png" onchange="handleImgFiles(this.files)">
 * <div id="imgPreview"></div>
 * @param {filelist} files 
 * @see {@link https://developer.mozilla.org/zh-TW/docs/Web/API/File/Using_files_from_web_applications|Reference}
 */
function handleImgFiles(files) {
    var preview = document.getElementById('imgPreview');
    preview.innerHTML = "";
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var imageType = /image.*/;

        if (!file.type.match(imageType)) {
            continue;
        }

        var img = document.createElement("img");
        img.classList.add("obj");
        img.file = file;
        preview.appendChild(img);

        var reader = new FileReader();
        reader.onload = (function (aImg) { return function (e) { aImg.src = e.target.result; }; })(img);
        reader.readAsDataURL(file);
    }
}

/**
 * For dropbox.
 * @example
 * window.onload = function () {
 *     var dropbox = document.getElementById("dropbox");
 *     dropbox.addEventListener("dragenter", function (e) {
 *         e.stopPropagation();
 *         e.preventDefault();
 *     }, false);
 *     dropbox.addEventListener("dragover", function (e) {
 *         e.stopPropagation();
 *         e.preventDefault();
 *     }, false);
 *     dropbox.addEventListener("drop", drop, false);
 * }
 * @see {@link https://developer.mozilla.org/zh-TW/docs/Web/API/File/Using_files_from_web_applications|Reference}
 */
function drop(e) {
    e.stopPropagation();
    e.preventDefault();

    var dt = e.dataTransfer;
    var files = dt.files;

    handleImgFiles(files);
}

/**
 * ExportCsv with utf-8 BOM.
 * @example exportCsv("mycsv.csv",[["123", "456", "789"], ["abc", "def", "cba"]],["h1","h2',"h3']);
 * @param {string} filename 
 * @param {array} content [["123", "456", "789"], ["abc", "def", "cba"]]
 * @param {array} header ["head1","head2","head3"]
 */
function exportCsv(content, header, filename = "result.csv") {
    // Prepare data.
    let testData = content || [["123", "456", "789"], ["abc", "def", "cba"]];
    let data = "";
    if (header) {
        content.unshift(header);
    }
    testData.forEach((e) => {
        let row = [];
        e.forEach((col) => {
            let c = '"' + col.replaceAll('"', '""') + '"';
            row.push(c);
        })
        data += row + "\r\n";
    });
    // end prepare data
    // Create blob with utf-8 BOM.
    let blob = new Blob(["\uFEFF" + data], {
        type: "test/csv;charset=utf-8;",
    });
    let element = document.createElement("a");
    element.style.display = "none";
    document.body.appendChild(element);
    element.href = URL.createObjectURL(blob);
    element.download = filename;
    // Download
    element.click();
    document.body.removeChild(element);
}
/** 
 * Flatten an n-dimensional array.
 * @param {array} arr 
 * @returns {array}
 */
function flatten(arr) {
    return arr.reduce(function (flat, toFlatten) {
        return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
}

/**
 * Convert URL parameters to a JavaScript object.
 * @example URLSearchParamsToObject(new URL(location.href));
 * @param {URL} url is URL object.
 */
function URLSearchParamsToObject(url) {
    const obj = {};
    for (const [key, val] of [...url.searchParams]) {
        obj[key] = val;
    }
    return obj;
}
