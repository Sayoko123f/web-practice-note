# Console API
最廣為人知的大概屬```console.log()```，可以印出訊息或是變數的內容來進行除錯。
console 其實還有很多方法，以下挑比較實用的來介紹，可以把範例程式碼直接複製貼到主控台執行哦：
### console.log() 與其它好夥伴
```js
console.debug();  // Verbose level
console.log();    // Info level
console.info();   // Info level
console.warn();   // Warning level 
console.error();  // Error level
```
這些函式用法都和熟悉的 ```console.log()```一樣，只是在主控台輸出的消息等級不同，主控台的消息等級由低到高分成四個等級：Verbose, Info, Warning, Error.
一般預設是不顯示 Verbose 等級的消息，平常用的 ```console.log()```是 Info 等級，warn 和 error 等級更顯眼，方便開發者除錯。
### console.assert()
```js
console.assert(assertion, obj1 [, obj2, ..., objN]);
console.assert(assertion, msg [, subst1, ..., substN]);
```
和 ```console.log()```一樣是印出東西，但第一個參數是 ```boolean```，當為```false```的時候會以錯誤的形式輸出。以下是範例程式碼：印出偶數。
```js
for (let i = 1; i <= 10; i++) {
    if (i % 2 === 0) {
        console.log(i);
    }
}

for (let i = 1; i <= 10; i++) {
    console.assert((i % 2 !== 0), i)
}
```
### console.count()
```js
console.count(label)
console.countReset(label)
```
用來計數用的函式，比如說放在函式裡，就可以記錄這個函式被執行幾次。
```js
function sayHi(){
    // do something...
    console.count('sayHi()');
}

// call sayHi()
for(let i = 0; i < 10; i++){
    sayHi();
}
// reset
console.countReset('sayHi()')
console.count('sayHi()');
```
### console.time()
```js
console.time(label);
console.timeLog(label);
console.timeEnd(label);
```
用來計時，使用```console.time()```開始計時，使用```console.timeLog()```印出經過的時間，結束用```console.timeEnd()```。
```js
console.time('example');
for (let i = 0; i < 10; i++) {
    console.timeLog('example');
}
console.timeEnd('example');
```
### console.dir()
這個方法接受一個 object 作為參數，會列出這個 object 所有特性。底下是範例程式碼：創造一顆按鈕，分別用```console.log()```和```console.dir()```列印看看有何不同。
```js
let el = document.createElement('button');
el.id = 'exampleButton';
el.innerHTML = 'Button';
el.onclick = function(){
    console.log('hello');
}
console.log(el);
console.dir(el);
```
### console.group()
```js
console.group(label);
console.groupCollapsed(label);
console.groupEnd();
```
創建可以摺疊的消息群組，如果用```console.groupCollapsed()```則輸出是已經摺起來的，使用```console.groupEnd()```關閉群組。
### console.trace()
```js
console.trace([any data...])
```
可以輸出目前的呼叫堆疊。
```js
function foo() {
  function bar() {
    console.trace();
  }
  bar();
}

foo();
```
### console.table()
```js
/**
 * @param {object|array} data
 */ 
console.table(data);
console.table(data, columns);
```
我覺得超實用的方法，這個方法接受一個 object 或 array，會幫你用表格形式顯示出來，遇到複雜的結構一目瞭然！因為我覺得 [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Console/table) 的例子已經非常清楚了就請移駕過去看吧！
### console.clear()
清除主控台的訊息，沒什麼好解釋的。
## References
[MDN](https://developer.mozilla.org/en-US/docs/Web/API/Console)