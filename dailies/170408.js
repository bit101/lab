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

// I spent way too much time tweaking and fine tuning this. At some point you have to walk away and let it stand on its own.ms

var context = bitlib.context(0, 0),
    width = context.width,
    height = context.height;

// context.translate(100, 100);

var i0 = -Math.PI,
    t0 = 0,
    k = 1.52,
    res = 0.1,
    pointsPerOrbit = 1000,
    hueA = 0,
    hueB = 360,
    sat = 1;
    nonStandard = false;

panel
    .addRange("k", -5, 5, k, 0.01, function(value) {
        k = value;
    })
    .addRange("res", 0.05, 1, res, 0.01, function(value) {
        res = value;
    })
    .addRange("points per orbit", 50, 5000, pointsPerOrbit, 1, function(value) {
        pointsPerOrbit = value;
    })
    .addRange("hue a", 0, 360, hueA, 1, function(value) {
        hueA = value;
    })
    .addRange("hue b", 0, 360, hueB, 1, function(value) {
        hueB = value;
    })
    .addBoolean("gray scale", false, function (value) {
        sat = value ? 0 : 1;
    })
    .addBoolean("use alteration", nonStandard, function(value) {
        nonStandard = value;
    })
    .setGlobalChangeHandler(function() {
        context.clear("black");
        i0 = -Math.PI;
        t0 = 0;
        anim.start();
    });




context.clear("black");
var anim = bitlib.anim(update).start();

function update() {
    for(var m = 0; m < 100; m++) {
        iterate();
    }
}

function iterate() {
    var i = i0,
        t = t0;
    // hue can be mapped to i or t. i looks better, IMO.
    // var hue = bitlib.math.map(t0, 0, Math.PI * 2, hueA, hueB);
    var hue = bitlib.math.map(i0, -Math.PI, Math.PI, hueA, hueB);
    context.fillStyle = bitlib.color.hsv(hue, sat, 1);
    for(var j = 0; j < pointsPerOrbit; j++) {
        if(i < -Math.PI) i += Math.PI * 2;
        if(i > Math.PI) i -= Math.PI * 2;
        if(t < 0) t += Math.PI * 2;
        if(t > Math.PI * 2) t -= Math.PI * 2;

        // the following maps widths and heights of 2PI to the screen width and height
        // this will result in a somewhat squashed image. more so on wide screens.
        // personally, i like the way it looks though.
        var x = bitlib.math.map(t, 0, Math.PI * 2, 0, width),
            y = bitlib.math.map(i, -Math.PI, Math.PI, 0, height);
        context.fillRect(x, y, res * 2, res * 2);
        if(nonStandard) {
            // non standard standard map
            i = i + k * Math.sin(t / k);
            t = t + i / k;
        }
        else {
            // standard standard map
            i = i + k * Math.sin(t);
            t = t + i;
        }

    }
    i0 += res;
    if(i0 > Math.PI * 2) {
        i0 = 0;
        t0 += res;
        if(t0 > Math.PI * 2) {
            anim.stop();
        }
    }
}