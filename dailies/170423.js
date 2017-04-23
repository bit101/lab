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
var scale = 36;

var a = 2.98,
    b = 0.99,
    c = 3.28,
    d = 47.74,
    x = 0.1,
    y = 0.1,
    colorScale = 10,
    pixelSize = 1;


panel
    .addRange("a", 0, 10, a, 0.01, function(value) {
        a = value;
    })
    .addRange("b", 0, 1, b, 0.01, function(value) {
        b = value;
    })
    .addRange("c", 0, 10, c, 0.01, function(value) {
        c = value;
    })
    .addRange("d", 0, 50, d, 0.01, function(value) {
        d = value;
    })
    .addRange("zoom", 1, 200, scale, 1, function(value) {
        scale = value;
    })
    .addRange("color scale", 0, 100, colorScale, 0.1, function(value) {
        colorScale = value;
    })
    .addRange("pixel size", 0.1, 5, pixelSize, 0.1, function(value) {
        pixelSize = value;
    })
    .setGlobalChangeHandler(init);


init();
function init() {
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clear("black");
    context.translate(width / 2, height / 2);
    context.scale(1, -1);
    x = 1;
    y = 1;
}


bitlib.anim(update).start();

function update() {
    for(var i = 0; i < 5000; i++) {
        draw();
    }
}

function draw() {

    context.fillRect(x * scale, y * scale, pixelSize, pixelSize);
    var t = c - d / (1 + x * x + y * y),
        x1 = a + b * (x * Math.cos(t) + y * Math.sin(t)),
        y1 = b * (x * Math.sin(t) - y * Math.cos(t));
    var vx = x1 - x,
        vy = y1 - y;
    context.fillStyle = bitlib.color.hsv((vx + vy) * colorScale, 1, 1);
    x = x1;
    y = y1;
}