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

var r = 0,
    speed = 0.05,
    numSquares = 20,
    hueA = 0,
    hueB = 120,
    shadow = true,
    rotation = 0.2;

var c = shaky.create(context.canvas);


panel
    .bindRange("shake", 0, 20, c.shake, 1, c)
    .bindRange("segSize", 1, 20, c.segSize, 1, c)
    .addRange("num squares", 1, 40, numSquares, 1, function(value) {
        numSquares = value;
    })
    .addRange("rotation", 0, 1, rotation, 0.01, function(value) {
        rotation = value;
    })
    .addRange("speed", 0, 0.1, speed, 0.01, function(value) {
        speed = value;
    })
    .addRange("hue A", 0, 360, hueA, 1, function(value) {
        hueA = value;
    })
    .addRange("hue B", 0, 360, hueB, 1, function(value) {
        hueB = value;
    })
    .addBoolean("shadow", true, function(value) {
        shadow = value;
    });

draw();

function draw() {
    context.clear("white");
    context.save();
    context.translate(width / 2, height / 2);


    for (var i = 0; i < numSquares; i++) {
        var s = bitlib.math.map(i, 0, numSquares, 500, 5);
        var hue = bitlib.math.map(s, 502, 2, hueA, hueB);
        context.fillStyle = bitlib.color.hsv(hue, 1, 1);
        c.beginPath();
        c.rect(-s / 2, -s / 2, s, s);
        if(shadow) {
            context.setShadow(0.5, 5, 5, 10);
        }
        c.fill();
        context.setShadow(0, 0, 0, 0);
        c.stroke();
        context.rotate(Math.cos(r) * rotation);
    }
    context.restore();
    r += speed;
}

var offset = 0;
bitlib.anim(update).start();

function update() {
    context.clear("white");
    draw();
}