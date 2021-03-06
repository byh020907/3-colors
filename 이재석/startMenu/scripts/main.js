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
    var background = Background(bgImg, canvas, function() {
        console.log("Background Clicked");
        var b = Background(bgImgBW, canvas, function() {});
        var gameStartBtn = Button(gameStartImg, 0, 0, 200, 200, (canvas.width / 2) - 100, (canvas.height / 2) + 100, 200, 200, function() {
            console.log("Game Start Button Clicked");
            buttonClicked = true;
            Button.list = [];
            Background.list = [];
            var logo = Button(logoImg, 0, 0, 800, 600, 400, 0, 800, 600, function() {});
            for (var i = 0; i < 3; i++) {
                var b = Button(stagesImg, (i % 2) * 200, Math.floor(i / 2) * 200, 200, 200, (i * 300) + 400, 450, 200, 200, stage[i]);
            }
        });
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

        requestAnimationFrame(loop);
    }
}
