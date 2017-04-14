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

var hue = bitlib.random.int(360);
var bg = bitlib.color.hsv(hue, 0.25, 1);
var fg = bitlib.color.hsv(hue, 0.75, 1);
var dragging,
    offsetX = 0,
    offsetY = 0;

context.clear(bg);



var c0 = {
    x:  width / 2 - 100,
    y:  height / 2 - 50,
    r:  100
};

var c1 = {
    x: width / 2 + 100,
    y: height / 2 + 50,
    r: 140
};


panel
    .addRange("radius A", 10, 500, c0.r, 1, function(value) {
        c0.r = value;
        update();
    })
    .addRange("radius B", 10, 500, c1.r, 1, function(value) {
        c1.r = value;
        update();
    })

context.canvas.addEventListener("mousedown", onMouseDown);

function onMouseDown(event) {
    if(bitlib.math.dist(c0.x, c0.y, event.clientX, event.clientY) < c0.r) {
        dragging = c0;
        offsetX = event.clientX - c0.x;
        offsetY = event.clientY - c0.y;
    }
    else if(bitlib.math.dist(c1.x, c1.y, event.clientX, event.clientY) < c1.r) {
        dragging = c1;
        offsetX = event.clientX - c1.x;
        offsetY = event.clientY - c1.y;
    }
    if(dragging) {
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    }
}

function onMouseMove(event) {
    dragging.x = event.clientX - offsetX;
    dragging.y = event.clientY - offsetY;
    update();
}

function onMouseUp(event) {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
    dragging = null;
}


update();

function update() {
    context.clear(bg);

    context.fillStyle = fg;
    drawCircle(c0);
    drawCircle(c1);
    context.strokeCircle(c0.x, c0.y, c0.r);
    context.strokeCircle(c1.x, c1.y, c1.r);

    var points = circleIntersectPoints(c0, c1);
    if (points.length === 1) {
        context.fillStyle = "red";
        context.fillCircle(points[0].x, points[0].y, 5);
    }
    else if (points.length === 2) {
        context.fillStyle = "black";
        context.fillCircle(points[0].x, points[0].y, 5);
        context.fillCircle(points[1].x, points[1].y, 5);
    }
}

function circleIntersectPoints(c0, c1) {
    var dx = c1.x - c0.x,
        dy = c1.y - c0.y,
        a2 = dx * dx + dy * dy,
        a = Math.sqrt(a2),
        b = c0.r,
        c = c1.r;
    if(a > b + c) {
        return [];
    }
    if(a === b + c) {
        var ratio = b / a;
        return [{
            x: c0.x + dx * ratio,
            y: c0.y + dy * ratio
        }]
    }
    var b2 = b * b,
        c2 = c * c,
        t0 = Math.atan2(dy, dx),
        t1 = Math.acos((c2 - a2 - b2) / (-2 * a * b));
    return [{
        x: c0.x + Math.cos(t0 + t1) * b,
        y: c0.y + Math.sin(t0 + t1) * b
    },
        {
            x: c0.x + Math.cos(t0 - t1) * b,
            y: c0.y + Math.sin(t0 - t1) * b
        }];
}



function drawCircle(c) {
    context.globalAlpha = 0.5;
    context.fillCircle(c.x, c.y, c.r);
    context.globalAlpha = 1;
}