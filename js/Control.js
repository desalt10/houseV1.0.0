
//---------------------------------------------------------------
function onConnect(){//网络连接成功将自动调用该函数，用户只需编写执行代码即可;该函数用来表现网络连接成功的状态
	/*******************************/
	console.log("网络连接成功！");
	// mui.toast("网络连接成功")
	var s= state_bug;
	StateRead(s);
	$(".err").css("display","none")
	/*******************************/
}
//---------------------------------------------------------------
function Disconnect(num){//网络连接断开将自动调用该函数，用户只需编写执行代码即可；该函数用来表现网络连接断开的状态
	if(num==1){//网络连接断开
		CloseWebSocket()
		SocketConnect(1,"str");//从新连接网络
	}
	else if(num==2){//网络连接异常
		console.log("网络连接异常！");
		//网页弹出对话框显示文本"网络连接异常！"
		// mui.toast("网络异常")
		$(".err").css("display","block")
	}
}
//---------------------------------------------------------------
function Data_Dispose(str,hex){//数据处理函数
	console.log(str);//控制台输出数据；控制台打开放式：用浏览器打开网页（.html文件），按键盘按键F12即可进入浏览器的调试台，选择“控制台”或“Console”选项；
	
/**
 * 功能: isJsonString()字符串转JSON对象
 * @param type 判断来自哪个设备
 * @param obj1 含有数据的对象
 * 
 */
	isJSON(str);
	var obj1,type;
	function isJSON(str) {
	    if (typeof str == 'string') {
	        try {
	            var obj =JSON.parse(str);
	            if(typeof obj == 'object' && obj ){
					if(obj.hasOwnProperty("add")){
						obj1 = obj.params;
						type = obj.add;
						Receive(obj1,type);
					}else{
						return;
					}
				}else{
					return;
				}
	        } catch(e) {
	            return;
	        }
	    }
	}
	
	// switch(type){
	//    case "0006":{//两路灯
	// 	   Receive(obj1);
	// 	   break;
	//    }
	//    case "0013":{//RGB
	// 		// Receive2(obj1);
	// 		break;
	//    }
	//    case "0002":{//PLC
	// 		Receive3(obj1);
	// 		break;
	//    }
	//    case "0011":{//空调
	// 		Receive4(obj1);
	// 		break;
	//    }
	//    case "0010":{//电视
	// 	   Receive5(obj1);
	// 	   break;
	//    }
	//    case "0005":{//窗帘
	// 	   Receive6(obj1);
	// 	   break;
	//    }
	//    case "0004":{//窗户
	// 	   Receive7(obj1);
	// 	   break;
	//    }
	//    case "0007":{//门禁
	// 	   Receive8(obj1);
	// 	   break;
	//    }
	//    case "0008":{//水表
	// 	   Receive9(obj11);
	// 	   break;
	//    }
	//    case "0001":{//电表
	// 		console.log(obj1.voltage)
	// 	   Receive10(obj1);
	// 	   break;
	//    }
	//    case "0009:":{//温/湿度
	// 	   Receive11(obj1);
	// 	   break;
	//    }
	//    case "0014":{//智能插座1
	// 	   Receive12(obj1);
	// 	   break;
	//    }
	//    case "0015":{//智能插座2
	//    		Receive13(obj1);
	//    		break;
	//    }
	//    case "0016":{//智能插座3
	//    		Receive14(obj1);
	//    		break;
	//    }
	//    case "0017":{//智能插座4
	//    		Receive15(obj1);
	//    		break;
	//    }
	//    case "0018":{//智能插座5
	//    		Receive16(obj1);
	//    		break;
	//    }
	//    case "0019":{//智能插座6
	//    		Receive17(obj1);
	//    		break;
	//    }
	//    case "0020":{//智能插座7
	//    		Receive18(obj1);
	//    		break;
	//    }
	//    case "0021":{//智能插座8
	//    		Receive19(obj1);
	//    		break;
	//    }
	//    case "0012":{//安防
	//    		   Receive20(obj1);
	//    		   break;
	//    }
	// }
	
}
//---------------------------------------------------------------
function SendData(Data){
	if(DataType=="hex")Send_Data_Hex(Data);//发送十六进制数数据
	else if(DataType=="str") Send_Data_Str(Data);//发送字符串数据
}