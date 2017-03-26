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



var num = 48,
    max = 300,
    lineWidth = 0.25;


panel
    .addRange("resolution", 12, 200, num, 1, function(value) {
        num = value;
    })
    .addRange("lineWidth", 0.1, 1, lineWidth, 0.01, function(value) {
        lineWidth = value;
    })

var points = [];
var lastPoint = null;

for(var y = 0; y < height; y++) {
    points.push(150 + Math.sin(y * 0.05) * 25);
}

var offset = 0,
    speed = 0.01;
bitlib.anim(update).start();

function update() {
    context.clear("#cccccc");
    context.lineWidth = lineWidth;
    context.save();
    context.translate(width / 2, 0);
    for(var i = 0; i < num; i++) {
        var angle = i / num * Math.PI;
        context.save();
        context.scale(Math.cos((angle + offset) % Math.PI),1);
        context.beginPath();
        for(var j = 0; j < points.length; j++) {
            context.lineTo(points[j], j);
        }
        context.stroke();
        context.restore();
    }

    context.beginPath();
    for(var j = 0; j < points.length; j++) {
        context.lineTo(points[j], j);
    }
    context.stroke();

    context.save();
    context.beginPath();
    context.scale(-1, 1);
    for(var j = 0; j < points.length; j++) {
        context.lineTo(points[j], j);
    }
    context.stroke();
    context.restore();

    offset += speed;
    context.restore();

    context.fillStyle = "white";
    context.fillRect(width - max, 0, max, height);
    context.fillStyle = "#999999";

    context.lineWidth = 0.5;
    context.beginPath();
    context.moveTo(width - max, 0);
    for(var i = 0; i < points.length; i++) {
        context.lineTo(width - max + points[i], i);
    }
    context.lineTo(width - max, height);
    context.closePath();
    context.fill();
    context.stroke();
}

document.addEventListener("mousedown", function(event) {
    if(event.clientX > width - max) {
        var x = event.clientX - width + max;
        points[event.clientY] = x;
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
        lastPoint = {
            x: x,
            y: event.clientY
        };
    }
});

function onMouseMove(event) {
    var x = Math.max(event.clientX - width + max, 5);
    if(event.clientY > lastPoint.y) {
        for(var y = lastPoint.y; y <= event.clientY; y++) {
            points[y] = bitlib.math.map(y, lastPoint.y, event.clientY, lastPoint.x, x);
        }
    }
    else {
        for(var y = lastPoint.y; y >= event.clientY; y--) {
            points[y] = bitlib.math.map(y, lastPoint.y, event.clientY, lastPoint.x, x);
        }
    }
    lastPoint = {
        x: x,
        y: event.clientY
    };
}

function onMouseUp(event) {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
}