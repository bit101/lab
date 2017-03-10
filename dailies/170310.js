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

// 1. draw a smooth, multi-point loop in the center of the screen.
// 2. iterate a set number of times.
// 3. on each iteration, randomly move each point using an x and y velocity
// 4. when iterations are done, create a new loop with a larger radius and repeat 1-3.
// 5. for each new loop, increase the number of iterations, the amount of randomity and the growth factor for the next loop


var context = bitlib.context(0, 0),
    width = context.width,
    height = context.height;

context.lineWidth = 0.01;

var c,
    r = 5,
    rand = 0.005,
    iter = 50,
    iterMult = 1.05,
    randMult = 1.06,
    radiusMult = 1.1,
    damp = 0.99;

panel
    .addRange("initial radius", 1, 100, r, 1)
    .addRange("radius multiplier", 1.03, 2, radiusMult, 0.01)
    .addRange("initial rand", 0, 0.1, rand, 0.001)
    .addRange("random multiplier", 1, 1.5, randMult, 0.01)
    .addRange("initial iterations", 1, 200, iter, 1)
    .addRange("iteration multiplier", 1, 1.2, iterMult, 0.01)
    .addRange("dampening", 0.7, 1, damp, 0.01)
    .addRange("line width", 0.01, 0.1, context.lineWidth, 0.01)
    .addBoolean("invert colors", false)
    .setGlobalChangeHandler(function() {
        context.lineWidth = panel.getValue("line width");
        rand = panel.getValue("initial rand");
        r = panel.getValue("initial radius");
        iter = panel.getValue("initial iterations");
        damp = panel.getValue("dampening")
        iterMult = panel.getValue("iteration multiplier")
        randMult = panel.getValue("random multiplier")
        radiusMult = panel.getValue("radius multiplier")
        if(panel.getValue("invert colors")) {
            context.clear("black");
            context.strokeStyle = "white";
        }
        else {
            context.clear("white");
            context.strokeStyle = "black";
        }
        makeCircle(r);
        anim.start();
    })



function makeCircle(r) {
    c = [];
    for(var i = 0; i < 20; i++) {
        var a = i / 20 * Math.PI * 2;
        c.push({
            x: Math.cos(a) * r,
            y: Math.sin(a) * r,
            vx: 0,
            vy: 0
        });
    }
}

context.translate(width / 2, height / 2);

var anim = bitlib.anim(update);

anim.start();
function update() {
    makeCircle(r);
    for(var j = 0; j < iter; j++) {
        context.strokeMultiLoop(c);
        for(var i = 0; i < c.length; i++) {
            var p = c[i];
            p.vx += bitlib.random.float(-rand, rand);
            p.vy += bitlib.random.float(-rand, rand);
            p.x += p.vx;
            p.y += p.vy;
            p.vx *= damp;
            p.vy *= damp;
        }
    }
    iter *= iterMult;
    iter = Math.min(iter, 1500);
    rand *= randMult;
    r *= radiusMult;

    if(r > width) {
        anim.stop();
    }
}