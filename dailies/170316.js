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

// noprotect
var context = bitlib.context(800, 800),
    width = context.width,
    height = context.height;

context.setShadow("rgba(0,0,0,0.55)", 10, 10, 40);

var holes = [],
    num = 8,
    rotation = 0,
    speed = 0.01;

var seed = bitlib.random.int(1000);
var layers = 20;

for(var i = 1; i < layers; i++) {
    var points = [];
    for(var j = 0; j < num; j++) {
        var a = -j / num * Math.PI * 2,
            r = i * 5,
            size = 13;
        points.push({
            x: Math.cos(a) * i * size + bitlib.random.int(-r, r),
            y: Math.sin(a) * i * size + bitlib.random.int(-r, r)
        });
    }
    holes.push(points);
}


bitlib.anim(update).start();

function update() {
    bitlib.random.seed(seed);
    context.clear("white");
    for(var i = 0; i < holes.length; i++) {
        draw(i);
    }
    rotation += speed;
}

function draw(i) {
    var dir = i % 2 ? -1 : 1,
        points = holes[i],
        h = 200;

    context.fillStyle = bitlib.color.gray(255 - i / holes.length * 230);
    context.save();
    context.beginPath();
    context.rect(0, 0, 800, 800);
    var r = rotation * i * 0.1,
        offset = i / holes.length * 100;
    context.translate(width / 2 + Math.cos(r) * offset,
        height / 2 + Math.sin(r) * offset);
    context.rotate(rotation * dir);
    context.multiLoop(points);
    context.fill();
    context.restore();
}

