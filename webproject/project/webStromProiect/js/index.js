/**
 * Created by liaoyao on 2017/2/17.
 */
function show(){
    document.getElementById()
}

function Airplane(fltno,cap){
    this.fltno=fltno;
    this.cap=cap;
    this.fly=function(){
        console.log(this.fltno+"is flying...");
    }
}

var airplane=new Airplane("CA123",120);
