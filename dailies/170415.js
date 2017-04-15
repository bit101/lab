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

context.lineWidth = 0.25;

var waveLength0 = 2,
    w = Math.PI * 2 / width * waveLength0,
    waveLength1 = 100,
    w1 = Math.PI * 2 / width * waveLength1,
    height0 = height * 0.3,
    height1 = 60,
    res = 0.1;

panel
    .addRange("wavelength 0", 0, 10, waveLength0, 0.1, function(value) {
        waveLength0 = value;
        w = Math.PI * 2 / width * waveLength0;
    })
    .addRange("height 0", 0, height / 2, height0, 1, function(value) {
        height0 = value
    })
    .addRange("waveLength 1", 0, 500, waveLength1, 1, function(value) {
        waveLength1 = value;
    })
    .addRange("height 1", 0, height / 4, height1, 1, function(value) {
        height1 = value
    })
    .addRange("res", 0.1, 1, res, 0.01, function(value) {
        res = value
    })
    .setGlobalChangeHandler(update)


update();

function update() {
    context.clear("white");
    context.save();
    context.translate(0, height / 2);
    context.scale(1, -1);

    context.beginPath();
    console.log(res);

    for (var x = 0; x < width; x += res) {
        var y = Math.sin(x * w) * height0;
        context.save();
        context.translate(x, y);
        context.rotate(Math.cos(x * w));
        context.lineTo(0, Math.sin(x * w * waveLength1) * height1);
        context.restore();

    }
    context.stroke();
    context.restore();
}