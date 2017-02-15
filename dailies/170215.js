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

var blobs = [];

var num = width * height / 5000;
for(var i = 0; i < num; i++) {
    blobs.push({
        x: bitlib.random.int(width),
        y: bitlib.random.int(height),
        r: bitlib.random.int(75, 150),
        vx: 0,
        vy: 0
    });
}

bitlib.anim(draw).start();

function draw() {
    context.globalCompositeOperation = "source-over";
    context.clear("black");
    context.globalCompositeOperation = "lighten";

    for(var i = 0; i < blobs.length; i++) {
        var blob = blobs[i];
        blob.x += blob.vx;
        blob.y += blob.vy;
        blob.vx += bitlib.random.float(-0.1, 0.1);
        blob.vy += bitlib.random.float(-0.1, 0.1);
        if(blob.x - blob.r > width) {
            blob.x = -blob.r;
        }
        else if(blob.x < -blob.r) {
            blob.x = width + blob.r;
        }
        if(blob.y - blob.r > height) {
            blob.y = -blob.r;
        }
        else if(blob.y < -blob.r) {
            blob.y = height + blob.r;
        }
        blob.vx *= 0.98;
        blob.vy *= 0.98;
        drawBlob(blob.x, blob.y, blob.r);
    }
}