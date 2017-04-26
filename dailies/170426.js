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
context.lineWidth = 0.1;

var gradient = context.createLinearGradient(0, 0, 0, height);
gradient.addColorStop(0, "white");
gradient.addColorStop(1, "black");

// don't read anything into the variable names here. no social statements of any kind intended. just line colors.
var blacks = [],
    whites = [],
    num = 200,
    f = 0.1,
    af = 0.05,
    damp = 0.95,
    maxDist = 20,
    gravity = 0.01;

panel
    .addRange("separation", 10, 200, maxDist, 1, function(value) {
        maxDist = value;
    })
    .addButton("Restart", init);

init();

function init() {
    context.clear(gradient);

    blacks = [];
    whites = [];
    areas = [];

    for (var i = 0; i < num; i++) {
        blacks.push({
            x: width / 2 + bitlib.random.float(-30, 30),
            y: 0,
            vx: 0,
            vy: 0
        });
        whites.push({
            x: width / 2 + bitlib.random.float(-30, 30),
            y: height,
            vx: 0,
            vy: 0
        });
    }
}


bitlib.anim(update).start();

function update() {
    context.beginPath();
    interact();
    context.strokeStyle = "black";
    draw(blacks, 1);
    context.strokeStyle = "white";
    draw(whites, -1);
}

function draw(particles, dir) {
    context.beginPath();
    for(var i = 0; i < num; i++) {
        var p = particles[i];
        context.moveTo(p.x, p.y);
        p.vx += bitlib.random.float(-f, f);
        p.vy += bitlib.random.float(-f, f);
        p.vy += gravity * dir;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= damp;
        p.vy *= damp;
        context.lineTo(p.x, p.y);
    }
    context.stroke();
}

function interact() {
    for(var i = 0; i < num; i++) {
        var p0 = blacks[i];
        for(var j = 0; j < num; j++) {
            var p1 = whites[j],
                dx = p1.x - p0.x,
                dy = p1.y - p0.y,
                dist = Math.sqrt(dx * dx + dy * dy);
            if(dist < maxDist) {
                var tx = p0.x + dx / dist * maxDist,
                    ty = p0.y + dy / dist * maxDist,
                    ax = (tx - p1.x) * af,
                    ay = (ty - p1.y) * af;
                p1.x += ax;
                p1.y += ay;
                p0.x -= ax;
                p0.y -= ay;
            }
        }
    }


}




