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


bitlib.anim(update).start();


function update() {
    var points = [];

    var x = bitlib.random.int(width),
        y = bitlib.random.int(width),
        num = 6,
        radius = bitlib.random.float(40, 100),
        vary = radius * 0.5;

    for(var i = 0; i < num; i++) {
        var angle = i / num * Math.PI * 2;
        points.push({
            x: x + Math.cos(angle) * radius + bitlib.random.float(-vary, vary),
            y: y + Math.sin(angle) * radius + bitlib.random.float(-vary, vary)
        });
    }


    context.setShadow("rgba(0,0,0,0.5", 5, 5, 10);

    context.lineWidth = 10;
    context.strokeStyle = bitlib.color.randomRGB();
    context.strokeMultiLoop(points);

    for(var i = 0;  i < 4; i++) {
        context.lineWidth = 6 - i * 2;
        context.strokeStyle = "rgba(255,255,255,0.1)";
        context.save();
        context.translate(-2, -2);
        context.strokeMultiLoop(points);
        context.restore();
    }

}