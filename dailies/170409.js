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

var imgData;
bitlib.imageData("boyhowdy.jpg", function(data) {
    imgData = data;
    init();
});

var p0, p1, p2, p3;

var handles = Handles.create(context);

function init() {
    var w = imgData.width,
        h = imgData.height,
        x = (width - w) / 2,
        y = (height - h) / 2;
    p0 = handles.add(x, y);
    p1 = handles.add(x + w, y);
    p2 = handles.add(x + w, y + h);
    p3 = handles.add(x, y + h);
    handles.onChangeHandler = update;
    update();
}

var res = 0.005;

panel
    .addRange("res", 0.005, 0.1, res, 0.001, function(value) {
        res = value;
        update();
    });

function update() {
    context.clear("white");
    // res should really be dynamically determined by the distances between  various anchor points.
    for(var ty = 0; ty <= 1; ty += res) {
        var x1 = bitlib.math.lerp(p0.x, p3.x, ty),
            y1 = bitlib.math.lerp(p0.y, p3.y, ty),
            x2 = bitlib.math.lerp(p1.x, p2.x, ty),
            y2 = bitlib.math.lerp(p1.y, p2.y, ty),
            size = bitlib.math.dist(x1, y1, x2, y2) * res * 2;
            // really should calculate a different pixel width and height. I just doubled the size of the width to make up for any gaps. mostly kind of works...
        for(var tx = 0; tx <= 1; tx += res) {
            var x3 = bitlib.math.lerp(x1, x2, tx),
                y3 = bitlib.math.lerp(y1, y2, tx),
                ix = Math.floor(bitlib.math.lerp(0, imgData.width, tx)),
                iy = Math.floor(bitlib.math.lerp(0, imgData.height, ty)),
                index = (iy * imgData.width + ix) * 4,
                red = imgData.data[index],
                green = imgData.data[index + 1],
                blue = imgData.data[index + 2];
            context.fillStyle = bitlib.color.rgb(red, green, blue);
            context.fillRect(x3, y3, size, size);
        }
    }
    // alternately, handle all the pixels in the whole rect that encloses the four anchor points.
    // reverse calculate the x, y points of the image based on relative position of pixel to anchors.
    // then each pixel would be 1x1. Could use imageData at that point to construct the warped image.
    // blah blah exercise for the reader blah blah
    handles.render();
}
