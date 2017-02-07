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
context.lineJoin = "round";

var model = {
    perspective:  300,
    centerZ: 500,
    speed:  0.02,
    separation:  30,
    drawLines: true,
    dotSize: 20,
    lineWidth: 1,
    gridSize: 50
};

QuickSettings.create(width - 220, 10)
    .bindRange("perspective", 100, 1000, model.perspective, 1, model)
    .bindRange("centerZ", 500, 2500, model.centerZ, 1, model)
    .bindRange("speed", -0.1, 0.1, model.speed, 0.01, model)
    .bindRange("separation", 0, 500, model.separation, 1, model)
    .bindRange("dotSize", 1, 100, model.dotSize, 1, model)
    .bindRange("lineWidth", 1, 100, model.lineWidth, 1, model)
    .bindRange("gridSize", 5, 100, model.gridSize, 1, model)
    .bindBoolean("drawLines", model.drawLines, model);

var points = [],
    num = 100;

for(var i = 0; i < num; i++) {
    points.push({
        x: bitlib.random.float(-500, 500),
        y: bitlib.random.float(-height / 2, height / 2),
        z: bitlib.random.float(-500, 500)
    });
}

bitlib.anim(update).start();

function update() {
    var cos = Math.cos(model.speed),
        sin = Math.sin(model.speed);
    context.clear();
    context.save();
    context.globalCompositeOperation = "darken"; // makes overlap areas dark instead of only top color

    context.strokeStyle = "black";
    context.lineWidth = 0.25;
    context.beginPath();
    for(var x = 0; x < width; x += model.gridSize) {
        context.moveTo(x + 0.5, 0);
        context.lineTo(x + 0.5, height);
    }
    for(var y = 0; y < height; y += model.gridSize) {
        context.moveTo(0, y + 0.5);
        context.lineTo(width, y + 0.5);
    }
    context.stroke();

    context.translate(width / 2, height / 2);
    context.lineWidth = model.lineWidth;

    for(var i = 0; i < num; i++) {
        var p = points[i],
            x = p.x * cos - p.z * sin,
            z = p.z * cos + p.x * sin;
        p.x = x;
        p.z = z;
    }


    if(model.drawLines) {
        context.beginPath();
        context.strokeStyle = "#ff0000";
        for (var i = 0; i < num; i++) {
            var p = points[i],
                scale = model.perspective / (model.perspective + p.z + model.centerZ),
                x = (p.x - model.separation) * scale,
                y = p.y * scale;
            context.lineTo(x, y);
        }
        context.stroke();

        context.beginPath();
        context.strokeStyle = "#00ffff";
        for (var i = 0; i < num; i++) {
            var p = points[i],
                scale = model.perspective / (model.perspective + p.z + model.centerZ),
                x = (p.x + model.separation) * scale,
                y = p.y * scale;
            context.lineTo(x, y);
        }
        context.stroke();
    }
    else {
        context.fillStyle = "#ff0000";
        for (var i = 0; i < num; i++) {
            var p = points[i],
                scale = model.perspective / (model.perspective + p.z + model.centerZ),
                x = (p.x - model.separation) * scale,
                y = p.y * scale;
            context.fillCircle(x, y, Math.max(0, model.dotSize * scale));
        }
        context.fillStyle = "#00ffff";
        for (var i = 0; i < num; i++) {
            var p = points[i],
                scale = model.perspective / (model.perspective + p.z + model.centerZ),
                x = (p.x + model.separation) * scale,
                y = p.y * scale;
            context.fillCircle(x, y, Math.max(0, model.dotSize * scale));
        }
    }

    context.restore();
}