
// 每个页面加载时 主动发读指令
function StateRead(i){
	if(i==1){
		SendData('{"add":"0006","params":{"PowerSwitch_?":1}}\r\n');
	}
	if(i==3){
		SendData('{"add":"0002","read":0}\r\n');
	}
	if(i==5){
		SendData('{"add":"0010","read":0}\r\n');
	}
	if(i==6){
		SendData('{"add":"0005","read":0}\r\n');
	}
	if(i==7){
		SendData('{"add":"0004","read":0}\r\n');
	}
	if(i==9){
		SendData('{"add":"0008","read":0}\r\n');
	}
	if(i==10){
		SendData('{"add":"0001","read":0}\r\n');
	}
	if(i==11){
		SendData('{"add":"0009","read":0}\r\n');
	}
	if(i==12){
		setTimeout(function(){
			SendData('{"add":"0014","params":{"PowerSwitch_?":1}}\r\n');
		setTimeout(function(){
			SendData('{"add":"0015","params":{"PowerSwitch_?":1}}\r\n');
		setTimeout(function(){
			SendData('{"add":"0016","params":{"PowerSwitch_?":1}}\r\n');
		setTimeout(function(){
			SendData('{"add":"0017","params":{"PowerSwitch_?":1}}\r\n');
		setTimeout(function(){
			SendData('{"add":"0018","params":{"PowerSwitch_?":1}}\r\n');
		setTimeout(function(){
			SendData('{"add":"0019","params":{"PowerSwitch_?":1}}\r\n');
		setTimeout(function(){
			SendData('{"add":"0020","params":{"PowerSwitch_?":1}}\r\n');
		setTimeout(function(){
			SendData('{"add":"0021","params":{"PowerSwitch_?":1}}\r\n');
		},200)
		},200)
		},200)
		},200)
		},200)
		},200)
		},200)
		},200)
	}
	if(i==14){
		SendData('{"add":"0012","read":0}\r\n');
	}
}


/** Page1 两路灯控制 设备号0006
*  功能说明: btnOpen_1() 灯1 开
*  功能说明: btnClose_1() 灯1 关
*  功能说明: btnOpen_2() 灯2 开
*  功能说明: btnClose_2() 灯2 关
*/
function btnOpen_1(){
	SendData('{"add":"0006","params":{"PowerSwitch_1":1}}\r\n');
	vibrate()
}
function btnClose_1(){
	SendData('{"add":"0006","params":{"PowerSwitch_1":0}}\r\n');
	vibrate()
}
function btnOpen_2(){
	SendData('{"add":"0006","params":{"PowerSwitch_3":1}}\r\n');
	vibrate()
}
function btnClose_2(){
	SendData('{"add":"0006","params":{"PowerSwitch_3":0}}\r\n');
	vibrate()
}

/** Page2 RGB控制  设备编号@0013
/**
 * 功能介绍:RGB电源总控制开关并发送指令
 * @param  Powermask 开关状态
 */

var Powermask=true;
var RGBmask;
function Power(){
	if(Powermask){
		$("#img").attr("src", "../img/p2-on.png");
		$(".switch2").css("visibility","visible");
		RGBmask = true;
		SendData('{"add":"0013","lightswitch":1}\r\n');
	}else{
		$(".lightbulb__bulb").removeClass("glow_animation1 glow_animation2 glow_animation3 glow_animation4");
		$("#img").attr("src", "../img/p2-off.png");
		$(".switch2").css("visibility","hidden");
		switch2_off()
		SendData('{"add":"0013","lightswitch":0}\r\n');
	}
	Powermask = !Powermask;
	vibrate()
}

/**
 * 功能介绍:RGB灯控制开关并发送指令  设备编号@0013
 * @param  Rgbmask 开关状态(初始状态关闭)
 */
// var RGBmask = true;
function RGBpower(){
	if(RGBmask){
		switch2_on();
	}
	else{
		switch2_off();
	}
	RGBmask=!RGBmask;
	SendData('{"add":"0013","rgblight":0}\r\n');
	vibrate()
}
/**
 * 功能介绍: RGB开关开的状态 设备编号@0013
 * @param  
 */
function switch2_on(){
	$(".switch3").css("visibility","visible");
	$(".slider").css("opacity","1");
	$(".slider").css("pointer-events","auto");
	$(".switch2").css("background","#009F3C");
	$(".switch2").text("关闭");
	$('.lightbulb__bulb,.lightbulb__bulb_bottom').css("background","#FCFCF7");
	
}
/**
 * 功能介绍: RGB开关关的状态 设备编号@0013
 * @param  
 */
