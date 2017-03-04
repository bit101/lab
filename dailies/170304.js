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

var points = [];

var arm0 = {
    length: 26,
    angle:  0,
    speed:  -0.025
};
var arm1 = {
    length: 150,
    angle:  0,
    speed:  0.05
};
var arm2 = {
    length: 75,
    angle:  0,
    speed:  -0.099
};
var arm3 = {
    length: 38,
    angle:  0,
    speed:  -0.199
};

panel
    .addRange("arm0 length", 0, 300, arm0.length, 1, function(value) {
        arm0.length = value;
    })
    .addRange("arm0 speed", -0.2, 0.2, arm0.speed, 0.001, function(value) {
        arm0.speed = value;
    })
    .addRange("arm1 length", 0, 300, arm1.length, 1, function(value) {
        arm1.length = value;
    })
    .addRange("arm1 speed", -0.2, 0.2, arm1.speed, 0.001, function(value) {
        arm1.speed = value;
    })
    .addRange("arm2 length", 0, 300, arm2.length, 1, function(value) {
        arm2.length = value;
    })
    .addRange("arm2 speed", -0.2, 0.2, arm2.speed, 0.001, function(value) {
        arm2.speed = value;
    })
    .addRange("arm3 length", 0, 300, arm3.length, 1, function(value) {
        arm3.length = value;
    })
    .addRange("arm3 speed", -0.2, 0.2, arm3.speed, 0.001, function(value) {
        arm3.speed = value;
    })
    .setGlobalChangeHandler(function() {
        points = [];
        arm0.angle = arm1.angle = arm2.angle = arm3.angle = 0;
    });

bitlib.anim(update).start();

function update() {
    context.clear();
    context.save();
    context.translate(width / 2, height / 2);
    drawPoints();

    context.strokeStyle = "red";
    context.lineWidth = 2;
    context.strokeCircle(0, 0, 3);
    context.beginPath();
    context.moveTo(0, 0);
    var angle = arm0.angle,
        x = Math.cos(angle) * arm0.length,
        y = Math.sin(angle) * arm0.length;
    context.lineTo(x, y);
    angle += arm1.angle;
    x += Math.cos(angle) * arm1.length;
    y += Math.sin(angle) * arm1.length;
    context.lineTo(x, y);
    angle += arm2.angle;
    x += Math.cos(angle) * arm2.length;
    y += Math.sin(angle) * arm2.length;
    context.lineTo(x, y);
    angle += arm3.angle;
    x += Math.cos(angle) * arm3.length;
    y += Math.sin(angle) * arm3.length;
    context.lineTo(x, y);
    context.stroke();
    points.push({
        x: x,
        y: y
    });

    arm0.angle += arm0.speed;
    arm1.angle += arm1.speed;
    arm2.angle += arm2.speed;
    arm3.angle += arm3.speed;

    context.restore();
}


function drawPoints() {
    context.lineWidth = 0.25;
    context.strokeStyle = "black";
    context.beginPath();
    for(var i = 0; i < points.length; i++) {
        context.lineTo(points[i].x, points[i].y);
    }
    context.stroke();
}