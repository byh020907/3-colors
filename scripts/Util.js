"use strict"


function displayedWindow(self){
  return pivot.x-canvas.width/2-drawArea<self.x&&self.x<pivot.x+canvas.width/2+drawArea&&pivot.y-canvas.height/2-drawArea<self.y&&self.y<pivot.y+canvas.height/2+drawArea;
}
              //milisecond  //second
function timer(interval,remainTime,func){
  var self={};
  self.loop=setInterval(function(){
    if(currentRemainTime<=0){
      func();
      clearInterval(loop);
    }
    currentRemainTime-=interval/1000;
  },interval);
  return self;
}

function distance(x1,y1,x2,y2){
  return Math.sqrt(Math.pow(x1-x2,2)+Math.pow(y1-y2,2));
}

function directionToAngle(type,angle){
  switch (type) {
    case "degree":{
      if(315<=angle||angle<=45){
        return "right";
      }else if(45<=angle&&angle<=135){
        return "down";
      }else if(135<=angle&&angle<=225){
        return "left";
      }else if(225<=angle&&angle<=315){
        return "up";
      }
      break;
    }

    case "radian":{
      if(-Math.PI/4<angle&&angle<Math.PI/4){
        return "right";
      }else if(Math.PI/4<angle&&angle<3*Math.PI/4){
        return "down";
      }else if(-3*Math.PI/4<angle&&angle<-Math.PI/4){
        return "up";
      }else if(3*Math.PI/4<angle||angle<-3*Math.PI/4){
        return "left";
      }
      break;
    }
    default:break;

  }

}

function directionToRect(entity,rect){
  var angle=Math.atan2(rect.y-entity.y,rect.x-entity.x);
  var Angle={
    leftUp:Math.atan2(-rect.height/2,-rect.width/2),
    upRight:Math.atan2(-rect.height/2,rect.width/2),
    rightDown:Math.atan2(rect.height/2,rect.width/2),
    downLeft:Math.atan2(rect.height/2,-rect.width/2)
  };

  if(Angle.leftUp<=angle&&angle<=Angle.upRight){
    return "up";
  }else if(Angle.upRight<=angle&&angle<=Angle.rightDown){
    return "right";
  }else if(Angle.rightDown<=angle&&angle<=Angle.downLeft){
    return "down";
  }else if((Angle.downLeft<=Math.abs(angle)&&Math.abs(angle)<=Math.PI)){
    return "left";
  }
}

function hitTestBox(box1,box2){
  if(box1.x-box1.width/2<box2.x+box2.width/2&&box1.x+box1.width/2>box2.x-box2.width/2&&
      box1.y-box1.height/2<box2.y+box2.height/2&&box1.y+box1.height/2>box2.y-box2.height/2){
    return true;
  }else{
    return false;
  }
}

function hitTestCircle(target1,target2,distance){
  if(Math.sqrt(Math.pow(target1.x-target2.x,2)+Math.pow(target1.y-target2.y,2))<distance){
    return true;
  }else{
    return false;
  }
}

function deepCopy(originMap){
  var deepCopyMap=[];
  for(var y=0;y<originMap.length;y++){
    deepCopyMap[y]=[];
  }

  for(var y=0;y<originMap.length;y++){
    for(var x=0;x<originMap[0].length;x++){
      deepCopyMap[y][x]=originMap[y][x];
    }
  }
  return deepCopyMap;
}

function log(command){
  console.log(command);
}

function animation(image,width,height,segmentX,segmentY){
  var dx=0;
  var dy=0;
  var segmentWidth=image.width/segmentX;
  var segmentHeight=image.height/segmentY;

  var drawNext=true;
  this.nextFrame=function(fps){
    if(dx<segmentX-1&&drawNext){
      dx++;
      drawNext=false;
      setTimeout(function(){
        drawNext=true;
      },fps);
    }else if(drawNext){
      dx=0;
      drawNext=false;
      setTimeout(function(){
        drawNext=true;
      },fps);
    }
  }

  this.changeDirection=function(direction){
    if(direction=="left"){
      dy=1;
    }else if(direction=="right"){
      dy=2;
    }else if(direction=="up"){
      dy=3;
    }else if(direction=="down"){
      dy=0;
    }
  }
  this.draw=function(context){
    context.drawImage(image,dx*segmentWidth,dy*segmentHeight,segmentWidth,segmentHeight,-width/2,-height/2,width,height);
  }
}

