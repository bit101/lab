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

var context = bitlib.context(window.innerHeight, window.innerHeight),
    width = context.width,
    height = context.height;
context.canvas.style.position = "absolute";
context.canvas.style.left = "50%";
context.canvas.style.transform = "translate(-50%, 0)";
document.body.style.backgroundColor = "black";

context.clear("black");

var x = 0,
    bandSize = 10,
    cx = -0.5,
    cy = 0,
    size = 1.5,
    iter = 64,
    gray = false;

panel
    .addRange("iterations", 1, 1000, iter, 1, function(value) {
        iter = value;
        x = 0;
        anim.start();
    })
    .addBoolean("gray", gray, function(value) {
        gray = value;
        x = 0;
        anim.start();
    })
    .addButton("Reset", function() {
        x = 0;
        cx = -0.5;
        cy = 0;
        size = 1.5;
        anim.start();
    })

context.canvas.addEventListener("click", function(event) {
    var pos = context.canvas.getBoundingClientRect(),
        xpos = event.clientX - pos.left,
        ypos = event.clientY - pos.top;
    context.save();
    context.translate(width / 2, height / 2 );
    context.scale(2, 2);
    context.drawImage(context.canvas, -xpos, -ypos);
    context.restore();
    cx = bitlib.math.map(xpos, 0, width, cx - size, cx + size);
    cy = bitlib.math.map(ypos, 0, width, cy - size, cy + size);
    x = 0;
    size *= 0.5;
    anim.start();
});

var anim = bitlib.anim(update).start();

function update() {
    context.beginPath();
    context.moveTo(x + bandSize, 0);
    context.lineTo(x + bandSize, height);
    context.stroke();
    for(var n = 0; n < bandSize; n++) {
        for(var y = 0; y < height; y++) {
            var zr = bitlib.math.map(x, 0, width, cx - size, cx + size),
                zi = bitlib.math.map(y, 0, height, cy - size, cy + size),
                cr = zr,
                ci = zi;
            for(var i = 0; i < iter; i++) {
                var zrtemp = zr * zr - zi * zi + cr;
                zi = 2 * zr * zi + ci;
                zr = zrtemp;
                if(zr * zr + zi * zi > 4) {
                    if(gray) {
                        context.fillStyle = bitlib.color.gray(i / iter * 255);
                    }
                    else {
                        context.fillStyle = bitlib.color.hsv(i / iter * 180, 1, 1);
                    }
                    context.fillRect(x, y, 1, 1);
                    break;
                }
                context.fillStyle = "black";
                context.fillRect(x, y, 1, 1);
            }
        }
        x++
    }
    if(x > width) {
        anim.stop();
    }
}