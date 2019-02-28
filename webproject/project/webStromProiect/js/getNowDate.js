/**
 * Created by liaoyao on 2017/2/19.
 */
var input=prompt("请输入日期(格式：YYYY年MM月DD日)");
var str=input.substring(0,input.length-1);
alert(str.replace(/[年月]/g,'-'));

