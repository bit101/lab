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

context.translate(width / 2, height / 2);

context.fillStyle = "black";
context.fillRect(-width / 2, -height / 2, width, height);

var x = 0,
    y = 0,
    orbit = 0,
    angle = 4.47,
    scale = 400,
    step = 1 / 1000,
    points = 150,
    startHue = 0,
    maxHue = 0.5,
    sat = 1;

panel
    .addRange("angle", 0, Math.PI * 2, angle, 0.01, function(value) {
        angle = value;
    })
    .addRange("scale", 100, 1000, scale, 1, function(value) {
        scale = value;
    })
    .addRange("res", 1, 30, 1, 1, function(value) {
        step = value / 1000;
    })
    .addRange("points per orbit", 50, 1000, points, 1, function(value) {
        points = value;
    })
    .addRange("color cycling", 0.1, 10, 1 / maxHue, 0.1, function(value) {
        maxHue = 1 / value;
    })
    .addRange("starting hue", 0, 360, startHue, 1, function(value) {
        startHue = value;
    })
    .addRange("saturation", 0, 1, sat, 0.01, function(value) {
        sat = value;
    })
    .setGlobalChangeHandler(function() {
        orbit = 0;
        x = 0;
        y = 0;
        context.fillStyle = "black";
        context.fillRect(-width / 2, -height / 2, width, height);
    
    })



var anim = bitlib.anim(update).start();

function update() {
    var hue = bitlib.math.map(orbit, 0, maxHue, 0, 360);
    context.fillStyle = bitlib.color.hsv(startHue + hue, sat, 1);
    for(var i = 0; i < points; i++) {
        // context.fillRect(x * scale, y * scale, 0.25, 0.25);
        context.fillCircle(x * scale, y * scale, 0.1);
        var x1 = x * Math.cos(angle) + (x * x - y) * Math.sin(angle),
            y1 = x * Math.sin(angle) - (x * x - y) * Math.cos(angle);
        x = x1;
        y = y1;
    }
    orbit += step;
    x = orbit;
    y = orbit;
}
