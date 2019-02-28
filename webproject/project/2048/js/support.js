/**
 * Created by liaoyao on 2017/3/5.
    底层支撑逻辑
 */
function getPosTop(i,j) {
    return 20+i*120;
}

function getPosLeft(i,j){
    return 20+j*120;
}

//设置单元格背景色
function getNumberBackgroundColor(number) {
    switch( number ){
        case 0:return "#eee4da";break;
        case 1:return "#ede0c8";break;
        case 2:return "#f2b179";break;
        case 4:return "#f59563";break;
        case 8:return "#f67c5f";break;
        case 16:return "#f65e3b";break;
        case 32:return "#edcf72";break;
        case 64:return "#edcc61";break;
        case 128:return "#9c0";break;
        case 256:return "#33b5e5";break;
        case 512:return "#09c";break;
        case 1024:return "#a6c";break;
        case 2048:return "#93c";break;
    }

    return "black";

}

function getNumberColor(number) {
    if(number<=4){
        return '#776e65'
    }
    return 'white';
}

function nospace(border) {
    for (let i=0;i<4;i++){
        for(let j=0;j<4;j++){
            if(border[i][j]==0){
                return false;
            }
        }
    }
    return true;
}

function canMoveLeft(board) {
    for(let i=0;i<4;i++){
        for(let j=1;j<4;j++){
            if(board[i][j]!=0){
                if(board[i][j-1]==0||board[i][j-1]==board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}

function noBlockHorizontal(row,col1,col2,board) {
    for (let i=col1+1;i<col2;i++){
        if(board[row][i]!=0){
            return false;
        }
    }
    return true;
}