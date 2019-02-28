function buildRequestData(startDate,endDate,frequency,leg){
    //value 数组用来存储结果
    var value = [];

    //1.格式为'YYYYMMDD'格式，如:'20160101'
    function formatDate(date){
        var date=date.split("-");
        if(date[1].length==1){
            date[1]="0"+date[1];
        }
        if(date[2].length==1){
            date[2]="0"+date[2];
        }
        return date[0]+date[1]+date[2];
    }
    //添加startDate
    value.push(formatDate(startDate))
    //添加endDate
    value.push(formatDate(endDate));

    //2.传入'135'获取'2467';
    function frequencyChange(){
        var a = "";
        for(var i = 1; i <= 7; i++){
            //查找对应数字的序号，若没找到则不在航期内
            if(frequency.indexOf(i) == -1){
                a = a + i;
            }
        }
        return a;
    }

    //添加Frequency
    value.push(frequencyChange());

    //3.格式:'PEK-CKG-SHA'；
    var l = (function(leg) {
        //检查leg是否为空
        if(leg != null){
            //迭代操作
            for(var i in leg){
                //将数组中的字符换成大写
                leg[i] = leg[i].toUpperCase();
            }
            //数组内字符串用‘-’链接起来
            leg = leg.join('-');
            return leg;
        }else {
            return "";
        }
    })
    (leg);

    //增加leg转换后的字符串
    value.push(l);
    //4.如果三个则用'-'连接，如果实参四个则用'#'连接。
    if(arguments.length == 3){
        return value.join("-");
    }else if(arguments.length == 4){
        return value.join("#");
    }else{
        return "";
    }

}
