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
 * 注意：函数声明和用 var参数声明都会声明提前,但在Es6中 let声明的变量不糊声明提前
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
// function a(x){
//     if(x==1){
//         return x+1;
//     }
// }
// console.log(a('1'));
// Object.defineProperty(person,'name',{
//     writable:false,
//     value:"admin"
// });
// var p1=new person();
// console.log(person.prototype);
// console.log(person.prototype.constructor.prototype.constructor);

// var name = "The Window";
// var object = {
//     name : "My Object",
//     getNameFunc : function(){
//         return function(){
//             return this.name;
//         };
//     }
// };
// alert(object.getNameFunc()());
//
//
// var name = "The Window";
// var object = {
//     name : "My Object",
//     getNameFunc : function(){
//         var that = this;
//         return function(){
//             return that.name;
//         };
//     }
// };
// alert(object.getNameFunc()());

var quickSort = function(arr) {
    if (arr.length <= 1) { return arr; }
    var pivotIndex = Math.floor(arr.length / 2);
    var pivot = arr.splice(pivotIndex, 1)[0];
    // var pivot=arr[pivotIndex];
    console.log(pivot);
    var left = [];
    var right = [];
    for (var i = 0; i < arr.length; i++){
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return quickSort(left).concat([pivot], quickSort(right));
};

var arr=[12,14,11,2,1,3,3,12,17];
console.log(arr.toString());
console.log(quickSort(arr).toString());