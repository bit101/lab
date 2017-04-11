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

context.setShadow("rgba(0,0,0,0.5)", 0, 0, 20);

var angle = Math.PI * 0.25,
    size = 100,
    x = width / 2 - size / 2,
    y = height,
    hueA = 120,
    hueB = 30,
    topDepth = 6;

panel
    .addRange("angle", 0, Math.PI / 2, angle, 0.01, function(value) {
        angle = value;
    })
    .addRange("size", 0, 300, size, 1, function(value) {
        size = value;
    })
    .addRange("depth", 0, 10, topDepth, 1, function(value) {
        topDepth = value;
    })
    .addRange("hueA", 0, 360, hueA, 1, function(value) {
        hueA = value;
    })
    .addRange("hueB", 0, 360, hueB, 1, function(value) {
        hueB = value;
    })
    .setGlobalChangeHandler(update);

update();

function update() {
    context.clear("white");
    hue = 0;
    tree(x, y, size, angle, topDepth);
}

function tree(x, y, size, angle, depth) {
    context.save();
    context.fillStyle = bitlib.color.hsv(bitlib.math.map(depth, 0, topDepth, hueA, hueB), 1, 0.5);
    context.translate(x, y);
    context.fillRect(0, 0, size, -size);
    context.translate(0, -size);
    var s0 = Math.cos(angle) * size,
        s1 = Math.sin(angle) * size;
    context.rotate(-angle);
    if(depth) {
        tree(0, 0, s0, angle, depth - 1);
    }
    else {
        context.fillRect(0, 0, s0, -s0);
    }

    context.translate(s0, 0);
    context.rotate(Math.PI / 2);
    if(depth) {
        tree(0, 0, s1, angle, depth - 1);
    }
    else {
        context.fillRect(0, 0, s1, -s1);
    }

    context.restore();
}

