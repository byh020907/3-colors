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
var gameOverImg = new Image();
gameOverImg.src = "images/gameOver.png";

var mouseX = 0;
var mouseY = 0;
var gameCounter = 0;
var buttonClicked = false;
var bgFadeAlpha = 0;
var fading = false;
var fadeCount = 0;

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

var fadeIn = function() {
    console.log("페이드 인 시작");
    fadeCount++;
    fading = true;

    bgFadeAlpha = 0.001;
    var fadeI = setInterval(
        function() {
            bgFadeAlpha *= 1.1;
            if (bgFadeAlpha >= 1) {
                clearInterval(fadeI);
                console.log("페이드 인 끝");
                fading = false;
            }
        }, 10
    );
};
