/*
 * 正则判断参数是否正确
 */
function validdateParam(param){
	return testOffice(param.office)&&
		   testFltNumber(param.fltNumber)&&
		   testLegs(param.legs)&&
		   testStartDate(param.startDate)&&
		   testStartTime(param.startTime);
}

/*
 * 测试office
 */
function testOffice(office){
	var reg=new RegExp('^[A-Z]{3}[0-9]{3}$');
	return reg.test(office);
}

/*
 * 测试航空公司 fltNumber
 */
function testFltNumber(fltNumber){
	var reg=new RegExp('^[A-Z]{2}[0-9]{3,4}[A-Z]?$');
	return reg.test(fltNumber);
}

/*
 * 测试航节
 */
function testLegs(legs){
	var reg=new RegExp('^[A-Z]{3}[-]([A-Z]{3}[-]){0,4}[A-Z]{3}$');
	return reg.test(legs);
}

/*
 * 测试日期
 */
function testStartDate(startDate){
	var reg=new RegExp('^[0-9]{4}[-][0-9]{2}[-][0-9]{2}$');
	return reg.test(startDate);
}

/*
 * 测试时间
 */
function testStartTime(startTime){
	var reg=new RegExp('^((0|1)[0-9])|((2)[0-3]):(0|1|2|3|4|5)[0-9]$');
	return reg.test(startTime);
}
var param = {
    office:'PEK001',
    fltNumber:'CA001',
    legs:'PEK-SHA-CKG',
    startDate:'2016-01-28',
    startTime:'00:11'
}

alert(validdateParam(param));

let a=Symbol("a");

let map=new Map();
map.set({
	a:"a",
	b:'n'
},{
	a: function a(){
	return this;
}
});

