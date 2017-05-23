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

var textSize = 160;
context.font = textSize + "px Arial";
var text = "Particles, yo!";
var imageData;
makeText();

function makeText() {
    context.clear();
    var w = context.measureText(text).width;
    context.fillText(text, (width - w) / 2, (height + textSize) / 2);
    imageData = context.getImageData(0, 0, width, height);
    context.clear("white");
}

context.lineWidth = 0.1;
var particles = [],
    num = 3000,
    damp = 0.99;
makeParticles();

function makeParticles() {
    for (var i = 0; i < 3000; i++) {
        particles.push({
            x: bitlib.random.float(width),
            y: 0,
            vx: bitlib.random.float(-1, 1),
            vy: bitlib.random.float(-1, 1)
        });
    }
}

panel
    .addText("text", text, function(value) {
        text = value;
        makeText();
        particles = [];
        makeParticles();
    })
bitlib.anim(update).start();

function update() {
    // context.clear("white");
    context.beginPath();
    for(var i = 0; i < num; i++) {
        var p = particles[i];
        context.moveTo(p.x, p.y);
        p.x += p.vx;
        p.y += p.vy;
        context.lineTo(p.x, p.y);
       // context.fillRect(p.x, p.y, 1, 1);
        if(getPixel(p)) {
            context.fillRect(p.x, p.y, 1, 1);
            // p.y = 0;
            p.vx *= -1;
            p.vy *= -1;
            p.x += p.vx;
            p.y += p.vy;
        }
        else {
            p.vx *= damp;
            p.vy *= damp;
            if (p.x > width) p.x = 0;
            if (p.x < 0) p.x = width;
            if (p.y > height) p.y = 0;
            if (p.y < 0) p.y = height;
            p.vx += bitlib.random.float(-0.2, 0.2);
            p.vy += bitlib.random.float(-0.2, 0.2);
        }
    }
    context.stroke();
}

function getPixel(p) {
    var x = Math.round(p.x),
        y = Math.round(p.y),
        index = (y * width + x) * 4 + 3;
    return imageData.data[index] > 0;
}
