/*
 * 航班构造函数
 */
function Flt(fltNo,bkd,cap,deptAirport,arrAirport){
	this.fltNo=fltNo;	//航班号
	this.bkd=bkd;		//订座
	this.cap=cap;		//运力
	this.deptAirport=deptAirport;	//起飞机场
	this.arrAirport=arrAirport;		//到达机场
	this.lf=getLf();		//客座率

	/*
	 * 获取航段：起飞机场+到达机场
	 *
	 */
	this.getSeg=function(){
		return this.deptAirport+'-'+this.arrAirport;
	}

	/*
	 * 获取客座率
	 */
	function getLf(){
		//客座率=订座/运力  保留2位小数
		var result=bkd/cap;
		return	result.toFixed(2);
	}
}

/*
 * 航班预警规则构造函数
 */
function FltWarninRule(flt,seg,segLf){
	this.seg=seg;
	this.segLf=segLf;
	var flt=flt;

	/*
	 * 是否需要预警
	 * 预警条件：航段相同且航班的客座率低于预警规则客座率才报警
	 */
	this.fltLfIsNormal=function(){
		if((flt.getSeg()===this.segLf)&&(flt.lf<this.seg)){
			return 'warning! flt:'+flt.fltNo+' lf:0.75 is under segLf!';
		}else{
			return  flt.fltNo+' normal';
		}
	}
}
