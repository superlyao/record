### Es6 Symbol

- [Object.getOwnPropertySymbols(obj)]() =>[] 获取symbols类型的属性名
- [Reflect.ownKeys(obj)]() => [] 可以返回所有类型的键名，包括常规键名和 Symbol 键名。
- [Symbol.for(obj)]() 返回一个相同的Symbol值 该值为一个全局变量
- [Symbol.keyFor]()方法返回一个已登记的 Symbol 类型值的key

``` JavaScript
var s1 = Symbol.for("foo");
Symbol.keyFor(s1) // "foo"

var s2 = Symbol("foo");
Symbol.keyFor(s2) // undefined

```
- 使用Symbol实现一个Singleton

``` JavaScript
const FOO_KEY = Symbol('foo');
function A() {
  this.foo = 'hello';
}

if (!global[FOO_KEY]) {
  global[FOO_KEY] = new A();
}

module.exports = global[FOO_KEY];

```
- Symbol.hasInstance 指向一个内部方法。当其他对象使用instanceof运算符，判断是否为该对象的实例时，会调用这个方法

``` JavaScript
class MyClass {
  [Symbol.hasInstance](foo) {
    return foo instanceof Array;
  }
}

[1, 2, 3] instanceof new MyClass() // true

```

- Symbol.isConcatSpreadable 属性等于一个布尔值，表示该对象使用Array.prototype.concat()时，是否可以展开

``` JavaScript
let arr1 = ['c', 'd'];
['a', 'b'].concat(arr1, 'e') // ['a', 'b', 'c', 'd', 'e']
arr1[Symbol.isConcatSpreadable] // undefined

let arr2 = ['c', 'd'];
arr2[Symbol.isConcatSpreadable] = false;
['a', 'b'].concat(arr2, 'e') // ['a', 'b', ['c','d'], 'e']

```

- Symbol.species 指向当前对象的构造函数。创造实例时，默认会调用这个方法，即使用这个属性返回的函数当作构造函数，来创造新的实例对象

``` JavaScript
class MyArray extends Array {
  static get [Symbol.species]() { return Array; }
}
var a = new MyArray(1,2,3);
var mapped = a.map(x => x * x);

mapped instanceof MyArray // false
mapped instanceof Array // true
```

- Symbol.match 对象的Symbol.match属性，指向一个函数。当执行str.match(myObject)时，如果该属性存在，会调用它，返回该方法的返回值。

``` JavaScript
String.prototype.match(regexp)
// 等同于
regexp[Symbol.match](this)

class MyMatcher {
  [Symbol.match](string) {
    return 'hello world'.indexOf(string);
  }
}

'e'.match(new MyMatcher()) // 1

```

- Symbol.replace 对象的Symbol.replace属性，指向一个方法，当该对象被String.prototype.replace方法调用时，会返回该方法的返回值

``` JavaScript
String.prototype.replace(searchValue, replaceValue)
// 等同于
searchValue[Symbol.replace](this, replaceValue)

```

``` JavaScript
const x = {};
x[Symbol.replace] = (...s) => console.log(s);

'Hello'.replace(x, 'World') // ["Hello", "World"]
```

- Symbol.search 指向一个方法，当该对象被String.prototype.search方法调用时，会返回该方法的返回值

``` JavaScript
String.prototype.search(regexp)
// 等同于
regexp[Symbol.search](this)

class MySearch {
  constructor(value) {
    this.value = value;
  }
  [Symbol.search](string) {
    return string.indexOf(this.value);
  }
}
'foobar'.search(new MySearch('foo')) // 0

```

- Symbol.split 指向一个方法，当该对象被String.prototype.split方法调用时，会返回该方法的返回值。

``` JavaScript
String.prototype.split(separator, limit)
// 等同于
separator[Symbol.split](this, limit)

```

- Symbol.iterator 对象的Symbol.iterator属性，指向该对象的默认遍历器方法。

- Symbol.toPrimitive e属性，指向一个方法。该对象被转为原始类型的值时，会调用这个方法，返回该对象对应的原始类型值。

- Symbol.unscopables 对象的Symbol.unscopables属性，指向一个对象。该对象指定了使用with关键字时，哪些属性会被with环境排除。
