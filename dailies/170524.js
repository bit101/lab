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
var hue = bitlib.random.int(360);

var c0 = {
    x: width / 2,
    y: height / 2,
    r: 50
};

var inner = false;

var n = 5;
panel
    .addRange("radius", 0, 300, c0.r, 1, function(value) {
        c0.r = value;
    })
    .addRange("count", 0, 50, n, 1, function(value) {
        n = value;
    })
    .addBoolean("inner", inner, function(value) {
        inner = value;
    })
    .setGlobalChangeHandler(draw);

draw();

function draw() {
    context.clear(bitlib.color.hsv(hue, 0.25, 1));
    var angle = (Math.PI * 2) / (n * 2);
    var sin = Math.sin(angle);
    var div = inner ? 1 + sin : 1 - sin;
    var r2 = sin * c0.r / div;

    context.fillStyle = bitlib.color.hsv(hue, 0.5, 1);
    context.fillCircle(c0.x, c0.y, c0.r);
    context.fillStyle = bitlib.color.hsv(hue + 30, 1, 1);
    for(var i = 0; i < n; i++) {
        var a = Math.PI * 2 / n * i,
            r = inner ? c0.r - r2 : c0.r + r2;
        x = c0.x + Math.cos(a) * r,
            y = c0.y + Math.sin(a) * r;
        context.fillCircle(x, y, r2);
    }
}

