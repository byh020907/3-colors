"use strict"

var Color={
  RED:1,
  GREEN:2,
  BLUE:3,
}
var currentColor=Color.RED;

var drawArea=100;

var gameLoopEnable=true;
var drawLoopEnable=true;
var mainLoopEnable=true;
var currentState=0;
var State={
  LOBBY:0,
  STAGE1:1,
  STAGE2:2,
  STAGE3:3,
  STAGE4:4,
  STAGE5:5,
  STAGE6:6,
  STAGE7:7,
};
//재석이변수
var mouseX = 0;
var mouseY = 0;
var gameCounter = 0;
var buttonClicked = false;
var bgFadeAlpha = 0;
var fading = false;
var fadeCount = 0;

var fadeColor="rgba(255,255,255,0)";

var charImage0=new Image();
charImage0.src="images/플레이어.png";

var mobImage0=new Image();
mobImage0.src="images/일반몹.png";

var mobImage1=new Image();
mobImage1.src="images/빨간몹.png";

var mobImage2=new Image();
mobImage2.src="images/초록몹.png";

var mobImage3=new Image();
mobImage3.src="images/파란몹.png";

var obstacleImage0=new Image();

var obstacleImage1=new Image();
obstacleImage1.src="images/하얀블럭.png";

var obstacleImage2=new Image();
obstacleImage2.src="images/빨간블럭.png";

var obstacleImage3=new Image();
obstacleImage3.src="images/초록블럭.png";

var obstacleImage4=new Image();
obstacleImage4.src="images/파란블럭.png";

var obstacleImage5=new Image();
obstacleImage5.src="images/회색블럭.png";

var finishImage=new Image();
finishImage.src="images/끝.jpg";

var itemImage0=new Image();
itemImage0.src="images/체력회복아이템.png";

var itemImage1=new Image();
itemImage1.src="images/시간증가아이템.png";



var mapImage1=new Image();
mapImage1.src="images/map7.jpg";

var mapImage1_1=new Image();
mapImage1_1.src="images/map7_1.png";


//재석이 이미지
var gameStartImg = new Image();
gameStartImg.src = "images/gameStartBW.png";
var bgImg = new Image();
bgImg.src = "images/background.png";
var bgImgBW = new Image();
bgImgBW.src = "images/backgroundBW.png";
var stagesImg = new Image();
stagesImg.src = "images/stagesImage.png";
var logoImg = new Image();
logoImg.src = "images/logo.png";
var gameOverImg = new Image();
gameOverImg.src = "images/gameOver.png";

var audio = function(src, startTime) {
  var a = new Audio();
  a.src = src;
  a.currentTime = startTime;

  var self={
    audio:a,
    onOff:true
  }
  sounds.push(self);
  return self;
}
var sounds=[];


var stageScreen = function() {
  console.log("Game Start Button Clicked");
  fadeOut();
  setTimeout(function() {
    fadeIn();
    buttonClicked = false;
    Button.list = [];
    Background.list = [];
    var logo = Button(logoImg, 0, 0, 800, 600, 400, 0, 800, 600, function() {});
    for (var i = 0; i < 3; i++) {
      var b = Button(stagesImg, (i % 2) * 200, Math.floor(i / 2) * 200, 200, 200, (i * 300) + 400, 450, 200, 200, (function(a){
        return function(){
          currentState=State["STAGE"+(1+a)];
          selectState(currentState);
        }
      }(i)));
    }
  }, 500);
};
