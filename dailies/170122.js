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
    Final phase of a Guilloche Pattern.
    We just repeat the second phase with three different sets of border params and guilloche params.
 */

// tags = "lines,math,geometry,guilloche,interactive"


var context = bitlib.context(0, 0),
    width = context.width,
    height = context.height;


var params = {
    borderRadius0: 120,
    borderHeight0: 25,
    borderNodes0: 6,
    nodes0: 57,
    divisor0: 53,
    color0: "#330000",

    borderRadius1: 234,
    borderHeight1: 22,
    borderNodes1: 19,
    nodes1: 145,
    divisor1: 88,
    color1: "#003300",

    borderRadius2: 334,
    borderHeight2: 12,
    borderNodes2: 29,
    nodes2: 175,
    divisor2: 108,
    color2: "#000033",

    lineWidth:  0.5
};
var res = 0.01;

panel
    .bindRange("lineWidth", 0.1, 1, params.lineWidth, 0.05, params);

var panel2 = QuickSettings.create(220, 10, "Ring 0")
    .bindRange("borderRadius0", 0, 400, params.borderRadius0, 1, params)
    .bindRange("borderHeight0", 0, 200, params.borderHeight0, 1, params)
    .bindRange("borderNodes0", 0, 50, params.borderNodes0, 1, params)
    .bindRange("nodes0", 0, 200, params.nodes0, 1, params)
    .bindRange("divisor0", 1, 200, params.divisor0, 1, params)
    .bindColor("color0", params.color0, params)
    .setGlobalChangeHandler(draw);

var panel3 = QuickSettings.create(220, height - 360, "Ring 1")
    .bindRange("borderRadius1", 0, 400, params.borderRadius1, 1, params)
    .bindRange("borderHeight1", 0, 200, params.borderHeight1, 1, params)
    .bindRange("borderNodes1", 0, 50, params.borderNodes1, 1, params)
    .bindRange("nodes1", 0, 200, params.nodes1, 1, params)
    .bindRange("divisor1", 1, 200, params.divisor1, 1, params)
    .bindColor("color1", params.color1, params)
    .setGlobalChangeHandler(draw);

var panel4 = QuickSettings.create(width - 220, 10, "Ring 2")
    .bindRange("borderRadius2", 0, 400, params.borderRadius2, 1, params)
    .bindRange("borderHeight2", 0, 200, params.borderHeight2, 1, params)
    .bindRange("borderNodes2", 0, 50, params.borderNodes2, 1, params)
    .bindRange("nodes2", 0, 200, params.nodes2, 1, params)
    .bindRange("divisor2", 1, 200, params.divisor2, 1, params)
    .bindColor("color2", params.color2, params)
    .setGlobalChangeHandler(draw);


draw();

function draw() {
    context.clear();
    context.save();
    context.translate(width / 2, height / 2);
    context.lineWidth = params.lineWidth;
    drawGuilloche(0, 0, 0,
        params.borderRadius0, params.borderNodes0, params.borderHeight0, params.nodes0, params.divisor0, params.color0);
    drawGuilloche(params.borderRadius0, params.borderNodes0, params.borderHeight0,
        params.borderRadius1, params.borderNodes1, params.borderHeight1, params.nodes1, params.divisor1, params.color1);
    drawGuilloche(params.borderRadius1, params.borderNodes1, params.borderHeight1,
        params.borderRadius2, params.borderNodes2, params.borderHeight2, params.nodes2, params.divisor2, params.color2);
    context.restore();
}

function drawGuilloche(r0, n0, h0, r1, n1, h1, nodes, divisor, color) {
    context.strokeStyle = color;
    context.beginPath();
    for(var a = 0; a < Math.PI * 2 * divisor; a += res) {
        var radius0 = r0 + Math.sin(a * n0) * h0,
            radius1 = r1 + Math.sin(a * n1) * h1,
            r = (radius0 + radius1) / 2 + Math.sin(a * nodes / divisor) * (radius1 - radius0) / 2,
            x = Math.cos(a) * r,
            y = Math.sin(a) * r;
        context.lineTo(x, y);
    }
    context.closePath();
    context.stroke();
}