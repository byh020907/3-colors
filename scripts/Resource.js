"use strict"
//색
var Color = {
    RED: 1,
    GREEN: 2,
    BLUE: 3,
}
var currentColor = Color.RED;

//남은게임시간
var currentRemainTime = 10;

//그리는 영역경계
var drawArea = 100;

var gameLoopEnable = true;
var drawLoopEnable = true;
var mainLoopEnable = true;
var currentState = 0;
var State = {
    LOBBY: 0,
    STAGE1: 1,
    STAGE2: 2,
    STAGE3: 3,
    STAGE4: 4,
    STAGE5: 5,
    STAGE6: 6,
    STAGE7: 7,
};
//재석이변수
var mouseX = 0;
var mouseY = 0;
var gameCounter = 0;
var buttonClicked = false;
var bgFadeAlpha = 0;
var fading = false;
var fadeCount = 0;

var fadeColor = "rgba(255,255,255,0)";

var charImage0 = new Image();
charImage0.src = "images/플레이어.png";

var mobImage0 = new Image();
mobImage0.src = "images/일반몹.png";

var mobImage1 = new Image();
mobImage1.src = "images/빨간몹.png";

var mobImage2 = new Image();
mobImage2.src = "images/초록몹.png";

var mobImage3 = new Image();
mobImage3.src = "images/파란몹.png";

var obstacleImage0 = new Image();

var obstacleImage1 = new Image();
obstacleImage1.src = "images/하얀블럭.png";

var obstacleImage2 = new Image();
obstacleImage2.src = "images/빨간블럭.png";

var obstacleImage3 = new Image();
obstacleImage3.src = "images/초록블럭.png";

var obstacleImage4 = new Image();
obstacleImage4.src = "images/파란블럭.png";

var obstacleImage5 = new Image();
obstacleImage5.src = "images/회색블럭.png";

var finishImage = new Image();
finishImage.src = "images/끝.jpg";

var itemImage0 = new Image();
itemImage0.src = "images/체력회복아이템.png";

var itemImage1 = new Image();
itemImage1.src = "images/시간증가아이템.png";

var itemImage2 = new Image();
itemImage2.src = "images/스턴아이템.png";

var stunEffectImage = new Image();
stunEffectImage.src = "images/스턴이미지.png";


//tutorialImage

var howtoImage = new Image();
howtoImage.src = "images/howto.png";

var tutorialImage0 = new Image();
tutorialImage0.src = "images/방향키.jpg";

var tutorialImage1 = new Image();
tutorialImage1.src = "images/블록.jpg";

var tutorialImage2 = new Image();
tutorialImage2.src = "images/몹.jpg";

var tutorialImage3 = new Image();
tutorialImage3.src = "images/아이템.jpg";

var tutorialImage4 = new Image();
tutorialImage4.src = "images/미니맵.jpg";


//재석이 이미지
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
var gameClearImg = new Image();
gameClearImg.src = "images/gameClear.png";

var audio = function(src, startTime, endTime, volume) {
    var a = new Audio();
    a.src = src;
    a.currentTime = startTime;
    a.autoplay = false;
    a.volume = volume;

    var self = {
        audio: a,
        onOff: false,
        endTime: endTime,
        isPlaying: false,
        loop: false
    }

    self.timePlay = function() {
        if (self.isPlaying == false) {
            self.audio.play();
            self.isPlaying = true;

            var playAudio = setInterval(function() {
                if (self.audio.currentTime >= self.endTime) {
                    if (self.loop) {
                        self.audio.currentTime = 0;
                        console.log("Audio Restarted");
                    } else {
                        self.onOff = false;
                        self.isPlaying = false;
                        clearInterval(playAudio);
                        console.log("Audio Stopped");
                        self.audio.currentTime = 0;
                    }
                }
            }, 100);
        }
    };

    sounds.push(self);
    return self;
}

var sounds = [];

// Audios
audio("audio/coinGetAudio.wav", 0, 0.3, 1); //0
audio("audio/crashAudio.mp3", 1, 5, 1); //1
audio("audio/hitAudio1.mp3", 0, 0.5, 1); //2
audio("audio/endingAudio.wav", 0, 45, 1); //3
sounds[3].loop = true;
audio("audio/gameOverAudio.mp3", 0, 270, 0.5); //4
sounds[4].loop = true;
audio("audio/gameStartAudio.mp3", 0, 5, 1); //5
audio("audio/gameWinAudio.mp3", 0, 3.6, 1); //6
sounds[6].loop = true;
audio("audio/healAudio.wav", 0, 0.1, 1); //7
audio("audio/inGameAudio1.mp3", 0, 134, 0.5); //8
sounds[8].loop = true;
audio("audio/inGameAudio2.mp3", 0, 69, 0.5); //9
sounds[9].loop = true;
audio("audio/inGameAudio3.mp3", 0, 180, 0.5); //10
sounds[10].loop = true;
audio("audio/startAudio.mp3", 0, 180, 0.8); //11
sounds[11].loop = true;
audio("audio/timeUpAudio.wav", 0, 0.6, 1); //12
audio("audio/dieAudio.mp3", 0, 7, 1); //13
audio("audio/hitAudio2.wav", 0, 0.1, 1); //14
audio("audio/colorChangeAudio.mp3", 0, 0.1, 1); //15


var stageScreen = function() {
    //console.log("Game Start Button Clicked");
    fadeOut();

    soundsClear();
    sounds[9].onOff = true;

    setTimeout(function() {
        fadeIn();
        buttonClicked = false;
        Button.list = [];
        Background.list = [];
        var b = Background(bgImgBW, canvas, function() {});
        var logo = Button(logoImg, 0, 0, 800, 600, 400, 0, 800, 600, function() {});
        for (var i = 0; i <= 3; i++) {
            var b = Button(stagesImg, (i % 2) * 200, Math.floor(i / 2) * 200, 200, 200, (i * 300) + 250, 450, 200, 200, (function(a) {
                return function() {
                    currentState = State["STAGE" + (1 + a)];
                    selectState(currentState);
                }
            }(i)));
        }
    }, 500);
};
