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


context.fillStyle = "white";
context.lineWidth = 0.5;

var model = {
    maxRadius: height / 2,
    rRes: 3,
    scale: 0.02,
    h: 50,
    yOffset: 2,
    angle: 0.5,
    hueInner: 0,
    hueOuter: 80,
    lineWidth: 0.25,
    seed: 0
};

panel
    .bindRange("maxRadius", 5, width, model.maxRadius, 1, model)
    .bindRange("rRes", 1, 20, model.rRes, 1, model)
    .bindRange("scale", 0, 0.15, model.scale, 0.001, model)
    .bindRange("h", 0, 200, model.h, 1, model)
    .bindRange("yOffset", 0, 10, model.yOffset, 0.1, model)
    .bindRange("angle", 0, 1, model.angle, 0.01, model)
    .bindRange("hueInner", 0, 360, model.hueInner, 1, model)
    .bindRange("hueOuter", 0, 360, model.hueOuter, 1, model)
    .bindRange("lineWidth", 0, 1, model.lineWidth, 0.01, model)
    .bindNumber("seed", 0, 10000, model.seed, 1, model)
    .setGlobalChangeHandler(update);

update();

function update() {
    context.clear("white");
    context.save();
    context.translate(width / 2, height * 0.75);
    noise.seed(model.seed);
    for (var r = model.maxRadius; r >= model.rRes; r -= model.rRes) {
        var hue = bitlib.math.map(r, 0, width / 2, model.hueInner, model.hueOuter);
        context.fillStyle = bitlib.color.hsv(hue, 1, 1);
        context.beginPath();
        var aRes = Math.PI / r;
        for (var a = 0; a < Math.PI * 2; a += aRes) {
            var x = Math.cos(a) * r,
                y = Math.sin(a) * r;
            var radius = r + noise.perlin2(x * model.scale, y * model.scale) * model.h;
            context.lineTo(Math.cos(a) * radius, Math.sin(a) * radius * model.angle);
        }
        context.closePath();
        context.fill();
        if(model.lineWidth) {
            context.lineWidth = model.lineWidth;
            context.stroke();
        }
        context.translate(0, -model.yOffset);
    }
    context.restore();
}