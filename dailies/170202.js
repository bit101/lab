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

var params = {
    r1: 20,
    scale: 0.9,
    minRadius: 2
};

panel
    .bindRange("r1", 5, 200, params.r1, 1, params)
    .bindRange("scale", 0, 1, params.scale, 0.01, params)
    .bindRange("minRadius", 1, 20, params.minRadius, 1, params)
    .addButton("Draw", draw);

var anim = bitlib.anim(update);

var allCircles = [],
    nextCircles = [];
draw();

function draw() {
    context.clear();
    anim.stop();
    allCircles = [];
    nextCircles = [];
    addCircle(width / 2, height / 2, params.r1);

    anim.start();
}

function update() {
    for(var i = 0; i < 100; i++) {
        if(nextCircles.length > 0) {
            surround(nextCircles.shift());
        }
        else {
            anim.stop();
            return;
        }
    }
}

function surround(c) {
    if(c.r < params.minRadius) {
        return;
    }

    var r2 = c.r * params.scale,
        h = c.r + r2,
        angle = Math.asin(r2 / h) * 2;


    var a = bitlib.random.float(Math.PI * 2);
    for(var i = a; i < a + Math.PI * 2; i += angle) {
        var x = c.x + Math.cos(i) * h,
            y = c.y + Math.sin(i) * h;
        if(canAdd(x, y, r2)) {
            addCircle(x, y, r2);
        }
    }

}


function addCircle(x, y, r) {
    context.lineWidth = Math.min(0.25, r * 0.03);
    context.strokeCircle(x, y, r);
    var c = {
        x: x,
        y: y,
        r: r
    };
    allCircles.push(c);
    nextCircles.push(c);
}

function canAdd(x, y, r) {
    // no need to add if outside frame
    if(x < -r || x > width + r || y < -r || y > height + r) {
        return false;
    }
    for(var i = 0; i < allCircles.length; i++) {
        var c = allCircles[i],
            dx = c.x - x,
            dy = c.y - y,
            dist = Math.sqrt(dx * dx + dy * dy) + 1;
        if(dist < r + c.r) {
            return false;
        }
    }
    return true;
}