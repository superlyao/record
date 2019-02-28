## 清理浮动

### 方法1
- 在需要清理浮动的容器结束标签加上一个空标签，设置样式 clear:both

### 方法2
- overflow 在容器的样式中添加样式 overflow: auto; 如果要兼容IE6  最好使用overflow：hidden

### 方法３

- clearfix 基于在父元素上使用“:before”和“:after”两个伪类。使用这些伪类，我们可以在浮动元素的父
容器前面和后面创建隐藏元素。“:before”伪类是用来防止子元素顶部的外边距塌陷，使用“display: table”
创建一个匿名的“table-cell”元素。这也确保在IE6和IE7下具有一致性。“:after”伪类是用来防止子元素
的底部的外边距塌陷，以及用来清除元素的浮动。在IE6和7的浏览器中，加上“zoom”属性来触发父元素的
hasLayout的机制。决定了元素怎样渲染内容，以及元素与元素之间的相互影响。

``` css

.group:before,
.group:after {
  content: "";
  display: table;
}
.group:after {
  clear: both;
}
.group {
  *zoom: 1;
}

```

## 定位属性

### position static

- 元素都有position属性，其默认值是“static”，这也意味着，他们没有也不接受位置属性设置
（top、right、bottom、left属性值设置）。另外元素设置了position属性，将会覆盖元素的默认值“static”。

### position relative 相对定位

- “relative”是“position”的另一个属性值，他和“static”属性值非常的相似。主要的区别是“relative”可以给元素设置位移（offset）“top、right、bottom和left”属性。通过这些位移属性设置可以给元素进行精确的定位。

### 盒子位移属性是如何工作？

- 盒子的位移属性有四个“top、right、bottom和left”，用来指定元素的定位位置和方向。这些属性只能在元素的“position”属性设置了“relative、absolute和fixed”属性值，才生效。

- 对于相对定位元素，这些属性的设置让元素从默认位置移动。例如，top设置一个值“20px”在一个相对定位的元素上，这个元素会在原来位置向下移动“20px”。反之，“top”设置一个“-20px”，这个元素会在原来的位置向上移动“20px”。

- 对于绝对定位和固定定位，这些属性指定了元素与父元素边缘之间的距离，例如，绝对定位的元素设置一个“top”值为“20px”，将使绝对定位元素相对于其设置了相对定位的祖先元素顶部边缘向下移动“20px”，反之，如果设置一个“top”值为“20px”，将使绝对定位元素相对于其设置了相对定位的祖先元素顶部边缘向上移动“20px”。（绝对定位的参考点是其祖先元素设置了“relative”或者“absolute”值）。

### position absolute 绝对定位

- 绝对定位元素也具有盒子位移属性，然而，绝对定位元素会脱离文档流。绝对定位元素直接从文档流中移出，绝对定位元素的位置直接和父容器是否设置了相对定位（绝对定位）有直接关系。绝对定位元素需要至少一个祖先元素设置了相对定位（绝对定位），不然元素定位会相对于页面的主体进行定位。
