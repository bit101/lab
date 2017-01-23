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

// tags = "lines,math,geometry,rose,interactive"

var context = bitlib.context(0, 0),
    width = context.width,
    height = context.height,
    radius = Math.min(width, height) / 2 - 20;

var params = {
    k: 3,
    d: 29,
    fillRose: true,
    drawRose: true,
    drawMaurer: true,
    fillColor: "#ff00cc"
};

// you can set the high limits for k and d up around 200 for additional effects.
// for an initial demo, it gets too comfusing. best looking drawings have lower numbers, imo.
panel
    .bindRange("k", 1, 30, params.k, 1, params)
    .bindRange("d", 1, 100, params.d, 0.1, params)
    .bindBoolean("fillRose", params.fillRose, params)
    .bindBoolean("drawRose", params.drawRose, params)
    .bindBoolean("drawMaurer", params.drawMaurer, params)
    .bindColor("fillColor", params.fillColor, params)
    .setGlobalChangeHandler(draw);


draw();

function draw() {
    context.clear();
    context.save();


    context.translate(width / 2, height / 2);

    var k = params.k,
        d = params.d;

    if (params.fillRose || params.drawRose) {
        context.lineWidth = 1;
        context.fillStyle = params.fillColor;
        context.beginPath();
        for (var i = 0; i < Math.PI * 2; i += 0.01) {
            var r = Math.cos(k * i) * radius,
                x = Math.cos(i) * r,
                y = Math.sin(i) * r;
            context.lineTo(x, y);
        }
    }
    if (params.fillRose) {
        context.fill();
    }
    if (params.drawRose) {
        context.stroke();
    }

    if (params.drawMaurer) {
        context.lineWidth = 0.5;
        context.beginPath();
        for (var i = 0; i <= 360 * d; i += d) {
            var angle = i * Math.PI / 180,
                r = Math.cos(k * angle) * radius,
                x = Math.cos(angle) * r,
                y = Math.sin(angle) * r;
            context.lineTo(x, y);
        }
        context.stroke();
    }

    context.restore();
}