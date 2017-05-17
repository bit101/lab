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

// context.clear("black");
var rand = 1,
    rects = false,
    circles = true,
    colors = false;

panel
    .addRange("rand", 0, 1, rand, 0.01, function(value) {
        rand = value;
    })
    .addBoolean("circles", circles, function(value) {
        circles = value;
    })
    .addBoolean("rects", rects, function(value) {
        rects = value;
    })
    .addBoolean("colors", colors, function(value) {
        colors = value;
        if(!colors) {
            context.fillStyle = "black";
        }
    })
    .addButton("Clear", function() {
        context.clear();
    });


bitlib.anim(update).start();

function update() {
    if(bitlib.random.bool(rand)) {
        context.globalCompositeOperation = "xor";
    }
    else {
        context.globalCompositeOperation = "source-over";
    }
    if(colors) {
        context.fillStyle = bitlib.color.randomRGB();
    }
    if(rects) {
        context.fillRect(bitlib.random.float(-200, width),
            bitlib.random.float(-200, height),
            bitlib.random.float(10, 200),
            bitlib.random.float(10, 200));
    }
    if(circles) {
        context.fillCircle(bitlib.random.float(width),
            bitlib.random.float(height),
            bitlib.random.float(5, 100));
    }
}
