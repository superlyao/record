function Util(cabinCode){
	this.cabinCode=cabinCode;
}

/*
 * 原型方法：返回舱位等级
 */
Util.prototype.getCabinName=function(){
	var result='';
	switch(this.cabinCode){
		case 'A':
			result='豪华头等舱';
			break;
		case 'F':
			result='头等舱';
			break;
		case 'D':
			result='豪华公务舱';
			break;
		case 'C':
			result='公务舱';
			break;
		case 'W':
			result='豪华经济舱';
			break;
		case 'Y':
			result='经济舱';
			break;
	}
	return result;
}

/*
 * 静态属性
 */
Util.validateRules={
	code:{
		reg:'^[0-9A-Za-z]{1,3}$',
		msg:'1-3位数字或字母'
	},
	name:{
		reg:'^[0-9a-zA-Z-_:#@?*,. ]{3,30}$',
		msg:'3-30位字符，包含数字字母-_:#@?*,./空格'
	},
	widHgt:{
		reg:'^[1-9]|([1-9][0-9])$',
		msg:'0-99之间的整数且正整数不能以0开头'
	}

}

/*
 * 字符串分割
 */
Util.getMiniSeats=function(data){
	var newData=data.split(',');
	//初始化一个长度
	var result=new Array(1);
	var index=0;

	for (var i=0;i<newData.length;i++) {
	 	var newDatas=newData[i].split('');
			var num='';
		for (var j=0;j<newDatas.length;j++) {
			//判断值是否是数字，如果是数字返回false	if代码块作用就是把所有数字先组合
			if(!isNaN(newDatas[j])){
				num+=newDatas[j];	//记录数字
				continue;
			}
			//组合数字和字符串
			var temp=num+(newDatas[j]);
			//控制是否放入数组
			var control=true;
			for(var n=0;n<result.length;n++){
				if(result[n]===temp){
					control=false;
				}
			}
			if(control){
				result[index++]=temp;
			}
		}
	}
	return result.toString();
}
var test=new Util('A');
console.log(test.getCabinName());
console.log(Util.getMiniSeats('1ABC,1B,13DE'));
console.log(Util.validateRules.code.msg);