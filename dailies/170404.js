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






var points = [];

var c0 = {
    x: width / 2 - 300,
    y: 100,
    r: 100,
    a: 0,
    phase: 0,
    speed: 0.017
};

var c1 = {
    x: width / 2 + 200,
    y: height  - 200,
    r: 200,
    a: 0,
    phase: 0,
    speed: 0.023
};

var pencilLength = 250,
    lineLength = 100;

panel
    .addRange("c0.radius", 40, 300, c0.r, 1, function(value) {
        c0.r = value;
    })
    .addRange("c0.speed", 0, 0.1, c0.speed, 0.001, function(value) {
        c0.speed = value;
    })
    .addRange("c1.radius", 40, 300, c1.r, 1, function(value) {
        c1.r = value;
    })
    .addRange("c1.speed", 0, 0.1, c1.speed, 0.001, function(value) {
        c1.speed = value;
    })
    .addRange("arm length", 0, 500, pencilLength, 1, function(value) {
        pencilLength = value;
    })
    .addRange("line length", 20, 1000, lineLength, 1, function(value) {
        lineLength = value;
    })
    .addButton("Clear", function() {
        points = [];
    })
    .setGlobalChangeHandler(function() {
        points = []
    });

var dragging,
    offsetX,
    offsetY;

document.addEventListener("mousedown", function(event) {
    var hit = false;
    if(bitlib.math.dist(event.clientX, event.clientY, c0.x, c0.y) < c0.r) {
        dragging = c0;
        offsetX = event.clientX - c0.x;
        offsetY = event.clientY - c0.y;
        hit = true;
    }
    if(bitlib.math.dist(event.clientX, event.clientY, c1.x, c1.y) < c0.r) {
        dragging = c1;
        offsetX = event.clientX - c1.x;
        offsetY = event.clientY - c1.y;
        hit = true;
    }
    if(hit) {
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    }
});

function onMouseMove(event) {
    dragging.x = event.clientX - offsetX;
    dragging.y = event.clientY - offsetY;
    points = [];
}

function onMouseUp(event) {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
}

bitlib.anim(update).start();

function update() {
    context.clear();
    context.strokeStyle = "black";
    updateCircle(c0);
    updateCircle(c1);
    drawCircle(c0);
    drawCircle(c1);
    var p0 = getPoint(c0),
        p1 = getPoint(c1),
        p3 = {
            x: (p0.x + p1.x) / 2,
            y: (p0.y + p1.y) / 2
        },
        angle = Math.atan2(p1.y - p0.y, p1.x - p0.x);// + Math.PI / 2;
    
    drawBar(p0, p1, angle);
    
    drawMidLine(angle, p3);
    
    points.push({
        x: p3.x + Math.cos(angle - Math.PI / 2) * pencilLength,
        y: p3.y + Math.sin(angle - Math.PI / 2) * pencilLength
    });
    if(points.length > lineLength) {
        points.shift();
    }
    drawPath();
    
}

function drawBar(p0, p1, angle) {
    context.save();
    context.translate(p0.x, p0.y);
    var dist = bitlib.math.dist(p0, p1);
    context.rotate(angle);
    context.beginPath();
    context.rect(-10, -10, dist + 20, 20);
    context.fill();
    context.stroke();
    context.restore();
    
    context.strokeCircle(p0.x, p0.y, 5);
    context.strokeCircle(p1.x, p1.y, 5);
}

function drawMidLine(angle, p3) {
    context.save();
    context.translate(p3.x, p3.y);
    context.rotate(angle);
    context.beginPath();
    context.rect(-10, 10, 20, -pencilLength - 20);
    context.fill();
    context.stroke();
    context.strokeCircle(0, 0, 5);
    context.strokeCircle(0, -pencilLength, 5);
    context.restore();
}

function drawPath() {
    context.strokeStyle = "red";
    context.beginPath();
    for(var i = 0; i < points.length; i++) {
        context.lineTo(points[i].x, points[i].y);
    }
    context.stroke();
}

function getPoint(c) {
    return {
        x: c.x + Math.cos(c.a) * (c.r - 10),
        y: c.y + Math.sin(c.a) * (c.r - 10)
    }
}

function updateCircle(c) {
    c.phase += c.speed;
    c.a = Math.sin(c.phase) * Math.PI;
}

function drawCircle(c) {
    context.save();
    context.translate(c.x, c.y);
    context.rotate(c.a);
    context.strokeCircle(0, 0, c.r);
    context.strokeCircle(0, 0, 20);
    context.restore();
}
