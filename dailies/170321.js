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

var x = 0,
    y = 0;

var model = {
    a: -0.97,
    b: 1.65,
    c: 1.02,
    d: 1.19
};

function randomizeModel() {
    panel2.setValue("a", bitlib.random.float(0, -2));
    panel2.setValue("b", bitlib.random.float(0, 2));
    panel2.setValue("c", bitlib.random.float(1, 1.5));
    panel2.setValue("d", bitlib.random.float(0, 2));
}


var baseHue = 0;
var hueRange = 40;
var scale = 250;
var pointSize = 0.1;
var alpha = 0.2;
var fast = false;

var panel2 = QuickSettings.create(width - 220, 20, "Attractor Settings")
    .addButton("Randomize", randomizeModel)
    .addBoolean("fast preview", fast, function(value) {
        fast = value;
    })
    .bindRange("a", -2, 2, model.a, 0.01, model)
    .bindRange("b", -2, 2, model.b, 0.01, model)
    .bindRange("c", -2, 2, model.c, 0.01, model)
    .bindRange("d", -2, 2, model.d, 0.01, model)
    .addRange("scale", 1, 1000, scale, 1, function(value) {
        scale = value;
    })
    .addRange("point size", 0.05, 1, pointSize, 0.01, function(value) {
        pointSize = value;
    })
    .addRange("alpha", 0.1, 1, alpha, 0.01, function(value) {
        alpha = value;
    })
    .setGlobalChangeHandler(function() {
        clear();
    })
    .setKey("h");



function clear() {
    x = 0;
    y = 0;
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.globalAlpha = 1;
    context.clear("black");
    if(!fast) {
        context.globalAlpha = alpha;
    }
    context.translate(width / 2, height / 2);
}

clear();
bitlib.anim(update).start();

function update() {
    for(var i = 0; i < 1000; i++) {
        draw();
    }
}

function draw() {
    var x1 = Math.sin(model.a * y) + model.c * Math.cos(model.a * x),
        y1 = Math.sin(model.b * x) + model.d * Math.cos(model.b * y);
    var dx = x1 - x,
        dy = y1 - y,
        dist = Math.sqrt(dx * dx + dy * dy);
    hue = baseHue + dist * hueRange;
    context.fillStyle = bitlib.color.hsv(hue, 1, 1);
    context.fillCircle(x * scale, y * scale, fast ? 2 : pointSize);
    x = x1;
    y = y1;
}