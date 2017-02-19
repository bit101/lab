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


var points = [];
var num = 20;
for(var i = 0; i < num; i++) {
    points.push({
        x: bitlib.random.float(-10, 10),
        y: height / (num - 1) * i + bitlib.random.float(-2, 2)
    });
    console.log(points[points.length - 1].y, height);
}

context.lineWidth = 6;
var hue = bitlib.random.int(360);
context.setShadow("rgba(0, 0, 0, 0.1)", 10, 10, 10);

bitlib.anim(update).start();



function update() {
    context.lineWidth = 10;
    context.strokeStyle = bitlib.color.hsv(hue, bitlib.random.float(0.75, 1), bitlib.random.float(0.77, 1));
    context.strokeMultiCurve(points);
    for(var i = 0;  i < 4; i++) {
        context.lineWidth = 6 - i * 2;
        context.strokeStyle = "rgba(255,255,255,0.1)";
        context.save();
        context.translate(-2, -2);
        context.strokeMultiCurve(points);
        context.restore();
    }
    var done = true;
    for(var i = 0; i < points.length; i++) {
        var p = points[i];
        p.x += bitlib.random.float(-6, 8);
        if(i > 0 && i < points.length - 1) {
            p.y += bitlib.random.float(-6, 6);
        }
        if(p.x < width) {
            done = false;
        }
    }
    if(done) {
        // context.clear();
        hue = bitlib.random.int(360);
        for(var i = 0; i < points.length; i++) {
            var p = points[i];
            p.x = bitlib.random.float(-10, 10);
            p.y = height / (points.length - 1) * i + bitlib.random.float(-2, 2)
        }
    }
}