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

// tags = "math,3d,interactive,lines"

var context = bitlib.context(0, 0),
    width = context.width,
    height = context.height;

context.lineWidth = 0.25;
context.fillStyle = "white";

var params = {
    xres: 10,
    yres: 5,
    wave: 0.03,
    h: 30,
    offset: 100,
    offsetWave: 0.05,
    shake: 0,
    hueTop: 0,
    hueBottom: 60
};

panel
    .bindRange("xres", 2, 50, params.xres, 1, params)
    .bindRange("yres", 2, 50, params.yres, 1, params)
    .bindRange("wave", 0, 0.2, params.wave, 0.01, params)
    .bindRange("h", 2, 50, params.h, 1, params)
    .bindRange("offset", 2, 300, params.offset, 1, params)
    .bindRange("offsetWave", 0, 0.1, params.offsetWave, 0.001, params)
    .bindRange("shake", 0, 20, params.shake, 1, params)
    .bindRange("hueTop", 0, 360, params.hueTop, 1, params)
    .bindRange("hueBottom", 0, 360, params.hueBottom, 1, params)
    .setGlobalChangeHandler(update);

update();
function update() {
    bitlib.random.seed(0);
    context.clear();

    for (var y = -50; y < height + 50; y += params.yres) {
        var hue = bitlib.math.map(y, -50, height + 50, params.hueTop, params.hueBottom);
        context.fillStyle = bitlib.color.hsv(hue, 1, 1);
        context.beginPath();
        var offset = Math.sin(y * params.offsetWave) * params.offset;
        for (var x = 0; x <= width; x += params.xres) {
            var ypos = y + Math.sin((x + offset) * params.wave) * params.h + bitlib.random.float(-params.shake, params.shake);
            if (x) {
                context.lineTo(x, ypos);

            }
            else {
                context.moveTo(x, ypos);
            }
        }
        context.lineTo(width, ypos);
        context.lineTo(width, height);
        context.lineTo(0, height);
        context.fill();
        context.stroke();
    }
}