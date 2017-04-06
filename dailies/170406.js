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
context.lineWidth = 0.5;
context.clear("white");

var w = 25,
    h = 75,
    lineHeight = 1.5,
    letterSpacing = 1,
    strokeLength = 1.5,
    slant = 0.75,
    dyn = 0.1;

panel
    .addRange("char width", 5, 200, w, 1, function(value) {
        w = value;
    })
    .addRange("char height", 5, 200, h, 1, function(value) {
        h = value;
    })
    .addRange("line spacing", 0.5, 3, lineHeight, 0.25, function(value) {
        lineHeight = value;
    })
    .addRange("letter spacing", 0, 5, letterSpacing, 0.1, function(value) {
        letterSpacing = value;
    })
    .addRange("stroke length", 0, 5, strokeLength, 0.1, function(value) {
        strokeLength = value;
    })
    .addRange("slant", -1, 1, slant, 0.1, function(value) {
        slant = value;
    })
    .addRange("dynamic", 0, 1, dyn * 2, 0.01, function(value) {
        dyn = value / 2;
    })
    .setGlobalChangeHandler(function() {
        context.clear("white");
        x = 300 + w * 5;
        y = h;
        wordlength = bitlib.random.int(3, 12);
        caps = true;
        anim.start();
    })


var x = 300 + w * 5,
    y = h;

var wordlength = bitlib.random.int(3, 12),
    caps = true;

var anim = bitlib.anim(write).start();

function write() {

    if(wordlength) {
        if(caps) {
            makeChar(x, y, w, h);
            x += w * letterSpacing;
            caps = false;
        }
        else {
            makeChar(x, y, w * 0.5, h * 0.5);
            x += w * 0.5 * letterSpacing;
        }
        wordlength--;
    }
    else {
        x += w * 1.25 * letterSpacing;
        caps = bitlib.random.bool(0.25);
        wordlength = bitlib.random.int(3, 12);
    }

    if(x + w > width - 300) {
        x = w + 300;
        y += h * lineHeight / 2;
        if(y > height) {
            anim.stop();
        }
    }
}


function makeChar(x, y, w, h) {

    var ax = ax1 = bitlib.random.float(Math.PI * 2),
        ay = ay1 = bitlib.random.float(Math.PI * 2),
        vx = bitlib.random.bool() ? -dyn : dyn,
        vy = bitlib.random.bool() ? -dyn : dyn;

    context.save();
    context.translate(x, y);
    context.rotate(Math.PI / 2 * slant);
    context.beginPath();
    for(var i = 0; i < 200; i++) {
        context.lineTo(Math.cos(ax) * w / 2, Math.sin(ay) * h / 2);
        ax += vx;
        ay += vy;
        vx += bitlib.random.float(-0.005, 0.005);
        vy += bitlib.random.float(-0.005, 0.005);
        if(Math.abs(ax1 - ax) > Math.PI * strokeLength ||
            Math.abs(ay1 - ay) > Math.PI * strokeLength) {
            break;
        }
    }
    context.stroke();
    context.restore();
}