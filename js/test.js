/**
 * Created by liaoyao on 2017/3/2.
 */
/**
 * variable object 变量对象(vo)
 * 初始化顺序：
 * 1，函数参数：（如果没有传入就是初始化为undefined）
 * 2，函数声明：（若发生冲突，会覆盖）
 * 3，变量声明：（初始化为undefined，发生变量名冲突 ，会忽略）
 *
 * 注意：函数声明和用 var参数声明都会声明提前,但在Es6中 let声明的变量不会声明提前
 *       console.log(a);//undefined
 *       console.log(b);//报错：b is not defind
 *       var a=1;
 *       let b=2;
 */

// console.log(x);//打印function x(){} 原因：函数声明提前，14行代码和17行代码声明时 函数x会覆盖变量x
// var x=10;
// console.log(x);//打印10 原因：函数声明比变量声明要早，
// x=20;
// function x(){};
// console.log(x);//打印20 规则3发生变量名冲突时 会忽略。
// if(true){
//     var a=1;
// }else{
//     var b=true; //b变量提前 初始化为undefined
// }
// console.log(a);
// console.log(b);

var t = true
setTimeout(function(){
    t = false
},1000)

while(t){}

alert('end')
