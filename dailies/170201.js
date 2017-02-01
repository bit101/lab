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

panel
    .addRange("speed", 0, 2, 0, 0.001)
    .addRange("frames", 0, 60, 24, 1, makeFrames)
    .addRange("fps", 1, 60, 30, 1, function(value) {
        anim.fps = value;
    });


var canvas = document.createElement("canvas"),
    ctx = canvas.getContext("2d");
canvas.width = canvas.height = height;
makeFrames();

function makeFrames() {
    ctx.clearRect(0, 0, height, height);
    ctx.save();
    ctx.translate(height / 2, height / 2);
    ctx.beginPath();
    ctx.arc(0, 0, height / 2 - 5, 0, Math.PI * 2);
    ctx.stroke();
    var frames = panel.getValue("frames");
    for (var i = 0; i < frames; i++) {
        var angle = Math.PI * 2 / frames * i;
        ctx.save();
        ctx.rotate(angle);
        ctx.translate(height / 2 - 50, 0);

        ctx.save();
        ctx.translate(-75, 0);
        ctx.rotate(-angle);
        ctx.strokeRect(-20, -10, 40, 20);
        ctx.restore();

        ctx.beginPath();
        ctx.arc(Math.sin(angle) * 25, 0, 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.rotate(angle / 4);
        ctx.strokeRect(-25, -25, 50, 50);


        ctx.restore();
    }
    ctx.restore();
}

var a = 0,
    s = 0.05;
var anim = bitlib.anim(update, 30).start();

function update() {
    context.clear();
    context.save();
    context.translate(width / 2, height / 2);
    context.rotate(a += panel.getValue("speed"));
    context.drawImage(canvas, -height / 2, -height / 2);
    context.restore();
}