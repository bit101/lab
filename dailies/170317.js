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

context.lineWidth = 0.15;
context.setShadow("rgba(0,0,0,0.3)", 2, 5, 5);
context.clear("black");
var points = [];

var num = 60,
    curl = 0.01,
    damp = 0.99,
    shrinkage = 0.01,
    radius = 80,
    minSize = 2,
    maxSize = 20,
    speed = 2,
    hueA = 0,
    hueB = 90;
// TODDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDO: make some sliderrrs


document.addEventListener("click", function() {
    context.clear("black");
    makePoints();
});

makePoints();

function makePoints() {
    points = [];
    for(var i = 0; i < num; i++) {
        var angle = i / num * Math.PI * 2;
        points.push(makePoint(angle));
    }
}
function makePoint(angle) {
    return {
        x: width / 2 + Math.cos(angle) * radius,
        y: height / 2 + Math.sin(angle) * radius,
        radius: bitlib.random.float(minSize, maxSize),
        angle: angle,
        vr: 0,
        color: bitlib.color.hsv(bitlib.random.int(hueA, hueB), 1, 1)
    };
}
bitlib.anim(update).start();

function update() {
    for(var i = 0; i < num; i++) {
        var point = points[i];
        context.fillStyle = point.color;
        context.fillCircle(point.x, point.y, point.radius);
        context.strokeCircle(point.x, point.y, point.radius);
        point.x += Math.cos(point.angle) * speed;
        point.y += Math.sin(point.angle) * speed;
        point.vr += bitlib.random.float(-curl, curl);
        point.angle += point.vr;
        point.vr *= damp;
        point.radius -= shrinkage;
        if(point.radius < speed / 2 ||
            point.x < 0 ||
            point.x > width ||
            point.y < 0 ||
            point.y > height) {
            points.splice(i, 1, makePoint(point.angle));
        }
    }
}

