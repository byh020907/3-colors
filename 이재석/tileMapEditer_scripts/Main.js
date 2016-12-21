"use strict"

var canvas;
var context;
var button;
var outputMapDataButton;
var outputHitMapDataButton;
var inputButton;
var outputBox;

var keyInput=[];
var clicked=false;
var selectedTilePosition={x:10,y:10};

var map=[];
var tileSize=25;

var inputSize={width:10,height:10};
inputSize.width=prompt("행 입력",0);
inputSize.height=prompt("열 입력",0);
for(var y=0;y<inputSize.height;y++){
  var arr=[];
  for(var x=0;x<inputSize.width;x++){
    arr[x]=0;
  }
  map[y]=arr;
}

window.addEventListener("load",init,false);





function init(){
  canvas=document.getElementById("canvas");
  context=canvas.getContext("2d");
  outputMapDataButton=document.getElementById("outputMapDataButton");
  outputHitMapDataButton=document.getElementById("outputHitMapDataButton");
  inputButton=document.getElementById("inputButton");
  outputBox=document.getElementById("outputMapData");

  outputMapDataButton.onclick=function(){
    var string="[\n";
    for(var y=0;y<map.length;y++){
      for(var x=0;x<map[0].length;x++){
        if(x==0){
          if(y==0){
            string+="\t[";
          }else{
            string+="\t,[";
          }
          string=string+map[y][x]+",";
        }else if(x==map[0].length-1){
          string=string+map[y][x];
          string+="]";
        }else{
          string=string+map[y][x]+",";
        }
      }
      string=string+"\n";
    }
    string+="];";
    outputBox.value=string;
  }

  outputHitMapDataButton.onclick=function(){
    var hitMapData=[];

    for(var y=0;y<map.length;y++){
      hitMapData[y]=[];
    }

    for(var y=0;y<map.length;y++){
      for(var x=0;x<map[0].length;x++){
        if(map[y][x]!=0&&map[y][x]<=5){
          hitMapData[y][x]="b";
        }else{
          hitMapData[y][x]=0;
        }
      }
    }


    var string="[\n";
    for(var y=0;y<hitMapData.length;y++){
      for(var x=0;x<hitMapData[0].length;x++){
        if(x==0){
          if(y==0){
            string+="\t[";
          }else{
            string+="\t,[";
          }
          string=string+hitMapData[y][x]+",";
        }else if(x==hitMapData[0].length-1){
          string=string+hitMapData[y][x];
          string+="]";
        }else{
          string=string+hitMapData[y][x]+",";
        }
      }
      string=string+"\n";
    }
    string+="];";
    outputBox.value=string;
  }

  inputButton.onclick=function(){
    var dmap=outputBox.value;
    var string=dmap;
    var values;

    for(var y=0;y<dmap.length;y++){
      string=string.replace('[',"");
      string=string.replace(']',"");
      string=string.replace('\n',"");
      string=string.replace('\t',"");
      string=string.replace(' ',"");
    }

    values=string.split(',');

    var c=0;
    for(var y=0;y<map.length;y++){
      for(var x=0;x<map[0].length;x++){
        map[y][x]=values[c];
        c++;
      }
    }
  }



  setInterval(function(){
    if(clicked){
      //0~9
      for(var i=0;i<=9;i++){
        if(keyInput[i+48]){
          map[selectedTilePosition.y][selectedTilePosition.x]=i;
        }
      }
      //0~9(3x3)
      for(var i=0;i<=9;i++){
        if(keyInput[i+48]&&keyInput[83]){
          for(var y=selectedTilePosition.y-1;y<=selectedTilePosition.y+1;y++){
            for(var x=selectedTilePosition.x-1;x<=selectedTilePosition.x+1;x++){
              if(map[y][x]!=undefined){
                map[y][x]=i;
              }
            }
          }
        }
      }
      //Q
      if(keyInput[81]){
        for(var y=0;y<map.length;y++){
          for(var x=0;x<map[0].length;x++){
            if(map[y][x]==10){
              map[y][x]=0;
            }
          }
        }
        map[selectedTilePosition.y][selectedTilePosition.x]=10;
      }
      //W
      if(keyInput[87]){
        for(var y=0;y<map.length;y++){
          for(var x=0;x<map[0].length;x++){
            if(map[y][x]==11){
              map[y][x]=0;
            }
          }
        }
        map[selectedTilePosition.y][selectedTilePosition.x]=11;
      }
      //E
      if(keyInput[69]){
        map[selectedTilePosition.y][selectedTilePosition.x]=12;
      }
      //R
      if(keyInput[82]){
        map[selectedTilePosition.y][selectedTilePosition.x]=13;
      }
      //T
      if(keyInput[84]){
        map[selectedTilePosition.y][selectedTilePosition.x]=14;
      }


      //delete(3x3)
      if(keyInput[68]){
        for(var y=selectedTilePosition.y-1;y<=selectedTilePosition.y+1;y++){
          for(var x=selectedTilePosition.x-1;x<=selectedTilePosition.x+1;x++){
            if(map[y][x]!=undefined){
              map[y][x]=0;
            }
          }
        }
      }
    }
    context.save();
    context.clearRect(0,0,canvas.width,canvas.height);
    context.fillStyle="rgba(0,0,0,1)";
    context.fillRect(0,0,map[0].length*tileSize,map.length*tileSize);
    for(var y=0;y<map.length;y++){
      for(var x=0;x<map[0].length;x++){
        if(map[y][x]==1){
          context.drawImage(obstacleImage1,x*tileSize+1,y*tileSize+1,tileSize-2,tileSize-2);
        }else if(map[y][x]==2){
          context.drawImage(obstacleImage2,x*tileSize+1,y*tileSize+1,tileSize-2,tileSize-2);
        }else if(map[y][x]==3){
          context.drawImage(obstacleImage3,x*tileSize+1,y*tileSize+1,tileSize-2,tileSize-2);
        }else if(map[y][x]==4){
          context.drawImage(obstacleImage4,x*tileSize+1,y*tileSize+1,tileSize-2,tileSize-2);
        }else if(map[y][x]==5){
          context.drawImage(obstacleImage5,x*tileSize+1,y*tileSize+1,tileSize-2,tileSize-2);
        }else if(map[y][x]==6){
          context.drawImage(mobImage0,x*tileSize+1,y*tileSize+1,tileSize-2,tileSize-2);
        }else if(map[y][x]==7){
          context.drawImage(mobImage1,x*tileSize+1,y*tileSize+1,tileSize-2,tileSize-2);
        }else if(map[y][x]==8){
          context.drawImage(mobImage2,x*tileSize+1,y*tileSize+1,tileSize-2,tileSize-2);
        }else if(map[y][x]==9){
          context.drawImage(mobImage3,x*tileSize+1,y*tileSize+1,tileSize-2,tileSize-2);
        }else if(map[y][x]==10){
          context.drawImage(startImage,x*tileSize+1,y*tileSize+1,tileSize-2,tileSize-2);
        }else if(map[y][x]==11){
          context.drawImage(finishImage,x*tileSize+1,y*tileSize+1,tileSize-2,tileSize-2);
        }else if(map[y][x]==12){
          context.drawImage(itemImage0,x*tileSize+1,y*tileSize+1,tileSize-2,tileSize-2);
        }else if(map[y][x]==13){
          context.drawImage(itemImage1,x*tileSize+1,y*tileSize+1,tileSize-2,tileSize-2);
        }else if(map[y][x]==14){
          context.drawImage(itemImage2,x*tileSize+1,y*tileSize+1,tileSize-2,tileSize-2);
        }else{
          context.fillStyle="rgba(255,255,255,1)";
          context.fillRect(x*tileSize+1,y*tileSize+1,tileSize-2,tileSize-2);
        }
      }
    }
    context.fillStyle="rgba(0,0,0,1)";
    context.restore();
  },100);
}
