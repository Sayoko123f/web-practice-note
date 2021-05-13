# 使用 axios 發送 HTTP 請求(ajax)
## 前言
在比較早期大多是使用 ```jquery.ajax()``` 發送請求，但 ```jquery.ajax()``` 寫起來很冗長； ES6 瀏覽器內建了基於 Promise 的 ```fetch()``` API，無奈 IE 瀏覽器不支援。 [axios](https://github.com/axios/axios) 是一套可以處理以上問題的函式庫！在客戶端和 node.js 都可以使用。
## axios 的優點 
Axios|Fetch
---|---|
支援所有瀏覽器|不支援 IE 瀏覽器
第三方函式庫|瀏覽器內建
JSON 回應內容自動解析|需再調用 json() 兩步驟解析
發送 JSON 內容自動調用 JSON.stringify|需手動調用 JSON.stringify
具有下載進度屬性，幫助製作進度條|需手動實作
語法和 fetch 接近，無痛使用|

## 基礎使用
詳細說明請見 [axios](https://github.com/axios/axios)，底下兩個簡單例子分別是發送 GET 和 POST 請求：
```js
// GET request
const url = 'http://exmple.com/';
axios
  .get(url)
  .then((response) => {
    console.log(response.data); // response data
  })
  .catch((err) => {
    console.log(err);
  });
```
```js
// POST request
const url = 'http://exmple.com/';
const data = {'foo': 'bar'};
const headers = {
    "Content-Type": "application/json",
    };
axios
    .post(url, data, { headers })
    .then((response) => {
      console.log(response.data); // response data
    })
    .catch((err) => {
      console.log(err);
    });
```
## References
- [axios](https://github.com/axios/axios)
- [Difference between Fetch and Axios.js for making http requests](https://www.geeksforgeeks.org/difference-between-fetch-and-axios-js-for-making-http-requests/)