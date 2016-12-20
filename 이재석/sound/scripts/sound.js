"use strict"
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
