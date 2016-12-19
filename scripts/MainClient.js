"use strict"

var user;

var canvas;
var canvasCtx;

var canvasBuffer;
var bufferCtx;

var gameOver=false;
var killText;

var fieldMap;

var b=9999;

var hitMap=[
	[0,0,b,b,b,0,0,0,b,b,0,0,0,0,0,b,b,b,0,b,0,0,0,0,0,b,b,b,b,b,b,b,b,0,0,0,0,0,0,b,b,b,b,b,b,0,0,0,0,0]
	,[0,0,b,b,b,0,b,0,0,b,b,b,0,0,0,b,b,b,0,b,0,0,0,0,0,b,b,b,b,b,b,b,b,0,0,0,0,0,0,b,b,b,b,b,b,0,0,0,0,0]
	,[0,0,b,b,b,0,b,0,0,0,0,0,0,0,0,0,0,0,0,b,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	,[0,0,b,b,b,0,b,0,0,b,b,0,0,b,b,b,b,0,0,0,0,0,0,0,0,b,b,b,b,b,b,b,b,0,0,0,0,0,0,0,0,0,b,b,b,0,0,0,0,0]
	,[0,0,b,b,b,0,b,0,0,b,b,0,0,b,b,b,b,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,b,b,b,0,0,0,0,0]
	,[0,0,0,0,0,0,0,0,0,0,0,0,0,b,b,b,b,0,b,b,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	,[0,0,b,b,b,0,b,0,0,b,b,b,0,0,0,0,0,0,b,b,0,0,0,0,0,b,b,b,b,b,b,b,b,b,0,0,0,0,0,0,0,0,b,b,b,0,0,0,0,0]
	,[0,0,b,b,b,0,b,0,0,b,b,b,0,0,0,0,0,0,b,b,0,0,0,0,0,b,b,b,b,b,b,b,b,b,0,0,0,0,0,0,0,0,b,b,b,0,0,0,0,0]
	,[0,0,0,0,0,0,b,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,b,b,b,0,0,b,b,b,0,0,0,0,0]
	,[0,0,b,b,b,0,0,0,b,b,0,0,0,b,b,b,b,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,b,b,b,0,0,0,0,0,0,0,0,0,0]
	,[0,0,b,b,b,0,0,0,b,b,0,0,0,b,b,b,b,0,0,b,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,b,b,b,0,0,0,0,0,0,0,0,0,0]
	,[0,0,b,b,b,0,b,0,b,b,0,0,0,0,0,0,0,0,0,b,0,0,0,0,0,b,b,b,b,0,0,0,0,0,0,0,0,0,0,0,0,0,b,b,b,b,0,0,0,0]
	,[0,0,b,b,b,0,b,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,b,b,b,b,0,0,0,b,0,b,0,0,0,0,0,0,0,b,b,b,b,0,0,0,0]
	,[0,0,0,0,0,0,b,0,0,0,b,b,b,b,0,0,b,b,b,0,0,0,0,0,0,b,b,b,b,0,0,0,b,0,b,0,0,0,0,0,0,0,b,b,b,b,0,0,0,0]
	,[0,0,0,0,0,0,b,0,0,0,b,b,b,b,0,0,b,b,b,0,0,0,0,0,0,b,b,b,b,0,0,0,b,0,b,0,0,0,0,0,0,0,b,b,b,b,0,0,0,0]
	,[0,0,b,b,b,0,0,0,b,b,b,0,0,0,0,0,b,b,b,0,0,0,0,0,0,b,b,b,b,0,0,0,0,0,b,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	,[0,0,b,b,b,0,0,0,b,b,b,0,0,0,0,0,0,0,0,0,0,0,0,0,0,b,b,b,b,0,0,0,0,0,b,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	,[0,0,b,b,b,0,b,0,b,b,b,0,b,b,b,0,0,0,0,0,0,0,0,0,0,b,b,b,b,0,0,0,0,0,b,0,0,0,0,b,b,b,b,0,0,0,0,0,0,0]
	,[0,0,0,0,0,0,b,0,b,b,b,0,b,b,b,0,0,b,b,b,0,0,0,0,0,b,b,b,b,b,0,0,0,0,b,0,0,0,0,b,b,b,b,0,0,0,0,0,0,0]
	,[0,0,b,b,b,0,0,0,b,b,b,0,0,0,0,0,0,b,b,b,0,0,0,0,0,b,b,b,b,b,0,0,0,0,b,0,0,0,0,b,b,b,b,0,0,0,0,0,0,0]
	,[0,0,b,b,b,0,b,0,0,0,0,0,0,b,b,0,0,b,b,b,0,0,0,0,0,b,b,b,b,b,0,0,0,0,b,0,0,0,0,b,b,b,b,0,0,0,0,0,0,0]
	,[0,0,b,b,b,0,b,0,0,b,b,0,0,b,b,0,0,0,0,0,0,0,0,0,0,b,b,b,b,b,0,0,0,0,b,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	,[0,0,b,b,b,0,b,0,0,b,b,0,0,0,0,0,0,0,0,0,0,0,0,0,0,b,b,b,b,b,0,0,0,0,b,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	,[0,0,b,b,b,0,b,0,0,b,b,0,0,b,b,0,0,b,b,b,0,0,0,0,0,b,b,b,b,b,0,0,0,0,b,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	,[0,0,0,0,0,0,0,0,0,b,b,0,0,b,b,0,0,0,b,0,0,0,0,0,0,b,b,b,b,b,0,0,0,0,b,0,0,0,b,b,0,0,0,0,0,0,0,0,0,0]
	,[0,0,0,0,0,0,b,0,0,0,0,0,0,b,b,0,0,0,b,0,0,0,0,0,0,b,b,b,b,b,0,0,0,0,b,0,0,0,b,b,0,b,b,b,0,0,0,0,0,0]
	,[0,0,b,b,b,0,b,0,0,0,0,0,0,0,0,0,b,0,b,0,0,0,0,0,0,b,b,b,b,0,0,0,0,0,b,0,0,0,b,b,0,b,b,b,0,0,0,0,0,0]
	,[0,0,0,0,0,0,0,0,0,b,b,0,0,b,0,0,b,0,0,0,0,0,0,0,0,b,b,b,b,0,0,0,0,0,b,0,0,0,b,b,0,b,b,b,0,0,0,0,0,0]
	,[0,0,b,b,b,0,b,0,0,b,b,b,0,b,b,0,b,0,0,0,0,b,b,b,0,b,b,b,b,0,0,0,0,0,b,0,0,0,0,0,0,b,b,b,0,0,0,0,0,0]
	,[0,0,b,b,b,0,b,0,0,0,b,b,0,b,b,0,b,0,0,0,0,b,b,b,0,b,b,b,b,0,0,0,0,0,b,0,0,0,0,0,0,b,b,b,0,0,0,0,0,0]
	,[0,0,0,0,0,0,b,0,0,0,0,0,0,b,b,0,0,0,0,0,0,b,b,b,0,b,b,b,b,0,0,0,0,0,b,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	,[0,0,b,b,b,0,0,0,0,b,0,b,0,b,b,b,b,b,0,0,0,0,0,0,0,b,b,b,b,0,0,0,0,b,b,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	,[0,0,b,b,b,0,0,0,0,b,0,b,0,0,0,0,0,0,0,0,0,0,0,0,0,b,b,b,b,0,0,0,0,b,b,0,0,0,0,0,0,0,0,0,0,b,b,b,0,0]
	,[0,0,0,0,0,0,b,0,0,b,0,b,0,b,b,b,b,b,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,b,b,0,0,0,0,0,0,0,0,0,0,b,b,b,0,0]
	,[0,0,b,b,b,0,b,0,0,0,0,0,0,b,b,b,b,b,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,b,b,0,0,0,0,0,0,0,0,0,0,b,b,b,0,0]
	,[0,0,b,b,b,0,b,0,0,b,b,b,0,0,0,0,0,0,0,0,0,0,0,0,0,b,b,b,b,0,0,0,0,b,0,0,0,0,0,b,b,b,0,0,0,b,b,b,0,0]
	,[0,0,b,b,b,0,0,0,0,b,b,b,0,0,0,0,0,0,0,0,0,0,0,0,0,b,b,b,b,0,0,0,0,b,0,0,0,0,0,b,b,b,0,0,0,b,b,b,b,0]
	,[0,0,b,b,b,0,0,0,0,0,0,0,0,0,0,b,b,b,0,0,0,0,0,0,0,b,b,b,b,0,0,0,0,b,0,0,0,0,0,b,b,b,0,0,0,b,b,b,b,0]
	,[0,0,b,b,b,0,b,0,0,b,b,b,0,0,0,b,b,b,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,b,0,0,0,0,0,b,b,b,0,0,0,b,b,b,b,0]
	,[0,0,0,0,0,0,b,0,0,b,b,b,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	,[0,0,b,b,b,0,b,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,b,b,b,b,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	,[0,0,b,b,b,0,0,0,b,b,b,b,0,0,0,b,b,b,b,b,b,b,0,0,0,b,b,b,b,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	,[0,0,0,0,0,0,0,0,b,b,b,b,0,0,0,b,b,b,b,b,b,b,0,0,0,0,0,0,0,0,0,0,b,b,b,b,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	,[0,0,b,b,b,0,b,0,b,b,b,b,0,0,0,b,b,b,b,b,b,b,0,0,0,0,0,0,0,0,0,0,b,b,b,b,b,b,b,b,b,b,0,0,0,0,b,b,b,0]
	,[0,0,b,b,b,0,b,0,0,0,0,0,0,0,0,b,b,b,b,b,b,b,0,0,0,b,b,b,b,0,0,0,b,b,b,b,b,b,b,b,b,b,0,0,0,0,b,b,b,0]
	,[0,0,0,0,0,0,0,0,0,b,0,b,0,0,0,0,b,b,b,b,b,b,b,0,0,0,b,b,b,b,0,0,0,0,0,b,b,b,b,b,b,b,b,0,0,0,0,b,b,b]
	,[0,0,0,b,b,b,0,b,0,0,b,b,b,b,0,0,b,b,b,b,b,b,b,0,0,0,b,b,b,b,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	,[0,0,0,b,b,b,0,b,0,0,b,b,b,b,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,b,b,b,b,0,0,0,0]
	,[0,0,0,b,b,b,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,b,b,b,b,b,0,0,0,0,0,0,0,0,0,0,0,b,b,b,b,0,0,0,0]
	,[0,0,0,0,0,0,0,b,0,0,0,b,b,b,b,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,b,b,b,b,0,0,0,0]
];

var pivot={
  x:0,
  y:0
}

window.addEventListener("load",init,false);

function init(){
  canvas=document.getElementById("canvas");
  canvasCtx=canvas.getContext("2d");
  //createElement는 인자값으로 만들 요소의 id 가아니라 종류가들어간다.
  canvasBuffer=document.createElement("canvas");
  canvasBuffer.width=canvas.width;
  canvasBuffer.height=canvas.height;
  bufferCtx=canvasBuffer.getContext("2d");

  var background = Background(bgImg, canvas, function() {
    console.log("Background Clicked");
    var b = Background(bgImgBW, canvas, function() {});
    var gameStartBtn = Button(gameStartImg, 0, 0, 200, 200, (canvas.width / 2) - 100, (canvas.height / 2) + 100, 200, 200, function() {
        console.log("Game Start Button Clicked");
        buttonClicked = true;
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
    });
});
var logo = Button(logoImg, 0, 0, 800, 600, 400, 0, 800, 600, function() {});

  gameLoop();
  drawLoop();
  mainLoop();
  setInterval(function(){
    for(var i in Mob.list){
      Mob.list[i].find=true;
    }
  },1000);
}

function colorChange(color){
	switch(color){
		case Color.RED:RED=true;GREEN=false;BLUE=false;break;
		case Color.GREEN:GREEN=true;RED=false;BLUE=false;break;
		case Color.BLUE:BLUE=true;RED=false;GREEN=false;break;
	}
}

function selectState(currentState){
  switch (currentState) {
    case State.LOBBY:{
			Button.list = [];
			Background.list = [];
			
			Entity.list=[];
			user=null;
			Mob.list=[];
			Tile.list=[];
			FieldMap.list=[];
			var logo = Button(logoImg, 0, 0, 800, 600, 400, 0, 800, 600, function() {});
			for (var i = 0; i < 3; i++) {
					var b = Button(stagesImg, (i % 2) * 200, Math.floor(i / 2) * 200, 200, 200, (i * 300) + 400, 450, 200, 200, (function(a){
						return function(){
							currentState=State["STAGE"+(1+a)];
							selectState(currentState);
						}
					}(i)));
			}
      break;
    }
    case State.STAGE1:{
      Button.list = [];
      Background.list = [];
      user=Player(charImage1);
      user.x=1000+50;
      user.y=1100+50;
			user.accel=0.4;
      for(var i=0;i<10;i++){
        var m=Mob(charImage5);
        m.x=200*i;
        m.y=500*i;
        m.accel=0.6;
      }
      fieldMap=FieldMap(1,[
        [0,0,2,2,2,0,0,0,2,2,0,0,0,0,0,2,2,2,0,4,0,0,0,0,0,2,2,2,2,2,2,2,2,0,0,0,0,0,0,2,2,2,2,2,2,0,0,0,0,0]
        ,[0,0,2,2,2,0,2,0,0,2,2,2,0,0,0,2,2,2,0,4,0,0,0,0,0,2,2,2,2,2,2,2,2,0,0,0,0,0,0,2,2,2,2,2,2,0,0,0,0,0]
        ,[0,0,2,2,2,0,2,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        ,[0,0,2,2,2,0,2,0,0,3,3,0,0,5,5,5,5,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,4,4,4,0,0,0,0,0]
        ,[0,0,2,2,2,0,2,0,0,3,3,0,0,5,5,5,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,0,0,0,0,0]
        ,[0,0,0,0,0,0,0,0,0,0,0,0,0,5,5,5,5,0,5,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        ,[0,0,3,3,3,0,2,0,0,3,3,3,0,0,0,0,0,0,5,5,0,0,0,0,0,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,2,2,2,0,0,0,0,0]
        ,[0,0,3,3,3,0,2,0,0,3,3,3,0,0,0,0,0,0,5,5,0,0,0,0,0,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,2,2,2,0,0,0,0,0]
        ,[0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,0,0,2,2,2,0,0,0,0,0]
        ,[0,0,2,2,2,0,0,0,2,2,0,0,0,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,0,0,0,0,0,0,0,0,0,0]
        ,[0,0,2,2,2,0,0,0,2,2,0,0,0,2,2,2,2,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,0,0,0,0,0,0,0,0,0,0]
        ,[0,0,2,2,2,0,2,0,2,2,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0]
        ,[0,0,2,2,2,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,2,0,2,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0]
        ,[0,0,0,0,0,0,2,0,0,0,3,3,3,3,0,0,2,2,2,0,0,0,0,0,0,4,4,4,4,0,0,0,2,0,2,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0]
        ,[0,0,0,0,0,0,2,0,0,0,3,3,3,3,0,0,2,2,2,0,0,0,0,0,0,4,4,4,4,0,0,0,2,0,2,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0]
        ,[0,0,3,3,3,0,0,0,2,2,2,0,0,0,0,0,2,2,2,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        ,[0,0,3,3,3,0,0,0,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        ,[0,0,3,3,3,0,2,0,2,2,2,0,2,2,2,0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,2,0,0,0,0,5,5,5,5,0,0,0,0,0,0,0]
        ,[0,0,0,0,0,0,2,0,2,2,2,0,2,2,2,0,0,5,5,5,0,0,0,0,0,4,4,4,4,4,0,0,0,0,2,0,0,0,0,5,5,5,5,0,0,0,0,0,0,0]
        ,[0,0,2,2,2,0,0,0,2,2,2,0,0,0,0,0,0,5,5,5,0,0,0,0,0,4,4,4,4,4,0,0,0,0,2,0,0,0,0,5,5,5,5,0,0,0,0,0,0,0]
        ,[0,0,2,2,2,0,5,0,0,0,0,0,0,3,3,0,0,5,5,5,0,0,0,0,0,4,4,4,4,4,0,0,0,0,2,0,0,0,0,5,5,5,5,0,0,0,0,0,0,0]
        ,[0,0,2,2,2,0,5,0,0,2,2,0,0,3,3,0,0,0,0,0,0,0,0,0,0,4,4,4,4,4,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        ,[0,0,2,2,2,0,5,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,4,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        ,[0,0,2,2,2,0,5,0,0,2,2,0,0,2,2,0,0,2,2,2,0,0,0,0,0,4,4,4,4,4,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        ,[0,0,0,0,0,0,0,0,0,2,2,0,0,2,2,0,0,0,2,0,0,0,0,0,0,4,4,4,4,4,0,0,0,0,2,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0]
        ,[0,0,0,0,0,0,2,0,0,0,0,0,0,2,2,0,0,0,2,0,0,0,0,0,0,4,4,4,4,4,0,0,0,0,2,0,0,0,2,2,0,2,2,2,0,0,0,0,0,0]
        ,[0,0,3,3,3,0,2,0,0,0,0,0,0,0,0,0,2,0,2,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,2,0,0,0,2,2,0,2,2,2,0,0,0,0,0,0]
        ,[0,0,0,0,0,0,0,0,0,2,2,0,0,3,0,0,2,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,2,0,0,0,2,2,0,2,2,2,0,0,0,0,0,0]
        ,[0,0,2,2,2,0,2,0,0,2,2,2,0,2,3,0,2,0,0,0,0,3,3,3,0,4,4,4,4,0,0,0,0,0,4,0,0,0,0,0,0,2,2,2,0,0,0,0,0,0]
        ,[0,0,2,2,2,0,2,0,0,0,2,2,0,2,3,0,2,0,0,0,0,3,3,3,0,4,4,4,4,0,0,0,0,0,4,0,0,0,0,0,0,2,2,2,0,0,0,0,0,0]
        ,[0,0,0,0,0,0,2,0,0,0,0,0,0,2,3,0,0,0,0,0,0,3,3,3,0,4,4,4,4,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        ,[0,0,3,3,3,0,0,0,0,2,0,2,0,2,3,5,5,5,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,5,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        ,[0,0,3,3,3,0,0,0,0,2,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,5,4,0,0,0,0,0,0,0,0,0,0,5,5,5,0,0]
        ,[0,0,0,0,0,0,2,0,0,2,0,2,0,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,4,0,0,0,0,0,0,0,0,0,0,5,5,5,0,0]
        ,[0,0,2,2,2,0,2,0,0,0,0,0,0,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,4,0,0,0,0,0,0,0,0,0,0,5,5,5,0,0]
        ,[0,0,2,2,2,0,2,0,0,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,0,0,0,0,5,0,0,0,0,0,2,2,2,0,0,0,5,5,5,0,0]
        ,[0,0,2,2,2,0,0,0,0,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,0,0,0,0,5,0,0,0,0,0,2,2,2,0,0,0,5,5,5,5,0]
        ,[0,0,2,2,2,0,0,0,0,0,0,0,0,0,0,2,2,2,0,0,0,0,0,0,0,2,2,2,2,0,0,0,0,5,0,0,0,0,0,2,2,2,0,0,0,5,5,5,5,0]
        ,[0,0,2,2,2,0,2,0,0,4,4,4,0,0,0,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,2,2,2,0,0,0,5,5,5,5,0]
        ,[0,0,0,0,0,0,2,0,0,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        ,[0,0,3,3,3,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        ,[0,0,3,3,3,0,0,0,3,3,3,3,0,0,0,4,4,4,4,4,4,4,0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        ,[0,0,0,0,0,0,0,0,3,3,3,3,0,0,0,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,5,5,5,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        ,[0,0,2,2,2,0,2,0,3,3,3,3,0,0,0,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0,5,5,5,5,5,5,5,5,5,5,0,0,0,0,5,5,5,0]
        ,[0,0,2,2,2,0,2,0,0,0,0,0,0,0,0,3,3,3,3,3,3,3,0,0,0,2,2,2,2,0,0,0,5,5,5,5,5,5,5,5,5,5,0,0,0,0,5,5,5,0]
        ,[0,0,0,0,0,0,0,0,0,3,0,2,0,0,0,0,3,3,3,3,3,3,3,0,0,0,2,2,2,2,0,0,0,0,0,5,5,5,5,5,5,5,5,0,0,0,0,5,5,5]
        ,[0,0,0,3,3,3,0,2,0,0,2,2,2,2,0,0,3,3,3,3,3,3,3,0,0,0,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        ,[0,0,0,3,3,3,0,2,0,0,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,0,0,0,0]
        ,[0,0,0,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,0,0,0,0]
        ,[0,0,0,0,0,0,0,2,0,0,0,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,0,0,0,0]
        ]);
      break;
    }
    case State.STAGE2:{
      break;
    }
    case State.STAGE3:{
      break;
    }
    case State.STAGE4:{
      break;
    }
    case State.STAGE5:{
      break;
    }

    default:alert("error");
  }
}

function gameLoop(){

  if(gameLoopEnable){
    requestAnimationFrame(gameLoop);
  }
}

function drawLoop(){

  bufferCtx.clearRect(0,0,canvasBuffer.width,canvasBuffer.height);
  canvasCtx.clearRect(0,0,canvas.width,canvas.height);
  canvasCtx.globalAlpha = bgFadeAlpha;

  if(fieldMap!=null){
    fieldMap.draw(bufferCtx);
  }

  if(user!=null){
    pivot.x+=(user.x-pivot.x)*0.05;
    pivot.y+=(user.y-pivot.y)*0.05;
  }

  for(var i in Mob.list){
    Mob.list[i].update();
		if(user!=null){
	    Mob.list[i].move(hitMap,user.x,user.y);
		}
  }

	for(var i=0;i<Entity.list.length;i++){
		var e=Entity.list[i];
		e.draw(bufferCtx);
	}

  //재석이 함수
  for (var i = 0; i < Background.list.length; i++) {
      Background.list[i].draw(bufferCtx);
  }
  for (var i = 0; i < Button.list.length; i++) {
      Button.list[i].draw(bufferCtx);
  }

	bufferCtx.fillStyle=fadeColor;
	bufferCtx.fillRect(0,0,canvas.width,canvas.height);

  canvasCtx.drawImage(canvasBuffer,0,0);
  if(drawLoopEnable){
    requestAnimationFrame(drawLoop);
  }
}

function mainLoop(){

	if(user!=null){
	  if(keyInput[37]){
	    user.move(180);
	  }
	  if(keyInput[38]){
	    user.move(270);
	  }
	  if(keyInput[39]){
	    user.move(0);
	  }
	  if(keyInput[40]){
	    user.move(90);
	  }
	}
  if(user!=null){
    user.update();
  }

	if(user!=null&&user.toRemove){
		user=null;
	}

  for(var i in Mob.list){
    var m=Mob.list[i];
    var hitArea={x:m.x+m.width/2,y:m.y+m.height/2,width:m.width,height:m.height};
    if(user!=null&&hitTestBox(user,hitArea)){
      user.speedX+=-Math.cos(Math.atan2(m.y-user.y,m.x-user.x));
      user.speedY+=-Math.sin(Math.atan2(m.y-user.y,m.x-user.x));
      m.speedX+=Math.cos(Math.atan2(m.y-user.y,m.x-user.x));
      m.speedY+=Math.sin(Math.atan2(m.y-user.y,m.x-user.x));
			m.attack(user);
    }
  }
	//몹 대 몹
	for(var i in Mob.list){
    var m1=Mob.list[i];
		for(var j in Mob.list){
	    var m2=Mob.list[j];
			if(m1!=m2&&hitTestBox(m1,m2)){
				m1.x+=Math.cos(Math.atan2(m2.y-m1.y,m2.x-m1.x))*0.5;
	      m1.y+=Math.sin(Math.atan2(m2.y-m1.y,m2.x-m1.x))*0.5;
	      m2.x+=Math.cos(Math.atan2(m2.y-m1.y,m2.x-m1.x))*0.5;
	      m2.y+=Math.sin(Math.atan2(m2.y-m1.y,m2.x-m1.x))*0.5;
	    }
	  }
  }

	//유저 대 맵
	if(user!=null){
		for(var i in Tile.list){
			var t=Tile.list[i];
			if(hitTestBox(user,t)&&t.tileId!=0){
				user.speedX=-Math.cos(Math.atan2(t.y-user.y,t.x-user.x))*(user.accel+0.5);
				user.speedY=-Math.sin(Math.atan2(t.y-user.y,t.x-user.x))*(user.accel+0.5);
			}
		}
	}

	//몹 대 맵
  for(var i in Mob.list){
    var m=Mob.list[i];
		for(var j in Tile.list){
			var t=Tile.list[j];
			if(hitTestBox(m,t)&&t.tileId!=0){
				m.speedX=-Math.cos(Math.atan2(t.y-m.y,t.x-m.x))*(m.accel+0.5);
				m.speedY=-Math.sin(Math.atan2(t.y-m.y,t.x-m.x))*(m.accel+0.5);
			}
		}
  }

  if(mainLoopEnable){
    requestAnimationFrame(mainLoop);
  }
}
