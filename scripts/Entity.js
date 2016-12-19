"use strict"

var Entity=function(img){
  var self={
    image:img,
    id:Math.random(),
    toRemove:false,
    x:0,
    y:0,
    px:0,
    py:0,
    nx:0,
    ny:0,
    width:100,
    height:100,
    speedX:0,
    speedY:0,
    accel:0.5,
    maxSpeed:10
  };

  self.draw=function(context){
    if(pivot.x-canvas.width/2-drawArea<self.x&&self.x<pivot.x+canvas.width/2+drawArea&&pivot.y-canvas.height/2-drawArea<self.y&&self.y<pivot.y+canvas.height/2+drawArea){
      context.save();
      context.translate(self.x-pivot.x+canvas.width/2,self.y-pivot.y+canvas.height/2);
      context.drawImage(self.image,-self.width/2,-self.height/2,self.width,self.height);
      context.restore();
    }
  }

  self.updateSpeed=function(){
    self.x+=self.speedX;
    self.y+=self.speedY;
    self.speedX*=0.95;
    self.speedY*=0.95;
  }
  Entity.list.push(self);
  return self;
}

Entity.list=[];

var Player=function(img){
  var self=Entity(img);

  self.width=80;
  self.height=80;
  self.maxHealth=100;
  self.currentHealth=100;

  self.draw=function(context){
    if(pivot.x-canvas.width/2-drawArea<self.x&&self.x<pivot.x+canvas.width/2+drawArea&&pivot.y-canvas.height/2-drawArea<self.y&&self.y<pivot.y+canvas.height/2+drawArea){
      context.save();
      context.translate(self.x-pivot.x+canvas.width/2,self.y-pivot.y+canvas.height/2);
      context.fillStyle="rgba(255,0,0,1)";
      context.fillRect(-self.width/2,-self.height/1.5,(self.currentHealth/self.maxHealth)*self.width,10);
      context.drawImage(self.image,-self.width/2,-self.height/2,self.width,self.height);
      context.restore();
    }
  }

  self.move=function(angle){

    if(Math.abs(self.speedX)<self.maxSpeed){
      self.speedX+=Math.cos(angle*Math.PI/180)*self.accel;
    }

    if(Math.abs(self.speedY)<self.maxSpeed){
      self.speedY+=Math.sin(angle*Math.PI/180)*self.accel;
    }
  }

  self.attacked=function(damage){
    if(self.currentHealth-damage>0){
      self.currentHealth-=damage;
    }else{
      self.toRemove=true;
    }
  }

  self.update=function(){
    self.px=self.x;
    self.py=self.y;
    self.updateSpeed();
    self.nx=self.x+self.speedX;
    self.ny=self.y+self.speedY;
  }
  return self;
}

var Mob=function(img){
  var self=Entity(img);
  self.width=80;
  self.height=80;
  self.damage=5;
  self.maxHealth=100;
  self.currentHealth=100;
  self.attackSpeed=1000;
  self.path=[];
  self.find=true;
  var i=1;
  var searchRange=10;
  var attackEnable=true;
  var ani=new animation(self.image,self.width,self.height,4,4);
  self.draw=function(context){
    if(pivot.x-canvas.width/2-drawArea<self.x&&self.x<pivot.x+canvas.width/2+drawArea&&pivot.y-canvas.height/2-drawArea<self.y&&self.y<pivot.y+canvas.height/2+drawArea){
      context.save();
      context.translate(self.x-pivot.x+canvas.width/2,self.y-pivot.y+canvas.height/2);
      ani.draw(context);
      ani.nextFrame();
      context.restore();
    }
  }

  self.attack=function(target){
    if(attackEnable){
      target.attacked(self.damage);
      attackEnable=false;
      setTimeout(function(){
        attackEnable=true;
      },self.attackSpeed);
    }
  }

  self.move=function(map,x,y){

    if(distance(self.x,self.y,x,y)<200){
      var angle=Math.atan2(y-self.y,x-self.x);
      self.speedX+=Math.cos(angle)*self.accel;
      self.speedY+=Math.sin(angle)*self.accel;
    }else{
      if(self.find){
        self.path=[];
        self.path=findPath(deepCopy(map),{x:Math.floor(self.x/100),y:Math.floor(self.y/100)},{x:Math.floor(x/100),y:Math.floor(y/100)});
        self.find=false;
        i=1;
      }
      if(i<self.path.length&&fieldMap!=null){
        var angle=Math.atan2(fieldMap.tiles[self.path[i].y][self.path[i].x].y-self.y,fieldMap.tiles[self.path[i].y][self.path[i].x].x-self.x);
        ani.changeDirection(directionToAngle(angle*180/Math.PI));
        self.speedX+=Math.cos(angle)*self.accel;
        self.speedY+=Math.sin(angle)*self.accel;
        if(fieldMap.tiles[self.path[i].y][self.path[i].x].x-searchRange<self.x&&self.x<fieldMap.tiles[self.path[i].y][self.path[i].x].x+searchRange&&fieldMap.tiles[self.path[i].y][self.path[i].x].y-searchRange<self.y&&self.y<fieldMap.tiles[self.path[i].y][self.path[i].x].y+searchRange){
          self.speedX=self.speedY=0;
          i++;
        }
      }
    }

  }
  self.update=function(){
    self.updateSpeed();
  }
  Mob.list[self.id]=self;
  return self;
}
Mob.list={};


var Tile=function(img,id,x,y,size){
  var self=Entity(img);
  self.x=x;
  self.y=y;
  self.tileId=id;
  self.width=self.height=size;

  self.draw=function(context){
    if(self.tileId!=0&&self.tileId!=1&&pivot.x-canvas.width/2-drawArea<self.x&&self.x<pivot.x+canvas.width/2+drawArea&&pivot.y-canvas.height/2-drawArea<self.y&&self.y<pivot.y+canvas.height/2+drawArea){
      context.save();
      context.translate(self.x-pivot.x+canvas.width/2,self.y-pivot.y+canvas.height/2);
      context.drawImage(self.image,-self.width/2,-self.height/2,self.width,self.height);
      context.restore();
    }
  }
  Tile.list[self.id]=self;
  return self;
}

Tile.list={};


var FieldMap=function(id,map){
  var self={
    id:id,
    map:map,
    tileSize:100,
    width:map.length,
    height:map[0].length,
    tiles:[]
  };
  for(var i=0;i<self.height;i++){
    self.tiles[i]=[];
  }

  for(var y=0;y<self.height;y++){
    for(var x=0;x<self.width;x++){
      var num=self.map[y][x];
      self.tiles[y][x]=Tile(window["obstacleImage"+num],num,x*self.tileSize+self.tileSize/2,y*self.tileSize+self.tileSize/2,self.tileSize);
    }
  }

  self.draw=function(context){
    context.drawImage(mapImage1,pivot.x-canvas.width/2,pivot.y-canvas.height/2,canvas.width,canvas.height,0,0,canvas.width,canvas.height);
    // for(var y=0;y<self.height;y++){
    //   for(var x=0;x<self.width;x++){
    //     if(pivot.x-drawArea-canvas.width/2<(x*self.tileSize+self.tileSize/2)&&(x*self.tileSize+self.tileSize/2)<pivot.x+drawArea+canvas.width/2&&
    //       pivot.y-drawArea-canvas.height/2<(y*self.tileSize+self.tileSize/2)&&(y*self.tileSize+self.tileSize/2)<pivot.y+drawArea+canvas.height/2){
    //         self.tiles[y][x].draw(context);
    //     }
    //   }
    // }
  }
  FieldMap.list[self.id]=self;
  return self;
}
FieldMap.list={};
