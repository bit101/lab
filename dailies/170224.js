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

// the real skillz are when she goes backwards

var context = bitlib.context(0, 0),
    width = context.width,
    height = context.height;

panel.addRange("fps", -60, 60, 15, 1, function(value) {
    anim.fps = Math.abs(value);
    if(value === 0) {
        anim.stop();
    }
    else {
        anim.start();
    }
    dir = value > 0 ? 1 :  -1;
});

var w, h, anim;

var offset = 119,
    frame = 0,
    dir = 1;

var img = document.createElement("img");
img.addEventListener("load", onLoaded);
img.src = "muybridge01.png";

function onLoaded() {
    w = img.width;
    h = img.height;
    anim = bitlib.anim(update, 15).start();
}

function update() {
    context.save();
    context.clear();
    context.translate(-frame * offset * dir, (height - h) / 2);
    for(var x = -img.width; x < width + img.width; x += img.width) {
        context.drawImage(img, x, 0);
    }
    context.restore();

    frame++;
    frame %= 20;
}

// well that was easy...