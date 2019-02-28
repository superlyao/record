/**
 * Created by liaoyao on 2017/2/20.
 */
function clone(data){
    var result;
    //如果是一个数组
    if(data instanceof Array){
        //创建一个空数组
        result=[];
        var index=data.length;
        while(index--){
            //递归调用赋值给空数组
            result[index]=clone(data[index]);
        }
        return result;
    }
    //如果是一个对象
    if(data instanceof Object){
        //创建一个空对象
        result={};
        for(var k in data){
            //递归调用
            result[k]=clone(data[k])
        }
        return result;
    }
    //Number String Boolean数据类型可直接返回
    else{
        return data;
    }
}

