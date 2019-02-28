/**
 * Created by liaoyao on 2017/2/17.
 * 1.只能输入中文、英文、空格和一个/(/必须出现在英文姓和名之间,
 * 有中文就不能包含/和空格,且中文必须在英文前面,纯中文最长10个汉字)

 2.长度在2至28个字符之间，1个汉字按照2个字符算

 3.方法返回true表示验证通过，否则返回false
 */
/*获取用户的输入*/
var input=prompt("请输入主机姓名");
/*纯中文*/
var regToCh=new RegExp('^[\u4e00-\u9fa5]{1,10}$');
/*中英混合*/
// var regToChEn= /^[\u4E00-\u9FA5][\u4E00-\u9FA50-9a-zA-Z]$/;
var regToChEn=new RegExp('^[\u4e00-\u9fa5][\u4e00-\u9fa5a-zA-Z]+$');
/*全英文*/
var regToEn=new RegExp('^[a-zA-Z] *\/? *[a-zA-Z]$','g')


function getState(input) {

    var isOK=false;
    if(regToCh.test(input)){
        isOK=true;
    }

    if(regToChEn.test(input)){
        var sum=0;
        var temp=new RegExp('^[\u4e00-\u9fa5]$');
        for(var i=0;i<input.length;i++){
            if(temp.test(input.charAt(i))){
                sum+=2;
            }
            sum++;
        }
        if(sum>2&&sum<28){
            isOK=true;
        }else{
            isOK=false;
        }

    }
    if(regToEn.test(input)){
        var len=input.length;
        if(len>=2&&len<=28){
            isOK=true;
        }
    }
    return isOK;
}
alert(getState(input));
