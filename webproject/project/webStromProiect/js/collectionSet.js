/**
 * Created by liaoyao on 2017/2/17.
 */
/*
 在Javascript面向对象的思想中，理解原型对象的重要性以及它和构造函数之间的联系，我们用这种联系来
 实现一种数据结构(set集合)，set集合是用以表示非重复值的无序集合，其基础方法包括添加值、检测值是否存在于集合
 中等方法，这种集合我们需要一个更加通用的实现。要求如下：
 1.以构造函数的形式定义一个集合函数collectionSet，包含index(用于计数元素的数量)、
    result(用于存放数据的对象，以键值对的形式存放数据)两个属性，
 2.在构造函数collectionSet的原型上添加一个add方法，用于添加数据到集合中，
 3.在构造函数collectionSet的原型上添加一个remove方法，用于从集合中删除元素，要删除的元素由参数指定，
 4.要求在增加和删除元素的时检测值是否存在于集合中，存在则不能增加，不存在则不能删除，
 5.在构造函数collectionSet的原型上添加一个size方法，用于返回集合的大小，
 6.在构造函数collectionSet的原型上添加一个contains方法，检测集合是否包含传入方法的值，包含则返回true，否则返回false。
 注意与建议：
 1.为了保证放入result对象中的键不重复，可以自定义一个方法生成，
 2.本题只验证数字和字母添加到集合中。
 */
function collectionSet(index,result){
     this.index=0;
     this.result=[{
         key:"",
         value:""
     }];
}

/*
添加数据
数据存在不增加
 */
collectionSet.prototype.add=function (taget) {
    //判断数据是否存在
    if(this.contains(taget)===-1){
        this.result[this.index]={
            key:'',
            value:''
        };
        this.result[this.index].key=getKey();
        this.result[this.index].value=taget;
        this.index++;
    }
}

/*
删除数据
存在：删除
不存在：不作处理
 */
collectionSet.prototype.remove=function (taget) {
    var index=this.contains(taget);
    if(index===-1){
        return;
    }
    //存在就数组移位，index下标减1

    for(var i=index;i<this.result.length-1;i++){
            this.result[i].key=this.result[i+1].key;
            this.result[i].value=this.result[i+1].value;
    }
    this.result[this.result.length-1]=undefined;
    this.index--;
}

/*
返回集合长度
 */
collectionSet.prototype.size=function(){
    return this.index;
}

/*
检测集合是否存在值
包含返回下标
不包含返回-1
 */
collectionSet.prototype.contains=function (taget) {

    for(var i=0;i<this.result.length;i++){
        if(this.result[i].value===taget){
            return i;
        }
    }
    return -1;
}

/*
生成key值
 */
function getKey(){
    return Math.ceil((Math.random()*10000));
}

//初始化一个集合
var test=new collectionSet();
//测试数据
test.add(1);
test.add(2);
test.add(3);
test.add(4);
test.add('asd');
test.remove(4);
console.log(test.size());
console.log(test.result[0]);
console.log(test.result[1]);
console.log(test.result[2]);
console.log(test.result[3]);