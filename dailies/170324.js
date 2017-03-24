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

// noprotect

var context = bitlib.context(0, 0),
    width = context.width,
    height = context.height;

var res = 10,
    scale = 0.01,
    z = bitlib.random.float(10000),
    border = 0.1,
    th = 0.1,
    r1 = res * (1 - border) / 2,
    r2 = res * (1 - border);

panel
    .addRange("res", 2, 50, res, 1, function(value) {
        res = value;
        r1 = res * (1 - border) / 2;
        r2 = res * (1 - border);
    })
    .addRange("scale", 0.001, 0.03, scale, 0.001, function(value) {
        scale = value;
    })
    .addRange("border percent", 0, 1, border, 0.1, function(value) {
        border = value;
        r1 = res * (1 - border) / 2;
        r2 = res * (1 - border);
    })
    .addRange("threshold", 0, 1, th, 0.01, function(value) {
        th = value;
    });

bitlib.anim(update).start();

function update() {
    context.clear("black");
    for(var x = 0; x < width; x += res) {
        for(var y = 0; y < height; y += res) {
            var n = noise.perlin3(x * scale, y * scale, z * scale)
            if(Math.abs(n) < th) {
                continue;
//         context.fillStyle = "black";
            }
            else if(n < 0) {
                context.fillStyle = "blue";
            }
            else if(n > 0) {
                context.fillStyle = "red";
            }
            context.fillRect(x - r1, y - r1, r2, r2);
        }
    }
    z += 0.1;
}