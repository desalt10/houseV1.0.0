/**
 * 功能: 处理接收函数Receive7() 窗户控制@0007
 * @param pos_buf 窗户实际位置
 * @param pos_buf1 窗户计算后的位置(需要在界面上显示的位置)
 * 不做开关窗 窗户暂停指令.
 * 窗户效果全由底部上传的位置数据控制
 * 对象.actuatorposition 窗户位置
 * 对象.actuatoroperationmode 窗户控制(0-开窗 1-关窗 2-暂停)
 * 对象.clampwindow 窗户防夹力(1-6)
 * 对象.speedwindow 窗户速度(1-4)
 */
var pos_buf,pos_buf1,pin_buf,speed_buf;
function Receive(s,a){
	if(a=="0004"){
		Receive7(s)
	}else{
		return;
	}
}
function Receive7(obj7){
// 窗户位置 || 窗户速度(速度1:运动时间700;2:600;3:500;4:400)
	pos_buf = (obj7.actuatorposition)*1;
	$("#slider_pos").text(pos_buf);
	$("#slider1").val(pos_buf);
	pos_buf1 =(100-pos_buf)*0.4;
	$("#wind-2").animate({left:'-'+pos_buf1+'%'},speed_buf);
	
//窗户防夹力度
	pin_buf = (obj7.clampwindow)*1;
	$("#slider_pin").text(pin_buf)
	$("#slider2").val(pin_buf)
	
// 所有按键恢复初始样式
	for( var i=1;i<10;i++){
		$("#get"+i).css("background","");
	}
	
//窗户控制 开窗 关窗 暂停
var pos_buf,pos_buf1;
	for( var i=1;i<10;i++){
		$("#get"+i).css("background","");
	}
	switch(obj7.actuatoroperationmode){
		case 0:{
			$("#get1").css("background","yellow");
			break;
		}
		case 1:{
			$("#get2").css("background","yellow");
			break;
		}
		case 2:{
			$("#get3").css("background","yellow");
			break;
		}
	}
	
	
//窗户速度
	switch(obj7.speedwindow){
		case 1:{
			$("#get4").css("background","yellow");
			speed_buf = 700;
			break;
		}
		case 2:{
			$("#get5").css("background","yellow");
			speed_buf = 600;
			break;
		}
		case 3:{
			$("#get6").css("background","yellow");
			speed_buf = 500;
			break;
		}
		case 4:{
			$("#get7").css("background","yellow");
			speed_buf = 400;
			break;
		}
	}
}

