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

// tags = "geometry,math,interactive"

/*
 From http://amzn.to/2iAqyJB Chapter 3.
 */


var context = bitlib.context(0, 0),
    width = context.width,
    height = context.height;


var handles = makeHandles(),
    activeHandle = null;

context.canvas.addEventListener("mousedown", onMouseDown);

bitlib.anim(update).start();

function update() {
    context.clearRect(0, 0, width, height);
    drawHandles();
    drawQuad();
    drawPGram();
}


function onMouseDown(event) {
    activeHandle = getActiveHandle(event.clientX, event.clientY);
    if(activeHandle) {
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    }
}

function onMouseMove(event) {
    activeHandle.x = event.clientX - activeHandle.offsetX;
    activeHandle.y = event.clientY - activeHandle.offsetY;
}

function onMouseUp(event) {
    activeHandle = null;
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
}



function drawHandles() {
    context.fillStyle = "black";
    for(var i = 0; i < handles.length; i++) {
        var handle = handles[i];
        context.fillCircle(handle.x, handle.y, 10);
    }
}

function drawQuad() {
    context.beginPath();
    context.strokeStyle = "black";
    for(var i = 0; i < 4; i++) {
        context.lineTo(handles[i].x, handles[i].y);
    }
    context.closePath();
    context.stroke();
}

function drawPGram() {
    var points = [];
    for(var i = 0; i < 4; i++) {
        points.push({
            x: (handles[i].x + handles[(i + 1) % 4].x) / 2,
            y: (handles[i].y + handles[(i + 1) % 4].y) / 2,
        });
    }
    context.beginPath();
    context.strokeStyle = "red";
    for(i = 0; i < 4; i++) {
        context.lineTo(points[i].x, points[i].y);
    }
    context.closePath();
    context.stroke();

    context.fillStyle = "red";
    for(i = 0; i < 4; i++) {
        context.fillCircle(points[i].x, points[i].y, 3);
    }
}

function getActiveHandle(x, y) {
    for(var i = 0; i < handles.length; i++) {
        var handle = handles[i],
            dx = handle.x - x,
            dy = handle.y - y,
            dist = Math.sqrt(dx * dx + dy * dy);
        if(dist < 10) {
            handle.offsetX = x - handle.x;
            handle.offsetY = y - handle.y;
            return handle;
        }
    }
    return null;
}

function makeHandles() {
    return [
        {
            x: bitlib.random.float(250, width),
            y: bitlib.random.float(height)
        },
        {
            x: bitlib.random.float(250, width),
            y: bitlib.random.float(height)
        },
        {
            x: bitlib.random.float(250, width),
            y: bitlib.random.float(height)
        },
        {
            x: bitlib.random.float(250, width),
            y: bitlib.random.float(height)
        }
    ];
}
