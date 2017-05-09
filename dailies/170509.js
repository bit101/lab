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

context.clear("black");
context.setShadow(0.6, 0, 10, 20);
// context.globalCompositeOperation = "lighten";

var gradient = context.createLinearGradient(0, -100, 0, 100);
gradient.addColorStop(0, "white");
gradient.addColorStop(1, "black");
context.fillStyle = gradient;

var points = [];
points.push({
    x: width  / 2,
    y: height / 2,
    z: 500,
    r: Math.min(width, height) * 0.45
});

for(var i = 0; i < 500; i++) {
    points.push({
        x: bitlib.random.float(width),
        y: bitlib.random.float(height),
        z: bitlib.random.float(1000),
        r: bitlib.random.power(16, 70, 8)
    });
}

points.sort(function(a, b) {
    return a.z - b.z;
});

for(var i = 0; i < points.length; i++) {
    var p = points[i];
    context.save();
    context.translate(p.x, p.y);
    context.scale(p.r / 100, p.r / 100);
    context.fillCircle(0, 0, 100);
    context.restore();
}