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

context.lineWidth = 0.1;
var minLen = 5,
    maxLen = 40,
    rand = 0.1,
    mode = "random",
    bg = "white",
    fill = false;

panel
    .addDropDown("mode", ["random", "radial", "grid", "horizontal", "vertical", "perlin"], function(value) {
        mode = value.value;
        if(mode === "random") {
            panel.hideControl("shake");
        }
        else {
            panel.showControl("shake");
        }
    })
    .addRange("min", 0, 100, minLen, 1, function (value) {
        minLen = value;
    })
    .addRange("max", 0, 100, maxLen, 1, function (value) {
        maxLen = value;
    })
    .addRange("line width", 0.02, 1, context.lineWidth, 0.01, function(value) {
        context.lineWidth = value;
    })
    .addBoolean("fill", fill, function(value) {
        fill = value;
    })
    .addBoolean("invert", false, function(value) {
        if(value) {
            context.strokeStyle = "white";
            bg = "black";
        }
        else {
            context.strokeStyle = "black";
            bg = "white";
        }
    })
    .addRange("shake", 0, 1, rand, 0.001, function(value) {
        rand = value;
    })
    .setGlobalChangeHandler(function() {
        noise.seed(bitlib.random.int(10000));
        context.clear(bg);
    })
    .hideControl("shake");

var img = document.createElement("img");
img.addEventListener("load", onImageLoad);
img.src = "world_map.png";

function onImageLoad(event) {
    var h = width / (img.width / img.height);

    context.drawImage(img, 0, (height - h) / 2, width, h);
    imageData = context.getImageData(0, 0, width, height);
    context.clear(bg);
    bitlib.anim(update).start();
}

function update() {
    for(var i = 0; i < 500; i++) {
        checkLine();
    }
}

function checkLine() {
    var x1 = bitlib.random.int(width),
        y1 = bitlib.random.int(height),
        len = bitlib.random.float(minLen, maxLen),
        angle;
    if(mode === "radial") {
        angle = Math.atan2(height / 2 - y1, width / 2 - x1) + bitlib.random.float(-rand, rand);
    }
    else if(mode === "grid")  {
        angle = bitlib.random.int(4) * Math.PI / 2 + bitlib.random.float(-rand, rand);
    }
    else if(mode === "horizontal") {
        angle = bitlib.random.float(-rand, rand);
    }
    else if(mode === "vertical") {
        angle = Math.PI / 2 + bitlib.random.float(-rand, rand);
    }
    else if(mode === "perlin") {
        angle = noise.perlin2(x1 * 0.005, y1 * 0.005) * Math.PI * 2 + bitlib.random.float(-rand, rand);;
    }
    else {
        angle = bitlib.random.float(Math.PI * 2);
    }
    var x2 = Math.round(x1 + Math.cos(angle) * len),
        y2 = Math.round(y1 + Math.sin(angle) * len),
        hit1 = hit(x1, y1),
        hit2 = hit(x2, y2);

    var shouldDraw = false;
    if(fill && hit1) {
        shouldDraw = true;
    }
    else if(hit1 != hit2) {
        shouldDraw = true;
    }


    if(shouldDraw) {
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
    }
}

function hit(x, y) {
    var index = (imageData.width * y + x) * 4 + 3;

    return imageData.data[index] > 0;
}

function getPixel(x, y) {
    var index = (imageData.width * y + x) * 4,
        r = imageData.data[index],
        g = imageData.data[index + 1],
        b = imageData.data[index + 2],
        a = imageData.data[index + 3] / 255;
    return bitlib.color.rgba(r, g, b, a);
}