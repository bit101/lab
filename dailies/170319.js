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




var rings = [],
    phase = 0,
    speed = 0.05, // 0, 0.25
    num = 60,  // 10, 200
    minR = 100, // 0, 500
    maxR = 200, // 0, 500
    tilt = 0.5, // 0.1, 1
    wave = 0.1, // 0, 0.5
    wobble = 0, // 0, 0.5
    lineWidth = 20; // 1, 100

context.lineWidth = lineWidth;
context.setShadow("rgba(0,0,0,0.2)", 20, -10, 20);

panel
    .addRange("num", 10, 200, num, 1, function(value) {
        num = value;
        makeRings();
    })
    .addRange("speed", 0, 0.25, speed, 0.01, function(value) {
        speed = value;
    })
    .addRange("minR", 0, 500, minR, 1, function(value) {
        minR = value;
    })
    .addRange("maxR", 0, 500, maxR, 1, function(value) {
        maxR = value;
    })
    .addRange("tilt", 0.1, 1, tilt, 0.01, function(value) {
        tilt = value;
    })
    .addRange("wave", 0, 0.5, wave, 0.01, function(value) {
        wave = value;
        makeRings();
    })
    .addRange("wobble", 0, Math.PI / 2, wobble, 0.01, function(value) {
        wobble = value;
    })
    .addRange("lineWidth", 1, 100, lineWidth, 1, function(value) {
        lineWidth = value;
        context.lineWidth = lineWidth;
    })
    .addBoolean("shadow", true, function(value) {
        if(value) {
            context.setShadow("rgba(0,0,0,0.2)", 20, -10, 20);
        }
        else {
            context.setShadow(null, 0, 0, 0);
        }
    })


makeRings();

function makeRings() {
    rings = [];
    for (var i = 0; i < num; i++) {
        var angle = i * wave;
        rings.push({
            a: angle,
            y: height - 100 - i / num * (height - 200)
        });
    }
}

bitlib.anim(update).start();

function update() {
    context.clear("black");
    context.save();
    context.translate(width / 2, 0);

    for(var i = 0; i < num; i++) {
        var ring = rings[i],
            radius = bitlib.math.map(Math.sin(ring.a + phase), -1, 1, minR, maxR);
        context.strokeStyle = bitlib.color.gray(i / num * 255);
        context.save();
        context.translate(Math.sin(ring.a + phase) * 100 * wobble, ring.y);
        context.rotate(Math.cos(ring.a + phase) * wobble);
        context.scale(1, tilt);
        context.beginPath();
        context.circle(0, 0, radius);
        context.restore();
        context.stroke();
    }

    phase += speed;
    context.restore();
}

