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

// la la la la la la la... feelin' groovy


var context = bitlib.context(0, 0),
    width = context.width,
    height = context.height;

var a = 0,
    s = 0.08;


context.setShadow("rgba(0,0,0,0.4)", 2, 2, 20);

bitlib.anim(update).start();

function update() {
    context.clear();
    context.save();
    context.translate(width / 2, height / 2);
    // context.rotate(Math.sin(a += s) * Math.PI);


    for(var i = 0; i < 10; i++) {
        var curve = 0.6 + Math.sin(a + i / 2) * 0.4;
        context.save();
        context.fillStyle = bitlib.color.hsv(a * 10 + i / 10 * 60, 1, 1);
        context.rotate(Math.sin(a + i / 5) * 1);
        var r = 400 - i * 30;
        splat(Math.cos(a + i / 3) * 100, Math.sin(a + i / 3) * 50, r * 0.2, r, 8, curve, 0);
        context.restore();
    }
a += s;
    context.restore();
}

function splat(x, y, r0, r1, nodes, curve, rand) {
    var points = [],
        slice = Math.PI / nodes,
        sf = slice * curve;

    for(var i = 0; i < nodes * 2; i++) {
        var angle = slice * i,
            r = i % 2 ? r0 : r1;
        r *= bitlib.random.float(1 - rand, 1 + rand);
        points.push({
            x: Math.cos(angle - sf) * r,
            y: Math.sin(angle - sf) * r
        });
        points.push({
            x: Math.cos(angle + sf) * r,
            y: Math.sin(angle + sf) * r
        });
    }
    context.save();
    context.translate(x, y);

    context.fillMultiLoop(points);

    context.restore();

}