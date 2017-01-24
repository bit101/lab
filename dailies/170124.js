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

// tags = "physics,gravity,animation"

var context = bitlib.context(0, 0),
    width = context.width,
    height = context.height;

var radius = height / 4;
var ballz = [];
var stuckBallz = [];
var gravity = 0.05;
var vr = 0;
var angle = 0;
var hue = bitlib.random.int(360);
var bgColor = bitlib.color.hsv(hue, 0.25, 1);
var planetColor = bitlib.color.hsv(hue, 0.75, 1);
bitlib.anim(update).start();



function update() {
    context.clear(bgColor);
    context.save();
    context.translate(width / 2, height * 0.7);


    if(bitlib.random.bool(0.05)) {
        createBall();
    }

    updateBallz();
    updateStuckBallz();
    context.fillStyle = planetColor;
    context.fillCircle(0, 0, radius);


    context.restore();
}

function createBall() {
    var r = bitlib.random.float(5, 50);
    ballz.push({
        x: bitlib.random.float(-width / 2, width / 2),
        y: -height * 0.7 - r,
        vy: 0,
        r: r,
        c: bitlib.color.hsv(hue, 0.5, bitlib.random.float(0.25, 1))
    });
}

function updateBallz() {
    for(var i = ballz.length - 1; i >= 0; i--) {
        var ball = ballz[i];
        ball.y += ball.vy;
        ball.vy += gravity;
        context.fillStyle = ball.c;
        context.fillCircle(ball.x, ball.y, ball.r);
        if(bitlib.math.dist(ball.x, ball.y, 0, 0) < radius) {
            var angleB = Math.atan2(ball.y, ball.x) - angle;
            ball.angle = angleB;
            ball.x = Math.cos(angleB) * radius;
            ball.y = Math.sin(angleB) * radius;
            stuckBallz.push(ball);
            ballz.splice(i, 1);
        }
        if(ball.y + ball.r > height / 2) {
            ballz.splice(i, 1);
        }
    }
}

function updateStuckBallz() {
    context.save();
    context.rotate(angle);

    for(var i = stuckBallz.length - 1; i >= 0; i--) {
        var ball = stuckBallz[i];
        ball.r -= 0.04;
        if(ball.r < 1) {
            stuckBallz.splice(i, 1);
        }
        else {
            context.fillStyle = ball.c;
            context.fillCircle(ball.x, ball.y, ball.r);
            var angleB = angle + ball.angle + Math.PI;
            vr -= Math.cos(angleB) * 0.00004 * ball.r;
        }
    }
    context.restore();
    angle += vr;
    vr *= 0.95;
}

