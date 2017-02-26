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

// surprising there's not a more mathematical way to do this.

var context = bitlib.context(0, 0),
    width = context.width,
    height = context.height;
context.lineWidth = 0.5;

var pointCount = 50,
    segmentize = false;

panel
    .addRange("Point Count", 2, 200, pointCount, 1, function(value) {
        pointCount = value - 1;
    })
    .addBoolean("Segmentize", segmentize, function(value) {
        segmentize = value;
    });

var handles = Handles.create(context);

// handles.add(bitlib.random.int(250, width), bitlib.random.int(height));
// handles.add(bitlib.random.int(250, width), bitlib.random.int(height));
// handles.add(bitlib.random.int(250, width), bitlib.random.int(height));
// handles.add(bitlib.random.int(250, width), bitlib.random.int(height));

handles.add(250, 50);
handles.add(width - 50, height - 50);
handles.add(250, height / 2);
handles.add(width - 150, height - 150);

var p0 = handles.get(0),
    p1 = handles.get(1),
    p2 = handles.get(2),
    p3 = handles.get(3);

bitlib.anim(update).start();

function update() {
    context.clear("white");

    handles.cubic(0, 1, 2, 3);
    handles.render();

    if(segmentize) {
        var path = bezToPath(p0, p1, p2, p3, pointCount);
        for (var i = 0; i < path.length; i++) {
            context.strokeCircle(path[i].x, path[i].y, 2);
        }
    }
    else {
        for (var i = 0; i <= pointCount; i++) {
            var t = i / pointCount,
                p = bitlib.math.bezier(p0, p1, p2, p3, t);
            context.strokeCircle(p.x, p.y, 2);
        }
    }
}

// convert bezier curve into path with 'count' number of segments.
function bezToPath(p0, p1, p2, p3, count) {
    var len = bezLength(p0, p1, p2, p3),
        segmentLength = len / count,
        pA = p0,
        res = 0.0001, // lower res value = more accurate segment sizes
        path = [pA],
        dist = 0;
    for(var t = res; t < 1; t += res) {
        var pB = bitlib.math.bezier(p0, p1, p2, p3, t);
        dist += bitlib.math.dist(pA, pB);
        if(dist >= segmentLength) {
            path.push(pB);
            dist = 0;
        }
        pA = pB;
    }
    path.push(p3);
    return path;
}


// get a rough measurement of the length of a bezier curve.
function bezLength(p0, p1, p2, p3) {
    var pA = p0,
        dist = 0,
        interval = 1000; // higher interval = more accurate length measurement
    // sample points at close intervals along the curve. add the distance between that point and the previous one.
    for(var i = 1; i <= interval; i++) {
        var t = i / interval,
            pB = bitlib.math.bezier(p0, p1, p2, p3, t);
        dist += bitlib.math.dist(pA, pB);
        pA = pB;
    }
    return dist;
}

