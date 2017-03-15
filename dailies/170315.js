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

var samples = 500,
    minSize = 0.1,
    maxSize = 0.5,
    minAlpha = 0.1,
    maxAlpha = 0.25,
    points,
    bg = "black";

context.clear(bg);
context.fillStyle = "white";

panel
    .addRange("samples", 0, 5000, samples, 1, function(value) {
        samples = value;
    })
    .addRange("minSize", 0, 1, minSize, 0.01, function(value) {
        minSize = value;
    })
    .addRange("maxSize", 0, 20, minSize, 0.01, function(value) {
        maxSize = value;
    })
    .addRange("minAlpha", 0, 1, minAlpha, 0.01, function(value) {
        minAlpha = value;
    })
    .addRange("maxAlpha", 0, 1, maxAlpha, 0.01, function(value) {
        maxAlpha = value;
    })
    .addBoolean("invert", false, function(value) {
        if(value) {
            bg = "white";
            context.fillStyle = "black";
        }
        else {
            bg = "black";
            context.fillStyle = "white";
        }
    })
    .setGlobalChangeHandler(function() {
        context.globalAlpha = 1;
        context.clear(bg);
        makePoints();
    })


makePoints();

function makePoints() {
    points = [];

    for (var i = 0; i < 4; i++) {
        points.push({
            x: bitlib.random.int(width),
            y: bitlib.random.int(height),
            vx: bitlib.random.float(-2, 2),
            vy: bitlib.random.float(-2, 2)
        });
    }
}

bitlib.anim(update).start();
function update() {
    for(var i = 0; i < 4; i++) {
        var p = points[i];
        p.x += p.vx;
        p.y += p.vy;
        if(p.x > width) {
            p.x = width;
            p.vx *= -1;
        }
        else if(p.x < 0) {
            p.x = 0;
            p.vx *= -1;
        }
        if(p.y > height) {
            p.y = height;
            p.vy *= -1;
        }
        else if(p.y < 0) {
            p.y = 0;
            p.vy *= -1;
        }
    }
    doSample(samples);
}



function doSample(count) {
    for(var i = 0; i < count; i++) {
        var p = bitlib.math.bezier(points[0],
            points[1],
            points[2],
            points[3],
            bitlib.random.float(1));

        var radius = bitlib.random.float(minSize, maxSize);
        context.globalAlpha = bitlib.random.float(minAlpha, maxAlpha);
        context.fillCircle(p.x, p.y, radius);
    }
}