function switch2_off(){
	$(".switch3").css("visibility","hidden");
	$(".slider").css("opacity","0.5");
	$(".slider").css("pointer-events","none");
	$(".switch2").css("background","#CDCDCD");
	$(".switch2").text("开启");
	$('.lightbulb__bulb,.lightbulb__bulb_bottom').css("background","#000");
}

/**
 * 功能介绍:RGB灯颜色控制并发送指令 设备编号@0013
 * @param  Colormask 开关状态
 * @param Contol3 RGB颜色正白/黄白(初始状态正白)
 */
var Colormask =false;
function RGBColor(){
	if(Colormask){
		$('.switch3,.lightbulb__bulb,.lightbulb__bulb_bottom').css("background","#FCFCF7");
	}else{
		$('.switch3,.lightbulb__bulb,.lightbulb__bulb_bottom').css("background","#FEFFBE");
	}
	Colormask=!Colormask; 
	SendData('{"add":"0013","cw_ww":0}\r\n');
	vibrate()
}
/**
 * 功能介绍:获取闪烁模式滑块的值并发送指令 设备编号@0013
 * @param  rangeobj1 获取闪烁对象
 * @param a 拼接发送数据
 */
function getVal1(){
	$(".lightbulb__bulb").removeClass("glow_animation1 glow_animation2 glow_animation3 glow_animation4");
	var rangeobj1 = mui('#rangel');
	$(".text1").text('共有4种模式,当前为模式'+rangeobj1[0].value);
	if(rangeobj1[0].value==1){
		$(".lightbulb__bulb").addClass("glow_animation1")
	}
	if(rangeobj1[0].value==2){
		$(".lightbulb__bulb").addClass("glow_animation2")
	}
	if(rangeobj1[0].value==3){
		$(".lightbulb__bulb").addClass("glow_animation3")
	}
	if(rangeobj1[0].value==4){
		$(".lightbulb__bulb").addClass("glow_animation4")
	}
	SendData('{"add":"0013","flicker":"'+rangeobj1[0].value+'"}\r\n');
}
/**
 * 功能介绍:获取音乐模式滑块的值并发送指令 设备编号@0013
 * @param  rangeobj2 获取音乐对象
 */
function getVal2(){
	var rangeobj2 = mui('#range2');
	$(".text2").text('共有4种模式,当前为模式'+rangeobj2[0].value);
	SendData('{"add":"0013","music":"'+rangeobj2[0].value+'"}\r\n');
}

/**
 * 功能介绍:获取亮度模式滑块的值并发送指令  设备编号@0013
 * @param  rangeobj3 获取亮度对象
 */
function getVal3(){
	var rangeobj3 = mui('#range3');
	$(".text3").text('共有8种模式,当前为亮度'+rangeobj3[0].value);
	SendData('{"add":"0013","luminance":"'+rangeobj3[0].value+'"}\r\n');
	switch(rangeobj3[0].value){
		case "1":{
			$(".lightbulb__bulb").css("filter","opacity(35%)");
			break;
		}
		case "2":{
			$(".lightbulb__bulb").css("filter","opacity(45%)");
			break;
		}
		case "3":{
			$(".lightbulb__bulb").css("filter","opacity(55%)");
			break;
		}
		case "4":{
			$(".lightbulb__bulb").css("filter","opacity(65%)");
			break;
		}
		case "5":{
			$(".lightbulb__bulb").css("filter","opacity(75%)");
			break;
		}
		case "6":{
			$(".lightbulb__bulb").css("filter","opacity(85%)");
			break;
		}
		case "7":{
			$(".lightbulb__bulb").css("filter","opacity(95%)");
			break;
		}
		case "8":{
			$(".lightbulb__bulb").css("filter","opacity(100%)");
			break;
		}
	}

}
/**
 * 功能介绍:获取颜色选择的值并发送指令 设备编号@0013
 * @param 
 */
var color_arr=["#DF0023","#EC6B9E","#AAD46D","#79C471","#009F3C","#3DB7B4","#5D8AC6","#3EBCDF","#6495ED","#666EB0","#6A509A","#AE5D9C"]

