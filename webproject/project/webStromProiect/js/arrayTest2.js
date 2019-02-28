//初始化数组1
var seatNames=['3AB','4C','5ABC'];
//数组尾部增加元素
seatNames.push('6EFG');
//数组头部增加元素
seatNames.unshift('1JKL');
//删除数组最后一个元素
seatNames.pop();

//初始化数组2
var seatNames2=['11HKJ','12A','13CD'];

//合并数组seatNames和seatName2
seatNames=seatNames.concat(seatNames2);
//将seatNames用“、”隔开并输出
var str=seatNames.join('、');
//将字符串分割输出
document.write(str);

