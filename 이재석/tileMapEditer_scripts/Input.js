"use strict"
window.addEventListener("keydown",keyDown,false);
window.addEventListener("keyup",keyUp,false);
window.addEventListener("mousedown",mouseDown,false);
window.addEventListener("mouseup",mouseUp,false);
window.addEventListener("mousemove",mouseMove,false);

function keyDown(e){
  keyInput[e.keyCode]=true;
}

function keyUp(e){
  keyInput[e.keyCode]=false;
}

function mouseDown(e){
  clicked=true;
}

function mouseUp(e){
  clicked=false;
}

function mouseMove(e){
  selectedTilePosition={x:Math.floor(e.pageX/tileSize),y:Math.floor(e.pageY/tileSize)};
}
