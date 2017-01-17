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

// tags = "lines,math,geometry,cycloid,trochoid,interactive"

var context = bitlib.context(0, 0),
    width = context.width,
    height = context.height;

var params = {
    r1:100,
    r2: 50,
    x: width * 0.75
};

panel
    .bindRange("r1", 5, 400, params.r1, 1, params)
    .bindRange("r2", 5, 400, params.r2, 1, params)
    .bindRange("x", -100, width + 100, params.x, 1, params)
    .addHTML("Tip", "Use the cursor keys to move the sliders by 1")
    .showTitle("Tip")
    .setGlobalChangeHandler(update);


var y = height / 2;
update();


function update() {
    context.clear();
    context.beginPath();
    context.moveTo(0, y + params.r1);
    context.lineTo(width, y + params.r1);
    context.stroke();

    context.strokeCircle(params.x, y, params.r1);

    var a = params.x / params.r1,
        x1 = params.x + Math.cos(a) * params.r2,
        y1 = y + Math.sin(a) * params.r2;
    context.beginPath();
    context.moveTo(params.x, y);
    context.lineTo(x1, y1);
    context.stroke();
    context.strokeCircle(x1, y1, 5);
    context.strokeCircle(params.x + Math.cos(a) * params.r1, y + Math.sin(a) * params.r1, 5);

    var points = [];
    for(var x = -100; x <= params.x; x++) {
        var angle = x / params.r1;
        var x1 = x + Math.cos(angle) * params.r2,
            y1 = y + Math.sin(angle) * params.r2;
        points.push({x: x1, y: y1});
    }

    context.beginPath();
    for(var i = 0; i < points.length; i++) {
        context.lineTo(points[i].x, points[i].y);
    }
    context.stroke();

    points = [];
    for(var x = -100; x <= params.x; x++) {
        var angle = x / params.r1;
        var x1 = x + Math.cos(angle) * params.r1,
            y1 = y + Math.sin(angle) * params.r1;
        points.push({x: x1, y: y1});
    }

    context.setLineDash([5, 5]);
    context.beginPath();
    for(var i = 0; i < points.length; i++) {
        context.lineTo(points[i].x, points[i].y);
    }
    context.stroke();
    context.setLineDash([]);
}