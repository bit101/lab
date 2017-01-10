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

// tags = "geometry,math,interactive"

/*
    From http://amzn.to/2iAqyJB Chapter 1.
 */


var context = bitlib.context(0, 0),
    width = context.width,
    height = context.height,
    radius = 200,
    cx = width / 2,
    cy = height / 2,
    x1 = cx - radius,
    y1 = cy,
    x2 = cx + radius,
    y2 = cy;

context.font = "20px Arial";

context.canvas.addEventListener("mousemove", function(event) {

    var dx = cx - event.clientX,
        dy = cy - event.clientY,
        angle = Math.atan2(dy, dx),
        px = cx - Math.cos(angle) * radius,
        py = cy - Math.sin(angle)* radius,
        hue = angle * 180 / Math.PI;

    if(hue < 0) {
        hue += 360;
    }

    context.clear(bitlib.color.hsv(hue, 0.15, 1));
    context.fillStyle = bitlib.color.hsv(hue, 0.35, 1);
    context.fillCircle(cx, cy, radius);
    context.strokeCircle(cx, cy, radius);

    context.fillStyle = "black";
    context.fillCircle(px, py, 5);
    context.fillCircle(x1, y1, 5);
    context.fillCircle(x2, y2, 5);
    context.fillStyle = bitlib.color.hsv(hue, 1, 1);
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(px, py);
    context.lineTo(x2, y2);
    context.lineTo(x1, y1);
    context.fill();
    context.stroke();

    context.fillStyle = "black";
    context.fillText("90°", px + 20, py - 20);

    dx = x2 - px;
    dy = y2 - py;
    context.save();
    context.translate(px, py);
    if(dy < 0) {
        context.rotate(Math.atan2(dy, dx) - Math.PI / 2);
    }
    else {
        context.rotate(Math.atan2(dy, dx));
    }
    context.beginPath();
    context.moveTo(0, 20);
    context.lineTo(20, 20);
    context.lineTo(20, 0);
    context.stroke();
    context.restore();

});

