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


var x = 0,
    y = 0,
    p = project(x, y),
    r = Math.min(width, height) * 0.45,
    h = 500,
    w = h * Math.PI / 2,
    s = 2;

var gradient = context.createLinearGradient(0, -r, 0, r);
gradient.addColorStop(0, "#ffffff");
gradient.addColorStop(1, "#111111");
context.fillStyle = gradient;
context.fillCircle(0, 0, r);

panel
    .addRange("random walk size", 1, 20, s, 1, function(value) {
        s = value;
    })
    .addRange("line width", 0.1, 2, 0.25, 0.01, function(value) {
        context.lineWidth = value;
    })
    .addColor("color", "#000000", function(value) {
        context.strokeStyle = value;
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
    context.beginPath();
    context.moveTo(p.x, p.y);
    x += bitlib.random.float(-s, s);
    y += bitlib.random.float(-s, s);
    p = project(x, y);
    context.lineTo(p.x, p.y);
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
