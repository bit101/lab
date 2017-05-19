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
var scale = 0.6;
var dist = 150;
var w = 100;
var h = 100;
var iter = 5;
var alpha = 1;
var fill = false;
var angles = [],
    num = 4;
for(var i = 0; i < num; i++) {
    angles.push(bitlib.random.float(Math.PI * 2));
}


panel
    .addRange("scale", 0, 1, scale, 0.01, function(value) {
        scale = value;
    })
    .addRange("dist", 0, 300, dist, 1, function(value) {
        dist = value;
    })
    .addRange("w", 0, 300, w, 1, function(value) {
        w = value;
    })
    .addRange("h", 0, 300, h, 1, function(value) {
        h = value;
    })
    .addRange("iter", 1, 7, iter, 1, function(value) {
        iter = value;
    })
    .addRange("alpha", 0, 1, alpha, 0.01, function(value) {
        alpha = value;
    })
    .addBoolean("fill", fill, function(value) {
        fill = value;
    })
   .addButton("randomize", function() {
        panel.setValue("scale", bitlib.random.float(0.4, 0.7));
        panel.setValue("dist", bitlib.random.float(20, 300));
        panel.setValue("w", bitlib.random.float(20, 300));
        panel.setValue("h", bitlib.random.float(20, 300));
    })
    .setGlobalChangeHandler(start);

var anglePanel = QuickSettings.create(width - 220, 20, "Angles")
    .addRange("angle 0", 0, Math.PI * 2, angles[0], 0.01, function(value) {
        angles[0] = value;
    })
    .addRange("angle 1", 0, Math.PI * 2, angles[1], 0.01, function(value) {
        angles[1] = value;
    })
    .addRange("angle 2", 0, Math.PI * 2, angles[2], 0.01, function(value) {
        angles[2] = value;
    })
    .addRange("angle 3", 0, Math.PI * 2, angles[3], 0.01, function(value) {
        angles[3] = value;
    })
    .addButton("randomize", function() {
        anglePanel.setValue("angle 0", bitlib.random.float(0, Math.PI * 2));
        anglePanel.setValue("angle 1", bitlib.random.float(0, Math.PI * 2));
        anglePanel.setValue("angle 2", bitlib.random.float(0, Math.PI * 2));
        anglePanel.setValue("angle 3", bitlib.random.float(0, Math.PI * 2));
    })
    .setGlobalChangeHandler(start);

start();

function start() {
    context.clear("white");
    context.save();
    context.translate(width / 2, height / 2);
    context.globalAlpha = alpha;
    draw(iter);
    context.restore();
}

function draw(iter) {
    for(var i = 0; i < num; i++) {
        context.save();
        context.rotate(angles[i]);
        context.translate(dist, 0);
        if(fill) {
            context.fillRect(-w / 2, -h / 2, w, h);
        }
        else {
            context.strokeRect(-w / 2, -h / 2, w, h);
        }
        if(iter) {
            context.scale(scale, scale);
            draw(iter - 1);
        }
        context.restore();
    }
}