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

context.canvas.style.zIndex = 1;
context.setShadow("rgba(0,0,0,0.4)", 4, 4, 10);
var scale = 0.003;
var damp = 0.98;
var seed = bitlib.random.int(100000);
var force = 0.2;


panel
    .addRange("scale", 0, 0.03, scale, 0.001, function(value) {
        scale = value;
        drawOverlay();
        clearTrails();
        resetBall();
    })
    .addRange("force", 0, 2, force, 0.01, function(value) {
        force = value;
    })
    .addRange("damp", 0.8, 1, damp, 0.01, function(value) {
        damp = value;
    })
    .addNumber("seed", 0, 100000, seed, 1, function(value) {
        seed = value;
        drawOverlay();
        clearTrails();
        resetBall();
    })
    .addBoolean("Show flow", true, function(value) {
        overlayCanvas.style.display = value ? "block" : "none";
    });

var overlayCanvas = document.createElement("canvas"),
    overlay = overlayCanvas.getContext("2d");
overlayCanvas.width = width;
overlayCanvas.height = height;
overlay.lineWidth = 0.2;
overlay.fillStyle = "#cccccc";
document.body.appendChild(overlayCanvas);
drawOverlay();

var trailsCanvsas = document.createElement("canvas"),
    trails = trailsCanvsas.getContext("2d");
trailsCanvsas.width = width;
trailsCanvsas.height = height;
trails.lineWidth = 0.3;
document.body.appendChild(trailsCanvsas);




function drawOverlay() {
    noise.seed(seed);
    overlay.clearRect(0, 0, width, height);
    for (var x = 0; x < width; x += 10) {
        for (var y = 0; y < height; y += 10) {
            var angle = noise.perlin2(x * scale, y * scale) * Math.PI * 2;
            overlay.save();
            overlay.translate(x, y);
            overlay.rotate(angle);
            overlay.beginPath();
            overlay.moveTo(0, -2);
            overlay.lineTo(8, 0);
            overlay.lineTo(0, 2);
            overlay.fill();
            // overlay.arc(0, 0, 0.5, 0, Math.PI * 2);
            // overlay.fill();
            // overlay.beginPath();
            // overlay.moveTo(0, 0);
            // overlay.lineTo(Math.cos(angle) * 10, Math.sin(angle) * 10);
            // overlay.stroke();
            overlay.restore();
        }
    }
}

function clearTrails() {
    trails.clearRect(0, 0, width, height);
}

function resetBall() {
    ball.x = width / 2;
    ball.y = height / 2;
    ball.vx = ball.vy = 0;
}

var ball = {
    x: width / 2,
    y: height / 2,
    vx: 0,
    vy: 0,
    radius: 20
};



bitlib.anim(update).start();

function update() {
    trails.beginPath();
    trails.moveTo(ball.x, ball.y);

    var angle = noise.perlin2(ball.x * scale, ball.y * scale) * Math.PI * 2;
    ball.vx += Math.cos(angle) * force;
    ball.vy += Math.sin(angle) * force;

    ball.x += ball.vx;
    ball.y += ball.vy;

    trails.lineTo(ball.x, ball.y);
    trails.stroke();

    ball.vx *= damp;
    ball.vy *= damp;

    if(ball.x - ball.radius > width) {
        ball.x = -ball.radius;
    }
    else if(ball.x + ball.radius < 0) {
        ball.x = width + ball.radius;
    }
    if(ball.y - ball.radius > height) {
        ball.y = -ball.radius;
    }
    else if(ball.y + ball.radius < 0) {
        ball.y = height + ball.radius;
    }
    context.clear();
    context.fillCircle(ball.x, ball.y, ball.radius)
}
