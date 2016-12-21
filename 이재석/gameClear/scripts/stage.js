var stage = [
    function() {
        console.log("stage 1");
        fadeOut();

        setTimeout(function() {
            fadeIn();
            Button.list = [];
            Background.list = [];

            var gameClearBtn = Button(gameClearImg, 0, 0, 800, 600, 400, 150, 800, 600, stageScreen);
        }, 500);
    },
    function() {
        console.log("stage 2");

    },
    function() {
        console.log("stage 3");

    }
]

var stageScreen = function() {
    console.log("Game Start Button Clicked");
    fadeOut();
    setTimeout(function() {
        fadeIn();
        buttonClicked = false;
        Button.list = [];
        Background.list = [];
        var logo = Button(logoImg, 0, 0, 800, 600, 400, 0, 800, 600, function() {});
        for (var i = 0; i < 3; i++) {
            var b = Button(stagesImg, (i % 2) * 200, Math.floor(i / 2) * 200, 200, 200, (i * 300) + 400, 450, 200, 200, stage[i]);
        }
    }, 500);
};
