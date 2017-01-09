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

// tags = "3d,animation,interactive"

/*
    If you scale by 50% on the y axis, then rotate 45 degrees and draw a square, you have an isometric tile.
    Actually, "bimetric" if you care about terminology.
    Here, we have different angles, different scales, different... just about everything.
 */


var context = bitlib.context(0, 0),
    width = context.width,
    height = context.height;

panel
    .addRange("angle", 0.1, 1, 0.5, 0.01)
    .addRange("size max", 5, 300, 200, 1)
    .addRange("size min", 5, 300, 50, 1)
    .addRange("twist", 0, 0.1, 0.02, 0.001)
    .addRange("wave", 0, 0.25, 0.02, 0.001)
    .addRange("hue top", 0, 360, 180, 1)
    .addRange("hue bottom", 0, 360, 0, 1)
    .saveInLocalStorage("170109");
var a = 0,
    s = 0.1;
context.lineWidth = 0.25;
bitlib.anim(update).start();

function update() {
    var angle = panel.getValue("angle"),
        sizeMin = panel.getValue("size min"),
        sizeMax = panel.getValue("size max"),
        twist = panel.getValue("twist"),
        wave = panel.getValue("wave"),
        h0 = panel.getValue("hue bottom"),
        h1 = panel.getValue("hue top");

    context.clear("black");
    context.save();
    context.translate(width / 2, 0);

    for(var i = 0; i <= height; i++) {
        var w = Math.cos(i * wave);
        var s = bitlib.math.map(w, -1, 1, sizeMin, sizeMax);
        context.save();
        context.fillStyle = bitlib.color.hsv(bitlib.math.lerp(h0, h1, i / height), 1, 1);
        context.translate(0, height - i * 2);
        context.scale(1, angle);
        context.rotate(i * twist * Math.sin(a) * 1);
        context.fillRect(-s / 2, -s / 2, s, s);
        context.strokeRect(-s / 2, -s / 2, s, s);
        context.restore();
    }

    a += 0.01;
    context.restore();
}
