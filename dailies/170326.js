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

// tags = "math,fractals,sierpinski,interactive"


var context = bitlib.context(0, 0),
    width = context.width,
    height = context.height;
context.lineWidth = 0.5;

var points = [];
var lines = [];


var params = {
    size: Math.min(width, height) / 2,
    levels: 5,
    spring: 0.01,
    stiffness: 0.02,
    damp: 0.95,
    radius: 150,
    seed: 0,
    fill: false
};

var radiusSQ = params.radius * params.radius;
var mousex = mousey = 0;
var hue = bitlib.random.int(360);

setup();
panel
    .bindRange("size", 0, Math.max(width, height), params.size, 1, params)
    .bindRange("levels", 0, 9, params.levels, 1, params)
    .bindRange("radius", 0, 300, params.radius, 1, params)
    .bindRange("spring", 0, 1, params.spring, 0.001, params)
    .bindRange("stiffness", 0, 1, params.stiffness, 0.001, params)
    .bindRange("damp", 0.5, 1, params.damp, 0.001, params)
    .bindBoolean("fill", params.fill, params)
    .bindNumber("seed", 0, 10000, params.seed, 1, params)
    .setGlobalChangeHandler(setup);

function setup() {
    radiusSQ = params.radius * params.radius;
    points = [];
    lines = [];
    for(var i = 0; i < Math.PI * 2; i += Math.PI * 2 / 3) {
        points.push({
            x: width * 0.5 + Math.cos(i - Math.PI / 2) * params.size,
            y: height * 0.6 + Math.sin(i - Math.PI / 2) * params.size
        });
    }


    bitlib.random.seed(params.seed);

    sierpinski(points[0], points[1], points[2], params.levels);
}

function sierpinski(p0, p1, p2, level) {
    if(level <= 0) {
        makeLine(p0, p1, p2);
    }
    else {
        var a = {
                x: (p0.x + p1.x) / 2,
                y: (p0.y + p1.y) / 2
            },
            b = {
                x: (p0.x + p2.x) / 2,
                y: (p0.y + p2.y) / 2
            },
            c = {
                x: (p1.x + p2.x) / 2,
                y: (p1.y + p2.y) / 2
            };

        sierpinski(p0, a, b, level - 1);
        sierpinski(p1, a, c, level - 1);
        sierpinski(p2, b, c, level - 1);
    }
}


function makeLine(p0, p1, p2) {
    p0.vx = p0.vy = p1.vx = p1.vy = p2.vx = p2.vy = 0;
    p0.tx = p0.x;
    p0.ty = p0.y;
    p1.tx = p1.x;
    p1.ty = p1.y;
    p2.tx = p2.x;
    p2.ty = p2.y;
    lines.push([p0, p1, p2]);
}




context.canvas.addEventListener("mousemove", function(event) {
    mousex = event.clientX;
    mousey = event.clientY;
});



bitlib.anim(update).start();



function update() {
    context.clear(bitlib.color.hsv(hue, 0.25, 1));

    context.beginPath();
    for(var i = 0; i < lines.length; i++) {
        var line = lines[i];
        for(var j = 0; j < line.length; j++) {
            var p = line[j];
            var dx = p.x - mousex,
                dy = p.y - mousey,
                distSQ = dx * dx + dy * dy;
            if (distSQ < radiusSQ) {
                var dist = Math.sqrt(distSQ),
                    tx = mousex + dx / dist * params.radius,
                    ty = mousey + dy / dist * params.radius;
                p.vx += (tx - p.x) * params.spring;
                p.vy += (ty - p.y) * params.spring;
            }
            p.vx += (p.tx - p.x) * params.stiffness;
            p.vy += (p.ty - p.y) * params.stiffness;
            p.vx *= params.damp;
            p.vy *= params.damp;
            p.x += p.vx;
            p.y += p.vy;
        }
        context.moveTo(line[0].x, line[0].y);
        context.lineTo(line[1].x, line[1].y);
        context.lineTo(line[2].x, line[2].y);
        context.lineTo(line[0].x, line[0].y);
    }
    if(params.fill) {
        context.fill();
    }
    else {
        context.stroke();
    }
}