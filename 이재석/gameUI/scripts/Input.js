"use strict"
window.addEventListener("keydown", keyDown, false);
window.addEventListener("keyup", keyUp, false);
window.addEventListener("mousedown", mouseDown, false);
window.addEventListener("mouseup", mouseUp, false);
window.addEventListener("mousemove", mouseMove, false);

var keyInput = [];

var lastColor = Color.RED;

function keyDown(e) {
    keyInput[e.keyCode] = true;

    if (keyInput[49]) {
        if (lastColor != Color.RED) {
            colorChange(Color.RED);
            fadeIn("rgba(255,0,0,0.2)");
            lastColor = Color.RED;
        }
    }
    if (keyInput[50]) {
        if (lastColor != Color.GREEN) {
            colorChange(Color.GREEN);
            fadeIn("rgba(0,255,0,0.2)");
            lastColor = Color.GREEN;
        }
    }
    if (keyInput[51]) {
        if (lastColor != Color.BLUE) {
            colorChange(Color.BLUE);
            fadeIn("rgba(0,0,255,0.2)");
            lastColor = Color.BLUE;
        }
    }
}

function keyUp(e) {
    keyInput[e.keyCode] = false;
}

function mouseDown(e) {
    switch (e.which) {
        case 1:
            switch (gameCounter) {
                case 0:
                    for (var i = 0; i < Background.list.length; i++) {
                        Background.list[i].click();
                    };
                    break;
                case 1:
                    for (var i = 0; i < Button.list.length; i++) {
                        if (buttonClicked) {
                            buttonClicked = false;
                            break;
                        } else {
                            Button.list[i].click();
                        }
                    };
                    break;
            }
            break;
        case 2:
            break;
        case 3:
            break;
    }
}

function mouseUp(e) {

}

function mouseMove(e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
}
