"use strict"

var user;

var canvas;
var canvasCtx;

var canvasBuffer;
var bufferCtx;

var miniMap;

var fieldMap;

var timeTextField;
var timeCounter;

var hitMap;

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

	audio("audio/startAudio.mp3", 30);
  audio("audio/crashAudio.mp3", 0);
  audio("audio/gameOverAudio.mp3", 0);

  sounds[1].onOff = false;
  sounds[2].onOff = false;
	fadeIn();
  function start() {
    console.log("Background Clicked");
  	sounds[0].onOff = false;
    sounds[1].onOff = true;
    fadeOut();
    setTimeout(function() {
      fadeIn();
      var b = Background(bgImgBW, canvas, function() {});
      var gameStartBtn = Button(gameStartImg, 0, 0, 200, 200, (canvas.width / 2) - 100, (canvas.height / 2) + 100, 200, 200,stageScreen);
      var tutorialBtn = Button(howtoImage, 0, 0, howtoImage.width, howtoImage.height, canvas.width - 200,0, 200, 200,function(){
        Background.list = [];
        Button.list = [];
        var tutorialBtn0 = Button(tutorialImage0, 0, 0, tutorialImage0.width, tutorialImage0.height, (canvas.width / 2) - 150, (canvas.height / 2) -300, 300, 300,function(){
          Button.list = [];
          var tutorialBtn1 = Button(tutorialImage1, 0, 0, tutorialImage1.width, tutorialImage1.height, (canvas.width / 2) - 250, (canvas.height / 2) - 300, 500, 500,function(){
            Button.list = [];
            var tutorialBtn2 = Button(tutorialImage2, 0, 0, tutorialImage2.width, tutorialImage2.height, (canvas.width / 2) - 250, (canvas.height / 2) - 300, 500, 500,function(){
              Button.list = [];
              var tutorialBtn3 = Button(tutorialImage3, 0, 0, tutorialImage3.width, tutorialImage3.height, (canvas.width / 2) - 250, (canvas.height / 2) - 300, 500, 500,function(){
                Button.list = [];
                var tutorialBtn4 = Button(tutorialImage4, 0, 0, tutorialImage4.width, tutorialImage4.height, (canvas.width / 2) - 250, (canvas.height / 2) - 300, 500, 500,function(){
                  Button.list = [];
                  start();
                  var logo = Button(logoImg, 0, 0, 800, 600, 400, 0, 800, 600, function() {});
                });
              });
            });
          });
        });
      });
    }, 500);
  	setTimeout(function() {
      sounds[1].onOff = false;
    }, 4000);
  }

  var background = Background(bgImg, canvas, start);
  var logo = Button(logoImg, 0, 0, 800, 600, 400, 0, 800, 600, function() {});

  gameLoop();
  drawLoop();
  mainLoop();
  setInterval(function(){
    for(var i in Mob.list){
      Mob.list[i].find=true;
    }
  },2000);
}

