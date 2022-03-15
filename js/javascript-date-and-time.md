# 【JavaScript Date】日期與時間之我是時間管理大師
本篇文章著重在兩個部分：「日期與時間的運算」與「時間格式化字串」。

若是對 Date 物件基本用法還不熟悉的讀者，建議先讀過 MDN 再往下看。

## 日期與時間的運算
### 複製日期物件
大部分情況我們會想要一個新的 `Date` 物件而不是修改原有的物件。底下 `cloneDate` 函式會回傳一份拷貝。後面的例子會用到這個函式：
```js
function cloneDate(date) {
    return new Date(+date);
}
```

### 天數運算
如果想要依某天為基準，得到幾天之後或幾天之前，先看一個例子，底下的程式碼可以得到明天：
```js
let d = new Date(); // now
d.setDate(d.getDate() + 1);
console.log(d) // tomorrow
```

可以把天數運算寫成一個通用的函式，只需要傳入一個數字，正的代表幾天後，負的代表幾天前。第二個參數 `baseday` 為可選的，應傳入一個 Date 物件，若有傳入則代表是基於 `baseday` 作偏移運算，。
```js
function calcDay(num, baseday) {
    let d = baseday ? cloneDate(baseday) : new Date();
    d.setDate(d.getDate() + num);
    return d;
}

console.log(calcDay(-1)); // yesterday

const day = new Date(2021, 11, 20);
console.log(calcDay(4, day)); // Fri Dec 24 2021 00:00:00 GMT+0800 (GMT+08:00)
```

### 月運算
