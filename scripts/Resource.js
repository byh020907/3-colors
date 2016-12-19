"use strict"

var Color={
  RED:1,
  GREEN:2,
  BLUE:3,
}
var RED=false;
var GREEN=false;
var BLUE=false;

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
var fadeColor="rgba(255,255,255,0)";

var charImage1=new Image();
charImage1.src="images/player1.png";

var charImage5=new Image();
charImage5.src="images/player5.png";

var obstacleImage0=new Image();

var obstacleImage1=new Image();
obstacleImage1.src="images/장애물1.png";

var obstacleImage2=new Image();
obstacleImage2.src="images/장애물2.png";

var obstacleImage3=new Image();
obstacleImage3.src="images/장애물3.png";

var obstacleImage4=new Image();
obstacleImage4.src="images/장애물4.png";

var obstacleImage5=new Image();
obstacleImage5.src="images/장애물5.png";



var mapImage1=new Image();
mapImage1.src="images/map7.jpg";

var mapImage1_1=new Image();
mapImage1_1.src="images/map7_1.png";

var foodImage=new Image();
foodImage.src="images/foods.png";


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
