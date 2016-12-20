var audio = function(src, startTime, volume, onOff) {
    var a = new Audio();
    a.src = src;
    a.currentTime = startTime;
    a.volume = volume;

    sounds.push([onOff, a]);
    return [onOff, a];
}

var sounds = [];
