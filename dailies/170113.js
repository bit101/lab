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

// tags = "math,geometry,circles,lines"

/*
    I'm using the cos and sin of the angles of the left and right lines to determine how much x and y acceleration
    to  add to the ball. If the ball is far to the left than the left string will be pointing nearly straight down
    (90 degrees) and the right string will be stretched out more horizontally. Lots of trial and error and I have no
    idea how accurate it is, but it looks damn good to me. :)
 */

var context = bitlib.context(0, 0),
    width = context.width,
    height = context.height;

var cx = width / 2,
    cy = height / 4,
    vx = bitlib.random.float(-20, 20),
    vy = 0,
    gravity = 0.2,
    cr = 40,
    x1 = 0,
    y1 = height / 2,
    x2 = width,
    y2 = height / 2;

var hue = bitlib.random.int(360);



bitlib.anim(update).start();

function update() {
    context.clear(bitlib.color.hsv(hue, 0.1, 1));
    cx += vx;
    cy += vy;
    vy += gravity;

    if(cx + cr > width) {
        cx = width  - cr;
        vx *= -1;
    }
    else if(cx < cr) {
        cx = cr;
        vx *= -1;
    }

    vx *= 0.999;
    vy *= 0.999;
    context.fillStyle = bitlib.color.hsv(hue, 0.7, 1);
    context.fillCircle(cx, cy, cr);
    context.strokeCircle(cx, cy, cr);

    if (cy + cr > y1) {
        var a1 = drawTangent(x1, y1, cx, cy, cr, 1),
            a2 = drawTangent(x2, y2, cx, cy, cr, -1);
        vx -= (Math.cos(a1) + Math.cos(a2));
        vy -= (Math.sin(a1) + Math.sin(a2));
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
    return baseAngle;
}
