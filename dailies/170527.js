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

var hue = bitlib.random.int(360);

var innerRadius = 100,
    radii = 20;

panel
    .addRange("inner radius", 20, 250, innerRadius, 1, function(value) {
        innerRadius = value;
        draw();
    })
    .addRange("radii", 5, 200, radii, 1, function(value) {
        radii = value;
        draw();
    })



draw();
function draw() {
    context.clear(bitlib.color.hsv(hue, 0.1, 1));
    context.save();
    context.translate(width / 2, height / 2);

    var theta = Math.asin(radii / (innerRadius + radii)),
        num = Math.floor(Math.PI / theta);

    context.fillStyle = bitlib.color.hsv(hue + 30, 0.75, 1);
    context.fillCircle(0, 0, innerRadius);

    context.fillStyle = bitlib.color.hsv(hue + 60, 1, 1);
    for(var i = 0; i < num; i++) {
        var angle = Math.PI * 2 / num * i;
        context.fillCircle(Math.cos(angle) * (innerRadius + radii),
            Math.sin(angle) * (innerRadius + radii),
            radii);
    }
    context.restore();
}

