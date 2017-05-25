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

context.translate(width / 2, height / 2);
var res = 40,
    wave = 0.025,
    tilt = 0.25;
draw();

panel
    .addRange("res", 5, 100, res, 1, function(value) {
        res = value;
        draw();
    })
    .addRange("wave", 0.001, 0.1, wave, 0.001, function(value) {
        wave = value;
        draw();
    })
    .addRange("tilt", 0, 1, 1 - tilt, 0.01, function(value) {
        tilt = 1 - value;
        draw();
    });

function draw() {
    context.clear("white");
    for(var x = -width / 2; x <= width / 2; x += res) {
        for(var y = -height / 2; y < height / 2; y += res) {
            var angle = Math.atan2(y, x),
                dist = Math.sqrt(x * x + y * y),
                scale = bitlib.math.map(Math.sin(dist * wave), -1, 1, tilt, 1);
            context.save();
            context.translate(x, y);
            context.rotate(angle);
            context.scale(scale, 1);
            context.fillCircle(0, 0, res * 0.5);
            context.restore();
        }
    }
}