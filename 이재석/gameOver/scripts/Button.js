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

    Button.list.push(self);
    return self;
}

Button.list = [];
