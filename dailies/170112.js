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

// tags = "math,geometry,circles,lines,interactive"

/*
    I need to do a Coding Math video on this one.

    https://en.wikipedia.org/wiki/Tangent_lines_to_circles

    This is based on the tangent line to a circle - the line that touches the circle at exactly one point.
    It will be perpendicular to the radius line. The trick is to figure out which radius line.
    Draw a right triangle. The hypotenuse goes from the left or right point to the center of the circle.
    One leg is the radius of the circle.
    The other leg is the tangent line.
    Use acos with radius and distance to get that top angle.
    Add it to the global angle from the point to the circle.
    Move out on that angle one radius. That's your tangent point.
 */


var context = bitlib.context(0, 0),
    width = context.width,
    height = context.height;

var cx = width / 2,
    cy = height / 4,
    cr = 40,
    x1 = 0,
    y1 = height / 2,
    x2 = width,
    y2 = height / 2;


context.canvas.addEventListener("mousemove", function(event) {
    cx = event.clientX;
    cy = event.clientY;
    update();
});

update();
function update() {
    context.clear();
    context.strokeCircle(cx, cy, cr);

    if (cy + cr > y1) {
        drawTangent(x1, y1, cx, cy, cr, 1);
        drawTangent(x2, y2, cx, cy, cr, -1);
    }
    else {
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
    }
}

function drawTangent(x, y, cx, cy, cr, dir) {
    var dist = bitlib.math.dist(x, y, cx, cy),
        angle = Math.acos(-cr / dist) * dir,
        baseAngle = Math.atan2(cy - y, cx - x),
        totalAngle = baseAngle + angle;

    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(cx + Math.cos(totalAngle) * cr, cy + Math.sin(totalAngle) * cr);
    context.stroke();
}