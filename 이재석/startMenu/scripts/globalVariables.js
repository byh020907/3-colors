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

var mouseX = 0;
var mouseY = 0;
var gameCounter = 0;
var buttonClicked = false;
var bgFadeAlpha = 0;
var fading = false;
var fadeIn = function() {
    if (fading) {
        fading = false;
    } else {
        console.log("페이드 시작");
        bgFadeAlpha = 0;
        var fade = setInterval(
            function() {
                bgFadeAlpha += 0.01;
                if (bgFadeAlpha >= 1) {
                    clearInterval(fade);
                    console.log("페이드 끝");
                }
            }, 10
        );
    }
};
