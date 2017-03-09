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

var points = [],
    num = 600,
    fl = 300,
    maxZ = 5000,
    separation = 15;

panel.addRange("separation", 0, 50, separation, 1, function(value) {
    separation = value;
});

// context.fillStyle = "white";
context.font = "60px sans-serif";
context.globalCompositeOperation = "darken";

makePoints();
bitlib.anim(update).start();

function makePoints() {
    for(var i = 0; i < num; i++) {
        points.push({
            x: bitlib.random.float(-500, 500),
            y: bitlib.random.float(-500, 500),
            z: bitlib.random.float(-fl, maxZ),
            char: String.fromCharCode(bitlib.random.int(26) + 65),
            speed: bitlib.random.float(-1, -5)
        });
    }
}

function update() {
    context.clear();
    context.save();
    context.translate(width / 2, height / 2);

    drawPoints();

    context.restore();
}

function drawPoints() {
    for(var i = 0; i < num; i++) {
        var p = points[i],
            scale = fl / (fl + p.z),
            x = p.x * scale,
            y = p.y * scale;
        context.save();
        context.translate(x, y);
        context.scale(scale, scale);
        if(p.z < 50) {
            context.globalAlpha = bitlib.math.map(p.z, 50, 0, 1, 0);
        }
        else {
            context.globalAlpha = scale;
        }
        context.fillStyle = "#ff0000";
        context.fillText(p.char, -separation * scale, 0);
        context.fillStyle = "#00ffff";
        context.fillText(p.char, separation * scale, 0);
        context.restore();
        p.z += p.speed;
        if(p.z < 0) {
            p.z += maxZ;
        }
    }
}


