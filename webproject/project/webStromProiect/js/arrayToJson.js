/**
 * Created by liaoyao on 2017/2/22.
 */
var arr = [ {
    name : "username",
    value :"   中国    大胜靠德卡萨   "
}, {
    name : "password",
    value : "xxx"
}, {
    name : "usertype",
    value : "TC"
}, {
    name : "address0",
    value : "abc"
}, {
    name : "address1",
    value : "xyz"
}];

function arrayToJson(attr) {
    var obj=[];
    var temp;
    var reg=new RegExp("^[address]");
    for(var i=0;i<attr.length;i++){
        for (var key in attr[i]){
            temp=attr[i][key];
            if("usertype"===attr[i][key]){
                obj[temp]=getState(attr[i].value);
            }else if("username"===attr[i][key]){
                obj[temp]=attr[i].value.replace(/\s/g,"");
            }
            else if(reg.test(temp)){
                obj["address"]+=","+attr[i].value;
            }
            else {
                obj[temp]=attr[i].value;
            }
            break;
        }
    }
    obj["address"]=obj["address"].substring(obj["address"].indexOf(",")+1,obj["address"].length);
    function getState(target) {
        switch (target){
            case "Normal":
                return 0;
            case "TC":
                return 1;
            case "Admin":
                return 2;
        }
    }
    return obj;
}

var test=arrayToJson(arr);
var data="{";
for(var index in test){
    if(index==="address"){
        data+=index+":'"+test[index]+"'"
        break;
    }
    data+=index+":'"+test[index]+"',"
}
data+="}";
console.log(data);