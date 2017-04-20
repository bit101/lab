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

var w,
    h,
    imageData;

bitlib.imageData("boyhowdy.jpg", function(id) {
    imageData = id;
    w = imageData.width;
    h = imageData.height;
    bitlib.anim(update).start();
});


var scale = 0.01;
var angle = Math.PI / 4;
var z = 0;
var speed = 0.05;
var size = 50;
var rotate = true;
var moveZ = true;
var pix = 2;

panel
    .addRange("perlin scale", 0.001, 0.025, scale, 0.001, function(value) {
        scale = value;
    })
    .addRange("displacement", 0, 200, size, 1, function(value) {
        size = value;
    })
    .addRange("speed", 0, 0.25, speed, 0.01, function(value) {
        speed = value;
    })
    .addRange("pixel size", 1, 5, pix, 1, function(value) {
        pix = value;
    })
    .addBoolean("rotate", rotate, function(value) {
        rotate = value;
    })
    .addBoolean("move z", moveZ, function(value) {
        moveZ = value;
    })

function update() {
    context.clear();
    context.save();
    context.translate((width - w) / 2, (height - h) / 2);
    var cos = Math.cos(angle),
        sin = Math.sin(angle);

    // in 170419, I ran through every pixel of the output area, did the displacement and found the corresponding pixel
    // from the input image, if it existed. That way, every output pixel is accounted for. Very smooth image. It also
    // means that multiple output pixels could point to the same input pixel, making for that trippy effect.
    //
    // Here, I'm sampling each pixel of the input image, displacing it and drawing it to the output area. Thus, not
    // every output pixel is accounted for, resulting in spaces between pixels. Also, input/output pixels are 1:1, so
    // it's just like you warped the original image into what looks like a 3d form.
    for(var y = 0; y < h; y += pix) {
        for (var x = 0; x < w; x += pix) {
            var p = noise.perlin3(x * scale, y * scale, z) * size,
                xx = Math.floor(x + cos * p),
                yy = Math.floor(y + sin * p),
                index = (y * w + x) * 4,
                r = imageData.data[index++],
                g = imageData.data[index++],
                b = imageData.data[index];
            context.fillStyle = c = bitlib.color.rgb(r, g, b);
            context.fillRect(xx, yy, pix * 2, pix * 2);
            // since not every output pixel is accounted for, I'm making the pixels larger to cover the spaces.
            // It semi-works, but you can still get some gaps in large displacements.

        }
    }
    if(rotate) {
        angle += speed;
    }
    if(moveZ) {
        z +=  speed;
    }
    context.restore();
}