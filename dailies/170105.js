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

// tags = "lines,3d,animation,interactive,gravity"

/*
    Random line segments. Offset by a force divided by square of distance from mouse. The force oscilates + and -.
 */

var context = bitlib.context(0, 0),
    width = context.width,
    height = context.height;

var xres = 5,
    yres = 10,
    xmouse = 0,
    ymouse = 0,
    a = 0,
    s = 0.1;

context.canvas.addEventListener("mousemove", function(event) {
    xmouse = event.clientX;
    ymouse = event.clientY;
});

context.strokeStyle = "white";
bitlib.anim(60, render).start();


function render() {
    context.clear("black");

    context.beginPath();
    for(var y = 0; y < height; y += yres) {
        context.moveTo(0, y);
        for(var x = 1; x <= width; x += xres) {
            var dx = x - xmouse,
                dy = y - ymouse,
                distSQ = dx * dx + dy * dy,
                force = Math.sin(a) * 500000,
                h = -force / distSQ;
            context.lineTo(x, y + bitlib.random.float(-2, 2) + h);
        }
    }
    a += s;
    context.stroke();
    - 50000 / distSQ
}