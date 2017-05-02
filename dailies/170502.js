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

var lines = [],
    points,
    balls = [];

var maxAge = 500;

panel.addRange("line persistence", 0, 1000, maxAge, 1, function(value) {
    maxAge = value;
});

for(var i = 0; i < 10; i++) {
    balls.push({
        x: bitlib.random.int(width),
        y: bitlib.random.int(-50, -200),
        r: bitlib.random.int(20, 50),
        vx: bitlib.random.int(-5, 5),
        vy: 0,
        c: bitlib.color.randomRGB()
    });
}

context.canvas.addEventListener("mousedown", function(event) {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    points = [];
    points.push({
        x: event.clientX,
        y: event.clientY,
        age: 0
    });
    lines.push(points);
});

function onMouseMove(event) {
    points.push({
        x: event.clientX,
        y: event.clientY,
        age: 0
    });
}

function onMouseUp(event) {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
}

bitlib.anim(update).start();
function update() {
    context.clear();
    updateBalls();
    for(var i = 0; i < lines.length; i++) {
        context.beginPath();
        var line = lines[i];
        for(var j = 0; j < line.length; j++) {
            var p = line[j];
            p.age++;
            context.lineTo(p.x, p.y);
        }
        context.stroke();
        while(line.length && line[0].age > maxAge) {
            line.shift();
        }
    }
    while(lines.length && !lines[0].length) {
        lines.shift();
    }
}

function updateBalls() {
    for(var i = 0; i < balls.length; i++) {
        updateBall(balls[i]);
    }
}

function updateBall(ball) {
    ball.vy += 0.1;
    ball.x += ball.vx;
    ball.y += ball.vy;
    if(ball.y < -200) {
        ball.y = -200;
        ball.vy *= -1;
    }
    if(ball.y - ball.r > height) {
        ball.x = bitlib.random.int(width);
        ball.y = -100;
        ball.vx = 0;
        ball.vy = 0;
    }
    if(ball.x + ball.r > width) {
        ball.x = width - ball.r;
        ball.vx *= -1;
    }
    if(ball.x - ball.r < 0) {
        ball.x = ball.r;
        ball.vx *= -1;
    }
    for(var i = 0; i < lines.length; i++) {
        var line = lines[i];
        for(var j = 0; j < line.length; j++) {
            var p = line[j],
                dx = ball.x - p.x,
                dy = ball.y - p.y,
                dist = Math.sqrt(dx * dx + dy * dy);
            if(dist < ball.r) {
                var x = p.x + dx / dist * ball.r,
                    y = p.y + dy / dist * ball.r;
                ball.vx += (x - ball.x) * 2;
                ball.vy += (y - ball.y) * 2;
                ball.x = x;
                ball.y = y;
            }
        }
    }
    context.fillStyle = ball.c;
    context.fillCircle(ball.x, ball.y, ball.r);
}



