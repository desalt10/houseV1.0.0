//定义全局变量
var FrunWeb_IP,FrunWeb_PORT; //IP地址和起始端口存储变量
var websocket_Connected; //两个端口的网络连接标志位，0--断开，1--连接
var websocket;           //两个端口连接的句柄
var DataType;      //声明获取的数据的类型 Hex:十六进制  Str:字符串；在函数onReceive中用到
var CamUri;        //摄像头链接地址存储变量
//-----------------------------------------------------------------
function SocketConnect(nSocket,type){ //websocket 连接函数，参数nSocket 1--连接端口1（使用模块的UDP通讯服务），2--连接端口2（使用模块串口通讯服务） 参数type 确定通讯的数据类型 str--字符串通讯 hex--十六进制通讯
	var Uri;
	var nPort,CamPort;
	DataType=type;
	GetIP();							  //获取HTML5-NET服务器的IP地址和起始端口号
	// console.log(FrunWeb_IP);
	nPort = parseInt(FrunWeb_PORT)+nSocket; //获取HTML5 Web单片机模块的端口1
	CamPort=parseInt(FrunWeb_PORT)+3;		//获取摄像头链接端口

	Uri="ws://"+FrunWeb_IP+":"+nPort.toString();//创建链接地址
	CamUri="http://"+FrunWeb_IP+":"+CamPort.toString();//获取摄像头链接地址

	if (!("WebSocket" in window)){                 //判断浏览器是否支持websocket协议
		window.alert("提示:该浏览器不支持HTML5 Websocket，建议选择Google，FireFox浏览器！");
		return;
	}   
	try{
		websocket_Connected=0;          //初始化网络连接状态
		websocket = new WebSocket(Uri);//创建网络连接
		websocket.onopen    = function (evt) { websocket_Open(evt)   };//监听网络连接成功事件
		websocket.onclose   = function (evt) { websocket_Close(evt)  };//监听网络连接断开事件
		websocket.onmessage = function (evt) { websocket_Message(evt)};//监听网络数据接收成功事件
		websocket.onerror   = function (evt) { websocket_Error(evt)  };//异常监听
	} 
	catch (err){
		window.alert("提示：连接错误，请重新连接！");
	}       
}
//---------------------------------------------------------------
function CloseWebSocket(){//手动断开网络连接
	websocket.close;
}
//----------------------------------------------------------------
function websocket_Open(evt)
{
   websocket_Connected=1;
   onConnect();  
}
//---------------------------------------------------------------
function websocket_Close(evt)
{
   websocket_Connected=0;
   Disconnect(1);
}
//---------------------------------------------------------------
function websocket_Error(evt)
{
   Disconnect(2);
}
//---------------------------------------------------------------
function websocket_Message(evt)
{  
   var str=evt.data;
   onReceive(str);
}
//---------------------------------------------------------------
function WebSocket_Send(str){//网页向服务器发送数据
	try{
		if(websocket.readyState==1){
			websocket.send(str);
			
		}
	}
	catch (err){window.alert("提示：数据发送错误，请重新发送！");} 
}
//---------------------------------------------------------------
function Send_Data_Hex(str){//网页向服务器发送十六进制数据
	var buff,i,tstr;
	str=str.replace(/\s/g,""); //去掉所有的空格|\s:匹配任何空白字符；g:全局匹配将替换所有匹配的子串
	buff=new Uint8Array(str.length/2);///创建8 位无符号整数值的类型化数组，长度为字符串长度的一半
	for(i=0;i<buff.length;i++){
		tstr=str.substr(2*i,2);
	    buff[i]=parseInt(tstr,16);//将字符串转为16进制字节
	}
	if(websocket_Connected==1){//判断网络是否处在连接状态
		WebSocket_Send(buff);
	}
	else{
		Disconnect(1);
	}
}
//---------------------------------------------------------------
function Send_Data_Str(str){//网页给服务器发送字符串数据
	if(websocket_Connected==1){//判断网络是否处在连接状态
		WebSocket_Send(str);
	}
	else{
		Disconnect(1);
	}
}
//---------------------------------------------------------------
function onReceive(data){//网页接收到来自模块的数据时自动调用函数websocket2_Message(evt)，可根据通讯的数据格式选择调用（网络数据使用十六进制数据时调用）
	var str,bytebuf;
	var reader = new FileReader();//创建FileReader对象用以操作原始数据缓存区
	if(DataType=="hex"){
		reader.readAsArrayBuffer(data);
		reader.onload = function(evt){
			bytebuf= new Uint8Array(reader.result);//获得十六进制数据
			str=HexToStr(bytebuf);                 //将十六进制数据转换成对应的字符串
			Data_Dispose(str,bytebuf);             //调用数据处理函数
		};
	}
	else if(DataType=="str"){
		reader.readAsText(data,'utf-8');
		reader.onload = function(evt){
			str=reader.result;//获得字符串数据
			Data_Dispose(str);//调用数据处理函数
		}; 
	}
}
//---------------------------------------------------------------
function HexToStr(buf){//将十六进制数据转换成字符串
	var str,i;
	str="";
	for(i=0;i<buf.length;i++){
		if(buf[i]<16){
			str=str+"0"+buf[i].toString(16)+" ";  
	  	}
	 	else{
			str=str+buf[i].toString(16)+" ";  
	  	}
   	}
   	str=str.toUpperCase();
	return str;
}
//---------------------------------------------------------------
function GetIP(){//获取IP地址和端口号
	/************/
	//获取服务器本地IP及端口号（网页上传至服务器应用阶段）
   	var str,ip;
	str=window.location.href;
/* 		str=str.split("/",10);
		ip=str[2].split(":",2);
		FrunWeb_IP=ip[0];
		FrunWeb_PORT=ip[1]; */

	/************/
	//使用固定的IP及端口号（网页开发调试阶段）
    FrunWeb_IP="192.168.1.254";
	// FrunWeb_IP="192.168.1.231";
   	FrunWeb_PORT="5000";
	}


//----------------------------------------------------------------
window.onload=function(){//当网页加载完成之后执行匿名函数
	/************************************************/
	//络连接
	SocketConnect(1,"str");
// 	//document.getElementById("Camera").src=CamUri;//使用该指令前需在网页插入id名为‘Camera’的标签--<iframe></iframe>
// 	/************************************************/
}
