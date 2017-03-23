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

var res = 12;
var scale = 0.01;
var z = 0;
context.fillStyle = "green";
context.font = res + "px monospace";

panel
    .addRange("res", 5, 50, res, 1, function(value) {
        res = value;
        context.font = res + "px Arial";
    })
    .addRange("perlin scale", 0.001, 0.05, scale, 0.001, function(value) {
        scale = value;
    })


bitlib.anim(update).start();

function update() {
    z += 0.01;
    bitlib.random.seed(0);
    context.clear("black");
    context.beginPath();
    for(var x = 0; x < width; i=x += res) {
        for(var y = 0; y < height; y += res) {
            context.save();
            context.translate(x, y);
            var p = noise.perlin3(x * scale, y * scale, z);
            if(p > 0) {
                context.fillText("1", 0, 0);
            }
            else {
                context.fillText("0", 0, 0);
            }
            context.restore();
        }
    }
    context.stroke();
}