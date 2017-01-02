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
    Same technique as 170101, but a non-random arrangement.
 */


var context = bitlib.context(0, 0),
    w = context.width,
    h = context.height;

var points = [],
    numPoints = 40,
    a = 0,
    s = 0.03;

for(var i = 0; i < numPoints; i++) {
    points.push({
        x: -100,
        y: -h / 2 + h / 2 / numPoints * i * 2,
        r: 20,
        offset: i * 2
    });
}

context.lineWidth = 10;
context.strokeStyle = "yellow";

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
        context.fillStyle = "red";
        context.fillCircle(p.x, p.y, 5);
        context.restore();
    }
    a += s;

    context.restore();
}