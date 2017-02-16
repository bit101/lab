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


var gradient = context.createRadialGradient(0, 0, 0,
    0, 0, 100);
gradient.addColorStop(0, "#ffffff");
gradient.addColorStop(0.75, "#000000");

context.fillStyle = gradient;


function drawBlob(x, y, r) {
    context.save();
    context.translate(x, y);
    context.scale(r / 100, r / 100);
    context.fillRect(-100, -100, 200, 200);
    context.restore();
}

var radius = 200;

var blobs = [];


for(var y = 0; y < height; y += 80) {
    for(var x = 0; x < width; x += 80) {
        var xx = x + bitlib.random.int(-40, 40),
            yy = y + bitlib.random.int(-40, 40);
        blobs.push({
            x: xx,
            y: yy,
            springTargetX: xx,
            springTargetY: yy,
            r: bitlib.random.int(100, 200),
            vx: 0,
            vy: 0
        });
    }
}
var xmouse = ymouse = 0;
document.addEventListener("mousemove", function(event) {
    xmouse = event.clientX;
    ymouse = event.clientY;
});

bitlib.anim(draw).start();

function draw() {
    context.globalCompositeOperation = "source-over";
    context.clear("#000000");
    context.globalCompositeOperation = "lighten";

    for(var i = 0; i < blobs.length; i++) {
        var blob = blobs[i];
        var dx = xmouse - blob.x,
            dy = ymouse - blob.y,
            dist = Math.sqrt(dx * dx + dy * dy);
        if(dist < radius) {
            var tx = xmouse - dx / dist * radius,
                ty = ymouse - dy / dist * radius;
            blob.vx += (tx - blob.x) * 0.02;
            blob.vy += (ty - blob.y) * 0.02;
        }
        blob.vx += (blob.springTargetX - blob.x) * 0.02;
        blob.vy += (blob.springTargetY - blob.y) * 0.02;
        blob.x += blob.vx;
        blob.y += blob.vy;
        blob.vx *= 0.95;
        blob.vy *= 0.95;
        drawBlob(blob.x, blob.y, blob.r);
    }
}