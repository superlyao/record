/**
 * Created by liaoyao on 2017/2/20.
 */
function foo(){
    var redioList=document.getElementsByName('radioGroup');
    for(var i=0;i<redioList.length;i++) {
        if (redioList[i].checked === true) {
            alert("当前选中" + (i + 1) + "单选框");
        }
    }
}