function Color(s){
	$(".lightbulb__bulb").removeClass("glow_animation1 glow_animation2 glow_animation3 glow_animation4");
	$(".color li").css("background","transparent");
	$("#Color"+s).css("background",color_arr[s-1]);
	$('.lightbulb__bulb,.lightbulb__bulb_bottom').css("background",color_arr[s-1]);
	SendData('{"add":"0013","hue":'+(s-1)+'}\r\n');
	vibrate()
}




/** Page3 PLC控制  设备编号@0002
*  功能说明:  btn( ) 按键开关 （0-关。1-开）    
*  功能说明:  btuPower() 全开/关按键 (0全关。1全开）
*/
// var btn_mask=[0,0,0,0,0];
var btn_mask=[];
// var control_num;
function btn(i){
	if(btn_mask[i-1]){
		// SendData('{"add":"0002","control01":0}\r\n');
		SendData('{"add":"0002","control0'+i+'":0}\r\n');
		// btn_mask[i-1]=0;
	}else{
		SendData('{"add":"0002","control0'+i+'":1}\r\n');
	}
	vibrate()
}

var btn_power_mask;
function btnPower(){
	if(btn_power_mask){
		SendData('{"add":"0002","vwo":0}\r\n');
	}else{
		SendData('{"add":"0002","vwo":1}\r\n');
	}
	vibrate()
}

/** Page4 空调遥控控制  设备编号@0011
*  功能说明: Reset() 电源开关 （0-关。1-开）    
*  功能说明: airSpeed() 风速功能 (0-自动。1-3风速越来越快)
*  功能说明: airMode() 空调模式 （0 - 自动。1 - 制冷。2 - 制热。3 - 通风。4 - 除湿）
*  功能说明: airWind() 扫风 （0-关闭。1-开启）
*  功能说明: airTem( )  显示温度
*  功能说明: showLevel1() 品牌选择
*  功能说明: airTry() 尝试匹配按键
*  功能说明: airCon()  匹配成功按键
*/

var air_power_mask = false;
function airPower(){
	if(air_power_mask){
		Reset()
		SendData('{"add":"0011","PowerSwitch":0}\r\n');
	}else{
		Open()
		SendData('{"add":"0011","PowerSwitch":1}\r\n');
	}
	air_power_mask =!air_power_mask;
	vibrate()
}

 // 电源开关关闭时
 
function Reset(){
	$(".text-show p").css("opacity","0");
	$("#air-speed,#air-wind,#air-mode,#air-down,#air-up,#showUserPicker1,.text-1,.text-2").attr("disabled",true);
}

// 电源开关开启时
 
function Open(){
	$(".text-show p").css("opacity","1");
	$("#air-speed,#air-wind,#air-mode,#air-down,#air-up,#showUserPicker1").attr("disabled",false);
}


//风速功能
 
// var speed_buf=0;
function airSpeed(){
	switch(speed_buf){
		case 0:{
			$("#text-speed").text("自动");
			SendData('{"add":"0011","WindSpeed":0}\r\n');
			localStorage.setItem( "airspeed",speed_buf);
			speed_buf = 1;
			break;
		}
		case 1:{
			$("#text-speed").text("风速1");
			SendData('{"add":"0011","WindSpeed":1}\r\n');
			localStorage.setItem( "airspeed",speed_buf);
			speed_buf = 2;
			break;
		}
		case 2:{
			$("#text-speed").text("风速2");
			SendData('{"add":"0011","WindSpeed":2}\r\n');
			localStorage.setItem( "airspeed",speed_buf);
			speed_buf = 3;
			break;
		}
		case 3:{
			$("#text-speed").text("风速3");
			SendData('{"add":"0011","WindSpeed":3}\r\n');
			localStorage.setItem( "airspeed",speed_buf);
			speed_buf = 0;
			break;
		}
	}
	vibrate()
}

// 空调模式

// var mode_buf=0;
function airMode(){
	switch(mode_buf){
		case 0:{
			$("#text-mode").text("自动");
			SendData('{"add":"0011","WorkMode":0}\r\n');
			localStorage.setItem( "airmode",mode_buf);
			mode_buf = 1;
			break;
		}
		case 1:{
			$("#text-mode").text("制冷");
			SendData('{"add":"0011","WorkMode":1}\r\n');
			localStorage.setItem( "airmode",mode_buf);
			mode_buf = 2;
			break;
		}
		case 2:{
			$("#text-mode").text("制热");
			SendData('{"add":"0011","WorkMode":2}\r\n');
			localStorage.setItem( "airmode",mode_buf);
			mode_buf = 3;
			break;
		}
		case 3:{
			$("#text-mode").text("通风");
			SendData('{"add":"0011","WorkMode":3}\r\n');
			localStorage.setItem( "airmode",mode_buf);
			mode_buf = 4;
			break;
		}
		case 4:{
			$("#text-mode").text("除湿");
			SendData('{"add":"0011","WorkMode":4}\r\n');
			localStorage.setItem( "airmode",mode_buf);
			mode_buf = 0;
			break;
		}
	}
	vibrate()
}

