# let
- es6新增 用来声明变量 let的出现使js有了块级作用域

```javascript
{
  //a 只在当前的大括号有效
let a = 3  
}
```
> 所以可以在for循环时使用let声明变量，不会污染全局

- 另外，for循环还有一个特别之处，就是设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域

```javascript
for (let i = 0; i < array.length; i++) {
  let i = 'abc'
  console.log(i);//输出abc 因为在for循环声明变量的部分是一个作用域
}
```

### let和var区别

#### 不存在变量提升

```javascript
console.log(a) //输出undefined
var a = 'a'

console.log(b) //报错referenceError
let b = 'b'
```

#### 暂时性死区

> 只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。

*ES6明确规定，如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错*

```javascript
var tmp = 123;

if (true) {
  tmp = 'abc'; // ReferenceError
  let tmp;
}
```

- ES6 规定暂时性死区和let、const语句不出现变量提升，主要是为了减少运行时错误，防止在变量声明前就使用这个变量，从而导致意料之外的行为。这样的错误在 ES5 是很常见的，现在有了这种规定，避免此类错误就很容易了

#### 不允许重复声明

```javascript
{
  //正确
  var a = 'a'
  var a = 'b'
}
{
  //报错
  let a = 'a'
  var a = 'b'
}
{
  //报错
  let a = 'a'
  let a = 'b'
}
```

### 块级作用域和函数声明

```javascript
function f() { console.log('I am outside!'); }

(function () {
  if (false) {
    // 重复声明一次函数f
    function f() { console.log('I am inside!'); }
  }

  f();
}());

```
上面代码在 ES5 中运行，会得到“I am inside!”，因为在if内声明的函数f会被提升到函数头部，实际运行的代码如下

```javascript

// ES5 环境
function f() { console.log('I am outside!'); }

(function () {
  //相当于var 声明提前
  function f() { console.log('I am inside!'); }
  if (false) {
  }
  f();
}());

```

- `ES6 规定，块级作用域之中，函数声明语句的行为类似于let，在块级作用域之外不可引用`

```javascript
// 浏览器的 ES6 环境
function f() { console.log('I am outside!'); }
(function () {
  var f = undefined;
  if (false) {
    function f() { console.log('I am inside!'); }
  }

  f();
}());
// Uncaught TypeError: f is not a function 报错
```

# const

- const声明的常量，也与let一样不可重复声明。

- const实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址不得改动。对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指针，const只能保证这个指针是固定的，至于它指向的数据结构是不是可变的，就完全不能控制了。因此，将一个对象声明为常量必须非常小心

- `let命令、const命令、class命令声明的全局变量，不属于顶层对象的属性`

- 全局环境中，this会返回顶层对象。但是，Node 模块和 ES6 模块中，this返回的是当前模块。

- 函数里面的this，如果函数不是作为对象的方法运行，而是单纯作为函数运行，this会指向顶层对象。但是，严格模式下，这时this会返回undefined。

- 不管是严格模式，还是普通模式，new Function('return this')()，总是会返回全局对象。但是，如果浏览器用了CSP（Content Security Policy，内容安全政策），那么eval、new Function这些方法都可能无法使用
