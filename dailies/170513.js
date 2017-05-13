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

/*
 The idea of biomorphs comes from the book "Computers, Pattern, Chaos and Beauty" by Clifford Pickover. (http://amzn.to/2pf1mMx)

 It's basically a Julia fractal with custom iteration functions and a different way of rendering.

 I grabbed the Julia function from my own book, "Playing With Chaos" (http://www.playingwithchaos.net/) and modified it
 to use a custom function, rather than just squaring the complex number, and changed the rendering to work a little more
 like Pickover's - though I stuck to just black and white.

 I could have used math.js or some other complex number library, but it was fun to create my own.

 I included a bunch of custom functions, but this is where you can launch into your own experimentation. Basically,
 all the functions perform some kind of operation on z and then add c to it. The ones I used were the obvious ones,
 but there's no limit to what you can do. If you come up with any good ones, let me know.
 */

var context = bitlib.context(0, 0),
    width = context.width,
    height = context.height;

context.clear("white");

var Complex = {
    create: function(real, imag) {
        var obj = Object.create(this);
        obj.init(real, imag);
        return obj;
    },

    init: function(real, imag) {
        this.real = real;
        this.imag = imag;
    },

    multiply: function(complex) {
        var real = this.real * complex.real - this.imag * complex.imag,
            imag = this.real * complex.imag + this.imag * complex.real;
        return Complex.create(real, imag);
    },

    add: function(complex) {
        return Complex.create(this.real + complex.real, this.imag + complex.imag);
    },

    power: function(p) {
        // brute force. there's probably some better way to do this.
        if(p === 0) return 1;
        var z = this.clone();
        for(var i = 1; i < p; i++) {
            z = z.multiply(z);
        }
        return z;
    },

    sin: function() {
        var real = Math.sin(this.real) * Math.cosh(this.imag),
            imag = Math.cos(this.real) * Math.sinh(this.imag);
        return Complex.create(real, imag);
    },

    cos: function() {
        var real = Math.cos(this.real) * Math.cosh(this.imag),
            imag = -Math.sin(this.real) * Math.sinh(this.imag);
        return Complex.create(real, imag);
    },

    clone: function() {
        return Complex.create(this.real, this.imag);
    },

    toString: function() {
        return "[Complex: " + this.real + " + " + this.imag + "i]"
    }
};


var zoom = 2;
var minR = -zoom * width / height,
    maxR = zoom * width / height,
    minI = -zoom,
    maxI = zoom,
    dr = (maxR - minR) / width,
    di = (maxI - minI) / height,
    maxIter = 32,
    threshold = 100,
    minDist = 100,
    inverted = false;

var c = Complex.create(-1.01, 0.02);



panel
    .addDropDown("function", ["f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7"], function(value) {
        f = funcs[value.label];
    })
    .addRange("zoom", 0.1, 100, 10 / zoom, 0.1, function(value) {
        zoom = 10 / value;
        minR = -zoom * width / height;
        maxR = zoom * width / height;
        minI = -zoom;
        maxI = zoom,
        dr = (maxR - minR) / width;
        di = (maxI - minI) / height;
    })
    .addRange("c real", -3, 3, c.real, 0.01, function(value) {
        c.real = value;
    })
    .addRange("c imag", -3, 3, c.imag, 0.01, function(value) {
        c.imag = value;
    })
    .addRange("iter", 1, 100, maxIter, 1, function(value) {
        maxIter = value;
    })
    .addRange("min distance", 1, 500, minDist, 1, function(value) {
        minDist = value;
    })
    .addRange("threshold", 1, 500, threshold, 1, function(value) {
        threshold = value;
    })
    .addBoolean("inverted", inverted, function(value) {
        inverted = value;
    })
    .setGlobalChangeHandler(redraw);


function julia(x, y) {
    var z = Complex.create(minR + x * dr, minI + y * di);

    for(var iter = 0; iter < maxIter; iter += 1) {
        var z1 = f(z);
        zr = z1.real;
        zi = z1.imag;
        var dist = Math.sqrt(zr * zr + zi * zi);
        if(dist > minDist) {
            if(Math.abs(zr) < threshold || Math.abs(zi) < threshold) {
                return inverted ? "white" : "black";
            }
            break;
        }
        z = z1;
    }

    return null;
}

var funcs = {

    f0: function (z) {
        var result = z.power(2);
        return result.add(c);
    },

    f1: function (z) {
        var result = z.power(3);
        return result.add(c);
    },

    f2: function (z) {
        var result = z.power(4);
        return result.add(c);
    },

    f3: function (z) {
        var result = z.power(5);
        return result.add(c);
    },

    f4: function (z) {
        var result = z.power(2).add(z.sin());
        return result.add(c);
    },

    f5: function (z) {
        var result = z.power(2).add(z.cos());
        return result.add(c);
    },

    f6: function (z) {
        var result = z.power(3).add(z.power(5));
        return result.add(c);
    },

    f7: function (z) {
        var result = z.power(2).add(z.power(6));
        return result.add(c);
    }
};

var f = funcs["f0"];

var y = 0;
var anim = bitlib.anim(draw).start();

function redraw() {
    context.clear(inverted ? "black" : "white");
    y = 0;
    anim.start();
}

function draw() {
    for(var i = 0; i < 20; i++) {
        drawRow();
    }
}

function drawRow() {
    for(var x = 0; x < width; x++) {
        var color = julia(x, y);
        if(color) {
            context.fillStyle = color;
            context.fillRect(x, y, 1, 1);
        }
    }
    y++;
    if(y >= height) anim.stop();
}