// 空调扫风

// var wind_mask= true;
function airWind(){
	if(wind_mask){
		$("#text-wind").text("上下摆风");
		SendData('{"add":"0011","VerticalSwitch":1}\r\n');
	}else{
		$("#text-wind").text("无摆风");
		SendData('{"add":"0011","VerticalSwitch":0}\r\n');
	}
	localStorage.setItem( "airwind",wind_mask);
	wind_mask =!wind_mask;
	vibrate()
}

// 空调温度

// var tem_bug =26;
function airTem(i){
	if(i){
		if(tem_bug>=30){
			tem_bug = 30;
		}else{
			tem_bug ++;
		}
	}
	else{
		if(tem_bug <=16){
			tem_bug = 16;
		}else{
			tem_bug --;
		}
	}
	$("#text-tem").text(tem_bug+"℃");
	SendData('{"add":"0011","TargetTemperature":'+tem_bug+'}\r\n');
	localStorage.setItem( "airtem",tem_bug);
	vibrate()
}

// 品牌选择

function showLevel1() {
	vibrate()
	var picker = new mui.PopPicker({
		layer: 1,
		buttons: ['取消', '确定']
	});
	picker.setData([{
		value: "1",
		text: "海尔"
	}, {
		value: "2",
		text: "格力"
	}, {
		value: "3",
		text: "美的"
	}, {
		value: "4",
		text: "长虹"
	}, {
		value: "5",
		text: "志高"
	},{
		value: "6",
		text: "华宝"
	},
	{
		value: "7",
		text: "科龙"
	},
	{
		value: "8",
		text: "TCL"
	},
	{
		value: "9",
		text: "格兰仕"
	},
	{
		value: "10",
		text: "华凌"
	},
	{
		value: "11",
		text: "春兰"
	},
	
	{
		value: "12",
		text: "奥克斯"
	},
	{
		value: "13",
		text: "新科"
	},
	{
		value: "14",
		text: "澳柯玛"
	},
	{
		value: "15",
		text: "海信"
	},
	{
		value: "16",
		text: "飞鹿"
	},
	{
		value: "17",
		text: "东宝（东新宝）"
	},
	{
		value: "18",
		text: "新飞"
	},
	{
		value: "19",
		text: "三洋"
	},
	{
		value: "20",
		text: "三菱"
	},
	{
		value: "21",
		text: "LG"
	},
	{
		value: "22",
		text: "东芝"
	},
	{
		value: "23",
		text: "日立"
	},
	{
		value: "24",
		text: "乐声"
	},
	{
		value: "25",
		text: "开利"
	},
	{
		value: "26",
		text: "富士通(珍宝)"
	},
	{
		value: "27",
		text: "声宝"
	},
	{
		value: "28",
		text: "大金"
	},
	{
		value: "29",
		text: "惠而浦"
	},
	{
		value: "30",
		text: "YORK"
	},
	{
		value: "31",
		text: "现代（大宇）"
	},
	{
		value: "32",
		text: "伊莱克斯"
	},
	{
		value: "33",
		text: "迎燕"
	},
	{
		value: "34",
		text: "玉兔"
	},
	{
		value: "35",
		text: "中意"
	}
	]);
document.getElementById("showUserPicker1").addEventListener('tap', function(event) {
	$(".text-1,.text-2").attr("disabled",false);
	// 默认显示第4项
	// picker.pickers[0].setSelectedIndex(3, 2000);
	picker.show(function(selectItems) {
		var text = selectItems[0].text;
		var value = selectItems[0].value;
		$("#showUserPicker1").text(text);
		SendData('{"add":"0011","SelectModel":'+value+'}\r\n');
		localStorage.setItem( "airtext",text);
		localStorage.setItem( "airvalue",value);
	});
});
}
		

// 尝试匹配

function airTry(){
	SendData('{"add":"0011","ok":2}\r\n');
	vibrate()
}

//匹配成功

