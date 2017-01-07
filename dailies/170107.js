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
    1. Array of points.
    2. Add a point on mouse click.
    3. For each line segment, determine distance from each point in array.
    4. If within a certain distance of a certain radius from a point, increase segment's height.
    5. Expand that radius for each point.
    6. When radius is very large, remove point.
 */

var context = bitlib.context(0, 0),
    width = context.width,
    height = context.height;

var xres = 5,
    yres = 10,
    points = [];

context.canvas.addEventListener("click", function(event) {
    points.push({
        x: event.clientX,
        y: event.clientY,
        r: 0
    });
});

context.strokeStyle = "white";
bitlib.anim(60, render).start();


function render() {
    context.clear("black");

    context.beginPath();
    for(var y = 0; y < height; y += yres) {
        context.moveTo(0, y);
        for(var x = 1; x <= width; x += xres) {
            var h = 0;
            for(var i = 0; i < points.length; i++) {
                var point = points[i],
                    dx = x - point.x,
                    dy = y - point.y,
                    dist = Math.sqrt(dx * dx + dy * dy),
                    delta = Math.abs(dist - point.r);
                if(delta < 20) {
                    h -= (20 - delta);
                }
            }
            context.lineTo(x, y + bitlib.random.float(-2, 2) + h);
        }
    }
    for(var i = points.length - 1; i >= 0; i--) {
        var point = points[i];
        if(point.r > width) {
            points.splice(i, 1);
        }
        else {
            point.r += 5;
        }
    }
    context.stroke();
}