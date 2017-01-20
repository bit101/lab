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
 First phase of a Guilloche Pattern.
 This is a sine wave plotted around a circle.
 r0 and r1 are the top and bottom of the wave.
 nodes is how many "petals" the pattern will form.
 divisor is how  many times it will go around the circle to form the petals.
 nodes and divisor will be effectively reduced as a fraction.
 So nodes 8 / divisor 4 is equivalent to nodes 4 / divisor 1.
 This is why complex patterns will suddenly jump to very simple ones as you change values.
 */


// tags = "lines,math,geometry,guilloche,interactive"

var context = bitlib.context(0, 0),
    width = context.width,
    height = context.height;


var params = {
    r0: 175,
    r1: 300,
    nodes: 80,
    divisor: 11,
    lineWidth:  0.75
};
var res = 0.01;

panel
    .bindRange("r0", 0, 400, params.r0, 1, params)
    .bindRange("r1", 0, 400, params.r1, 1, params)
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
    var radius = (params.r0 + params.r1) / 2,
        h = (params.r1 - params.r0) / 2;
    for(var a = 0; a < Math.PI * 2 * params.divisor; a += res) {
        var r = radius + Math.sin(a * params.nodes / params.divisor) * h,
            x = Math.cos(a) * r,
            y = Math.sin(a) * r;
        context.lineTo(x, y);
    }
    context.closePath();
    context.stroke();
    context.restore();
}