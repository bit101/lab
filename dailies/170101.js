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

// tags: "circles,3d,animation"

/*
    This comes from an old Flash technique that I originally saw Jared Tarbell do (http://levitated.net/daily/levGrowthID.html)
    You would put a movie clip on the stage and draw something to the right of the registration point.
    Then if you scale that movie clip on the x axis, it seems to be rotating.
    Here, I'm just using canvas transforms and dynamic drawing, but same idea.
    The effect is if you had a bunch of cards with drawings on each one, all joined on one edge, like the spokes of a wheel.
 */

var context = bitlib.context(0, 0),
    w = context.width,
    h = context.height;

var points = [],
    numPoints = 100,
    a = 0,
    s = 0.03;

for(var i = 0; i < numPoints; i++) {
    var offset = bitlib.random.float(Math.PI * 2),
        slices = 8,
        slice = Math.PI * 2 / slices;
    points.push({
        x: bitlib.random.float(w / 4),
        y: bitlib.random.float(-h / 2, h / 2),
        r: bitlib.random.float(2, 20),
        offset: Math.round(offset / slice) * slice
    });
}

context.lineWidth = 10;
context.strokeStyle = "white";

var anim = bitlib.anim(60, render);
anim.start();

function render() {
    context.clear("black");
    context.save();
    context.translate(w / 2, h / 2);

    for(var i = 0; i < numPoints; i++) {
        var p = points[i];
        context.save();
        context.scale(Math.sin(a + p.offset), 1);
        context.strokeCircle(p.x, p.y, p.r);
        context.restore();
    }
    a += s;

    context.restore();
}