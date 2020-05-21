/** Page1 两路灯控制
*  功能说明: btnOpen_1() 灯1 开
*  功能说明: btnClose_1() 灯1 关
*  功能说明: btnOpen_2() 灯2 开
*  功能说明: btnClose_2() 灯2 关
*/
function btnOpen_1(){
	SendData('@0001:{"PowerSwitch_1":1}\r\n');
}
function btnClose_1(){
	SendData('@0001:{"PowerSwitch_1":0}\r\n');
}
function btnOpen_2(){
	SendData('@0001:{"PowerSwitch_2":1}\r\n');
}
function btnClose_2(){
	SendData('@0001:{"PowerSwitch_2":0}\r\n');
}

/** Page3 PLC控制  设备编号@0003
*  功能说明:  btn( ) 按键开关 （0-关。1-开）    
*  功能说明:  btuPower() 全开/关按键 (0全关。1全开）
*/
var btn_mask=[0,0,0,0,0];
function btn(i){
	if(btn_mask[i]){
		btn_mask[i]=0;
	}else{
		btn_mask[i]=1;
	}
	SendData('@0003:{"control0'+i+'":'+btn_mask[i]+'}\r\n');
}

var btn_power_mask=true;
function btnPower(){
	if(btn_power_mask){
		SendData('@0003:{"vwo":1}\r\n');
	}else{
		SendData('@0003:{"vwo":0}\r\n');
	}
	btn_power_mask=!btn_power_mask;
}


/** Page4 空调遥控控制  设备编号@0004
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
		SendData('@0004: {"powerswitch":0}\r\n');
	}else{
		Open()
		SendData('@0004: {"powerswitch":1}\r\n');
	}
	air_power_mask =!air_power_mask;
	
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
var speed_buf=0;
function airSpeed(){
	switch(speed_buf){
		case 0:{
			$("#text-speed").text("自动");
			SendData('@0004: {"windspeed":0}\r\n');
			speed_buf = 1;
			break;
		}
		case 1:{
			$("#text-speed").text("风速1");
			SendData('@0004: {"windspeed":1}\r\n');
			speed_buf = 2;
			break;
		}
		case 2:{
			$("#text-speed").text("风速2");
			SendData('@0004: {"windspeed":2}\r\n');
			speed_buf = 3;
			break;
		}
		case 3:{
			$("#text-speed").text("风速3");
			SendData('@0004: {"windspeed":3}\r\n');
			speed_buf = 0;
			break;
		}
	}
}

// 空调模式
var mode_buf=0;
function airMode(){
	switch(mode_buf){
		case 0:{
			$("#text-mode").text("自动");
			SendData('@0004: {"workmode":0}\r\n');
			mode_buf = 1;
			break;
		}
		case 1:{
			$("#text-mode").text("制冷");
			SendData('@0004: {"workmode":1}\r\n');
			mode_buf = 2;
			break;
		}
		case 2:{
			$("#text-mode").text("制热");
			SendData('@0004: {"workmode":2}\r\n');
			mode_buf = 3;
			break;
		}
		case 3:{
			$("#text-mode").text("通风");
			SendData('@0004: {"workmode":3}\r\n');
			mode_buf = 4;
			break;
		}
		case 4:{
			$("#text-mode").text("除湿");
			SendData('@0004: {"workmode":4}\r\n');
			mode_buf = 0;
			break;
		}
	}
}
// 空调扫风
var wind_mask= true;
function airWind(){
	if(wind_mask){
		$("#text-wind").text("上下摆风");
		SendData('@0004: {"verticalswitch":1}\r\n');
	}else{
		$("#text-wind").text("");
		SendData('@0004: {"verticalswitch":0}\r\n');
	}
	wind_mask =!wind_mask;
}
// 空调温度
var tem_bug =26;
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
	SendData('@0004: {"targettemperature":'+tem_bug+'}\r\n');
}
// 品牌选择
function showLevel1() {
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
							SendData('@0004: {"selectmodel":'+value+'}\r\n');
						});
					});
				}
		
// 尝试匹配
function airTry(){
	SendData('@0004:  {"ok":2}\r\n');
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
}


/** Page5 电视遥控  设备编号@0005
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
			SendData('@0005:{"menustrip":0}\r\n');
			break
		}
		case 1:{
			SendData('@0005:{"homepage":0}\r\n');
			break
		}
		case 2:{
			SendData('@0005:{"up":0}\r\n');
			break
		}
		case 3:{
			SendData('@0005:{"right":0}\r\n');
			break
		}
		case 4:{
			SendData('@0005:{"left":0}\r\n');
			break
		}
		case 5:{
			SendData('@0005:{"down":0}\r\n');
			break
		}
		case 6:{
			SendData('@0005:{"ok":0}\r\n');
			break
		}
		case 7:{
			SendData('@0005:{"quit":0}\r\n');
			break
		}
		case 8:{
			SendData('@0005:{"return":0}\r\n');
			break
		}
		case 9:{
			SendData('@0005:{"volume":0}\r\n');
			break
		}
		case 10:{
			SendData('@0005:{"volume":1}\r\n');
			break
		}
		case 11:{
			SendData('@0005:{"silence":0}\r\n');
			break
		}
		case 12:{
			SendData('@0005:{"channel":0}\r\n');
			break
		}
		case 13:{
			SendData('@0005:{"channel":1}\r\n');
			break
		}
	}
}
// 电视学习按键
var study_mask = true;
function TVstudy(){
	if(study_mask){
		SendData('@0005:{"study":1}\r\n');
	}else{
		SendData('@0005:{"study":0}\r\n');
	}
	study_mask =!study_mask;
	
}
// 电视电源按键
function TVpower(){
	SendData('@0005:{"powerswitch":0}\r\n');
}




/** Page6 窗帘控制
*  功能说明: CurtainsBtn() 窗帘控制按钮
*  状态值: 0:打开   1:关闭  2:暂停
*/
function CurtainsBtn(i){
	if(i==0){
		SendData('@0006:{"curtainoperation":0}\r\n');
	}
	if(i==1){
		SendData('@0006:{"curtainoperation":1}\r\n');
	}
	if(i==2){
		SendData('@0006:{"curtainoperation":2}\r\n');
	}
}

