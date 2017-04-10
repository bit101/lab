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

context.lineWidth = 0.35;

var text = bitlib.context(400, 300);
document.body.removeChild(text.canvas);
text.font = "240px Arial";
text.fillText("100", 0, 230);
var imgData = text.getImageData(0, 0, 400, 300);

var p0, p1, p2, p3;
var res = 0.01,
    h = 10,
    rand = 2;

var handles = Handles.create(context);
init();

function init() {
    var w = text.canvas.width,
        h = text.canvas.height,
        x = (width - w) / 2,
        y = (height - h) / 2;
    p0 = handles.add(x, y);
    p1 = handles.add(x + w, y);
    p2 = handles.add(x + w, y + h);
    p3 = handles.add(x, y + h);
    handles.onChangeHandler = update;
    update();
}


panel
    .addRange("res", 0.005, 0.1, res, 0.001, function(value) {
        res = value;
        update();
    })
    .addRange("height", -400, 400, h, 1, function(value) {
        h = value;
        update();
    })
    .addRange("noise", 0, 20, rand, 1, function(value) {
        rand = value;
        update();
    })
    .addRange("line width", 0.05, 2, context.lineWidth, 0.01, function(value) {
        context.lineWidth = value;
        update();
    })

function update() {
    context.clear("white");
    bitlib.random.seed(0);

    context.beginPath();
    for(var ty = 0; ty <= 1; ty += res) {
        var x1 = bitlib.math.lerp(p0.x, p3.x, ty),
            y1 = bitlib.math.lerp(p0.y, p3.y, ty),
            x2 = bitlib.math.lerp(p1.x, p2.x, ty),
            y2 = bitlib.math.lerp(p1.y, p2.y, ty);
        for(var tx = 0; tx <= 1; tx += res) {
            var x3 = bitlib.math.lerp(x1, x2, tx),
                y3 = bitlib.math.lerp(y1, y2, tx),
                ix = Math.floor(bitlib.math.lerp(0, imgData.width, tx)),
                iy = Math.floor(bitlib.math.lerp(0, imgData.height, ty)),
                index = (iy * imgData.width + ix) * 4,
                hit = imgData.data[index + 3] > 0,
                z0 = bitlib.random.float(-rand, rand),
                z1 = bitlib.random.float(-rand, rand);
            if(hit) z1 -= h;
            if(!tx) {
                context.moveTo(x3 + z0, y3 + z1);
            }
            else {
                context.lineTo(x3 + z0, y3 + z1);
            }
        }
    }
    context.stroke();
    handles.render();
}
