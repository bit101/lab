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

// this was going nowhere for a long time and I almost deleted it several times. but I kept iterating on it. let the shape become
// a complete random mess, threw in an overly heavy dropshadow and suddenly it came alive.

var context = bitlib.context(0, 0),
    width = context.width,
    height = context.height;
context.clear("black");
context.setShadow("rgba(0,0,0,0.4", 10, 10, 10);

var loop = [];
var num = 24;

for(var i = 0; i < num; i++) {
    var a = Math.PI * 2 / num * i;
    loop.push({
        x: bitlib.random.float(-100, 100),
        y: bitlib.random.float(-100, 100)
    });
}

context.lineWidth = 0.15;
context.fillStyle = "white";

var xangle = 0,
    yangle = 0,
    vx = bitlib.random.float(-0.01, 0.01),
    vy = bitlib.random.float(-0.01, 0.01),
    r = 0,
    s = bitlib.random.float(0.02, 0.1),
    hue = bitlib.random.int(360);

bitlib.anim(update).start();

function update() {
    var x = Math.cos(xangle += vx) * width * 0.4,
        y = Math.sin(yangle += vy) * height * 0.4;
    context.save();
    context.translate(width / 2, height / 2);
    context.translate(x, y);
    context.rotate(r += s);
    context.fillStyle = bitlib.color.hsv(hue += bitlib.random.float(0.5), 1, 1);
    context.beginPath();
    context.multiLoop(loop);
    context.fill();
    context.stroke();
    for(var i = 0; i < num; i++) {
        var p = loop[i];
        p.x += bitlib.random.float(-0.5, 0.5);
        p.y += bitlib.random.float(-0.5, 0.5);
    }
    context.restore();
    vx += bitlib.random.float(-0.001, 0.001);
    vy += bitlib.random.float(-0.001, 0.001);
    vx = bitlib.math.clamp(vx, -0.01, 0.01);
    vy = bitlib.math.clamp(vy, -0.01, 0.01);
}