/** Page7 窗户控制   @0007
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
	// console.log()
	$("#slider_pos").text(sliderElement1.value)
	slider1_bug = sliderElement1.value
	SendData('@0007:{"actuatorposition":'+slider1_bug+'}\r\n');
}
function getSliderValue2(){
	$("#slider_pin").text(sliderElement2.value)
	slider2_bug = sliderElement2.value
	SendData('@0007:{"clampwindow":'+slider2_bug+'}\r\n');
}
function Getli(s){
	switch(s){
		case 1:{
			SendData('@0007:{"actuatoroperationmode":0}\r\n');
			break;
		}
		case 2:{
			SendData('@0007:{"actuatoroperationmode":1}\r\n');
			break;
		}
		case 3:{
			SendData('@0007:{"actuatoroperationmode":2}\r\n');
			break;
		}
		case 4:{
			SendData('@0007:{"speedwindow":1}\r\n');
			break;
		}
		case 5:{
			SendData('@0007:{"speedwindow":2}\r\n');
			break;
		}
		case 6:{
			SendData('@0007:{"speedwindow":3}\r\n');
			break;
		}
		case 7:{
			SendData('@0007:{"speedwindow":4}\r\n');
			break;
		}
		case 8:{
			SendData('@0007:{"automanual":0}\r\n');
			break;
		}
		case 9:{
			SendData('@0007:{"reversewindow":0}\r\n');
			break;
		}
	}
}



/** Page8 门禁控制   @0008
*  @param dr_bug 当前输入的字符串
*  功能说明: Drclean() 清除输入字符串的最后一位
*  功能说明: DrCon() 确定输入事件
*  
*/

var dr_bug="";
function Drpass(s){
	dr_bug +=s;
	$("#dr-text").val(dr_bug)
}
function Drclean(){
	console.log(123)
	dr_bug = dr_bug.substring(0,dr_bug.length - 1)
	$("#dr-text").val(dr_bug)
}
function DrCon(){
	SendData('@0008:{"password":"'+dr_bug+'"}\r\n');
}



/** Page9 水表控制
*  功能说明:  Status()控制阀门
*  状态值: 0:打开  1:关闭  2:读阀门状态
*  功能说明: Water_read() 读用水量
*/
function Status(i){
	if(i==0){
		SendData('@0009:{"status":0}\r\n');
	}
	if(i==1){
		SendData('@0009:{"status":1}\r\n');
	}
	if(i==2){
		SendData('@0009:{"status":2}\r\n');
	}
}

function Water_read(){
	SendData('@0009:{"tunnage":0}\r\n');
}

/** Page10 电表控制
*  功能说明: Ele_read() 读电表
*/
function Ele_read(){
	SendData('@0010:{"automanual":1}\r\n');
}

/** Page11 温湿度控制
*  功能说明: Th_read() 读温湿度
*/
function Th_read(){
	SendData('@0011:{"read":0}\r\n');
}
/** Page12 智能开关控制  设备编号@0012-0019
*  功能说明: Socket() 插座开关 （0-关。1-开）
*/
var socket_mask = true;
function Socket(i){
	if(socket_mask){
		SendData('@001'+(i+1)+':{"PowerSwitch_'+i+'":1}\r\n');
	}else{
		SendData('@001'+(i+1)+':{"PowerSwitch_'+i+'":0}\r\n');
	}
	socket_mask =!socket_mask;
}