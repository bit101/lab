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

context.fillStyle = "rgb(0,128,0)";


var points,
    numPoints = 5,
    radius = 300,
    randomSize = 250,
    roughness = 0.5,
    iterations = 8,
    seed = bitlib.random.int(100000),
    drawIntermediate = false,
    drawControlPoints = false,
    shadow = true;


panel
    .addRange("num points", 3, 8, numPoints, 1, function(value) {
        numPoints = value;
    })
    .addRange("radius", 40, height / 2, radius, 1, function(value) {
        radius = value;
    })
    .addRange("randomSize", 0, height / 2, randomSize, 1, function(value) {
        randomSize = value;
    })
    .addRange("roughness", 0, 1, roughness, 0.01, function(value) {
        roughness = value;
    })
    .addRange("iterations", 0, 8, iterations, 1, function(value) {
        iterations = value;
    })
    .addBoolean("draw intermediate", drawIntermediate, function(value) {
        drawIntermediate = value;
    })
    .addBoolean("draw control points", drawControlPoints, function(value) {
        drawControlPoints = value;
    })
    .addBoolean("drop shadow", shadow, function(value) {
        shadow = value;
    })
    .addNumber("seed", 0, 100000, seed, 1, function(value) {
        seed = value;
    })
    .addButton("Randomize Seed", function() {
        panel.setValue("seed", bitlib.random.int(100000));
    })
    .setGlobalChangeHandler(draw);

draw();

function draw() {
    bitlib.random.seed(seed);
    if(shadow) {
        context.setShadow("rgba(0,0,0,0.4)", 2, 2, 10);
    }
    else {
        context.setShadow(null, 0, 0, 0);
    }
    context.clear("#99ccff");
    context.save();
    context.translate(width / 2, height / 2);

    points = [];
    for (var i = 0; i < numPoints; i++) {
        points.push({
            x: Math.cos(i / numPoints * Math.PI * 2) * radius,
            y: Math.sin(i / numPoints * Math.PI * 2) * radius
        });
    }
    points.push(points[0]);

    if(drawControlPoints) {
        for (var i = 0; i < numPoints; i++) {
            context.save();
            context.fillStyle = "black";
            context.fillCircle(points[i].x, points[i].y, 10);
            context.restore();
        }
    }

    points = fracture(points, iterations, randomSize, roughness);
    drawPoints(points);

    context.restore();
}

function drawPoints(points) {
    context.beginPath();
    for(var i = 0; i < points.length; i++) {
        context.lineTo(points[i].x, points[i].y);
    }
    if(drawIntermediate) {
        context.globalAlpha = 0.8 / iterations;
    }
    context.closePath();
    context.fill();
    context.globalAlpha = 1;
    if(drawIntermediate) {
        context.lineWidth = 0.5;
        context.stroke();
    }
}

function fracture(points, iter, size, rough) {
    var result = [points[0]];
    for(var i = 0; i < points.length - 1; i++) {
        var pA = points[i],
            pB = points[i + 1];
        result.push({
            x: (pA.x + pB.x) / 2 + bitlib.random.float(-size, size),
            y: (pA.y + pB.y) / 2 + bitlib.random.float(-size, size)
        });
        result.push(pB);
    }
    if(drawIntermediate) {
        drawPoints(result);
    }
    if(iter) {
        result = fracture(result, iter - 1, size * rough, rough);
    }
    return result;
}
