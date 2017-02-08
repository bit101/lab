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


var A = "A-B--B+A++AA+B-",
    B = "+A-BB--B-A++A+B",
    rotation = Math.PI / 3,
    str = "A",
    angle = 0,
    size = 4,
    iter = 5,
    spring = 0.01,
    stiffness = 0.02
    damp = 0.95,
    radius = 100,
    radiusSQ = radius * radius,
    mousex = 0,
    mousey = 0;

context.canvas.addEventListener("mousemove", function(event) {
    mousex = event.clientX;
    mousey = event.clientY;
});

panel
    .addRange("radius", 0, 300, 100, 1, function(value) {
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



for(var i = 0; i < iter; i++) {
    var output = "";
    for(var j = 0; j < str.length; j++) {
        if(str.charAt(j) == "A") {
            output += A;
        }
        else if(str.charAt(j) == "B") {
            output += B;
        }
        else {
            output += str.charAt(j);
        }
    }
    str = output;
}


var points = [];
var p;

var maxX = minX = maxY = minY = 0;

makeP((width + 87 * size) / 2, (height + 121 * size) / 2);
function makeP(x, y) {
    maxX = Math.max(x, maxX);
    maxY = Math.max(y, maxY);
    minX = Math.min(x, minX);
    minY = Math.min(y, minY);
    p = {
        x: x,
        y: y,
        tx: x,
        ty: y,
        vx: 0,
        vy: 0
    };
    points.push(p);
}

for(var j = 0; j < str.length; j++) {
    var char = str.charAt(j);
    if(char == "A" || char == "B") {
        makeP(p.x + Math.cos(angle) * size,
            p.y + Math.sin(angle) * size);
        points.push(p);
    }
    else if(char == "-") {
        angle -= rotation;
    }
    else if(char == "+") {
        angle += rotation;
    }
}

console.log(points.length);

bitlib.anim(update).start();

function update() {
    context.clear();
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
}