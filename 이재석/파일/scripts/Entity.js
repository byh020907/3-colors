"use strict"

var Entity = function(img) {
    var self = {
        image: img,
        id: Math.random(),
        toRemove: false,
        x: 0,
        y: 0,
        px: 0,
        py: 0,
        nx: 0,
        ny: 0,
        width: 100,
        height: 100,
        speedX: 0,
        speedY: 0,
        accel: 0.5,
        maxSpeed: 10,
        friction: 0.95
    };

    self.draw = function(context) {
        if (displayedWindow(self)) {
            context.save();
            context.translate(self.x - pivot.x + canvas.width / 2, self.y - pivot.y + canvas.height / 2);
            context.drawImage(self.image, -self.width / 2, -self.height / 2, self.width, self.height);
            context.restore();
        }
    }

    self.updateSpeed = function() {
        self.x += self.speedX;
        self.y += self.speedY;
        self.speedX *= self.friction;
        self.speedY *= self.friction;
    }
    Entity.list[self.id] = self;
    return self;
}

Entity.list = {};

var Player = function(img) {
    var self = Entity(img);

    self.width = 80;
    self.height = 80;
    self.maxHealth = 100;
    self.currentHealth = 100;

    var ani = new animation(self.image, self.width, self.height, 4, 4);

    self.draw = function(context) {
        if (displayedWindow(self)) {
            context.save();
            context.translate(self.x - pivot.x + canvas.width / 2, self.y - pivot.y + canvas.height / 2);
            context.fillStyle = "rgba(255,0,0,1)";
            context.fillRect(-self.width / 2, -self.height / 1.5, (self.currentHealth / self.maxHealth) * self.width, 10);
            ani.draw(context);
            ani.nextFrame(1000 / 30);
            context.restore();
        }
    }

    self.move = function(angle) {

        if (Math.abs(self.speedX) < self.maxSpeed) {
            self.speedX += Math.cos(angle * Math.PI / 180) * self.accel;
        }

        if (Math.abs(self.speedY) < self.maxSpeed) {
            self.speedY += Math.sin(angle * Math.PI / 180) * self.accel;
        }
        ani.changeDirection(directionToAngle("degree", angle));
    }

    self.attacked = function(damage) {
        if (self.currentHealth - damage > 0) {
            self.currentHealth -= damage;
        } else {
            self.toRemove = true;
        }
    }

    self.update = function() {
        self.px = self.x;
        self.py = self.y;
        self.updateSpeed();
        self.nx = self.x + self.speedX;
        self.ny = self.y + self.speedY;
    }
    return self;
}

var Mob = function(img) {
    var self = Entity(img);
    self.width = 80;
    self.height = 80;
    self.damage = 5;
    self.maxHealth = 100;
    self.currentHealth = 100;
    self.attackSpeed = 1000;
    self.path = [];
    self.find = true;

    self.interaction = true;
    self.stun = false;

    self.color = 0; //Color.RED:1,Color.GREEN:2,Color.BLUE:3

    var i = 1;
    var searchRange = 10;
    var attackEnable = true;
    var ani = new animation(self.image, self.width, self.height, 4, 4);
    self.draw = function(context) {
        if (self.interaction && displayedWindow(self)) {
            context.save();
            context.translate(self.x - pivot.x + canvas.width / 2, self.y - pivot.y + canvas.height / 2);
            ani.draw(context);
            ani.nextFrame(1000 / 30);
            if (self.stun) {
                context.drawImage(stunEffectImage, -self.width / 2 + 20, -self.height / 1.5, 35, 50);
            }
            context.restore();
        }
    }

    self.attack = function(target) {
        if (attackEnable) {
            target.attacked(self.damage);
            attackEnable = false;
            setTimeout(function() {
                attackEnable = true;
            }, self.attackSpeed);
        }
    }

    self.move = function(map, x, y) {
        if (self.interaction && !self.stun) {
            if (distance(self.x, self.y, x, y) < 200) {
                var angle = Math.atan2(y - self.y, x - self.x);
                self.speedX += Math.cos(angle) * self.accel;
                self.speedY += Math.sin(angle) * self.accel;
                ani.changeDirection(directionToAngle("radian", angle));
            } else {
                if (self.find) {
                    self.path = [];
                    self.path = findPath(deepCopy(map), {
                        x: Math.floor(self.x / 100),
                        y: Math.floor(self.y / 100)
                    }, {
                        x: Math.floor(x / 100),
                        y: Math.floor(y / 100)
                    });
                    self.find = false;
                    i = 1;
                }
                if (i < self.path.length && fieldMap != null) {
                    var angle = Math.atan2(fieldMap.tiles[self.path[i].y][self.path[i].x].y - self.y, fieldMap.tiles[self.path[i].y][self.path[i].x].x - self.x);
                    ani.changeDirection(directionToAngle("radian", angle));
                    self.speedX += Math.cos(angle) * self.accel;
                    self.speedY += Math.sin(angle) * self.accel;
                    if (fieldMap.tiles[self.path[i].y][self.path[i].x].x - searchRange < self.x && self.x < fieldMap.tiles[self.path[i].y][self.path[i].x].x + searchRange && fieldMap.tiles[self.path[i].y][self.path[i].x].y - searchRange < self.y && self.y < fieldMap.tiles[self.path[i].y][self.path[i].x].y + searchRange) {
                        self.speedX = self.speedY = 0;
                        i++;
                    }
                }
            }
        }

    }
    self.update = function() {
        if (self.color == 0 || self.color == currentColor) {
            self.interaction = true;
        } else {
            self.interaction = false;
        }
        self.updateSpeed();
    }
    Mob.list[self.id] = self;
    return self;
}
Mob.list = {};

