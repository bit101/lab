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

var balls = [];
var radius = 5;
var damp = 0.95;
var k = 0.01,
    rate = 100,
    lines = true;

panel
    .addRange("radius", 2, 20, radius, 1, function(value) {
        radius = value;
        context.lineWidth = radius * 3;
    })
    .addRange("spring", 0.001, 0.1, k, 0.001, function(value) {
        k = value;
    })
    .addRange("damp", 0.9, 1, damp, 0.01, function(value) {
        damp = value;
    })
    .addRange("growth rate (ms)", 10, 1000, rate, 1, function(value) {
        rate = value;
    })
    .addBoolean("draw line", lines, function(value) {
        lines = value;
    })
    .addButton("Reset", init);


context.lineJoin = context.lineCap = "round";
context.lineWidth = radius * 3;

init();

function init() {
    balls = [];
    balls.push({
        x: width / 2,
        y: height / 2,
        vx: 0,
        vy: 0,
        r: radius
    });
    balls.push({
        x: width / 2 + radius * 2,
        y: height / 2,
        vx: 0,
        vy: 0,
        r: radius
    });
}
function addBall() {
    var index = bitlib.random.int(balls.length - 1),
        b0 = balls[index],
        b1 = balls[index + 1];
    balls.splice(index, 0, {
        x: (b0.x + b1.x) / 2 + bitlib.random.float(-1, 1),
        y: (b0.y + b1.y) / 2 + bitlib.random.float(-1, 1),
        vx: 0,
        vy: 0,
        r: radius
    });
    setTimeout(addBall, rate);
}

setTimeout(addBall, rate);


bitlib.anim(update).start();

function update() {
    for(var i = 0; i < balls.length -1; i++) {
        var b0 = balls[i];
        for(var j = i + 1; j < balls.length; j++) {
            var b1 = balls[j],
                dx = b1.x - b0.x,
                dy = b1.y - b0.y,
                dist = Math.sqrt(dx * dx + dy * dy),
                offset = b0.r + b1.r;
            if(j - i === 1) {
                var tx = b0.x + dx / dist * offset,
                    ty = b0.y + dy / dist * offset,
                    ax = (tx - b1.x) * k,
                    ay = (ty - b1.y) * k;
                b0.vx -= ax;
                b0.vy -= ay;
                b1.vx += ax;
                b1.vy += ay;
            }
            else if(dist < offset * 2) {
                var tx = b0.x + dx / dist * offset * 2,
                    ty = b0.y + dy / dist * offset * 2,
                    ax = (tx - b1.x) * k,
                    ay = (ty - b1.y) * k;
                b0.vx -= ax;
                b0.vy -= ay;
                b1.vx += ax;
                b1.vy += ay;
            }
        }
    }
    draw();
}

function draw() {
    context.clear("white");
    // context.beginPath();
    for(var i = 0; i < balls.length; i++) {
        var b = balls[i];
        b.x += b.vx;
        b.y += b.vy;
        if(b.x + b.r > width) {
            b.x = width - b.r;
            b.vx *= -1;
        }
        else if(b.x - b.r < 0) {
            b.x = b.r;
            b.vx *= -1;
        }
        if(b.y + b.r > height) {
            b.y = height - b.r;
            b.vy *= -1;
        }
        else if(b.y - b.r < 0) {
            b.y = b.r;
            b.vy *= -1;
        }
        b.vx *= damp;
        b.vy *= damp;
        if(!lines) {
            context.fillCircle(b.x, b.y, radius);
        }
        // context.lineTo(b.x, b.y);
    }
    // context.stroke();
    if(lines) {
        context.strokeMultiCurve(balls);
    }
}


