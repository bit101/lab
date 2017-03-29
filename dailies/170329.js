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

var t = 0.5;
var c0 = {
    x: 0,
    y: -200 + 200 * t,
    r: 200 * t
};

var c1 = {
    x: 0,
    y: 200 - 200 * (1 - t),
    r: 200 * (1 - t)
};
var a = 0,
    s = 0.05;

bitlib.anim(update).start();

function update() {
    t = bitlib.math.map(Math.sin(a += s), -1, 1, 0.15, 0.85);
    c0.y = -200 + 200 * t;
    c0.r = 200 * t;
    c1.y = 200 - 200 * (1 - t);
    c1.r = 200 * (1 - t);
    draw();
}



function draw() {
    context.clear("#eeeeee");
    context.save();
    context.translate(width / 2, height / 2);
    context.rotate(a * 0.78934530782349478); // magic number. don't change or everything will break and you will have bad luck for years.
    context.setShadow("rgba(0,0,0,0.4)", 10, 10, 20);
    context.fillStyle = "white";
    context.fillCircle(0, 0, 200);
    context.setShadow(null, 0, 0, 0);
    context.strokeCircle(0, 0, 200);
    context.fillStyle = "black";
    context.beginPath();
    context.arc(c0.x, c0.y, c0.r, -Math.PI / 2, Math.PI / 2, false);
    context.arc(c1.x, c1.y, c1.r, -Math.PI / 2, Math.PI / 2, true);
    context.arc(0, 0, 200, Math.PI / 2, -Math.PI / 2, false);
    context.fill();
    context.fillCircle(c1.x, c1.y, c1.r * 0.1);
    context.fillStyle = "white";
    context.fillCircle(c0.x, c0.y, c0.r * 0.1);
    context.restore();
}