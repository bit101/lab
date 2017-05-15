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

var circles = [];

var maxSize = 30;

panel.addRange("max radius", 5, 100, maxSize, 1, function(value) {
    maxSize = value;
    context.clear("black");
    circles = [];
    newCircle();
    anim.start();
});

var c = {
    x: width / 2,
    y: height / 2,
    r: 10
};

// context.setShadow(0.5, 2, 2, 3);
context.fillStyle = bitlib.color.hsv(bitlib.random.int(360), 1, 1);
context.clear("black");
drawCircle(c);
circles.push(c);

function drawCircle(c) {
    context.fillCircle(c.x, c.y, Math.max(c.r - 1, 0));
}

var closest = null;
var anim = bitlib.anim(update).start();

function update() {
    var c2 = {},
        tries = 0,
        minDist;
    do {
        var angle = bitlib.random.float(Math.PI * 2),
            dist = bitlib.random.float(c.r + 5, c.r + maxSize);
        c2.x = c.x + Math.cos(angle) * dist;
        c2.y = c.y + Math.sin(angle) * dist;
        minDist = check(c2);
        tries++;
    }
    while(minDist < 1 && tries < 100);

    if(minDist > 1) {
        c2.r = minDist - 1;
        drawCircle(c2);
        circles.push(c2);
        c = c2;
    }
    else {
        newCircle();
    }
    if(c.x > width || c.x < 0 || c.y > height || c.y < 0) {
        newCircle();
    }
}

function check(c2) {
    var minDist = 1000000;
    for(var i = 0; i < circles.length; i++) {
        var c1 = circles[i];
        var dist = bitlib.math.dist(c1, c2) - c1.r;
        if(dist < minDist) {
            closest = c1;
            minDist = dist;
        }
    }
    return minDist;
}

function newCircle() {
    context.fillStyle = bitlib.color.hsv(bitlib.random.int(360), 1, 1);

    var count = 0;
    var minDist = 100000;
    var c2 = {};
    do {
        c2.x = bitlib.random.float(width);
        c2.y = bitlib.random.float(height);
        minDist = check(c2);
        if(count++ > 1000) {
            anim.stop();
            alert("I'm done.");
            return;
        }
    }
    while(minDist < 10);
    c2.r = 5;
    drawCircle(c2);
    circles.push(c2);
    c = c2;

}