function selectState(currentState){
  switch (currentState) {
    case State.LOBBY:{
			if(timeCounter!=null){
				clearInterval(timeCounter.loop);
			}
			miniMap=null;
			Button.list = [];
			Background.list = [];
			TextField.list = [];

			Entity.list={};
			user=null;
			Mob.list={};
			Tile.list={};
			Item.list={};
			FieldMap.list={};
			var logo = Button(logoImg, 0, 0, 800, 600, 400, 0, 800, 600, function() {});
			for (var i = 0; i <= 3; i++) {
				var b = Button(stagesImg, (i % 2) * 200, Math.floor(i / 2) * 200, 200, 200, (i * 300) + 100, 450, 200, 200, (function(a){
					return function(){
						currentState=State["STAGE"+(1+a)];
						selectState(currentState);
					}
				}(i)));
			}
      break;
    }
    case State.STAGE1:{
			currentRemainTime=40;
			miniMap=MiniMap(1600-160,10,150,150);
			fadeIn();
      Button.list = [];
      Background.list = [];
			timeTextField=TextField(currentRemainTime,"30px Verdana","rgba(255,255,255,1)",1475,200,100);
			timeCounter=timer(50,currentRemainTime,function(){
				fadeColor="rgba(255,255,255,0)";
				fadeIn();
				currentState=State.LOBBY;
				selectState(currentState);
        Button.list = [];
        Background.list = [];
				fieldMap=null;
        var gameOverBtn = Button(gameOverImg, 0, 0, 800, 600, 400, 150, 800, 600, stageScreen);
			});
			hitMap=hitMapData1;
      fieldMap=FieldMap(1,mapData1);
      break;
    }
    case State.STAGE2:{
      currentRemainTime=40;
			miniMap=MiniMap(1600-160,10,150,150);
			fadeIn();
      Button.list = [];
      Background.list = [];
			timeTextField=TextField(currentRemainTime,"30px Verdana","rgba(255,255,255,1)",1475,200,100);
			timeCounter=timer(50,currentRemainTime,function(){
				fadeColor="rgba(255,255,255,0)";
				fadeIn();
				currentState=State.LOBBY;
				selectState(currentState);
        Button.list = [];
        Background.list = [];
				fieldMap=null;
        var gameOverBtn = Button(gameOverImg, 0, 0, 800, 600, 400, 150, 800, 600, stageScreen);
			});
			hitMap=hitMapData2;
      fieldMap=FieldMap(2,mapData2);
      break;
    }
    case State.STAGE3:{
      currentRemainTime=40;
			miniMap=MiniMap(1600-160,10,150,150);
			fadeIn();
      Button.list = [];
      Background.list = [];
			timeTextField=TextField(currentRemainTime,"30px Verdana","rgba(255,255,255,1)",1475,200,100);
			timeCounter=timer(50,currentRemainTime,function(){
				fadeColor="rgba(255,255,255,0)";
				fadeIn();
				currentState=State.LOBBY;
				selectState(currentState);
        Button.list = [];
        Background.list = [];
				fieldMap=null;
        var gameOverBtn = Button(gameOverImg, 0, 0, 800, 600, 400, 150, 800, 600, stageScreen);
			});
			hitMap=hitMapData3;
      fieldMap=FieldMap(3,mapData3);
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

	for (var i = 0; i < sounds.length; i++) {
    if (sounds[i].onOff) {
        sounds[i].audio.play();
    } else {
        sounds[i].audio.pause();
    }
	}

	if(timeTextField!=null){
		timeTextField.text=(currentRemainTime).toFixed(2);
	}

  for(var i in Tile.list){
    var t=Tile.list[i];
    if(displayedWindow(t)&&!(0<=t.tileId&&t.tileId<=4)){
      t.miniMapEnable=true;
    }
  }

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

	for(var i in Entity.list){
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

	for(var i=0; i < TextField.list.length; i++){
		TextField.list[i].draw(bufferCtx);
		timeTextField.color="rgba("+Math.floor(Math.random()*256)+","+Math.floor(Math.random()*256)+","+Math.floor(Math.random()*256)+","+Math.random()+")";
	}

	if(miniMap!=null){
		miniMap.draw(bufferCtx);
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
		fadeColor="rgba(255,255,255,0)";
		fadeOut();
    setTimeout(function() {
      fadeIn();
			currentState=State.LOBBY;
			selectState(currentState);
      Button.list = [];
      Background.list = [];
			fieldMap=null;
      var gameOverBtn = Button(gameOverImg, 0, 0, 800, 600, 400, 150, 800, 600, stageScreen);
    }, 500);
	}

  for(var i in Mob.list){
    var m=Mob.list[i];
    if(displayedWindow(m)&&m.interaction&&user!=null&&hitTestBox(user,m)){
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
			if(displayedWindow(m1)&&displayedWindow(m2)&&m1!=m2&&hitTestBox(m1,m2)){
				m1.x+=Math.cos(Math.atan2(m2.y-m1.y,m2.x-m1.x))*0.5;
	      m1.y+=Math.sin(Math.atan2(m2.y-m1.y,m2.x-m1.x))*0.5;
	      m2.x+=Math.cos(Math.atan2(m2.y-m1.y,m2.x-m1.x))*0.5;
	      m2.y+=Math.sin(Math.atan2(m2.y-m1.y,m2.x-m1.x))*0.5;
	    }
	  }
  }

	//유저 대 맵
	for(var i in Tile.list){
		var t=Tile.list[i];
		if(user!=null&&displayedWindow(t)&&hitTestBox(user,t)){
			if(t.tileId==11){
				if(timeCounter!=null){
					clearInterval(timeCounter.loop);
				}
				user=null;
				fadeColor="rgba(255,255,255,0)";
				fadeOut();
		    setTimeout(function() {
		        fadeIn();
						currentState=State.LOBBY;
						selectState(currentState);
		        Button.list = [];
		        Background.list = [];
						fieldMap=null;
		        var gameClearBtn = Button(gameClearImg, 0, 0, 800, 600, 400, 150, 800, 600, stageScreen);
		    }, 500);
			}else if(t.tileId!=0){
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
			if(displayedWindow(m)&&displayedWindow(t)&&hitTestBox(m,t)&&t.tileId!=0&&t.tileId!=11){
				m.speedX=-Math.cos(Math.atan2(t.y-m.y,t.x-m.x))*(m.accel+0.5);
				m.speedY=-Math.sin(Math.atan2(t.y-m.y,t.x-m.x))*(m.accel+0.5);
			}
		}
  }

	//아이템 대 유저
	for(var i in Item.list){
		var item=Item.list[i];
		if(user!=null&&displayedWindow(item)&&hitTestBox(user,item)){
			item.get();
		}
	}

  if(mainLoopEnable){
    requestAnimationFrame(mainLoop);
  }
}
