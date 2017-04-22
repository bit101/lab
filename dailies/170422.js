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

var num = 10,
    maxSize = 100,
    power = 1,
    seed = 1,
    showSize = true,
    showPoints = true,
    res = 1;

panel
    .addRange("num points", 2, 100, num, 1, function(value) {
        num = value;
    })
    .addRange("power", 1, 100, num, 1, function(value) {
        power = value;
    })
    .addRange("res", 1, 10, res, 1, function(value) {
        res = value;
    })
    .addNumber("seed", 0, 100000, seed, 1, function(value) {
        seed = value;
    })
    .addBoolean("show points", showPoints, function(value) {
        showPoints = value;
    })
    .addBoolean("show size", showSize, function(value) {
        showSize = value;
    })
    .addButton("random seed", function() {
        panel.setValue("seed", bitlib.random.int(10000));

    })
    .setGlobalChangeHandler(init);

var points = [];

context.strokeStyle = "white";
context.lineWidth = 0.5;


init();

function init() {
    bitlib.random.seed(seed);
    context.clear("black");
    context.fillStyle = "white";
    points = [];
    for(var i = 0; i < num; i++) {
        var p = {
            x: bitlib.random.float(width),
            y: bitlib.random.float(height),
            r: bitlib.random.float(1, maxSize)
        };
        points.push(p);
        if(showSize) {
            context.strokeCircle(p.x, p.y, p.r);
        }
        if(showPoints) {
            context.fillCircle(p.x,p.y, 3);
        }
    }
}
bitlib.anim(update).start();


function update() {
    for(var i = 0; i < 1000; i++) {
        var p = {
            x: bitlib.random.float(width),
            y: bitlib.random.float(height)
        };
        draw(p);
    }
}

function draw(p) {
    var n = 0,
        d = 0;
    for(var i = 0; i < num; i++) {
        var p0 = points[i],
            dist = bitlib.math.dist(p, p0);
        var pow = 1 / Math.pow(dist, power);
        d += pow;
        n += p0.r * pow;
    }
    var val = n / d,
        hue = bitlib.math.map(val, 0, maxSize * 0.25, 0, 360);
    // maxSize * 0.25 is a classic "magic number".
    // I vaguely understand what it does.
    // mostly trial and error till it looked right though.
    // maybe I should have parameterized it,
    // but not sure what I'd even call it.
    context.fillStyle = bitlib.color.hsv(hue, 1, 1);
    context.fillRect(p.x, p.y, res, res);
}