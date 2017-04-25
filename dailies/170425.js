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
context.lineWidth = 0.15;

var gradient = context.createLinearGradient(0, 0, 0, height);
gradient.addColorStop(0, "white");
gradient.addColorStop(1, "black");

// don't read anything into the variable names here. no social statements of any kind intended. just line colors.
var blacks = [],
    whites = [],
    num = 200,
    areas = [],
    numAreas = 10,
    f = 0.1,
    af = 0.05,
    damp = 0.95,
    gravity = 0.005;

panel.addButton("Restart", init);

init();

function init() {
    context.clear(gradient);

    blacks = [];
    whites = [];
    areas = [];

    for (var i = 0; i < num; i++) {
        blacks.push({
            x: width / 2 + bitlib.random.float(-300, 300),
            y: 0,
            vx: 0,
            vy: 0
        });
        whites.push({
            x: width / 2 + bitlib.random.float(-300, 300),
            y: height,
            vx: 0,
            vy: 0
        });
    }
    for (i = 0; i < numAreas; i++) {
        var area = {
            x: width / 2 + bitlib.random.float(-300, 300),
            y: bitlib.random.float(height * 0.15, height * 0.85),
            r: bitlib.random.float(40, 120)
        };
        areas.push(area);
    }

}


bitlib.anim(update).start();

function update() {
    context.beginPath();
    interact(blacks);
    interact(whites);
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

function interact(particles) {
    for(var i = 0; i < num; i++) {
        var p = particles[i];
        for(var j = 0; j < numAreas; j++) {
            var a = areas[j],
                dx = p.x - a.x,
                dy = p.y - a.y,
                dist = Math.sqrt(dx * dx + dy * dy);
            if(dist < a.r) {
                var tx = a.x + dx / dist * a.r,
                    ty = a.y + dy / dist * a.r,
                    ax = (tx - p.x) * af,
                    ay = (ty - p.y) * af;
                p.x += ax;
                p.y += ay;
            }
        }
    }


}




