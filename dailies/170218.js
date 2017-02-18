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
var angle = 0;

var a = 1,
    b = 1,
    c = 1,
    d = 0.99;

panel
    .addRange("a", -1, 1, a, 0.01)
    .addRange("b", -1, 1, b, 0.01)
    .addRange("c", -1, 1, c, 0.01)
    .addRange("d", -1, 1, d, 0.01)
    .setGlobalChangeHandler(function() {
        a = panel.getValue("a");
        b = panel.getValue("b");
        c = panel.getValue("c");
        d = panel.getValue("d");
        points = [];
    })

bitlib.anim(update).start();

function update() {
    context.clear();
    var p0 = {
        x: width / 2 + Math.sin(angle * a) * width * 0.4,
        y: height - 20
    };
    var p1 = {
        x: width / 2 + Math.cos(angle * b) * width * 0.4,
        y: 20
    };
    var p2 = {
        x: 20,
        y: height / 2 + Math.sin(angle * c) * height * 0.3
    };
    var p3 = {
        x:  width - 20,
        y: height / 2 + Math.cos(angle * d) * height * 0.4
    };
    angle += 0.05;

    var p4 = bitlib.math.segmentIntersect(p0, p1, p2, p3);
    if(p4) {
        points.push(p4);
    }

    context.strokeCircle(p4.x, p4.y, 5);

    context.lineWidth = 0.25;
    context.beginPath();
    for(var i = 0; i < points.length; i++) {
        context.lineTo(points[i].x, points[i].y);
    }
    context.stroke();

    context.lineWidth = 1;
    context.fillCircle(p0.x, p0.y, 5);
    context.fillCircle(p1.x, p1.y, 5);
    context.fillCircle(p2.x, p2.y, 5);
    context.fillCircle(p3.x, p3.y, 5);
    context.beginPath();
    context.moveTo(p0.x, p0.y);
    context.lineTo(p1.x, p1.y);
    context.moveTo(p2.x, p2.y);
    context.lineTo(p3.x, p3.y);
    context.stroke();
}