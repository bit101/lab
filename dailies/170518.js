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

context.globalCompositeOperation = "xor";
var res = 10;

panel
    .addRange("res", 1, 50, res, 1, function(value) {
        context.clear();
        res = value;
        draw();
    });

draw();

function draw() {
    for(var x = 0; x < width; x += res) {
        context.fillCircle(x, 120, 80 + Math.sin(x * 0.01) * 20);
    }

    for(var x = 0; x < width; x += res) {
        var size = Math.sin(x * 0.01) * 25 + 75;
        context.fillRect(x - size / 2, height / 2 - size / 2, size, size);
    }

    for(var r = 0; r < 100; r += res) {
        context.fillCircle(120 + Math.cos(r * 0.1) * 10, height * 3 / 4 + Math.sin(r * 0.1) * 10, r);
    }

    for(var r = 0; r < 100; r += res) {
        context.fillCircle(width / 2 + Math.cos(r * 0.1) * r, height * 3 / 4 + Math.sin(r * 0.1) * r, r);
    }
    for(var r = 0; r < 100; r += res) {
        context.fillRect(width - 220, height * 3 / 4 - 75, r * 2, r * 2);
    }

}