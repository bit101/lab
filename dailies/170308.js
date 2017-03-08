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


var points,
    fl = 300,
    hillX = 0,
    hillY = 500,
    phase = 0,
    speed = 0.1,
    radius = 200,
    wave = 0.03,
    h = 200,
    floor = 200,
    res = 20,
    dotSize = 2;

panel
    .addRange("radius", 0, 1000, radius, 1, function(value) {
        radius = value;
    })
    .addRange("wave", 0, 0.1, wave, 0.01, function(value) {
        wave = value;
    })
    .addRange("speed", -0.5, 0.5, speed, 0.01, function(value) {
        speed = value;
    })
    .addRange("height", 0, 1000, h, 1, function(value) {
        h = value;
    })
    .addRange("floor", -500, 1000, floor, 1, function(value) {
        floor = value;
    })
    .addRange("res", 10, 100, res, 1, function(value) {
        res = value;
        makePoints();
    })
    .addRange("dot size", 1, 20, dotSize, 1, function(value) {
        dotSize = value / 2;
    });

context.fillStyle = "white";

makePoints();
bitlib.anim(update).start();


function update() {

    context.clear("black");
    context.save();
    context.translate(width / 2, height / 2);

    renderPoints();

    context.restore();
}

document.addEventListener("mousemove", function(event) {
    hillX = bitlib.math.map(event.clientX, 0, width, -1000, 1000);
    hillY = bitlib.math.map(event.clientY, 0, height, 1500, -fl);
});
function makePoints() {
    points = [];
    for(var x = -1000; x <= 1000; x += res) {
        for(var z = -fl; z <= 1000; z += res) {
            points.push({
                x: x,
                y: 0,
                z: z
            });
        }
    }
}

function renderPoints() {
    for(var i = 0; i < points.length; i++) {
        var p = points[i],
            scale = fl / (fl + p.z),
            x = p.x * scale,
            y = (p.y + floor) * scale,
            dist = bitlib.math.dist(p.x, p.z, hillX, hillY);
        if(dist < radius) {
            y = (p.y + floor - Math.sin(dist * wave + phase) * (1 - dist / radius) * h) * scale;
        }
        context.save();
        context.translate(x, y);
        context.globalAlpha = scale;
        context.fillCircle(0, 0, scale * dotSize);
        context.restore();
    }
    phase += speed;
}