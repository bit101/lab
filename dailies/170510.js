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
context.setShadow(0.5, 10, 10, 20);

var shadow = context.createRadialGradient(0, -25, 150, 0, -90, 0);
shadow.addColorStop(0, "rgba(0, 0, 0, 1)");
shadow.addColorStop(1, "rgba(0, 0, 0, 0)");



var points = [];

for(var i = 0; i < 1000; i++) {
    points.push({
        x: bitlib.random.float(width),
        y: bitlib.random.float(height),
        z: bitlib.random.float(1000),
        r: bitlib.random.power(10, 120, 9)
    });
}

points.sort(function(a, b) {
    return a.z - b.z;
});

for(var i = 0; i < points.length; i++) {
    var gradient = context.createLinearGradient(0, -100, 0, 100);
    var bands = 8;
    for(var j = 0; j <= bands; j++) {
        var t = j / bands
        gradient.addColorStop(t, bitlib.color.hsv(bitlib.random.int(360), .4, 1));
    }

    var p = points[i];
    context.save();
    context.translate(p.x, p.y);
    context.rotate(bitlib.random.float(-0.2, 0.2));
    context.scale(p.r / 100, p.r / 100);
    context.fillStyle = gradient;
    context.fillCircle(0, 0, 100);
    context.restore();

    context.save();
    context.translate(p.x, p.y);
    context.rotate(-0.3);
    context.scale(p.r / 100, p.r / 100);
    context.fillStyle = shadow;
    context.fillCircle(0, 0, 100.4);
    context.restore();
}