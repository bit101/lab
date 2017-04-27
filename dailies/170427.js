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

// noprotect
var context = bitlib.context(0, 0),
    width = context.width,
    height = context.height;

var points = [],
    num = 500,
    damp = 0.95,
    bounce = 0,
    heat = 0.1,
    maxDist = 100,
    sep = 50,
    size = 2,
    mouseX = -1000,
    mouseY = -1000,
    mouseDist = 100,
    repulsion = 10;

panel
    .addRange("max distance", 10, 200, maxDist, 1, function(value) {
        maxDist = value;
    })
    .addRange("separation", 10, 200, sep, 1, function(value) {
        sep = value;
    })
    .addRange("heat", 0, 1, heat, 0.001, function(value) {
        heat = value;
    })
    .addRange("repulsion", 0, 1000, repulsion, 1, function(value) {
        repulsion = value;
    })
    .addRange("particle size", 0.1, 5, size, 0.1, function(value) {
        size = value;
    });

for(var i = 0; i < num; i++) {
    points.push({
        x: bitlib.random.float(width),
        y: bitlib.random.float(height),
        vx: 0,
        vy: 0,
        type: (bitlib.random.bool() ? 0 : 1)
    });
}

document.addEventListener("mousemove", function(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

bitlib.anim(update).start();

function update() {
    context.clear("black");
    interact();
    for(var i = 0; i < num; i++) {
        var p = points[i];
        checkMouse(p);
        p.vx += bitlib.random.float(-heat, heat);
        p.vy += bitlib.random.float(-heat, heat);
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= damp;
        p.vy *= damp;
        if(p.x > width) {
//       p.x -= width;
            p.x = width;
            p.vx *= -1;
        }
        else if(p.x < 0) {
//       p.x += width;
            p.x = 0;
            p.vx *= -1;
        }
        if(p.y > height) {
//       p.y -= height;
            p.y = height;
            p.vy *= -1;
        }
        else if(p.y < 0) {
//       p.y += height;
            p.y = 0;
            p.vy *= -1;
        }
        context.fillStyle = p.type === 0 ? "red" : "green";
        context.fillCircle(p.x, p.y, size);
    }
}

function interact() {
    var ax, ay;
    for(var i = 0; i < num - 1; i++) {
        var p0 = points[i];
        for(var j = i + 1; j < num; j++) {
            var p1 = points[j],
                dx = p1.x - p0.x,
                dy = p1.y - p0.y,
                dist = Math.sqrt(dx * dx + dy * dy) + 0.000001;
            if(p0.type === p1.type) {
                if(dist < maxDist) {
                    var tx = p0.x + dx / dist * sep,
                        ty = p0.y + dy / dist * sep;
                    ax = (tx - p1.x) * 0.001;
                    ay = (ty - p1.y) * 0.001;
                    p1.vx += ax;
                    p1.vy += ay;
                    p0.vx -= ax;
                    p0.vy -= ay;
                }
            }
            else {
                var force = repulsion / (dist * dist);
                ax = dx / dist * force;
                ay = dy / dist * force;
                p1.vx += ax;
                p1.vy += ay;
                p0.vx -= ax;
                p0.vy -= ay;
            }
        }
    }
}

function checkMouse(p) {
    var dx = p.x - mouseX,
        dy = p.y - mouseY,
        dist = Math.sqrt(dx * dx + dy * dy);
    if(dist < mouseDist) {
        var tx = mouseX + dx / dist * mouseDist,
            ty = mouseY + dy / dist * mouseDist;
        p.vx += (tx - p.x) * 0.01;
        p.vy += (ty - p.y) * 0.01;
    }
}










