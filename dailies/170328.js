/*
 Copyright 2017 Keith Peters

 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
 rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit
 persons to whom the Software is furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
 Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var context = bitlib.context(0, 0),
    width = context.width,
    height = context.height;

context.fillStyle = "white";
context.lineWidth = 0.5;


var engine = {
    x: 200,
    y: 0,
    r: 50,
    r2: 40,
    a: 0,
    speed: -0.05,
    px: 240,
    py: 0
};


var fulcrum = {
    x: 0,
    y: 0,
    a: 0
};

var rod = {
    x: 240,
    y: 0,
    a: 0,
    length: 450,
    px: -160,
    py: 0
};

var lever = {
    x: -200,
    y: 200,
    a: Math.PI / 2 ,
    length: 350
};

var platform = {
    x:  -200,
    y: -100,
    length: 200
};


panel
    .bindRange("speed", -1, 1, engine.speed, 0.01, engine)
    .addRange("radius", 40, 100, engine.radius, 1, function(value) {
        engine.r = value;
        engine.r2 = value - 10;
    })
    .addRange("rod length", 330, 450, rod.length, 1, function(value) {
        rod.length = value;
    })


bitlib.anim(update).start();

function update() {
    context.clear();
    context.save();
    context.translate(width / 2, height / 2);
    
    updateEngine();
    updateFulcrum();
    updateRod();
    updateLever();
    updatePlatform();
    
    drawBG();
    
    drawPlatform();
    drawLever();
    drawEngine();
    drawRod();
    drawFulcrum();
    
    context.restore();
}

function drawBG() {
    context.beginPath();
    context.moveTo(-width / 2 , 220);
    context.lineTo(width / 2, 220);
    context.stroke();
    
    context.strokeRect(engine.x - 25, engine.y, 50, 220);
    context.beginPath();
    context.arc(lever.x, lever.y + 20, 40, 0, Math.PI, true);
    context.closePath();
    context.stroke();
    
    context.strokeRect(fulcrum.x - 10, fulcrum.y, 20, 220);
    
    // context.strokeRect(-380, 220, 10, -620);
    // context.strokeRect(-370, -104, 10, 20);
}

function updateEngine() {
    engine.a += engine.speed;
    engine.px = engine.x + Math.cos(engine.a) * engine.r2;
    engine.py = engine.y + Math.sin(engine.a) * engine.r2;
}

function drawEngine() {
    context.save();
    context.translate(engine.x, engine.y);
    context.rotate(engine.a);
    context.beginPath();
    context.circle(0, 0, engine.r);
    context.fill();
    context.stroke();
    context.strokeCircle(0, 0, 10);
    context.restore();
}

function updateFulcrum() {
    var dx = engine.px - fulcrum.x,
        dy = engine.py - fulcrum.y;
    fulcrum.a = Math.atan2(dy, dx);
}

function drawFulcrum() {
    context.save();
    context.translate(fulcrum.x, fulcrum.y);
    context.rotate(fulcrum.a);
    
    context.beginPath();
    context.rect(-20, -10, 40, 20);
    context.fill();
    context.stroke();
    
    context.beginPath();
    context.circle(0, 0, 5);
    context.fill();
    context.stroke();
    
    context.restore();
}

function updateRod() {
    rod.a = fulcrum.a;
    rod.x = engine.px;
    rod.y = engine.py;
    rod.px = rod.x - Math.cos(rod.a) * rod.length;
    rod.py = rod.y - Math.sin(rod.a) * rod.length;
}

function drawRod() {
    context.save();
    context.translate(rod.x, rod.y);
    context.rotate(rod.a);
    context.beginPath();
    context.rect(-rod.length - 10, -8, rod.length + 20, 16);
    context.fill();
    context.stroke();
    context.restore();
    
    context.strokeCircle(rod.x, rod.y, 5);
    context.strokeCircle(rod.px, rod.py, 5);
}

function updateLever() {
    var dx = lever.x - rod.px,
        dy = lever.y - rod.py;
    lever.a = Math.atan2(dy, dx);
    lever.px = lever.x - Math.cos(lever.a) * lever.length;
    lever.py = lever.y - Math.sin(lever.a) * lever.length;
    console.log(lever.px, lever.py);
}

function drawLever() {
    context.save();
    context.translate(lever.x, lever.y);
    context.rotate(lever.a);
    context.beginPath()
    context.rect(-lever.length - 10, -8, lever.length + 20, 16);
    context.fill();
    context.stroke();
    context.strokeRect(-lever.length + 10, -4, lever.length - 40, 8);
    context.restore();
    
    context.strokeCircle(lever.x, lever.y, 5);
    context.strokeCircle(lever.px, lever.py, 5);
}

function updatePlatform() {
    platform.x = lever.px;
    platform.y = lever.py;
}

function drawPlatform() {
    context.strokeRect(platform.x - platform.length / 2, platform.y - 8, platform.length, 16);
}