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

context.lineWidth = 0.5;
context.strokeStyle = "white";

var particles = [],
    xscale = 0.02,
    yscale = 0.02,
    zscale = 0.15,
    rot = 5,
    speed = 10,
    gridSize = 40,
    count = 200,
    z = 0;

panel
    .addRange("grid size", 40, 200, gridSize, 1, function(value) {
        gridSize = value;
    })
    .addRange("x scale", 0.001, 0.1, xscale, 0.001, function(value) {
        xscale = value;
    })
    .addRange("y scale", 0.001, 0.1, yscale, 0.001, function(value) {
        yscale = value;
    })
    .addRange("z scale", 0.01, 1, zscale, 0.01, function(value) {
        zscale = value;
    })
    .addRange("rotation", 0.01, 10, rot, 0.01, function(value) {
        rot = value;
    })
    .addRange("speed", 0.1, 20, speed, 0.1, function(value) {
        speed = value;
    })
    .addRange("iter per frame", 100, 1000, count, 1, function(value) {
        count = value;
    })
    .setGlobalChangeHandler(init);


function init() {
    particles = [];

    for (var x = -width / 2; x < width / 2; x += gridSize) {
        for (var y = -height / 2; y < height / 2; y += gridSize) {
            particles.push({
                x: x,
                y: y,
                heading: 0
            });
        }
    }
}

init();

bitlib.anim(update).start();
function update() {
    init();
    context.clear("black");
    for (var i = 0; i < count; i++) {
        draw();
    }
    z += 0.1;
}

function draw() {
    context.save();
    context.translate(width / 2, height / 2);
    context.beginPath();
    for(var i = 0; i < particles.length; i++) {
        var p = particles[i];
        var v = Math.sin(p.x * xscale * Math.sin(z * zscale)) + Math.cos(p.y * yscale * Math.sin(z * zscale));// + Math.sin(z * zscale);
        p.heading += v * rot;
        context.moveTo(p.x, p.y);
        p.x += Math.cos(p.heading) * speed;
        p.y += Math.sin(p.heading) * speed;
        context.lineTo(p.x, p.y);
    }
    context.stroke();
    context.restore();
}