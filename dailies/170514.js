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
// context.clear("black");
context.canvas.style.backgroundColor = "black";
context.globalCompositeOperation = "destination-over";


var points = [];

var mainAngle = 0;
var angle;
var p;
var radius = 20;

init();

function init() {
    context.fillStyle = bitlib.color.hsv(radius * 2, 1, 1);
    angle = mainAngle;
    mainAngle += 0.01;
    if(angle > Math.PI * 2) {
        mainAngle = angle = 0;
        radius *= 1.5;
    }
    p = {
        x: width / 2 + Math.cos(angle) * radius,
        y: height / 2 + Math.sin(angle) * radius,
        r: 1
    };
    draw(p);
    points.push(p);
}

var anim = bitlib.anim(update).start();

function update() {
    angle += bitlib.random.float(-0.1, 0.1);

    var r = p.r * 1.08;
    p1 = {
        x: p.x + Math.cos(angle) * (p.r + r * 1.5),
        y: p.y + Math.sin(angle) * (p.r + r * 1.5),
        r: r
    };

    if(!check(p1)) {
        init();
    }
    else {
        points.push(p1);
        draw(p1);
        p = p1;
    }
}

function draw(p) {
    context.fillCircle(p.x, p.y, p.r);
}

function check(p) {
    if(p.x - p.r > width || p.x + p.r < 0 || p.y - p.r > height || p.y + p.r < 0) {
        return false;
    }
    for(var i = 0; i < points.length; i++) {
        if(bitlib.math.dist(p, points[i]) < p.r + points[i].r) {
            return false;
        }
    }
    return true;
}