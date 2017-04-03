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

var buffer = bitlib.context(width, height);
buffer.canvas.style.position = "absolute";
buffer.canvas.style.top = "0";

var hue = 0,
    maxSpeed = 1,
    agitation = 0.1,
    showParticles =true,
    particles = [],
    num = 2000,
    size = 300;

panel
    .addRange("size", 100, 500, size, 1, function(value) {
        size = value;
        makeParticles();
        initBuffer();
    })
    .addRange("count", 500, 5000, num, 1, function(value) {
        num = value;
        makeParticles();
        initBuffer();
    })
    .addRange("max speed", 0.5, 5, maxSpeed, 0.1, function(value) {
        maxSpeed = value;
        makeParticles();
        initBuffer();
    })
    .addRange("agitation", 0.01, 1, agitation, 0.01, function(value) {
        agitation = value;
        makeParticles();
        initBuffer();
    })

function makeParticles() {
    particles = [];
    for(var i = 0; i < num; i+=2) {
        particles.push({
            x: width / 2 + bitlib.random.float(-size / 2, size / 2),
            y: height / 2 - size / 2,
            vx: 0,
            vy: 0
        });
        particles.push({
            x: width / 2 - size / 2,
            y: height / 2 + bitlib.random.float(-size / 2, size / 2),
            vx: 0,
            vy: 0
        });
    }
}

function initBuffer() {
    hue = 0;
    buffer.clear();
    buffer.fillStyle = bitlib.color.hsv(hue, 1, 0.75);
    buffer.fillCircle(width / 2 - 5, height / 2 - 5, 5);
}

initBuffer();
makeParticles();
bitlib.anim(update).start();

function update() {
    context.clear("rgba(255,255,255,0.25)");
    for(var i = 0; i < num; i++) {
        var p = particles[i];
        if(p.x > width / 2 + size / 2) p.x -= size;
        if(p.x < width / 2 - size / 2) p.x += size;
        if(p.y > height / 2 + size / 2) p.y -= size;
        if(p.y < height / 2 - size / 2) p.y += size;
        p.vx = bitlib.math.clamp(p.vx, -maxSpeed, maxSpeed);
        p.vy = bitlib.math.clamp(p.vy, -maxSpeed, maxSpeed);
        p.vx += bitlib.random.float(-agitation, agitation);
        p.vy += bitlib.random.float(-agitation, agitation);
        p.x += p.vx;
        p.y += p.vy;
        if(showParticles) {
            context.fillCircle(p.x, p.y, 0.25);
        }
        if(buffer.getImageData(Math.floor(p.x), Math.floor(p.y), 1, 1).data[3] > 0) {
            buffer.fillStyle = bitlib.color.hsv(hue += 0.01, 1, 0.75);
            buffer.fillCircle(p.x, p.y, 1);
            if(bitlib.random.bool()) {
                p.x = width / 2 + bitlib.random.float(-size / 2, size / 2);
                p.y = height / 2 - size / 2;
            }
            else {
                p.y = height / 2 + bitlib.random.float(-size / 2, size / 2);
                p.x = width / 2 - size / 2;
            }
            p.vx = 0;
            p.vy = 0;
        }
    }
}