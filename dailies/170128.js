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

// tags = "math,3d,interactive,lines,perlin,noise"

var context = bitlib.context(0, 0),
    width = context.width,
    height = context.height;

context.lineWidth = 0.25;
context.fillStyle = "white";

var params = {
    xres: 5,
    yres: 2,
    h: 80,
    scale: 0.01,
    shake: 2,
    hueTop: 70,
    hueBottom: 170,
    seed: 0
};

panel
    .bindRange("xres", 2, 50, params.xres, 1, params)
    .bindRange("yres", 2, 50, params.yres, 1, params)
    .bindRange("h", 0, 200, params.h, 1, params)
    .bindRange("scale", 0, 0.05, params.scale, 0.001, params)
    .bindRange("shake", 0, 20, params.shake, 1, params)
    .bindRange("hueTop", 0, 360, params.hueTop, 1, params)
    .bindRange("hueBottom", 0, 360, params.hueBottom, 1, params)
    .bindNumber("seed", 0, 100000, params.seed, 1, params)
    .setGlobalChangeHandler(update);

update();
function update() {
    bitlib.random.seed(params.seed);
    noise.seed(params.seed);
    context.clear();

    for (var y = -50; y < height + 50; y += params.yres) {
        var hue = bitlib.math.map(y, -50, height + 50, params.hueTop, params.hueBottom);
        context.fillStyle = bitlib.color.hsv(hue, 1, 1);
        context.beginPath();
        var offset = Math.sin(y * params.offsetWave) * params.offset;
        for (var x = 0; x <= width; x += params.xres) {
            var ypos = y + noise.perlin2(x * params.scale, y * params.scale) * params.h + bitlib.random.float(-params.shake, params.shake);
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