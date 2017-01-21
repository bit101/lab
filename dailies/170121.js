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

/*
    Second phase of a Guilloche Pattern.
    Same basic concept as phase one, but rather than having a simple inner radius and outer radius,
    we vary those bounds using two separate sine waves with separate heights.
    The inner sine wave finds the mid point between those two waves at each point around the circle and bases the wave
    position and height on that.
 */

// tags = "lines,math,geometry,guilloche,interactive"


var context = bitlib.context(0, 0),
    width = context.width,
    height = context.height;


var params = {
    r0: 75,
    h0: 20,
    n0: 6,
    r1: 300,
    h1: 50,
    n1:  17,
    nodes: 141,
    divisor: 119,
    lineWidth:  0.5
};
var res = 0.01;

panel
    .bindRange("r0", 0, 400, params.r0, 1, params)
    .bindRange("h0", 0, 200, params.h0, 1, params)
    .bindRange("n0", 0, 50, params.n0, 1, params)
    .bindRange("r1", 0, 400, params.r1, 1, params)
    .bindRange("h1", 0, 200, params.h1, 1, params)
    .bindRange("n1", 0, 50, params.n1, 1, params)
    .bindRange("nodes", 0, 200, params.nodes, 1, params)
    .bindRange("divisor", 1, 200, params.divisor, 1, params)
    .bindRange("lineWidth", 0.1, 1, params.lineWidth, 0.05, params)
    .setGlobalChangeHandler(draw);


draw();

function draw() {
    context.clear();
    context.save();
    context.translate(width / 2, height / 2);
    context.lineWidth = params.lineWidth;
    context.beginPath();
    for(var a = 0; a < Math.PI * 2 * params.divisor; a += res) {
        var r0 = params.r0 + Math.sin(a * params.n0) * params.h0,
            r1 = params.r1 + Math.sin(a * params.n1) * params.h1,
            r = (r0 + r1) / 2 + Math.sin(a * params.nodes / params.divisor) * (r1 - r0) / 2,
            x = Math.cos(a) * r,
            y = Math.sin(a) * r;
        context.lineTo(x, y);
    }
    context.closePath();
    context.stroke();
    context.restore();
}