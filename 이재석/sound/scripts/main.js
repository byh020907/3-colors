function UI(x, y, width, height) {
    var self = {};
    self.x = x;
    self.y = y;
    self.width = width;
    self.height = height;

    return self;
}

function init() {
    var canvas = document.getElementById("screen");
    var canvasCtx = canvas.getContext("2d");
    //�ҽ�����, ���۽ð�(��), ����(0~1), �Ҹ�����
    audio("audio/startAudio.mp3", 30);
    audio("audio/crashAudio.mp3", 0);
    audio("audio/gameOverAudio.mp3", 0);

    fadeIn();
    var background = Background(bgImg, canvas, function() {
        console.log("Background Clicked");
        sounds[0].onOff = false;
        fadeOut();
        setTimeout(function() {
            fadeIn();
            var b = Background(bgImgBW, canvas, function() {});
            var gameStartBtn = Button(gameStartImg, 0, 0, 200, 200, (canvas.width / 2) - 100, (canvas.height / 2) + 100, 200, 200, stageScreen);
        }, 500);
    });
    var logo = Button(logoImg, 0, 0, 800, 600, 400, 0, 800, 600, function() {});

    loop();

    function loop() {
        canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

        canvasCtx.globalAlpha = bgFadeAlpha;
        for (var i = 0; i < Background.list.length; i++) {
            Background.list[i].draw(canvasCtx);
        }
        for (var i = 0; i < Button.list.length; i++) {
            Button.list[i].draw(canvasCtx);
        }

        for (var i = 0; i < sounds.length; i++) {
            if (sounds[i].onOff) {
                sounds[i].audio.play();
            } else {
                sounds[i].audio.pause();
            }
        }

        requestAnimationFrame(loop);
    }
}
