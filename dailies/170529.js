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
context.lineWidth = 5

var a = bitlib.random.float(-2, 1),
    b = bitlib.random.float(-1, 2),
    scale = 100;

panel
    .addRange("a", -20, 20, a, 0.01, function(value) {
        a = value;
        draw();
    })
    .addRange("b", -20, 20, b, 0.01, function(value) {
        b = value;
        draw();
    })
    .addRange("scale", 1, 100, scale, 1, function(value) {
        scale = value;
        draw();
    })

draw();

function draw() {
    context.save();
    context.clear("black");
    context.translate(width / 2, height / 2);
    for(var x = -10; x <= 10; x += 0.01) {
        var hue = bitlib.math.map(x, -10, 10, 0, 360);
        context.beginPath();
        context.strokeStyle = bitlib.color.hsv(hue, 1, 1);
        var y = elliptic(x);
        context.moveTo(x * scale, Math.min(y, 10) * scale, 1, 1);
        context.lineTo(x * scale, Math.max(-y, -10) * scale, 1, 1);
        context.stroke();
    }
    context.strokeRect(-10 * scale, -10 * scale, 20 * scale, 20 * scale);
    context.restore();
}

function elliptic(x) {
    return Math.sqrt(x * x * x + x * a + b);
}

