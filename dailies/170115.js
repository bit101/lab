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


var params = {
    angleX: 0.02,
    angleY: 0.02,
    shake: 0.2,
    length: 30,
    width: 0.1,
    speed: 200
};

context.lineWidth = params.width;

panel
    .bindRange("angleX", 0, 0.05, params.angleX, 0.001, params)
    .bindRange("angleY", 0, 0.05, params.angleY, 0.001, params)
    .bindRange("shake", 0, 1, params.shake, 0.01, params)
    .bindRange("length", 1, 200, params.length, 1, params)
    .bindRange("width", 0.01, 1, params.width, 0.01, params)
    .bindRange("speed", 1, 1000, params.speed, 1, params)
    .setGlobalChangeHandler(function() {
        context.clear();
        context.lineWidth = params.width;
    })



bitlib.anim(update).start();



function update() {

    for(var i = 0; i < params.speed; i++) {
        doSomethingCool();
    }
}

function doSomethingCool() {
    var lineA = makeLine();
    drawLine(lineA);
}






function makeLine() {
    p0 = {
        x: bitlib.random.float(width),
        y: bitlib.random.float(height)
    };

    var angle = Math.sin(p0.x * params.angleX) + Math.cos(p0.y * params.angleY) + bitlib.random.float(-params.shake, params.shake);
    var p1 = {
        x: p0.x + Math.cos(angle) * params.length,
        y: p0.y + Math.sin(angle) * params.length
    };

    return {
        p0: p0,
        p1: p1
    };
}

function drawLine(line) {
    // context.strokeStyle = bitlib.color.hsv(hue += 0.01, 1, 1);
    context.beginPath();
    context.moveTo(line.p0.x, line.p0.y);
    context.lineTo(line.p1.x, line.p1.y);
    context.stroke();
}