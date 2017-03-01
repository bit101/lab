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

// I've gotten a lot of mileage out of this algorithm.

var context = bitlib.context(0, 0),
    width = context.width,
    height = context.height;

context.strokeStyle = "white";
context.clear("black");
context.fillStyle = "white";

var points = [],
    num = 500,
    xm = 0,
    ym = 0,
    md = 200,
    range = 100;


panel
    .addRange("num", 0, 2000, num, 1, function(value) {
        num = value;
        makePoints();
    })
    .addRange("distance", 0, 500, md, 1, function(value) {
        md = value;
    })
    .addRange("range", 0, 500, range, 1, function(value) {
        range = value;
    })

function makePoints() {
    points = [];
    bitlib.random.seed(0);
    for (var i = 0; i < num; i++) {
        points.push({
            x: bitlib.random.int(width),
            y: bitlib.random.int(height)
        });
    }
}

makePoints();
drawPoints();

function drawPoints() {
    for(var i = 0; i < num; i++) {
        context.fillCircle(points[i].x, points[i].y, 1);
    }
}

var maxDist = 100;
document.addEventListener("mousemove", update);

function update(event) {
    context.clear("black");
    drawPoints();
    xm = event.clientX;
    ym = event.clientY;
    for(var i = 0; i < points.length - 1; i++) {
        var p0 = points[i];
        for(var j = i + 1; j < points.length; j++) {
            var p1 = points[j];
            var dist = bitlib.math.dist(p0, p1);
            var maxDist = Math.min(md, range * range / bitlib.math.dist(xm, ym, (p0.x + p1.x) / 2, (p0.y + p1.y) / 2));
            if(dist < maxDist) {
                context.lineWidth = 1 - dist / maxDist;
                context.beginPath();
                context.moveTo(p0.x, p0.y);
                context.lineTo(p1.x, p1.y);
                context.stroke();
            }
        }
    }
}