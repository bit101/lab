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
    a: 100,
    b: 10,
    n: 12
};

panel
    .bindRange("a", 0, height / 2, params.a, 1, params)
    .bindRange("b", 0, height / 2, params.b, 1, params)
    .bindRange("n", 0, 50, params.n, 1, params)
    .setGlobalChangeHandler(update);

update();
function update() {
    context.clear(bitlib.color.hsv(hue, 0.2, 1));
    context.save();

    context.translate(width / 2, height / 2);

    context.beginPath();

    for (var t = 0; t < Math.PI * 2; t += 0.01) {
        var r = params.a + params.b * Math.tanh(params.b * Math.sin(params.n * t)),
            x = r * Math.cos(t),
            y = r * Math.sin(t);
        context.lineTo(x, y);
    }
    context.closePath();

    context.fillStyle = bitlib.color.hsv(hue, 0.75, 1);
    context.fill();

    context.stroke();
    context.restore();
}