# Vue.js
使用Vue.js實作一個待辦事項清單  
功能：  
1. 新增一個項目  
2. 重命名一個項目  
3. 變更一個項目的狀態：已完成或未完成  
4. 刪除一個項目  
5. 切換檢視模式：檢視全部、已完成或未完成的項目  
## 重點
依布林值切換 class
```
:style="work.checked?{textDecoration:'line-through'}:{textDecoration:'none'}
```
監聽鍵盤事件
```
@keyup.enter="add()"
```
刪除陣列元素使用 Vue.delete
```
Vue.delete(this.works, i);
```