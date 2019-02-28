## DOM的事件流
- 三个阶段：事件捕获阶段，处于目标阶段，事件冒泡阶段
- DOM2级事件流明确规定捕获阶段不会涉及事件目标
- 在高版本的浏览器中事件捕获和事假冒泡都可以触发事件对象上的事件

## 事件处理程序

### HTML事件处理
```html
<input type="button" value="click me" onclick="alert('click')"></input>
```

### DOM0级事件处理程序

```javascript
let btn = document.getElementById('mybtn')
btn.onclick = function () {
  alert('click')
}
```
- 只能添加一次，重复添加会覆盖

### DOM2级事件处理程序

```javascript
let btn = document.getElementById('mybtn')
btn.addEventListener('click', function() {}, false)
```
- 参数说明: 事件名称, 事件处理函数, false表示在冒泡阶段调用事件处理程序,true表示在捕获阶段调用事件处理程序
- DOM2可以添加多个事件处理程序,也可以是相同的处理事件类型
- 删除DOM2级的事件必须要用removeEventListener，且参数相同

### IE事件处理程序

```javascript
let btn = document.getElementById('mybtn')
btn.attachEvent('onclick', function(){})
```
- detachEvent删除IE事件处理程序 
- IE8及以前默认是在冒泡阶段生效
- 在事件作用域中 this===window
- 也可以添加多个事件处理程序


