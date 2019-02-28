/**
 * Created by liaoyao on 2017/2/21.
 */
function formatToRMB(moneyNumber){
    //：28456123 转换成 28,456,123
    var result=[];
    var n=0;
    for(var i=moneyNumber.length;i>0;i-=3){
        result[n++]=moneyNumber.substring(i-3,i);
    }
    return result.reverse().toString();
}
console.log(formatToRMB('28456123981238720447'));