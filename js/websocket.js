
//---------------------------------------------------------------
//=================================================================
//
//  程序名: websocket.js
//  说 明： webSocket 网络连接函数，一般不需要修改可直接调用
//         本文件针对HTML5-NET物联网单片机嵌入式模块开发
//  日 期   2017-09-09
//  版 权： Frun丰润单片机微控科技,调用该文件请说明版权
//  设 计： 孙 雄（微芯电子QQ：1148371616）
//  
//=================================================================
//定义全局变量
var FrunWeb_IP,FrunWeb_PORT;
var websocket1_Connected,websocket2_Connected,websocket3_Connected,websocket4_Connected; //两个端口的网络连接标志位，0--断开，1--连接
var websocket1,websocket2,websocket3,webSocket4;        //两个端口连接的句柄
var Cam_Uri;                                 //视频链接地址
//-----------------------------------------------------------------
function SocketConnect(nSocket)   //websocket 连接函数，参数nSocket 1--连接端口1，2--连接端口2,3--Setup端口
{	
   var Uri1,Uri2,Uri3,Uri4;
   var nPort1,nPort2,nPort3,nPort4,nPort5;
   GetIP(nSocket);
   nPort1 = parseInt(FrunWeb_PORT)+1; //获取HTML5 Web单片机模块的端口1(5001)  
   nPort2 = parseInt(FrunWeb_PORT)+2; //获取HTML5 Web单片机模块的端口2(5002)
   nPort3 = parseInt(FrunWeb_PORT)+3; //获取HTML5 Web单片机模块的端口3(5003)
   
   nPort4 = 1029;                     //HTML5 Web单片机的参数设置端口（固定1029）
   nPort5 = parseInt(FrunWeb_PORT)+4; //获取HTML5 Web单片机模块摄像机端口(5004)
  
   Uri1   ="ws://"+FrunWeb_IP+":"+nPort1.toString();
   Uri2   ="ws://"+FrunWeb_IP+":"+nPort2.toString();    
   Uri3   ="ws://"+FrunWeb_IP+":"+nPort3.toString();     
   Uri4   ="ws://"+FrunWeb_IP+":"+nPort4.toString(); 

   Cam_Uri="http://"+FrunWeb_IP+":"+nPort5.toString();

   if (!("WebSocket" in window)) 
   {
	  window.alert("提示:该浏览器不支持HTML5 Websocket，建议选择Google，FireFox浏览器！");
	  return;
   }   
   try 
   {
	  switch(nSocket)
	  {
		  case 1:
		  {
			 websocket1_Connected=0;
             websocket1 = new WebSocket(Uri1);
		     websocket1.onopen    = function (evt) { websocket1_Open(evt)   };
             websocket1.onclose   = function (evt) { websocket1_Close(evt)  };
             websocket1.onmessage = function (evt) { websocket1_Message(evt)};
             websocket1.onerror   = function (evt) { websocket1_Error(evt)  }; 
			 break;
		  }
		  case 2:
		  {
			 websocket2_Connected=0;
		     websocket2 = new WebSocket(Uri2);  
		     websocket2.onopen    = function (evt) { websocket2_Open(evt)   };
             websocket2.onclose   = function (evt) { websocket2_Close(evt)  };
             websocket2.onmessage = function (evt) { websocket2_Message(evt)};
             websocket2.onerror   = function (evt) { websocket2_Error(evt)  };  
			 break;
		  }
		  case 3:
		  {
			 websocket3_Connected=0;
		     websocket3 = new WebSocket(Uri3);  
		     websocket3.onopen    = function (evt) { websocket3_Open(evt)   };
             websocket3.onclose   = function (evt) { websocket3_Close(evt)  };
             websocket3.onmessage = function (evt) { websocket3_Message(evt)};
             websocket3.onerror   = function (evt) { websocket3_Error(evt)  };  
			 break; 
		  }
		  case 4:
		  {
			 websocket4_Connected=0;
		     websocket4 = new WebSocket(Uri4);  
		     websocket4.onopen    = function (evt) { websocket4_Open(evt)   };
             websocket4.onclose   = function (evt) { websocket4_Close(evt)  };
             websocket4.onmessage = function (evt) { websocket4_Message(evt)};
             websocket4.onerror   = function (evt) { websocket4_Error(evt)  };  
			 break; 
		  }

	  }
   } 
   catch (err)
   {
	   window.alert("提示：连接错误，请重新连接！");
   }       
}
//---------------------------------------------------------------
function CloseWebSocket(nSocket)
{
	switch(nSocket)
	{
		case 1:
		{
			websocket1.close;
			break;
		}
		case 2:
		{
			websocket2.close;
			break;
		}
		case 3:
		{
			websocket3.close;
			break;
		}
		case 4:
		{
			websocket4.close;
			break;
		}

	}
}
//----------------------------------------------------------------
function websocket1_Open(evt)
{
   websocket1_Connected=1;
   onConnect(1);  
}
//---------------------------------------------------------------
function websocket1_Close(evt)
{
   websocket1_Connected=0;
   Disconnect(1);
}
//---------------------------------------------------------------
function websocket1_Error(evt)
{
   Disconnect(1);
}
//---------------------------------------------------------------
function websocket2_Open(evt)
{
   websocket2_Connected=1;
   onConnect(2);
}
//---------------------------------------------------------------
function websocket2_Close(evt)
{
   websocket2_Connected=0;
   Disconnect(2);
}
//---------------------------------------------------------------
function websocket2_Error(evt)
{
   Disconnect(2);
}
//---------------------------------------------------------------
function websocket1_Message(evt)
{  
   var str=evt.data;
   onReceive(1,str); 
}
//---------------------------------------------------------------
function websocket2_Message(evt)
{
   var str=evt.data;
   onReceive(2,str);
}
//---------------------------------------------------------------
function websocket3_Message(evt)
{  
	var str=evt.data;
	onReceive(3,str);
}
//---------------------------------------------------------------
function websocket3_Open(evt)
{
   websocket3_Connected=1;
   onConnect(3);
}
//---------------------------------------------------------------
function websocket3_Close(evt)
{
   websocket3_Connected=0;
   Disconnect(3);
}
//---------------------------------------------------------------
function websocket3_Error(evt)
{
   websocket3_Connected=0;
   Disconnect(3);
}
//---------------------------------------------------------------
function websocket4_Message(evt)
{  
	var str;  
	var blob = evt.data;
	var reader = new FileReader();
	reader.readAsText(blob, 'utf-8');   
	reader.onload = function (e) 
	{
	   str=reader.result;
	   onReceive(4,str);
	}   
}
//---------------------------------------------------------------
function websocket4_Open(evt)
{
   websocket4_Connected=1;
   onConnect(4);
}
//---------------------------------------------------------------
function websocket4_Close(evt)
{
   websocket4_Connected=0;
   Disconnect(4);
}
//---------------------------------------------------------------
function websocket4_Error(evt)
{
   websocket4_Connected=0;
   Disconnect(4);
}
//---------------------------------------------------------------
function WebSocket_Send(nSocket,str){
	try 
	{
		switch(nSocket)
		{
			case 1:
			{
			if(websocket1.readyState==1)
			{	
				websocket1.send(str); 
			}
			break;
			}
			case 2:
			{
			if(websocket2.readyState==1)
			{
				websocket2.send(str);
			}
			break;
			}
			case 3:
			{  
			if(websocket3.readyState==1)
			{
				websocket3.send(str);
			}
			break;
			}
			case 4:
			{  
			if(websocket4.readyState==1)
			{
				websocket4.send(str);
			}
			break;
			}

		}
	}
	catch (err){window.alert("提示：数据发送错误，请重新发送！");} 
}
//---------------------------------------------------------------
function onReceive(nSocket,data){
	switch(nSocket)
	{
		case 1:{
			//onReceive_hex(data);//数据格式为十六进制时调用的数据处理函数
			onReceive_str(data);//数据格式为字符串时调用的数据处理函数
			break;
		}
		case 2:{
			//onReceive_hex(data);
			onReceive_str(data);
			break;
		}
		case 3:{
			onReceive_hex(data);
			//onReceive_str(data);
			break;
		}
		case 4:{
			console.log(data);
			try{
				var json_data=JSON.parse(data);
				if(json_data.cmd=="GetIP"){
					console.log(json_data);
					FrunWeb_IP=json_data.IP;
					FrunWeb_PORT=json_data.Port;
				}
			}
			catch (err){
				console.log("数据不是合法的JSON字符串！");
			}
			SocketConnect(1);
			break;
		}
	}

}
//---------------------------------------------------------------
function onConnect(nSocket){
	switch(nSocket)
	{
		case 1:{//成功连接TCP1服务
			console.log("TCP1服务连接成功！");
			var s= state_bug;
			StateRead(s);
			$(".err").css("display","none")
			break;
		}
		case 2:{//成功连接TCP2服务
			console.log("TCP2服务连接成功！");
			break;
		}
		case 3:{//成功连接TCP3服务
			console.log("TCP3服务连接成功！");
			break;
		}
		case 4:{//成功连接服务器参数配置服务
			WebSocket_Send(4,'{"cmd":"GetIP"}');
			break;
		}
	}
}
//---------------------------------------------------------------
function Disconnect(nSocket){
	switch(nSocket){
		case 1:{//TCP1服务连接断开或异常
			SocketConnect(1)
			CloseWebSocket(1);
			// console.log("网络连接异常！");
			$(".err").css("display","block")
			break;
		}
		case 2:{//TCP2服务连接断开或异常
			SocketConnect(2)
			CloseWebSocket(2);
			break;
		}
		case 3:{//TCP3服务连接断开或异常
			SocketConnect(3)
			CloseWebSocket(3);
			break;
		}
		case 4:{//TCP4服务连接断开或异常
			CloseWebSocket(4);
			break;
		}
	}
}
//---------------------------------------------------------------
function Send_Data_Hex(nSocket,str){//网页向服务器发送十六进制数据
	var buff,i,tstr;
	str=str.replace(/\s+/g,""); //去掉所有的空格
	buff=new Uint8Array(str.length/2);///创建8 位无符号整数值的类型化数组，长度为字符串长度的一半
	for(i=0;i<buff.length;i++){
		tstr=str.substr(2*i,2);
	    buff[i]=parseInt(tstr,16);//将字符串转为16进制字节
	}
	if(websocket_Connected==1){//判断网络是否处在连接状态
		WebSocket_Send(nSocket,buff);
	}
	else{
		Disconnect(nSocket);
	}
}
//---------------------------------------------------------------
function Send_Data_Str(nSocket,str){//网页给服务器发送字符串数据
	//判断网络是否处在连接状态
		WebSocket_Send(nSocket,str);
	
}
//---------------------------------------------------------------
function onReceive_hex(data){//网页接收到来自模块的数据时自动调用函数websocket2_Message(evt)，可根据通讯的数据格式选择调用（网络数据使用十六进制数据时调用）
	var str,bytebuf;
	var reader = new FileReader();//创建FileReader对象用以操作原始数据缓存区
	reader.readAsArrayBuffer(data); //通过FileReader对象的readAsArrayBuffer方法读取数据
	reader.onload = function(evt){
		bytebuf= new Uint8Array(reader.result);//获得十六进制数据（Uint8Array：八位无符号整数数组）
		str=HexToStr(bytebuf);//将十六进制数转换成对应的字符串
		Data_Dispose(str);
	};
}
function onReceive_str(data){
	var str,bytebuf;
	var reader = new FileReader();//创建FileReader对象用以操作原始数据缓存区
	reader.readAsText(data,'utf-8');//通过FileReader对象的readAsText方法读取数据（将数据读取成字符串）
	reader.onload = function(evt){
		str=reader.result;//获得字符串数据
		Data_Dispose(str);
	}; 
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
   	str=str.toUpperCase();//将全部小写字母转成大写字母，并增加回车换行符
	return str;
}
//---------------------------------------------------------------
function StrToHex(str){//字符串转十六进制数
	var buff,i,tstr;
    buff=new Uint8Array(str.length/2);
    for(i=0;i<buff.length;i++){
	    tstr=str.substr(2*i,2);   
	    buff[i]=parseInt(tstr,16);//将字符串转为16进制字节
    }
	return buff;
}
//---------------------------------------------------------------
function GetIP(num){
	var str,ip;
	str=window.location.href;
	if(str.substr(0,4)=="http"){
		str=str.split("/",10);
		ip=str[2].split(":",2);
		// FrunWeb_IP=ip[0];
		FrunWeb_IP="192.168.1.254";
	}
    else if(str.substr(0,4)=="file"){
		FrunWeb_IP="192.168.1.254";
	    FrunWeb_PORT="5000";
    }
   
}
//----------------------------------------------------------------
window.onload=function(){//当网页加载完成之后执行匿名函数
	SocketConnect(4);
	/************************************************/
}