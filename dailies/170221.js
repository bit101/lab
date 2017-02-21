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

var hue = bitlib.random.int(80, 140);
context.setShadow("rgba(0,0,0,0.4", 5, 5, 10);

var params = {
    size: height / 5,
    a: 0.9,
    b: 0.1,
    c: 0.1
};

panel
    .bindRange("size", 0, height / 2, params.size, 1, params)
    .bindRange("a", 0, 1, params.a, 0.01, params)
    .bindRange("b", 0, 1, params.b, 0.01, params)
    .bindRange("c", 0, 1, params.c, 0.01, params)
    .addButton("Reset", function() {
        panel.setValue("size", height / 5);
        panel.setValue("a", 0.9);
        panel.setValue("b", 0.1);
        panel.setValue("c", 0.1);
    })
    .setGlobalChangeHandler(update);


update();

function update() {
    context.clear(bitlib.color.hsv(hue, 0.25, 1));
    context.save();
    context.translate(width / 2, height * 0.85);

    context.fillStyle = bitlib.color.hsv(hue, 1, 0.75);
    context.beginPath();
    for (var i = 0; i < Math.PI * 2; i += 0.001) {
        var r = params.size *
            (1 + Math.cos(8 * i) * params.a) *
            (1 + Math.cos(24 * i) * params.b) *
            (0.9 + Math.cos(200 * i) * params.c) *
            (1 + Math.sin(i));
        context.lineTo(Math.cos(i) * r, -Math.sin(i) * r);
    }
    context.fill();
    context.restore();
}