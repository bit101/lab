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

// tags = "lines,math,geometry,epitrochoid,trochoid,interactive"


var context = bitlib.context(0, 0),
    width = context.width,
    height = context.height;

var params = {
    r1:100,
    r2: 51,
    r3: 75,
    res: 0.01
};

var angle = 0;

panel
    .bindRange("r1", 5, 400, params.r1, 1, params)
    .bindRange("r2", 5, 400, params.r2, 1, params)
    .bindRange("r3", 5, 400, params.r3, 1, params)
    .bindRange("res", 0.01, 0.5, params.res, 0.01, params)
    .addBoolean("show circles", true)
    .addButton("Clear", function() {
        angle = 0;
    });


var y = height / 2;

bitlib.anim(update).start();



function update() {
    var points = [];

    context.clear();
    context.save();
    context.translate(width / 2, height / 2);
    context.strokeStyle = "black";

    context.beginPath();
    for(var i = 0; i < angle; i += params.res) {
        var x = (params.r1 + params.r2) * Math.cos(i) - params.r3 * Math.cos((params.r1 + params.r2) * i / params.r2),
            y = (params.r1 + params.r2) * Math.sin(i) - params.r3 * Math.sin((params.r1 + params.r2) * i / params.r2);
        points.push({x: x, y: y});
        context.lineTo(x, y);
    }
    context.stroke();

    if(panel.getValue("show circles") && points.length > 0) {
        var x = Math.cos(angle) * (params.r1 + params.r2),
            y = Math.sin(angle) * (params.r1 + params.r2);
        context.strokeStyle = "red";
        context.strokeCircle(0, 0, params.r1);
        context.strokeCircle(x, y, params.r2);
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(points[points.length - 1].x, points[points.length - 1].y);
        context.stroke();
    }

    angle += params.res;


    context.restore();
}