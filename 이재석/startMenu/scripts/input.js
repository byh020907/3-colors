window.addEventListener("load", init, false);
window.addEventListener("mousedown", mouseDown, false);
window.addEventListener("mousemove", mouseMove, false);

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

function mouseMove(e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
}
