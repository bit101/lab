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
    for(var y = 0; y < h; y += cellSize) {
        for(var x = 0; x < w; x += cellSize) {
            context.save();
            context.translate(x, y);
            callback(x / w, y / h);
            context.restore();
        }
    }
}
draw();

var cellSize = 20,
    xRotation = 3,
    yRotation = 3,
    thickness = 0.2;

panel
    .addRange("cell size", 5, 100, cellSize, 1, function(value) {
        cellSize = value;
        draw();
    })
    .addRange("x rotation", -12, 12, xRotation, 0.01, function(value) {
        xRotation = value;
        draw();
    })
    .addRange("y rotation", -12, 12, yRotation, 0.01, function(value) {
        yRotation = value;
        draw();
    })
    .addRange("thickness", 0, 1, thickness, 0.01, function(value) {
        thickness = value;
        draw();
    })

draw();


function draw() {
    context.clear("white");
    grid(width, height, cellSize, function (nx, ny) {
        context.save();
        context.translate(cellSize / 2, cellSize / 2);
        context.rotate(nx * xRotation + ny * yRotation);
        context.fillRect(-cellSize * thickness / 2, -cellSize / 2 , cellSize * thickness, cellSize);
        context.fillRect(-cellSize / 2, -cellSize * thickness / 2, cellSize, cellSize * thickness);
        context.restore();
    });
}