var aircon_mask = true;
function airCon(){
	if(aircon_mask){
		$("#showUserPicker1,.text-1").attr("disabled",true);
		$(".text-2").text("取消匹配");
	}else{
		$("#showUserPicker1,.text-1").attr("disabled",false);
		$(".text-2").text("匹配成功");
	}
	aircon_mask = !aircon_mask;
	vibrate()
}


/** Page5 电视遥控  设备编号@0010
*  功能说明: TvCon(s) 按键函数
* s=0 菜单
* s=1 首页
* s=2 按键上
* s=3 按键右边
* s=4 按键左边
* s=5 按键下
* s=6 OK按键
* s=7 退出按键
* s=8 返回按键
* s=9 音量-
* s=10 音量+
* s=11 静音
* s=12 频道-
* s=13 频道+
* 功能说明: TVstudy()学习按键
* 功能说明: TVpower()电源按键
*/
function TvCon(s){
	switch(s){
		case 0:{
			SendData('{"add":"0010","Menustrip":0}\r\n');
			break
		}
		case 1:{
			SendData('{"add":"0010","Homepage":0}\r\n');
			break
		}
		case 2:{
			SendData('{"add":"0010","UP":0}\r\n');
			break
		}
		case 3:{
			SendData('{"add":"0010","Right":0}\r\n');
			break
		}
		case 4:{
			SendData('{"add":"0010","left":0}\r\n');
			break
		}
		case 5:{
			SendData('{"add":"0010","down":0}\r\n');
			break
		}
		case 6:{
			SendData('{"add":"0010","ok":0}\r\n');
			break
		}
		case 7:{
			SendData('{"add":"0010","quit":0}\r\n');
			break
		}
		case 8:{
			SendData('{"add":"0010","Return":0}\r\n');
			break
		}
		case 9:{
			SendData('{"add":"0010","Volume":0}\r\n');
			break
		}
		case 10:{
			SendData('{"add":"0010","Volume":1}\r\n');
			break
		}
		case 11:{
			SendData('{"add":"0010","silence":0}\r\n');
			break
		}
		case 12:{
			SendData('{"add":"0010","Channel":0}\r\n');
			break
		}
		case 13:{
			SendData('{"add":"0010","Channel":1}\r\n');
			break
		}
	}
	vibrate()
}
// 电视学习按键
var study_mask = false;
function TVstudy(){
	if(study_mask){
		SendData('{"add":"0010","study":1}\r\n');
	}else{
		SendData('{"add":"0010","study":0}\r\n');
	}
	// study_mask =!study_mask;
	vibrate()
}
// 电视电源按键
var tv_power = true;
function TVpower(){
	if(tv_power){
		SendData('{"add":"0010","PowerSwitch":0}\r\n');
	}else{
		SendData('{"add":"0010","PowerSwitch":0}\r\n');
	}
	tv_power =!tv_power;
	vibrate()
}




/** Page6 窗帘控制   设备号 0005
*  功能说明: CurtainsBtn() 窗帘控制按钮
*  状态值: 0:打开   1:关闭  2:暂停
*/
function CurtainsBtn(i){
	SendData('{"add":"0005","curtainoperation":'+i+'}\r\n');
	vibrate()
}

/** Page7 窗户控制   设备号0004
*  
*  功能说明: getSliderValue1() 窗户位置(滑块1)函数
*  功能说明: getSliderValue2() 窗户防夹力度调节(滑块2)函数
*  功能说明: Getli(s) 按键函数
* s=1 开窗; s=2 关窗; s=3暂停;
* s=4 速度1; s=5速度2;s=6速度3;s=7速度4;
* s=8 查询; s=9 换向
*/
var sliderElement1 = document.getElementById('slider1');
var sliderElement2 = document.getElementById('slider2');
var slider1_bug,slider2_bug;

function getSliderValue1(){
	// $("#slider_pos").text(sliderElement1.value);
	slider1_bug = sliderElement1.value
	SendData('{"add":"0004","actuatorposition":'+slider1_bug+'}\r\n');
}

function getSliderValue2(){
	// $("#slider_pin").text(sliderElement2.value)
	slider2_bug = sliderElement2.value
	SendData('{"add":"0004","clampwindow":'+slider2_bug+'}\r\n');
}

