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

// tags = "lines,3d,animation,interactive"

/*
    Same scaled plane technique, this time with lines instead of circles.
    Some vertical Brownian motion to slowly give the lines some randomity.
 */


var context = bitlib.context(0, 0),
    w = context.width,
    h = context.height;

var lines = [],
    numLines = 60,
    numPoints = 50,
    a = 0,
    s = 0.01;

for(var i = 0; i < numLines; i++) {
    var points = [];
    points.offset = i / numLines * Math.PI * 2;
    lines.push(points);
    for(var j = 0; j < numPoints; j++) {
        points.push({
            x: j * 10,
            y: i / numLines * h,
        });
    }
}

context.strokeStyle = "white";

context.canvas.addEventListener("click", function() {
    for(var i = 0; i < numLines; i++) {
        var line = lines[i];
        for(var j = 0; j < numPoints; j++) {
            line[j].y = i / numLines * h
        }
    }
});

context.canvas.addEventListener("mousemove", function(event) {
    context.strokeStyle = bitlib.color.hsv(event.clientX / w * 360, event.clientY / h, 1);
});

bitlib.anim(60, render).start();

function render() {
    context.clear("black");
    context.save();
    context.translate(w / 2, 0);

    for(var i = 0; i < numLines; i++) {
        var line = lines[i];
        context.save();
        context.globalAlpha = Math.cos(a + line.offset + Math.PI / 2) * 0.5 + 0.5;
        context.scale(Math.cos(a + line.offset), 1);
        context.beginPath();
        for(var j = 0; j < numPoints; j++) {
            var p = line[j];
            p.y += bitlib.random.float(-0.1, 0.1);
            context.lineTo(p.x, p.y);
        }
        context.stroke();
        context.restore();
    }
    a += s;

    context.restore();
}