function findPath(map,startPoint,finalPoint){
  var path=[];
  var mapData=map;
  var currentPoint={x:startPoint.x,y:startPoint.y};
  while((currentPoint.x!=finalPoint.x||currentPoint.y!=finalPoint.y)&&currentPoint.x>=0&&currentPoint.y>=0&&currentPoint.x<mapData[0].length&&currentPoint.y<mapData.length){
    path.push({x:currentPoint.x,y:currentPoint.y});
    map[currentPoint.y][currentPoint.x]++;
    var _4direction=[-1,-1,-1,-1];

    //left
    if(currentPoint.x-1>=0){
      _4direction[0]=mapData[currentPoint.y][currentPoint.x-1];
    }
    //up
    if(currentPoint.y-1>=0){
      _4direction[1]=mapData[currentPoint.y-1][currentPoint.x];
    }
    //right
    if(currentPoint.x+1<mapData[0].length){
      _4direction[2]=mapData[currentPoint.y][currentPoint.x+1];
    }
    //down
    if(currentPoint.y+1<mapData.length){
      _4direction[3]=mapData[currentPoint.y+1][currentPoint.x];
    }

    var top=1000000;
    var tops=[];
    var distances=[];
    for(var i=0;i<4;i++){
      if(top>_4direction[i]&&_4direction[i]!=-1){
        top=_4direction[i];
      }
    }
    for(var i=0;i<4;i++){
      if(top==_4direction[i]){
        tops.push(i);
      }
    }
    for(var i=0;i<tops.length;i++){
      if(tops[i]==0){
        //left
        distances.push({direction:0,distance:Math.sqrt(Math.pow(finalPoint.x-(currentPoint.x-1),2)+Math.pow(finalPoint.y-currentPoint.y,2))});
      }else if(tops[i]==1){
        distances.push({direction:1,distance:Math.sqrt(Math.pow(finalPoint.x-currentPoint.x,2)+Math.pow(finalPoint.y-(currentPoint.y-1),2))});
      }else if(tops[i]==2){
        distances.push({direction:2,distance:Math.sqrt(Math.pow(finalPoint.x-(currentPoint.x+1),2)+Math.pow(finalPoint.y-currentPoint.y,2))});
      }else if(tops[i]==3){
        distances.push({direction:3,distance:Math.sqrt(Math.pow(finalPoint.x-currentPoint.x,2)+Math.pow(finalPoint.y-(currentPoint.y+1),2))});
      }
    }
    var temp=distances[0];
    for(var i=0;i<distances.length;i++){
      if(temp.distance>distances[i].distance){
        temp=distances[i];
      }
    }
    switch (temp.direction) {
      case 0:currentPoint.x--;break;
      case 1:currentPoint.y--;break;
      case 2:currentPoint.x++;break;
      case 3:currentPoint.y++;break;
    }
  }

  for(var i=0;i<path.length;i++){
    for(var j=i+1;j<path.length;j++){
      if(path[i].x==path[j].x&&path[i].y==path[j].y){
        path.splice(i,j-i);
      }
    }
  }

  path.push({x:finalPoint.x,y:finalPoint.y});

  return path;
}

var fadeOut = function() {
    console.log("페이드 아웃 시작");
    fading = true;
    bgFadeAlpha = 1;
    var fadeO = setInterval(
        function() {
            bgFadeAlpha *= 0.9;
            if (bgFadeAlpha <= 0.001) {
                clearInterval(fadeO);
                console.log("페이드 아웃 끝");
                fading = false;
            }
        }, 10
    );
};

var fadeIn = function(fadeColor) {
    console.log("페이드 인 시작");
    fadeCount++;
    fading = true;

    bgFadeAlpha = 0.001;
    if(fadeColor!=null){
      window.fadeColor=fadeColor;
    }
    var fadeI = setInterval(
        function() {
            bgFadeAlpha *= 1.1;
            if (bgFadeAlpha >= 1) {
                clearInterval(fadeI);
                console.log("페이드 인 끝");
                fading = false;
                bgFadeAlpha=1;
            }
        }, 10
    );
};
