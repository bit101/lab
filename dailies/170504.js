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

var context = bitlib.context(window.innerWidth / 2, window.innerHeight - 50),
    width = context.width,
    height = context.height

var vres = 10,
    hres = 5,
    h = 2;

var text = "Down the dark streets, the houses looked the same";
panel
    .addTextArea("text", text, function(value) {
        text = value;
    })
    .addRange("x res", 1, 50, hres, 1, function(value) {
        hres = value;
    })
    .addRange("y res", 1, 50, vres, 1, function(value) {
        vres = value;
    })
    .addRange("h", 0, 5, h, 0.1, function(value) {
        h = value;
    })

context.canvas.style.position = "absolute";
context.canvas.style.left = "50%";
context.canvas.style.top = "0";
context.canvas.style.transform = "translate(-50%, 0)";
context.strokeStyle = "white";
context.lineWidth = 0.2;

var mult = 20,
    bits = [];
for(var i = 0; i < 8; i++) {
    bits.push(width / 16 + width / 8 * i);
}

bitlib.anim(update).start();

function update() {
    context.clear(bitlib.color.rgba(0, 0, 0, 0.1));
    var str = text;

    for(var i = 0; i < str.length; i++) {
        context.save();
        context.translate(0, vres + i * vres);
        var char = str.charCodeAt(i);

        context.beginPath();
        for(var x = 0; x < width + hres; x += hres) {
            var y = 0;
            for(var k = 0; k < 8; k++) {
                if(1 << k & char) {
                    var x1 = bits[k];
                    var dx = Math.abs(x - x1);
                    if(dx < hres / 2) {
                        y -= vres * h * bitlib.random.float(0.6, 1);
                    }
                }
            }
            context.lineTo(x + bitlib.random.float(-1, 1) * hres / 3,
                y + bitlib.random.float(-1, 1) * vres / 5);
        }
        context.stroke();
        context.restore();
    }
}
