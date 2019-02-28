/**
 * Created by liaoyao on 2017/2/21.
 */
/*
 浏览器自上而下解析html文档流，
 所以如果id为name的input标签位于name.js的上方会读取不到input标签，
 报null错误
 解决方法一：将js文件放到html最下方
 */
// var input=document.getElementById('name').value;
// alert(input);

/*
解决方法二：使用window.onload事件，当文档加载完成之后就会触发该事件
 */
window.onload=function(){
    var input=document.getElementById('name').value;
    alert(input);
}