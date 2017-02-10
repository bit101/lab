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


var bufferCanvas = document.createElement("canvas"),
    buffer = bufferCanvas.getContext("2d");
bufferCanvas.width = width;
bufferCanvas.height = height;

function getPixel(x, y) {
    var imageData = context.getImageData(x, y, 1, 1);
    return imageData.data[3] > 0;
}

function isOut(x, y) {
    if(x < 0 || x > width || y < 0 || y > height) {
        return true;
    }
    return false;
}

var params = {
    wander: 0.006,
    weight0: 1,
    weight1: 1,
    weight2: 1,
    initialSize: 0.3,
    growth: 0.007
};

panel
    .bindRange("wander", 0, 0.1, params.wander, 0.001, params)
    .bindRange("weight0", 0, 1, params.weight0, 0.01, params)
    .bindRange("weight1", 0, 1, params.weight1, 0.01, params)
    .bindRange("weight2", 0, 1, params.weight2, 0.01, params)
    .bindRange("initialSize", 0, 2, params.initialSize, 0.1, params)
    .bindRange("growth", 0, 0.03, params.growth, 0.001, params)
    .setGlobalChangeHandler(function() {
        context.clear();
        buffer.clearRect(0, 0, width, height);
        setup();
    });

var x,
    y,
    angle,
    size;


setup();

function setup() {
    x = bitlib.random.float(width);
    y = bitlib.random.float(height);
    var choice = bitlib.random.chooser();
    choice.addChoice(-Math.PI / 2, params.weight0);
    choice.addChoice(Math.PI / 6, params.weight1);
    choice.addChoice(Math.PI * 5 / 6, params.weight2);

    angle = choice.getChoice() + (bitlib.random.bool() ? Math.PI : 0);
    size = params.initialSize;
}

bitlib.anim(update).start();

function update() {
    for(var i = 0; i < 100; i++) {
        branch();
    }
}

function branch() {
    while(!getPixel(x, y) && !isOut(x, y)) {
        buffer.beginPath();
        buffer.arc(x, y, size, 0, Math.PI * 2);
        buffer.fill();
        x += Math.cos(angle);
        y += Math.sin(angle);
        angle += bitlib.random.float(-params.wander, params.wander);
        size += params.growth;
    }
    setup();
    context.drawImage(bufferCanvas, 0, 0);
    buffer.clearRect(0, 0, width, height);
}