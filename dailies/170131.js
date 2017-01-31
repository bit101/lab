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

var params = {
    size: 200,
    a: 14,
    b: 5,
    c: 2,
    d: 1
};

panel
    .bindRange("size", 0, height / 2, params.size, 1, params)
    .bindRange("a", 0, 20, params.a, 1, params)
    .bindRange("b", 0, 20, params.b, 1, params)
    .bindRange("c", 0, 20, params.c, 1, params)
    .bindRange("d", 0, 20, params.d, 1, params)
    .addButton("reset", function() {
        panel.setValue("a", 14);
        panel.setValue("b", 5);
        panel.setValue("c", 2);
        panel.setValue("d", 1);
    })
    .setGlobalChangeHandler(update);


update();

function update() {
    context.save();
    context.clear(bitlib.color.hsv(hue, 0.2, 1));
    context.translate(width / 2, height / 2);


    context.beginPath();
    for (var t = 0; t < Math.PI * 2; t += 0.01) {
        var x = Math.pow(Math.sin(t), 3) * params.size,
            y = (-params.a * Math.cos(t) + params.b * Math.cos(2 * t) + params.c * Math.cos(3 * t) + params.d * Math.cos(4 * t)) / 16 * params.size;
        context.lineTo(x, y);
    }
    context.closePath();
    context.fillStyle = bitlib.color.hsv(hue, 0.75, 1);
    context.fill();
    context.stroke();
    context.restore();
}