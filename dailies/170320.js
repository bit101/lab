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

var scale = 0.01, // 0 - 0.1
    branchLength = 10,     // 0 = 50
    threshold = 0.05, // 0 - 0.1
    speed = 1000,      // 1 - 1000
    hue = 90,
    seed = 0;
context.lineWidth = 0.25;
context.clear(bitlib.color.hsv(hue, 0.25, 1));

panel
    .addRange("branch length", 0, 50, branchLength, 1, function(value) {
        branchLength = value;
    })
    .addRange("threshold", 0, 1, threshold, 0.001, function(value) {
        threshold = value;
    })
    .addRange("hue", 0, 360, hue, 1, function(value) {
        hue = value;
    })
    .addRange("line width", 0, 1, 0.25, 0.01, function(value) {
        context.lineWidth = value;
    })
    .addRange("scale", 0, 0.05, scale, 0.001, function(value) {
        scale = value;
    })
    .addNumber("seed", 0, 10000, seed, 1, function(value) {
        seed = value;
    })
    .addHTML("Instructions", "Try changing branch length, then adjust threshold until you get a nice pattern.<br/>Longer branch lengths generally like larger thresholds.<br/>Higher threshold means more space between hedges.<br/>Higher scales need smaller branches. A scale of 0.05 needs a branch length of 1 or 2 and takes forever to render.")
    .setGlobalChangeHandler(function() {
        noise.seed(seed);
        context.clear(bitlib.color.hsv(hue, 0.25, 1));
    });


bitlib.anim(update).start();

function update() {
    for(var i = 0; i < speed; i++) {
        draw();
    }
}

function draw() {
    context.strokeStyle = bitlib.color.hsv(hue, 1, bitlib.random.float(1));
    var x0 = bitlib.random.float(width),
        y0 = bitlib.random.float(height),
        v0 = noise.perlin2(x0 * scale, y0 * scale),
        a = bitlib.random.float(Math.PI * 2),
        x1 = x0 + Math.cos(a) * branchLength,
        y1 = y0 + Math.sin(a) * branchLength,
        v1 = noise.perlin2(x1 * scale, y1 * scale);
    if(Math.abs(v0 - v1) > threshold) {
        context.beginPath();
        context.moveTo(x0, y0);
        context.lineTo(x1, y1);
        context.stroke();
    }
}