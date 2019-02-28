
把鼠标指针放到 div 元素上，其宽度会从 100px `逐渐`变为 300px：

```css
div
{
width:100px;
transition: width 2s;
-moz-transition: width 2s; /* Firefox 4 */
-webkit-transition: width 2s; /* Safari 和 Chrome */
-o-transition: width 2s; /* Opera */
}
```
- transition-property	规定设置过渡效果的 CSS 属性的名称。
- transition-duration	规定完成过渡效果需要多少秒或毫秒。
- transition-timing-function	规定速度效果的速度曲线。
- transition-delay	定义过渡效果何时开始。
