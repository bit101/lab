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

console.time();

var context = bitlib.context(0, 0),
    width = context.width,
    height = context.height;

panel
    .setWidth(300)
    .addRange("red", 0, 255, 0, 1, update)
    .addRange("green", 0, 255, 0, 1, update)
    .addRange("blue", 0, 255, 0, 1, update)
    .addRange("alpha", 0, 1, 0.5, 0.1, update)
    .addRange("offset x", -50, 50, 5, 1, update)
    .addRange("offset y", -50, 50, 5, 1, update)
    .addRange("blur", 0, 50, 10, 1, update)
    .addText("text", "Hello world", update)
    .addColor("content color", "#000000", update)
    .addColor("background color", "#ffffff", update)
    .addTextArea("output");


update();
function update() {
    var red = panel.getValue("red"),
        green = panel.getValue("green"),
        blue = panel.getValue("blue"),
        alpha = panel.getValue("alpha"),
        color = bitlib.color.rgba(red, green, blue, alpha),
        offsetX = panel.getValue("offset x"),
        offsetY = panel.getValue("offset y"),
        blur = panel.getValue("blur"),
        text = panel.getValue("text"),
        contentColor = panel.getValue("content color"),
        bgColor = panel.getValue("background color");
    panel.setValue("output", "ctx.shadowColor = " + color + ";\nctx.shadowOffsetX = " + offsetX + ";\nctx.shadowOffsetY = " + offsetY + ";\nctx.shadowBlur = " + blur + ";");

    context.clear(bgColor);
    context.fillStyle = context.strokeStyle = contentColor;
    context.setShadow(color, offsetX, offsetY, blur);

    for(var i = 1; i < 10; i++) {
        var y = 10.5 + i * 20;
        context.lineWidth = i;
        context.beginPath();
        context.moveTo(350, y);
        context.lineTo(500, y);
        context.stroke();

        context.fillCircle(600, 20 + i * i * 6, i * 5, i * 5);
        context.fillRect(730 - i * 4, 20 + i * i * 6 - i * 4, i * 8, i * 8);

        y = 20 + i * i * 7;
        context.font = i * 7 + "px Arial";
        var w = context.measureText(text).width;
        context.fillText(text, 1000 - w / 2, y);
    }

    var path = [];
    context.lineWidth = 1;
    context.beginPath();
    for(var i = 0; i < 50; i++) {
        context.lineTo(bitlib.random.float(350, 500), bitlib.random.float(250, 400));
        path.push({
            x: bitlib.random.float(350, 500),
            y: bitlib.random.float(400, 550)
        });
    }
    context.stroke();

    context.strokeMultiLoop(path);
    console.timeEnd();
}


