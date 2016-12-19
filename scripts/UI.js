"use strict"
function UI(x, y, width, height) {
    var self = {};
    self.x = x;
    self.y = y;
    self.width = width;
    self.height = height;

    return self;
}

function Button(image, imgX, imgY, imgWidth, imgHeight, x, y, width, height, func) {
    var self = UI(x, y, width, height);
    self.rotate = 0;
    self.image = image;
    self.func = func;
    self.toggle = true;

    self.draw = function(context) {
        context.save();
        context.translate(self.x + self.width / 2, self.y + self.height / 2);
        context.rotate(this.rotate * Math.PI / 180);
        context.drawImage(self.image, imgX, imgY, imgWidth, imgHeight, -self.width / 2, -self.height / 2, self.width, self.height);
        context.restore();
    }

    self.click = function() {
        if (self.toggle && self.x < window.mouseX && window.mouseX < self.x + self.width &&
            self.y < window.mouseY && window.mouseY < self.y + self.height) {
            self.func();
        }
    }

    fadeIn();
    Button.list.push(self);
    return self;
}

Button.list = [];

function Background(image, canvas, func) {
    var self = UI(0, 0, canvas.width, canvas.height);
    self.image = image;
    self.rotate = 0;
    self.func = func;

    self.draw = function(context) {
        context.save();
        context.translate(canvas.width / 2, canvas.height / 2);
        context.rotate(this.rotate * Math.PI / 180);
        context.drawImage(self.image, 0, 0, self.image.width, self.image.height, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
        context.restore();
    }

    self.click = function() {
        self.func();
        gameCounter = 1;
    }

    fadeIn();
    Background.list.push(self);
    return self;
}

Background.list = [];
