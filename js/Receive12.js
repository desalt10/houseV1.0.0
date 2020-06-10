/**
 * 功能: 处理接收函数Receive12()-Receive19() 智能插座 @0012-0019
 * 
 */
// var socket_mask[];
function Receive(s,a){
	if(a=="0014"){
		if(s.PowerSwitch_1){
			$("#circle1 .circle-1").css("border-color","red");
			$("#circle1 .circle-2-inset").css("background","red");
			socket_mask[0]=1;
		}else{
			$("#circle1 .circle-1").css("border-color","#000");
			$("#circle1 .circle-2-inset").css("background","#000");
			socket_mask[0]=0;
		}
	}
	if(a=="0015"){
		if(s.PowerSwitch_1){
			$("#circle2 .circle-1").css("border-color","red");
			$("#circle2 .circle-2-inset").css("background","red");
			socket_mask[1]=1;
		}else{
			$("#circle2 .circle-1").css("border-color","#000");
			$("#circle2 .circle-2-inset").css("background","#000");
			socket_mask[1]=0;
		}
	}
	if(a=="0016"){
		if(s.PowerSwitch_1){
			$("#circle3 .circle-1").css("border-color","red");
			$("#circle3 .circle-2-inset").css("background","red");
			socket_mask[2]=1;
		}else{
			$("#circle3 .circle-1").css("border-color","#000");
			$("#circle3 .circle-2-inset").css("background","#000");
			socket_mask[2]=0;
		}
	}
	if(a=="0017"){
		if(s.PowerSwitch_1){
			$("#circle4 .circle-1").css("border-color","red");
			$("#circle4 .circle-2-inset").css("background","red");
			socket_mask[3]=1;
		}else{
			$("#circle4 .circle-1").css("border-color","#000");
			$("#circle4 .circle-2-inset").css("background","#000");
			socket_mask[3]=0;
		}
	}
	if(a=="0018"){
		if(s.PowerSwitch_1){
			$("#circle5 .circle-1").css("border-color","red");
			$("#circle5 .circle-2-inset").css("background","red");
			socket_mask[4]=1;
		}else{
			$("#circle5 .circle-1").css("border-color","#000");
			$("#circle5 .circle-2-inset").css("background","#000");
			socket_mask[4]=0;
		}
	}
	if(a=="0019"){
		if(s.PowerSwitch_1){
			$("#circle6 .circle-1").css("border-color","red");
			$("#circle6 .circle-2-inset").css("background","red");
			socket_mask[5]=1;
		}else{
			$("#circle6 .circle-1").css("border-color","#000");
			$("#circle6 .circle-2-inset").css("background","#000");
			socket_mask[5]=0;
		}
	}
	if(a=="0020"){
		if(s.PowerSwitch_1){
			$("#circle7 .circle-1").css("border-color","red");
			$("#circle7 .circle-2-inset").css("background","red");
			socket_mask[6]=1;
		}else{
			$("#circle7 .circle-1").css("border-color","#000");
			$("#circle7 .circle-2-inset").css("background","#000");
			socket_mask[6]=0;
		}
	}
	if(a=="0021"){
		if(s.PowerSwitch_1){
			$("#circle8 .circle-1").css("border-color","red");
			$("#circle8 .circle-2-inset").css("background","red");
			socket_mask[7]=1;
		}else{
			$("#circle8 .circle-1").css("border-color","#000");
			$("#circle8 .circle-2-inset").css("background","#000");
			socket_mask[7]=0;
		}
	}
}