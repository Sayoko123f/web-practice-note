# 如何使用 Javascript 切換元素的 class
利用 ```element.classList```即可，底下來看看如何使用：
```html
<!-- html -->
<p id="p1">Hello World!</p>
```
```css
/* css */
.blue{
    color: blue;
}
.red{
    color: red;
}
.green{
    color: green;
}
.black{
    color: black;
}
```
## element.classList
### element.classList
包含了這個元素所有的類別名稱的物件，建議不要自己修改，把它當作**唯讀**的值，使用方法來操作。
```js
let p1 = document.getElementById('p1'); // 後面的範例都省略這行
p1.classList; // { length: 0, value: ""}
p1.classList.length === 0; // true
p1.classList.add('red');
p1.classList; // {0: "red", length: 1, value: "red"}
p1.classList[0]; // "red"
```
### classList.add(classname)
傳入類別名稱就會添加類別至元素上，如果已經有了就什麼事都不會發生。
```js

p1.classList.add('blue');
```
### classList.contains(classname)
傳入類別名稱，傳回 ```bool```，如果存在該類名就是 ```true```，反之 ```false```。
```js
p1.classList.contains('blue'); // true or false
```
### classList.replace(old, new)
將一個類別取代為另一個類別，如果不存在就什麼事都不會發生。
```js
p1.clas