function Getli(s){
	vibrate()
	switch(s){
		case 1:{
			SendData('{"add":"0004","actuatoroperationmode":0}\r\n');
			break;
		}
		case 2:{
			SendData('{"add":"0004","actuatoroperationmode":1}\r\n');
			break;
		}
		case 3:{
			SendData('{"add":"0004","actuatoroperationmode":2}\r\n');
			break;
		}
		case 4:{
			SendData('{"add":"0004","speedwindow":1}\r\n');
			break;
		}
		case 5:{
			SendData('{"add":"0004","speedwindow":2}\r\n');
			break;
		}
		case 6:{
			SendData('{"add":"0004","speedwindow":3}\r\n');
			break;
		}
		case 7:{
			SendData('{"add":"0004","speedwindow":4}\r\n');
			break;
		}
		case 8:{
			SendData('{"add":"0004","automanual":0}\r\n');
			break;
		}
		case 9:{
			SendData('{"add":"0004","reversewindow":0}\r\n');
			break;
		}
	}
}




/** Page8 门禁控制   设备号@0007
*  @param dr_bug 当前输入的字符串
*  功能说明: Drclean() 清除输入字符串的最后一位
*  功能说明: DrCon() 确定输入事件
*  
*/

var dr_bug="";
function Drpass(s){
	dr_bug +=s;
	$("#dr-text").val(dr_bug)
	$("#dr-text").css("font-size","calc(100vw/12)");
	vibrate()
}
function Drclean(){
	dr_bug = dr_bug.substring(0,dr_bug.length - 1)
	$("#dr-text").val(dr_bug)
	$("#dr-text").css("font-size","calc(100vw/12)");
	vibrate()
}
function DrCon(){
	SendData('{"add":"0007","password":"'+dr_bug+'"}\r\n');
	vibrate()
}

function vibrate(){
	plus.device.vibrate(50);
}

/** Page9 水表控制  设备号0008
*  功能说明:  Status()控制阀门
*  状态值: 0:打开  1:关闭  2:读阀门状态
*  功能说明: Water_read() 读用水量
*/
function Status(i){
	if(i==0){
		SendData('{"add":"0008","valvecontrol":0}\r\n');
	}
	if(i==1){
		SendData('{"add":"0008","valvecontrol":1}\r\n');
	}
	if(i==2){
		SendData('{"add":"0008","valvecontrol":2}\r\n');
	}
	vibrate()
}

function Water_read(){
	SendData('{"add":"0008","read":0}\r\n');
	vibrate()
}

/** Page10 电表控制 设备号0001
*  功能说明: Ele_read() 读电表
*/
function Ele_read(){
	SendData('{"add":"0001","automanual":1}\r\n');
	vibrate()
}

/** Page11 温湿度控制 设备号0009
*  功能说明: Th_read() 读温湿度
*/
function Th_read(){
	SendData('{"add":"0009","read":0}\r\n');
	vibrate()
}

/** Page12 智能开关控制  设备编号0014-0021
*  功能说明: Socket() 插座开关 （0-关。1-开）
*/
// var socket_mask = true;
var socket_mask=[0,0,0,0,0,0,0,0];
function Socket(i){
	// SendData('{"add":"00'+(i+13)+'":{"PowerSwitch_1":0/1}}\r\n');
	if(socket_mask[i-1]){
		SendData('{"add":"00'+(i+13)+'","params":{"PowerSwitch_1":0}}\r\n');
	}else{
		SendData('{"add":"00'+(i+13)+'","params":{"PowerSwitch_1":1}}\r\n');
	}
	vibrate()
}


/** Page13 安防系统  设备编号0012
*  功能说明: Smpass(s)密码盘按键
*  功能说明: Smclean()密码盘清除
*  功能说明: SmCon()密码盘确定
*/
var sm_bug="";
function Smdetest(){
	mui("#popover").popover('show', document.getElementById("div"));
	$("#smtext").val(sm_bug);
	vibrate()
}
// var sm_bug="";
function Smpass(s){
	sm_bug +=s;
	$("#smtext").val(sm_bug);
	vibrate()
}
function Smclean(){
	sm_bug = sm_bug.substring(0,sm_bug.length - 1)
	$("#smtext").val(sm_bug)
	vibrate()
}
var sm_mask;
function SmCon(){
	// mui("#popover").popover('hidden', document.getElementById("div"));
	if(sm_mask){
		SendData('{"add":"0012","Arming":"'+sm_bug+'"}\r\n');
	}else{
		SendData('{"add":"0012","Disarming":"'+sm_bug+'"}\r\n');
	}
	vibrate()
}
