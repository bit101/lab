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

bitlib.anim(update).start();

function update() {
    var x = bitlib.random.int(width),
        y = bitlib.random.int(height),
        r1 = bitlib.random.float(50, 100),
        r0 = r1 * bitlib.random.float(0.1, 0.3),
        nodes = bitlib.random.int(3,20),
        curve = bitlib.random.float(0.75, 1),
        rand = bitlib.random.float(0, 0.5);
    splat(x, y, r0, r1, nodes, curve, rand);
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

    context.fillStyle = bitlib.color.randomRGB();
    context.fillMultiLoop(points);

    context.restore();

}