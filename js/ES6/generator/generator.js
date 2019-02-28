// function* helloWorldGenerator() {
//   // console.log('1111')
//   yield 'hello'
//   yield 'world'
//   return 'ending'
// }

// let hd = helloWorldGenerator()
// let obj
// while( (obj = hd.next()).value !== undefined) {
//   console.log(obj)
// }
// /*
// value 状态的值
// done 是否结束
// { value: 'hello', done: false }
// { value: 'world', done: false }
// { value: 'ending', done: true }
// */

// var myIterable = {};
// myIterable[Symbol.iterator] = function* () {
//   yield 1;
//   yield 2;
//   yield 3;
// };

// console.log([...myIterable]) // [1, 2, 3]

// function* foo() {
//   console.log('1')
//   yield (x + '2')
//   yield (x + '3')
// }

// let f = foo()
// console.log(f.next())
// console.log(f.next(2))
// console.log(f.next(3))

// function* dataConsumer() {
//   console.log('Started');
//   console.log(`1. ${yield}`);
//   console.log(`2. ${yield}`);
//   return 'result';
// }

// let genObj = dataConsumer();
// genObj.next();
// // Started
// genObj.next('a')
// // 1. a
// genObj.next('b')
// // 2. b

function* foo(x) {
  var y = 2 * (yield (x + 1));
  var z = yield (y / 3);
  return (x + y + z);
}

var a = foo(5);
a.next() // Object{value:6, done:false}
a.next() // Object{value:NaN, done:false}
a.next() // Object{value:NaN, done:true}

var b = foo(5);
b.next() // { value:6, done:false }  x = 5
b.next(12) // { value:8, done:false } y = 2 * 12
b.next(13) // { value:42, done:true } z = 13

var gen = function* gen(){
  yield 1;
  yield 2;
}

var g = gen();
try {
  console.log(g.next());
  g.throw('a')
  console.log('1')
  // g.next()
} catch (e) {
  console.log('外部' + e)
}
console.log('2')
console.log(g.next())