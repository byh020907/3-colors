"use strict"
function UI(x, y, width, height) {
    var self = {};
    self.x = x;
    self.y = y;
    self.width = width;
    self.height = height;

    return self;
}

function Button(image, imgX, imgY, imgWidth, imgHeight, x, y, width, height, func) {
    var self = UI(x, y, width, height);
    self.rotate = 0;
    self.image = image;
    self.func = func;
    self.toggle = true;

    self.draw = function(context) {
        context.save();
        context.translate(self.x + self.width / 2, self.y + self.height / 2);
        context.rotate(self.rotate * Math.PI / 180);
        context.drawImage(self.image, imgX, imgY, imgWidth, imgHeight, -self.width / 2, -self.height / 2, self.width, self.height);
        context.restore();
    }

    self.click = function() {
        if (self.toggle && self.x < window.mouseX && window.mouseX < self.x + self.width &&
            self.y < window.mouseY && window.mouseY < self.y + self.height) {
            self.func();
        }
    }

    fadeIn();
    Button.list.push(self);
    return self;
}

Button.list = [];

function Background(image, canvas, func) {
    var self = UI(0, 0, canvas.width, canvas.height);
    self.image = image;
    self.rotate = 0;
    self.func = func;

    self.draw = function(context) {
        context.save();
        context.translate(canvas.width / 2, canvas.height / 2);
        context.rotate(self.rotate * Math.PI / 180);
        context.drawImage(self.image, 0, 0, self.image.width, self.image.height, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
        context.restore();
    }

    self.click = function() {
        self.func();
        gameCounter = 1;
    }

    fadeIn();
    Background.list.push(self);
    return self;
}

Background.list = [];

var TextField=function(text,font,color,x,y,width){
  var self=UI(x, y, width,0);
  self.rotate=0;
  self.text=text;
  self.font=font;
  self.color=color;

  self.draw = function(context) {
    context.save();
    context.rotate(self.rotate * Math.PI / 180);
    context.font=self.font;
    context.fillStyle=self.color;
    context.fillText(self.text,self.x,self.y,self.width);
    context.restore();
  }

  TextField.list.push(self);
  return self;
}

TextField.list=[];

var MiniMap=function(x,y,width,height){
  var self=UI(x,y,width,height);
  self.rotate=0;

  self.draw = function(context) {
    context.save();
    context.translate(self.x + self.width / 2, self.y + self.height / 2);
    context.rotate(self.rotate * Math.PI / 180);
    context.fillStyle="rgba(20,20,20,1)";
    context.fillRect(-self.width / 2, -self.height / 2, self.width, self.height);
    self.setLocation(context);
    context.restore();
  }

  self.setLocation=function(context){
    context.fillStyle="yellow";
    //user
    if(user!=null&&fieldMap!=null){
      context.fillRect(-self.width/2+self.width*(user.x)/(fieldMap.width*fieldMap.tileSize),-self.height/2+self.height*(user.y)/(fieldMap.height*fieldMap.tileSize),5,5);
    }

    //Tile(grayBlock,finishpoint)
    for(var i in Tile.list){
      var t=Tile.list[i];
      if(fieldMap!=null){
        if(t.miniMapEnable){
          context.fillStyle="gray";
          var tileSizeX=self.width/fieldMap.width;
          var tileSizeY=self.height/fieldMap.height;
          context.fillRect(-self.width/2+self.width*(t.x)/(fieldMap.width*fieldMap.tileSize),-self.height/2+self.height*(t.y)/(fieldMap.height*fieldMap.tileSize),tileSizeX,tileSizeY);
        }else if(t.tileId==11){
          context.fillStyle="green";
          context.fillRect(-self.width/2+self.width*(t.x)/(fieldMap.width*fieldMap.tileSize),-self.height/2+self.height*(t.y)/(fieldMap.height*fieldMap.tileSize),5,5);
        }
      }
    }
  }

  return self;
}
