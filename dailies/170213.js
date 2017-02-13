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

var canvas2 = document.createElement("canvas"),
    context2 = canvas2.getContext("2d");

canvas2.width = width;
canvas2.height = height;
document.body.appendChild(canvas2);

var res = 8;
var dotSize = 8,
    scaleX = 1.01,
    scaleY = 1.01,
    rotation = 0.04;

panel
    .addRange("res", 2, 20, res, 1, function(value) { res = value;})
    .addRange("dotSize", 1, 20, dotSize, 0.1, function(value) { dotSize = value;})
    .addRange("scaleX", 0.5, 2, scaleX, 0.01, function(value) { scaleX = value;})
    .addRange("scaleY", 0.5, 2, scaleY, 0.01, function(value) { scaleY = value;})
    .addRange("rotation", -1, 1, rotation, 0.01, function(value) { rotation = value;})
    .setGlobalChangeHandler(draw);

draw();

function draw() {
    context.clear();
    for (var y = 0; y < height; y += res) {
        for (var x = 0; x < width; x += res) {
            context.fillCircle(x, y, dotSize / 2);
        }
    }

    context2.clearRect(0, 0, width, height);
    context2.save();
    context2.scale(scaleX, scaleY);
    context2.drawImage(context.canvas, 0, 0);
    context2.restore();
    canvas2.style.transform = "rotate(" + rotation + "rad)";
}


canvas2.addEventListener("mousedown", onMouseDown);
var offsetX, offsetY;
var c2x = 0,
    c2y = 0;

function onMouseDown(event) {
    offsetX = event.clientX;
    offsetY = event.clientY;
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
}

function onMouseUp(event) {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
}


function onMouseMove(event) {
    c2x += (event.clientX - offsetX);
    c2y += (event.clientY - offsetY);
    offsetX = event.clientX;
    offsetY = event.clientY;
    canvas2.style.left = c2x + "px";
    canvas2.style.top = c2y + "px";
}
