/**
 * Created by liaoyao on 2017/3/5.
 */
function Person(name,age) {
    this.name=name;
    this.age=age;
}

Person.prototype.hi=function () {
    console.log(this.name+":"+this.age);
}

Person.prototype.LEGS_NUM=2;
Person.prototype.ARMS_NUM=2;

Person.prototype.welk=function () {
    console.log(this.name+"welk");
}

function Student(name,age,className){
    Person.call(this,name,age);
    this.className=className;
}
/*
将Student的prototype对象属性赋值给一个指向Person.prototype的空对象(没有name和age属性)，这样在Student上的prototype
属性上做的操作不会影响到Person对象。
 */
Student.prototype=Object.create(Person.prototype);
// Student.prototype=new Person();
console.log(Student.prototype);
console.log(Person.prototype);

/*
经过上面的赋值后，Student的对象属性prototype上constructor属性指向的是Person对象，
需要将Student的constructor属性指向自己。
 */
Student.prototype.constructor=Student;
console.log(Student.prototype.constructor);
console.log(Person.prototype);


Student.prototype.hi=function () {
    console.log(this.name+":"+this.age+":"+this.className);
}

Student.prototype.learn=function (subject) {
    console.log(this.name+":"+this.age+":"+this.className+":"+subject);
}

var bosn=new Student("tom",27,"class3");
bosn.hi();
