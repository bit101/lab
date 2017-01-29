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
context.lineWidth = 0.25;
var yres = 2;
var hue = bitlib.random.int(360);
context.clear(bitlib.color.hsv(hue, 0.5, 1));


var points = [];
seed();

function seed() {
    points = [];
    points.push({
        x: bitlib.random.float(width),
        y: height,
        r: 40,
        vx: 0
    });
    hue = bitlib.random.int(360);
    context.fillStyle = bitlib.color.hsv(hue, 0.5, 1);

}

bitlib.anim(update).start();

function update() {
    var next = [];
    while(points.length) {
        p = points.shift();
        context.save();
        context.translate(p.x, p.y);
        context.scale(1, 0.5);
        context.beginPath();
        context.arc(0, 0, p.r, 0, Math.PI * 2);
        context.fill();
        context.restore();
        context.stroke();

        if(p.y < 0) {
            seed();
            return;
        }

        var p2 = {
            x: p.x + p.vx + bitlib.random.float(-1, 1),
            y: p.y - yres - bitlib.random.float(1),
            r: p.r * 0.995 ,
            vx: p.vx * 0.95
        };
        next.push(p2);
        if(bitlib.random.bool(0.01)) {
            var vx = p.vx + bitlib.random.float(-5, 5);
            p2.vx = -vx;
            next.push({
                x: p.x + p.vx + bitlib.random.float(-1, 1),
                y: p.y - yres - bitlib.random.float(1),
                r: p.r - 0.1,
                vx: vx
            });
        }
    }
    points = next;

}