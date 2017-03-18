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


var c0 = {
    x: 300,
    y: 325,
    r: 60
};

var c1 = {
    x: 660,
    y: 500,
    r: 150
};

var fill = true,
    draw0 = true,
    draw1 = true,
    drawInner = true,
    drawOuter = true,
    dragCircle,
    offsetX,
    offsetY,
    hue = bitlib.random.int(360),
    bg = bitlib.color.hsv(hue, 0.2, 1);

context.fillStyle = bitlib.color.hsv(hue, 1, 1);

panel
    .addRange("radius 0", 5, 500, c0.r, 1, function(value) {
        c0.r = value;
        draw();
    })
    .addRange("radius 1", 5, 500, c1.r, 1, function(value) {
        c1.r = value;
        draw();
    })
    .addBoolean("fill", fill, function(value) {
        fill = value;
        draw();
    })
    .addBoolean("draw 0", draw0, function(value) {
        draw0 = value;
        draw();
    })
    .addBoolean("draw 1", draw1, function(value) {
        draw1 = value;
        draw();
    })
    .addBoolean("draw inner", drawInner, function(value) {
        drawInner = value;
        draw();
    })
    .addBoolean("draw outer", drawOuter, function(value) {
        drawOuter = value;
        draw();
    })



draw();

context.canvas.addEventListener("mousedown", onMouseDown);

function onMouseDown(event) {
    var dx = event.clientX - c0.x,
        dy = event.clientY - c0.y,
        dist = Math.sqrt(dx * dx + dy * dy);
    if(dist < c0.r) {
        dragCircle = c0;
        offsetX = dx;
        offsetY = dy;
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
        return;
    }
    var dx = event.clientX - c1.x,
        dy = event.clientY - c1.y,
        dist = Math.sqrt(dx * dx + dy * dy);
    if(dist < c1.r) {
        dragCircle = c1;
        offsetX = dx;
        offsetY = dy;
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    }
}

function onMouseMove(event) {
    dragCircle.x = event.clientX - offsetX;
    dragCircle.y = event.clientY - offsetY;
    draw();
}

function onMouseUp(event) {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
}


function draw() {
    context.clear(bg);
    var points = circleTangents(c0, c1);



    if(fill) {
        if(!draw0 && draw1) {
            fillAndStroke(c0, draw0);
            fillAndStroke(c1, draw1);
        }
        else {
            fillAndStroke(c1, draw1);
            fillAndStroke(c0, draw0);
        }

        context.beginPath();
        for(var i = 0; i < points.length; i++) {
            context.lineTo(points[i].x, points[i].y);
        }
        context.fill();
    }


    if(drawOuter) {
        context.beginPath();
        context.moveTo(points[0].x, points[0].y);
        context.lineTo(points[3].x, points[3].y);
        context.moveTo(points[1].x, points[1].y);
        context.lineTo(points[2].x, points[2].y);
        context.stroke();
    }
    if(drawInner) {
        context.beginPath();
        context.moveTo(points[0].x, points[0].y);
        context.lineTo(c0.x, c0.y);
        context.lineTo(points[1].x, points[1].y);

        context.moveTo(points[2].x, points[2].y);
        context.lineTo(c1.x, c1.y);
        context.lineTo(points[3].x, points[3].y);

        context.moveTo(c0.x, c0.y);
        context.lineTo(c1.x, c1.y);

        context.stroke();
    }

    if(draw0) {
        context.strokeCircle(c0.x, c0.y, c0.r);
    }
    if(draw1) {
        context.strokeCircle(c1.x, c1.y, c1.r);
    }

}

function fillAndStroke(c, stroke) {
    context.fillCircle(c.x, c.y, c.r);
    if(drawOuter && !stroke) {
        context.strokeCircle(c.x, c.y, c.r);
    }
}


// One of the great aspects of this project is that I now have a record of useful functions and techniques.
// I probably won't use this often enough to put it in a library, but I do need it once in a while.
// Next time I won't have to figure it out from scratch again, just come here and grab it.

function circleTangents(c0, c1) {
    // probably not the most efficient algorithm possible.
    // but it works and I understand it.
    var h = bitlib.math.dist(c0, c1), // hypotenuse of triangle
        adj = c0.r - c1.r,            // adjacent side of triangle
        a0 = Math.atan2(c1.y - c0.y,
                        c1.x - c0.x), // angle between circles
        a1 = Math.acos(adj / h),      // angle of triangle
        a2 = a0 - a1,                 // angle to one tangent point
        a3 = a0 + a1,                 // angle to other tangent point
        p0 = {                        // x, y of one tangent point
            x: c0.x + Math.cos(a2) * c0.r,
            y: c0.y + Math.sin(a2) * c0.r
        },
        p1 = {                        // x, y of other tangent point
            x: c0.x + Math.cos(a3) * c0.r,
            y: c0.y + Math.sin(a3) * c0.r
        };
    // swap everything to the other circle's viewpoint and repeat.
    a0 += Math.PI;
    a1 = Math.acos(-adj / h);
    a2 = a0 - a1;
    a3 = a0 + a1;
    var p2 = {
            x: c1.x + Math.cos(a2) * c1.r,
            y: c1.y + Math.sin(a2) * c1.r
        },
        p3 = {
            x: c1.x + Math.cos(a3) * c1.r,
            y: c1.y + Math.sin(a3) * c1.r
        };
    return [p0, p1, p2, p3];
}