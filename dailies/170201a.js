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
context.setShadow("rgba(0,0,0,0.4)", 10, 10, 10);

var img = document.createElement("img");
img.src = "zoopraxiscope.png";
img.addEventListener("load", function() {
    makeFrames();
});

panel
    .addRange("speed", 0, 2, 0.0, 0.001)
    .addRange("fps", 1, 60, 15, 1, function(value) {
        anim.fps = value;
    });


var canvas = document.createElement("canvas"),
    ctx = canvas.getContext("2d");

function makeFrames() {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
}

var a = 0,
    s = 0.05;
var anim = bitlib.anim(update, 15).start();

function update() {
    context.clear();
    context.save();
    context.translate(width / 2, height / 2);
    context.rotate(a += panel.getValue("speed"));
    context.drawImage(canvas, -canvas.width / 2, -canvas.height / 2);
    context.restore();
    // context.beginPath();
    // context.moveTo(width / 2, 0);
    // context.lineTo(width / 2, height);
    // context.moveTo(0, height / 2);
    // context.lineTo(width, height / 2);
    // context.stroke();
}