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

var radius = 20;
var dist = 5;
var twist = 0.025;
var maxRadius = 40;

panel
    .addRange("twist", 0, 0.05, twist, 0.001, function(value) {
        twist = value
    })
    .addRange("start size", 10, 100, radius, 1, function(value) {
        radius = value
    })
    .addRange("max size", 10, 100, maxRadius, 1, function(value) {
        maxRadius = value
    })

var points = [];

function createPoint() {
    return {
        x: width / 2,
        y: height,
        a: -Math.PI / 2,
        v: 0.01,
        r: radius,
        rv: 0,
        h: bitlib.random.int(360)
    };
}
var p = createPoint();

bitlib.anim(update).start();

function update() {
    context.clear("black");

    // all points went away. :(
    // make a new one.
    if(!points.length) {
        p = createPoint();
    }

    // current point went out of bounds or got too small
    // grab an existing one
    if(p.x > width + p.r ||
        p.x < -p.r ||
        p.y > height + p.r ||
        p.y < -p.r ||
        p.r < 0) {
        p = points[bitlib.random.int(points.length)];
    }
    else {
        // if it's a new point, add it to the array.
        points.push(p);
    }

    // create the next point in line, using current point + some alterations
    var p1 = {
        x: p.x + Math.cos(p.a) * dist,
        y: p.y + Math.sin(p.a) * dist,
        a: p.a + p.v,
        v: p.v + bitlib.random.float(-twist, twist),
        r: p.r + p.rv,
        rv: p.rv + bitlib.random.float(-0.05, 0.05),
        h: p.h + 1.3
    };

    // time to go on a diet
    if(p1.r > maxRadius) {
        p1.rv = -0.1;
    }

    // let's not get too twisty either
    p1.v *= 0.97;

    // ok, this is the new one.
    p = p1;

    for(var i = points.length - 1; i >= 0; i--) {
        var p0 = points[i];
        // move all points down
        p0.y += 1;

        // too far down. remove it.
        if(p0.y > height + p0.r * 2) {
            points.splice(i, 1);
        }

        // ok, ok, draw the damn thing already
        context.fillStyle = bitlib.color.hsv(p0.h, 1, 1);
        context.fillCircle(p0.x, p0.y, p0.r);
    }
}


