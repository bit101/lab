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

context.clear("#111111");
context.translate(width / 2, height / 2);
context.lineWidth = 0.25;
context.strokeStyle = "#000000";


var r = Math.min(width, height) * 0.45,
    h = 500,
    w = h * Math.PI / 2,
    scale = 0.05,
    len = 10;

var gradient = context.createLinearGradient(0, -r, 0, r);
gradient.addColorStop(0, "#ffffff");
gradient.addColorStop(1, "#111111");
context.fillStyle = gradient;
context.fillCircle(0, 0, r);

panel
    .addRange("perlin scale", 0.001, 0.1, scale, 0.001, function(value) {
        context.fillCircle(0, 0, r);
        scale = value;
    })
    .addRange("line width", 0.1, 2, 0.25, 0.01, function(value) {
        context.lineWidth = value;
    })
    .addRange("line length", 5, 50, len, 1, function(value) {
        len = value;
    })
    .addButton("Clear", function() {
        context.fillCircle(0, 0, r);
    })

bitlib.anim(update).start();

function update() {
    for(var i = 0; i < 100; i++) {
        draw();
    }
}

function draw() {
    var x = bitlib.random.float(-w / 2, w / 2),
        y = bitlib.random.float(-h / 2, h / 2),
        n = noise.perlin2(x * scale, y * scale),
        a = bitlib.math.map(n, -1, 1, 0, Math.PI * 2),
        p0 = project(x, y);
    x += Math.cos(a) * len;
    y += Math.sin(a) * len;
    var p1 = project(x, y);
    context.strokeStyle = bitlib.color.gray(bitlib.random.float(128));
    context.beginPath();
    context.moveTo(p0.x, p0.y);
    context.lineTo(p1.x, p1.y);
    context.stroke();
}

function  project(x, y) {
    var angle = bitlib.math.map(x, -w / 2, w / 2, 0, Math.PI),
        angle2 = bitlib.math.map(y, - h / 2, h / 2, -Math.PI / 2, Math.PI / 2),
        xx = Math.cos(angle) * r * Math.cos(angle2),
        yy = Math.sin(angle2) * r;
    return {
        x: xx,
        y: yy
    };
}
