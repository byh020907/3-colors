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
