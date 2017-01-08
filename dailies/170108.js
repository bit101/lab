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

// tags: "circles,3d,animation,interactive"

/*
    Back to the scaled plane technique. This time with some rotation and other interactive parameters.
    The rotation appears to make the rings travel in vertically oscillating paths as they "orbit" the center.
 */

var context = bitlib.context(0, 0),
    w = context.width,
    h = context.height;

var a = 0,
    s = 0.01;


context.lineWidth = 10;
context.strokeStyle = "rgba(255,255,255,0.5)";

panel
    .addRange("angle", 0, Math.PI * 2, 1, 0.01)
    .addRange("radius", 0, 500, 200, 1)
    .addRange("size", 0, 100, 40, 1)
    .addRange("wave", 0, 1, 0.5, 0.01)
    .addRange("count", 0, 200, 12, 1);

var anim = bitlib.anim(60, render);
anim.start();

function render() {
    var a1 = panel.getValue("angle"),
        radius = panel.getValue("radius"),
        size = panel.getValue("size"),
        wave = panel.getValue("wave");
        count = panel.getValue("count");

    context.clear("black");
    context.save();
    context.translate(w / 2, h / 2);

    for(var i = 0; i < count; i++) {
        var angle = Math.PI * 2 / count * i;
        context.save();
        context.rotate(a1 / count * i);
        context.scale(Math.sin(angle + a), 1);
        context.strokeCircle(radius, 0, size * (Math.sin(i * wave) + 1) * 0.5);
        context.restore();
    }
    a += s;

    context.restore();
}