var Item = function(img, func) {
    var self = Entity(img);

    self.draw = function(context) {
        if (displayedWindow(self)) {
            context.save();
            context.translate(self.x - pivot.x + canvas.width / 2, self.y - pivot.y + canvas.height / 2);
            context.drawImage(self.image, -self.width / 2, -self.height / 2, self.width, self.height);
            context.restore();
        }
    }

    self.get = function() {
        func();
        delete Item.list[self.id];
        delete Entity.list[self.id];
    }

    Item.list[self.id] = self;
    return self;
}

Item.list = {};


var Tile = function(img, id, x, y, size) {
    var self = Entity(img);
    self.x = x;
    self.y = y;
    self.tileId = id;
    self.width = self.height = size;
    if (2 <= self.tileId && self.tileId <= 4) {
        self.color = self.tileId - 1;
    }
    self.draw = function(context) {
        if ((self.color == null || self.color == currentColor) && self.tileId != 0 && self.tileId != 1 && displayedWindow(self)) {
            context.save();
            context.translate(self.x - pivot.x + canvas.width / 2, self.y - pivot.y + canvas.height / 2);
            context.drawImage(self.image, -self.width / 2, -self.height / 2, self.width, self.height);
            context.restore();
        }
    }
    Tile.list[self.id] = self;
    return self;
}

Tile.list = {};


var FieldMap = function(id, map) {
    var self = {
        id: id,
        map: map,
        tileSize: 100,
        width: map.length,
        height: map[0].length,
        tiles: []
    };
    for (var i = 0; i < self.height; i++) {
        self.tiles[i] = [];
    }

    for (var y = 0; y < self.height; y++) {
        for (var x = 0; x < self.width; x++) {
            var num = self.map[y][x];
            if (num <= 5) {
                self.tiles[y][x] = Tile(window["obstacleImage" + num], num, x * self.tileSize + self.tileSize / 2, y * self.tileSize + self.tileSize / 2, self.tileSize);
            } else if (6 <= num && num <= 9) {
                var m = Mob(window["mobImage" + (num - 6)]);
                m.color = num - 6;
                m.x = x * self.tileSize + self.tileSize / 2;
                m.y = y * self.tileSize + self.tileSize / 2;
                if (m.color == 0) {
                    m.accel = 0.3;
                } else {
                    m.accel = 1;
                    m.friction = 0.9;
                }
                self.tiles[y][x] = Tile(window["obstacleImage" + 0], 0, x * self.tileSize + self.tileSize / 2, y * self.tileSize + self.tileSize / 2, self.tileSize);
            } else if (10 <= num && num <= 11) {
                if (num == 10) {
                    user = Player(charImage0);
                    user.x = x * self.tileSize + self.tileSize / 2;
                    user.y = y * self.tileSize + self.tileSize / 2;
                    user.accel = 1;
                    user.friction = 0.8;
                    self.tiles[y][x] = Tile(window["obstacleImage" + 0], 0, x * self.tileSize + self.tileSize / 2, y * self.tileSize + self.tileSize / 2, self.tileSize);
                } else if (num == 11) {
                    self.tiles[y][x] = Tile(finishImage, num, x * self.tileSize + self.tileSize / 2, y * self.tileSize + self.tileSize / 2, self.tileSize);
                }
            } else if (12 <= num && num <= 14) {
                if (num == 12) {
                    var i = Item(window["itemImage" + (num - 12)], function() {
                        user.currentHealth = user.maxHealth;
                        //add
                        sounds[6].onOff = true;
                        //-----------
                    });
                } else if (num == 13) {
                    var i = Item(window["itemImage" + (num - 12)], function() {
                        currentRemainTime += 20;
                        //add
                        sounds[10].onOff = true;
                        //-----------
                    });
                } else if (num == 14) {
                    var i = Item(window["itemImage" + (num - 12)], function() {
                        //add
                        sounds[1].onOff = true;
                        //-----------
                        for (var i in Mob.list) {
                            var m = Mob.list[i];
                            m.stun = true;
                        }
                        setTimeout(function() {
                            for (var i in Mob.list) {
                                var m = Mob.list[i];
                                m.stun = false;
                            }
                        }, 3000);
                    });
                }

                i.x = x * self.tileSize + self.tileSize / 2;
                i.y = y * self.tileSize + self.tileSize / 2;
                i.width = 50;
                i.width = 50;
                self.tiles[y][x] = Tile(window["obstacleImage" + 0], 0, x * self.tileSize + self.tileSize / 2, y * self.tileSize + self.tileSize / 2, self.tileSize);
            }
        }
    }

    self.draw = function(context) {
        context.save();
        context.fillStyle = "rgba(0,0,0,1)";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.restore();
        //context.drawImage(mapImage1,pivot.x-canvas.width/2,pivot.y-canvas.height/2,canvas.width,canvas.height,0,0,canvas.width,canvas.height);
    }
    FieldMap.list[self.id] = self;
    return self;
}
FieldMap.list = {};
