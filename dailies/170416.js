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


var wave = 0.03,
    phase = 0,
    speed = -0.08,
    maxScale = 5,
    count = 1000,
    distrib = 5,
    hue = 0;

panel
    .addRange("wave", 0.001, 0.15, wave, 0.001, function(value) {
        wave = value;
    })
    .addRange("speed", -0.5, 0.5, speed, 0.01, function(value) {
        speed = value;
    })
    .addRange("max scale", 0.25, 30, maxScale, 0.01, function(value) {
        maxScale = value;
    })
    .addRange("count", 100, 2000, count, 1, function(value) {
        count = value;
    })
    .addRange("distrib", 1, 20, distrib, 1, function(value) {
        distrib = value;
    })



bitlib.anim(update).start();

function update() {
    bitlib.random.seed(0);
    context.save();
    context.clear("black");
    context.globalCompositeOperation = "lighten";

    var gradient = context.createLinearGradient(0, -5, 0, 5);
    gradient.addColorStop(0, "#ffffff");
    gradient.addColorStop(1, bitlib.color.hsv(hue++, 1,0.25));
    context.fillStyle = gradient;

    for(var i = 0; i < count; i++) {
        draw();
    }

    context.restore();
    phase += speed;

}

function draw() {
    var x = bitlib.random.gauss(width, distrib),
        y = bitlib.random.gauss(height, distrib),
        dist = bitlib.math.dist(x, y, width / 2, height / 2),
        scale = bitlib.math.map(Math.cos(dist * wave + phase), -1, 1, 0.25, maxScale);
    context.save();
    context.translate(x, y);
    context.rotate(bitlib.random.float(-0.75, -0.25));
    context.scale(scale, scale);
    context.fillCircle(0, 0, 5);
    context.restore();

}