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
var hue = bitlib.random.int(360);

var points = [];

var radius = height * 0.45,
    pointSize = 1;
    a0 = bitlib.random.float(Math.PI * 2),
    a1 = bitlib.random.float(Math.PI * 2),
    a2 = bitlib.random.float(Math.PI * 2),
    a3 = bitlib.random.float(Math.PI * 2),
    speed = 0.025,
    s0 = bitlib.random.float(-speed, speed),
    s1 = bitlib.random.float(-speed, speed),
    s2 = bitlib.random.float(-speed, speed),
    s3 = bitlib.random.float(-speed, speed);


panel
    .addRange("s0", -0.1, 0.1, s0, 0.001, function(value) {
        s0 = value;
    })
    .addRange("s1", -0.1, 0.1, s1, 0.001, function(value) {
        s1 = value;
    })
    .addRange("s2", -0.1, 0.1, s2, 0.001, function(value) {
        s2 = value;
    })
    .addRange("s3", -0.1, 0.1, s3, 0.001, function(value) {
        s3 = value;
    })
    .addRange("point size", 0.1, 10, pointSize, 0.1, function(value) {
        pointSize = value;
    })
    .addButton("Clear", function() {
        points = [];
    })

bitlib.anim(update).start();

function update() {
    context.clear(bitlib.color.hsv(hue, 0.75, 1));
    context.save();
    
    context.translate(width / 2, height / 2);
    context.fillStyle = bitlib.color.hsv(hue, 0.25, 1);
    context.fillCircle(0, 0, radius);
    context.fillStyle = "black";
    context.strokeCircle(0, 0, radius);
    var x0 = Math.cos(a0) * radius,
        y0 = Math.sin(a0) * radius,
        x1 = Math.cos(a1) * radius,
        y1 = Math.sin(a1) * radius,
        x2 = Math.cos(a2) * radius,
        y2 = Math.sin(a2) * radius,
        x3 = Math.cos(a3) * radius,
        y3 = Math.sin(a3) * radius;
    context.fillCircle(x0, y0, 5);
    context.fillCircle(x1, y1, 5);
    context.fillCircle(x2, y2, 5);
    context.fillCircle(x3, y3, 5);
    context.beginPath();
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.moveTo(x2, y2);
    context.lineTo(x3, y3);
    context.moveTo(x2, y2);
    context.lineTo(x1, y1);
    context.moveTo(x0, y0);
    context.lineTo(x3, y3);
    context.stroke();
    
    var p = bitlib.math.segmentIntersect({x: x0, y: y0},
        {x: x1, y: y1},
        {x: x2, y: y2},
        {x: x3, y: y3});
    if(p && p.x > -width / 2 && p.x < width / 2 && p.y > -height / 2 && p.y < height / 2) {
        context.strokeCircle(p.x, p.y, 10);
        points.push(p);
    }
    var p = bitlib.math.segmentIntersect({x: x2, y: y2},
        {x: x1, y: y1},
        {x: x0, y: y0},
        {x: x3, y: y3});
    if(p) {
        context.strokeCircle(p.x, p.y, 10);
        points.push(p);
    }
    
    for(var i = 0; i < points.length; i++) {
        context.fillCircle(points[i].x, points[i].y, pointSize);
    }
    
    
    a0 += s0;
    a1 += s1;
    a2 += s2;
    a3 += s3;
    context.restore();
}
