/**
 * Created by liaoyao on 2017/2/21.
 */
var limitNumber =parseInt(prompt('请输入上限'));
var type=true;
var i,j,n=0;
for(i = 1; i < limitNumber; i++){
    for(j=2; j < i; j++){
        if(i%j === 0) {
            break;
        }
    }

    if(i <= j && i !=1){
        document.write(i+',');
        n++;
        if(n%5===0){
            document.write('<br>');
        }
    }
}
