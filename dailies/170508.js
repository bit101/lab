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

function grid(w, h, cellSize, callback) {
    for(var y = cellSize / 2; y < h; y += cellSize) {
        for(var x = cellSize / 2; x < w; x += cellSize) {
            context.save();
            context.translate(x, y);
            callback(x / w, y / h);
            context.restore();
        }
    }
}
var cellSize = 30,
    waveLength = 300;

var gradient = context.createRadialGradient(0, 0, 0, 0, 0, 100);
gradient.addColorStop(0, "#eeeeee");
gradient.addColorStop(1, "black");
context.fillStyle = gradient;

draw();


panel
    .addRange("cell size", 5, 500, cellSize, 1, function(value) {
        cellSize = value;
        draw();
    })
    .addRange("waveLength", 1, 1000, waveLength, 1, function(value) {
        waveLength = value;
        draw();
    })

draw();


function draw() {
    context.globalCompositeOperation = "source-over";
    context.clear("black");
    context.globalCompositeOperation = "lighten";
    grid(width, height, cellSize, function (nx, ny) {
        var dx = nx - 0.5,
            dy = ny - 0.5,
            dist = Math.sqrt(dx * dx + dy * dy),
            angle = Math.sin(dist * waveLength),
            radius = bitlib.math.map(angle, -1, 1, cellSize, cellSize * 2);
        context.save();
        context.scale(radius / 100, radius / 100);
        context.fillCircle(0, 0, 100);
        context.restore();
    });
}