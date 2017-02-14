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

var limit = 6;
var hue = bitlib.random.int(360);

panel.addRange("limit", 0, 8, limit, 1, function(value) {
    limit = value;
});

var rotation = Math.PI / 12;

var p0 = {
        x: Math.cos(-Math.PI / 2 + rotation) * height / 2,
        y: Math.sin(-Math.PI / 2 + rotation) * height / 2,
    },
    p1 = {
        x: Math.cos(Math.PI / 6 + rotation) * height / 2,
        y: Math.sin(Math.PI / 6 + rotation) * height / 2,
    },
    p2 = {
        x: Math.cos(Math.PI * 5 / 6 + rotation) * height / 2,
        y: Math.sin(Math.PI * 5 / 6 + rotation) * height / 2,
    };
var a = 0,
    b = 0,
    tx, ty;

bitlib.anim(draw).start();

function draw() {
    context.clear(bitlib.color.hsv(hue, 0.5, 1));

    context.save();
    context.translate(width / 2, height * 0.6);
    tx = .5 + Math.sin(a += .02) * .24;
    ty = .5 + Math.sin(b += .0037345) * .24;
    sierpinski(p0, p1, p2, limit);
    context.restore();
}

function sierpinski(p0, p1, p2, limit) {
    if(limit > 0) {
        var pA = {
                x: p0.x + (p1.x - p0.x) * tx,
                y: p0.y + (p1.y - p0.y) * ty
            },
            pB = {
                x: p1.x + (p2.x - p1.x) * tx,
                y: p1.y + (p2.y - p1.y) * ty
            },
            pC = {
                x: p2.x + (p0.x - p2.x) * tx,
                y: p2.y + (p0.y - p2.y) * ty
            };
        sierpinski(p0, pA, pC, limit - 1);
        sierpinski(pA, p1, pB, limit - 1);
        sierpinski(pC, pB, p2, limit - 1);
    }
    else {
        drawTriangle(p0, p1, p2);
    }
}

function drawTriangle(p0, p1, p2) {
    context.beginPath();
    context.moveTo(p0.x, p0.y);
    context.lineTo(p1.x, p1.y);
    context.lineTo(p2.x, p2.y);
    context.fill();
}