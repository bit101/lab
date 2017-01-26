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

// tags = "math,fractals,sierpinski,interactive"

var context = bitlib.context(0, 0),
    width = context.width,
    height = context.height;
context.lineWidth = 0.5;


var points = [];


var params = {
    size: Math.min(width, height) / 2,
    rotation: 0,
    levels: 5,
    t: 0.5,
    hue: bitlib.random.int(360)
};

update();
panel
    .bindRange("size", 0, Math.max(width, height), params.size, 1, params)
    .bindRange("rotation", 0, 360, params.rotation, 1, params)
    .bindRange("levels", 0, 9, params.levels, 1, params)
    .bindRange("t", 0, 1, params.t, 0.001, params)
    .bindRange("hue", 0, 360, params.hue, 1, params)
    .setGlobalChangeHandler(update);

function update() {
    var angle = params.rotation / 180 * Math.PI;
    points = [];
    for(var i = 0; i < Math.PI * 2; i += Math.PI * 2 / 3) {
        points.push({
            x: Math.cos(i - Math.PI / 2 + angle) * params.size,
            y: Math.sin(i - Math.PI / 2 + angle) * params.size
        });
    }


    context.save();
    context.clear(bitlib.color.hsv(params.hue, 0.25, 1));
    context.translate(width / 2, height / 2);

    sierpinski(points[0], points[1], points[2], params.levels);
    context.restore();
}

function sierpinski(p0, p1, p2, level, offset, gravity) {
    var t0 = params.t,
        t1 = 1 - params.t;
    if(level <= 0) {
        draw(p0, p1, p2);
    }
    else {
        var a = {
                x: (p0.x * t0 + p1.x * t1),
                y: (p0.y * t0 + p1.y * t1)
            },
            b = {
                x: (p2.x * t0 + p0.x * t1),
                y: (p2.y * t0 + p0.y * t1)
            },
            c = {
                x: (p1.x * t0 + p2.x * t1),
                y: (p1.y * t0 + p2.y * t1)
            };

        sierpinski(p0, a, b, level - 1);
        sierpinski(p1, a, c, level - 1);
        sierpinski(p2, b, c, level - 1);
    }
}


function draw(p0, p1, p2) {
    context.beginPath();
    context.moveTo(p0.x, p0.y);
    context.lineTo(p1.x, p1.y);
    context.lineTo(p2.x, p2.y);
    context.closePath();
    context.stroke();
}
