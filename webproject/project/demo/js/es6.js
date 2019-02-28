/**
 * Created by liaoyao on 2017/3/6.
 */
class person{
    constructor(){
        this.name="admin";
    }
    says(say){
        console.log(this.name+":"+say);
    }
}

class student extends person{
    constructor(){
        super();
        this.name="123";
    }
}

function a() {

}

var b=new a();

let s1=new student();
console.log(student);
console.log(s1.__proto__);