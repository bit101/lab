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

var xoffset = Math.round((width - height) / 2),
    yoffset = 10;


panel
    .addRange("order", 1, 8, 6, 1, setup)
    .addRange("radius", 0, 300, 150, 1, function(value) {
        radius = value;
        radiusSQ = radius * radius;
    })
    .addRange("spring", 0, 1, 0.01, 0.001, function(value) {
        spring = value;
    })
    .addRange("stiffness", 0, 1, 0.02, 0.001, function(value) {
        stiffness = value;
    })
    .addRange("damp", 0.5, 1, 0.95, 0.001, function(value) {
        damp = value;
    });

var size,
    order,
    points,
    spring = 0.01,
    stiffness = 0.02
    damp = 0.95,
    radius = 150,
    radiusSQ = radius * radius,
    mousex = 0,
    mousey = 0;

var sizeMap = [
    null,
    384,
    192,
    96,
    48,
    24,
    12,
    6,
    3
]

setup();

function setup() {
    points = [];
    order = panel.getValue("order");
    size = sizeMap[order];
    console.log(size);
    for(var i = 0; i < Math.pow(2, order * 2); i += 1) {
        var p = hilbert(Math.pow(2, order), i);
        p.tx = p.x;
        p.ty = p.y;
        p.vx = 0;
        p.vy = 0;
        points.push(p);
    }
}

context.canvas.addEventListener("mousemove", function(event) {
    mousex = event.clientX - xoffset;
    mousey = event.clientY - yoffset;
});

bitlib.anim(update).start();

function update() {
    context.clear();
    context.save();
    context.translate(xoffset + 0.5, yoffset + 0.5);
    context.beginPath();
    for(var i = 0; i < points.length; i++) {
        var p = points[i];
        var dx = p.x - mousex,
            dy = p.y - mousey,
            distSQ = dx * dx + dy * dy;
        if(distSQ < radiusSQ) {
            var dist = Math.sqrt(distSQ),
                tx = mousex + dx / dist * radius,
                ty = mousey + dy / dist * radius;
            p.vx += (tx - p.x) * spring;
            p.vy += (ty - p.y) * spring;
        }
        p.vx += (p.tx - p.x) * stiffness;
        p.vy += (p.ty - p.y) * stiffness;
        p.vx *= damp;
        p.vy *= damp;
        p.x += p.vx;
        p.y += p.vy;
        context.lineTo(p.x, p.y);
    }
    context.stroke();
    context.restore();
}


function hilbert(n, t) {
    var x = 0,
        y = 0;

    for(var s = 1; s < n; s *= 2) {
        var rx = 1 & (t / 2),
            ry = 1 & (t ^ rx);
        var result = rot(s, x, y, rx, ry);
        x = result.x;
        y = result.y;
        x += s * rx;
        y += s * ry;
        t /= 4;
    }
    return {
        x: x * size,
        y: y * size
    };
}

function rot(n, x, y, rx, ry) {
    if(ry === 0) {
        if(rx === 1) {
            x = n - 1 - x;
            y = n - 1 - y;
        }
        return {
            x: y,
            y: x
        };
    }
    return {
        x: x,
        y: y
    };
}