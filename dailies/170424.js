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

var size = 190;


var imageData = null;

panel.addButton("Restart", init);
init();
var count = 0;
bitlib.anim(update).start();


function init() {
    var chooser = bitlib.random.chooser();
    chooser.addChoice(drawOne, 2);
    chooser.addChoice(drawTwo);
    chooser.addChoice(drawThree);
    chooser.addChoice(drawFour, 0.1);
    chooser.addChoice(drawFive);

    size = bitlib.random.int(40, 200);
    context.clear();
    context.lineWidth = size / 6;

    for(var x = 0; x < width; x += size) {
        for(var y = 0; y < height; y += size) {
            context.save();
            context.translate(x + size / 2, y + size / 2);
            context.rotate(bitlib.random.int(3) * Math.PI / 2);
            chooser.getChoice()();
            context.restore();
        }
    }
    imageData = context.getImageData(0, 0, width, height);
    var hue = bitlib.random.int(360)
    context.clear(bitlib.color.hsv(hue, 0.15, 1));
    context.lineWidth = 0.1;
    context.fillStyle = context.strokeStyle = bitlib.color.hsv(hue + 180, 1, 0.5);
}


function update() {
    for(var i = 0; i < 1000; i++) {
        draw();
    }
}

function draw() {
    var x1 = bitlib.random.int(width),
        y1 = bitlib.random.int(height),
        angle = bitlib.random.float(Math.PI * 2),
        radius = bitlib.random.float(size / 8, size / 3),
        x2 = Math.floor(x1 + Math.cos(angle) * radius),
        y2 = Math.floor(y1 + Math.sin(angle) * radius),
        i1 = (x1 + y1 * width) * 4 + 3,
        i2 = (x2 + y2 * width) * 4 + 3;
    if(imageData.data[i1] != imageData.data[i2]) {
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
    }
}



function drawOne() {
    context.beginPath();
    context.arc(-size / 2, -size / 2, size / 2, 0, Math.PI / 2);
    context.stroke();
    context.beginPath();
    context.arc(size / 2, size / 2, size / 2, Math.PI, Math.PI * 1.5);
    context.stroke();
}

function drawTwo() {
    context.beginPath();
    context.moveTo(-size / 2, 0);
    context.lineTo(size / 2, 0);
    context.moveTo(0, -size / 2);
    context.lineTo(0, size / 2);
    context.stroke();
}

function drawThree() {
    context.beginPath();
    context.moveTo(-size / 2, 0);
    context.lineTo(size / 2, 0);
    context.stroke();

    context.beginPath();
    context.arc(0, -size / 2, context.lineWidth / 2, 0, Math.PI * 2);
    context.fill();

    context.beginPath();
    context.arc(0, size / 2, context.lineWidth / 2, 0, Math.PI * 2);
    context.fill();

}

function drawFour() {
    context.beginPath();
    context.arc(size / 2, 0, context.lineWidth / 2, 0, Math.PI * 2);
    context.fill();

    context.beginPath();
    context.arc(0, -size / 2, context.lineWidth / 2, 0, Math.PI * 2);
    context.fill();

    context.beginPath();
    context.arc(-size / 2, 0, context.lineWidth / 2, 0, Math.PI * 2);
    context.fill();

    context.beginPath();
    context.arc(0, size / 2, context.lineWidth / 2, 0, Math.PI * 2);
    context.fill();
}

function drawFive() {
    context.beginPath();
    context.arc(-size / 2, -size / 2, size / 2, 0, Math.PI / 2);
    context.stroke();

    context.beginPath();
    context.arc(size / 2, 0, context.lineWidth / 2, 0, Math.PI * 2);
    context.fill();

    context.beginPath();
    context.arc(0, size / 2, context.lineWidth / 2, 0, Math.PI * 2);
    context.fill();
}

