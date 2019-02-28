/**
 * Created by liaoyao on 2017/3/5.
 * 动画效果逻辑
 */
//显示动画
function showNumberAnimation(i,j,randNumber){
    var numberCell=$('#number-cell-'+i+'-'+j);
    numberCell.css('background-color',getNumberBackgroundColor(randNumber));
    numberCell.css('color',getNumberColor(randNumber));
    numberCell.text(randNumber);
    // numberCell.css('top',getPosTop(i,j));
    // numberCell.css('left',getPosLeft(i,j));
    // numberCell.css('width','100px');
    // numberCell.css('height','100px');
    numberCell.animate({
        width:'100px',
        height:'100px',
        top:getPosTop(i,j),
        left:getPosLeft(i,j)
    },50);
}

//移动动画
function showMoveAnimation(fromx,fromy,tox,toy){
    let numberCell=$('#number-cell-'+fromx+'-'+fromy);
    numberCell.animate({
        top:getPosTop(tox,toy),
        left:getPosLeft(tox,toy)
    },500);
}