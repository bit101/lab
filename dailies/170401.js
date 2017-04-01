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
context.lineWidth = 0.5;


var handles = Handles.create(context);

var p0 = handles.add(250, 50),
    p1 = handles.add(width - 50, 50),
    p2 = handles.add(250, height - 50),
    p3 = handles.add(width - 150, height - 150);

var grid = [],
    res = 20,
    rows = Math.ceil(height / res),
    cols = Math.ceil(width / res),
    maxDist = 100,
    bezRes = 0.01,
    showPoints = false;

panel
    .addRange("grid res", 20, 100, res, 1, function(value) {
        res = value;
        rows = Math.ceil(height / res);
        cols = Math.ceil(width / res);
        createGrid();
    })
    .addRange("bez res", 0.01, 0.1, bezRes, 0.001, function(value) {
        bezRes = value;
    })
    .addBoolean("show points", showPoints, function(value) {
        showPoints = value;
    })
    .addRange("dist", 20, 200, maxDist, 1, function(value) {
        maxDist = value;
    });


createGrid();

function createGrid() {
    grid = [];
    for (var i = 0; i < cols; i++) {
        grid[i] = [];
        for (var j = 0; j < rows; j++) {
            grid[i][j] = 0;
            // context.strokeCircle(i * res, j * res, 2);
        }
    }
}

bitlib.anim(update).start();
// update();
function update() {
    context.clear("white");
    
    handles.cubic(0, 1, 2, 3);
    handles.render();
    for(var t = 0; t <= 1; t += bezRes) {
        var pa = bitlib.math.bezier(p0, p1, p2, p3, t),
            pb = bitlib.math.bezier(p0, p1, p2, p3, t + 0.01);
        if(showPoints) {
            context.lineWidth = 0.1;
            context.strokeCircle(pa.x, pa.y, maxDist);
            context.lineWidth = 0.5;
            context.strokeCircle(pa.x, pa.y, 2);
        }
        for(var i = 0; i < cols; i++) {
            for (var j = 0; j < rows; j++) {
                grid[i][j] *= 0.999;
                var angle = Math.atan2(pb.y - pa.y, pb.x - pa.x),
                    x = i * res
                    y = j * res,
                    dx = pa.x - x,
                    dy = pa.y - y,
                    distSQ = dx * dx + dy * dy,
                    dist = Math.sqrt(distSQ);
                if(dist < maxDist) {
                    grid[i][j] += (angle - grid[i][j]) / dist;
                }
            }
        }
    }
    
    context.beginPath();
    var r = res * 0.75;
    for(var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            var x = i * res,
                y = j * res,
                a = grid[i][j];
            context.moveTo(x, y)
            context.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r);
        }
    }
    context.stroke();
}
