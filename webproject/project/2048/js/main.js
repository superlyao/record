/**
 * Created by liaoyao on 2017/3/5.
 * main.js 游戏主逻辑
 */
let board=[];
let score=0;

$(document).ready(function () {
    newgame();
});

function newgame() {
    //初始化棋盘格
    init();
    //随机生成数字，每次生成两个数字
    generateNumber();
    generateNumber();
}

function init(){
   for(let i=0;i<4;i++){
       for(let j=0;j<4;j++){
           //获取每个单元格
           let griCell=$('#grid-cell-'+i+'-'+j);
           griCell.css('top',getPosTop(i,j));
           griCell.css('left',getPosLeft(i,j));
       }
   }

   //将board初始化为一个二维数组
    for(let i=0;i<4;i++){
       board[i]=[];
       for (let j=0;j<4;j++){
           board[i][j]=0;
       }
    }

    updateBoardView();
}

function updateBoardView(){
    $('.number-cell').remove();
    for (let i=0;i<4;i++){
        for(let j=0;j<4;j++){
            $('#grid-container').append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
            let theNumberCell=$('#number-cell-'+i+'-'+j);
            //如果等于0 不显示
            if(board[i][j]===0){
                theNumberCell.css('width','0px');
                theNumberCell.css('height','0px');
                theNumberCell.css('top',getPosTop(i,j)+50);
                theNumberCell.css('left',getPosLeft(i,j)+50);
            }else{
                theNumberCell.css('width','100px');
                theNumberCell.css('height','100px');
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
                //设置背景色
                theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
                //设置前景色
                theNumberCell.css('color',getNumberColor(board[i][j]));
                theNumberCell.html(board[i][j]);
            }
        }
    }
    generateNumber();

}



$(document).keydown(function (event) {

   switch (event.keyCode){
       //left
       case 37:
           if(moveLeft()){
               // generateNumber();
               //是否游戏结束
               isgameover();
           }
           break;
       //top
       case 38:
           if(moveTop()){
               generateNumber();
               //是否游戏结束
               isgameover();
           }
           break;
       //right
       case 39:
           if(moveRight()){
               generateNumber();
               //是否游戏结束
               isgameover();
           }
           break;
       //down
       case 40:
           if(moveDown()){
               generateNumber();
               //是否游戏结束
               isgameover();
           }
           break;
       //default
       default :
           break;
   }
});

function isgameover() {
    
}

//向左移动
function moveLeft() {
    if(!canMoveLeft(board)){
        return false;
    }
    for(let i=0;i<4;i++){
        for(let j=1;j<4;j++){
            if(board[i][j]!==0){
                for(var k=0;k<j;k++){
                    if(board[i][k]===0&&noBlockHorizontal(i,k,j,board)){
                        //move
                        setTimeout(showMoveAnimation(i,j,i,k),200);
                        board[i][k]=board[i][j];
                        board[i][j]=0;
                        setTimeout(showNumberAnimation(i,j,board[i][k]),200);
                        continue;
                    }
                    else if(board[i][k]==board[i][j]&&noBlockHorizontal(i,k,j,board)){
                        showMoveAnimation(i,j,i,k);
                        board[i][k]+=board[i][j];
                        board[i][j]=0;
                        showNumberAnimation(i,j,board[i][k]);
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(updateBoardView(),200);
    return true;
}

//向右移动
function moveRight(){
    for (let i=0;i<4;i++){
        for (let j=0;j<3;j++){
            if(board[i][j]!==0){
                for(let k=0;k<j;k++){
                    if(board[i][k]===0&&noBlockHorizontal(i,k,j,board)){
                        showMoveAnimation(i,j,i,k);
                        board[i][k]=board[i][j];
                        board[i][j]=0;
                        showNumberAnimation(i,j,board[i][k]);
                        continue;
                    }
                    else if(board[i][k]===board[i][j]&&noBlockHorizontal(i,k,j,board)){
                        showMoveAnimation(i,j,i,k);
                        board[i][k]+=board[i][j];
                        board[i][j]=0;
                        showNumberAnimation(i,j,board[i][k]);
                        continue;
                    }
                }
            }
        }
    }
    setTimeout(updateBoardView(),200);
    return true;
}

//生成数字
function generateNumber() {
    if(nospace(board)){
        return false;
    }
    //随机一个位置
    var randx= Math.floor(Math.random()*4);
    var randy= Math.floor(Math.random()*4);
    while(true){
        if(board[randx][randy]===0){
            break;
        }
        randx= Math.floor(Math.random()*4);
        randy= Math.floor(Math.random()*4);
    }
    //随机一个数字
    var randNumber=Math.random()<0.5?2:4;

    //在随机的位置显示数字
    board[randx][randy]=randNumber;
    console.log("asdasdasd"+board[randx][randy])
    showNumberAnimation(randx,randy,randNumber);
    return true;
}