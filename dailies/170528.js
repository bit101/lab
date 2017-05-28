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
context.clear(bitlib.color.hsv(180, 0.5, 1));

var inner = 50;
var ring1 = 20;
var ring2 = 20;
var ring3 = 20;
var ring4 = 20;
var ring5 = 20;
var rings = [ring1, ring2, ring3, ring4, ring5];
var iter = 5;
panel
    .addRange("inner radius", 0, 300, inner, 1, function(value) {
        inner = value;
    })
    .addRange("ring 1", 3, 50, ring1, 1, function(value) {
        ring1 = value;
    })
    .addRange("ring 2", 3, 50, ring2, 1, function(value) {
        ring2 = value;
    })
    .addRange("ring 3", 3, 50, ring3, 1, function(value) {
        ring3 = value;
    })
    .addRange("ring 4", 3, 50, ring4, 1, function(value) {
        ring4 = value;
    })
    .addRange("ring 5", 3, 50, ring5, 1, function(value) {
        ring5 = value;
    })
    .setGlobalChangeHandler(function() {
        rings = [ring1, ring2, ring3, ring4, ring5];
        context.clear(bitlib.color.hsv(180, 0.25, 1));
        draw(inner, iter);
    });

draw(inner, iter);

function draw(inner, iter) {
    console.log(inner, iter);
    var n = rings[5 - iter];
    var angle = (Math.PI * 2) / (n * 2);
    var sin = Math.sin(angle);
    var div = 1 - sin;
    var r2 = sin * inner / div;
    // context.fillStyle = bitlib.color.hsv(hue, 0.5, 1);
    // context.fillCircle(width / 2, height / 2, inner);
    context.fillStyle = bitlib.color.hsv(iter * 30, 1, 1);
    for(var i = 0; i < n; i++) {
        var a = Math.PI * 2 / n * i,
            r = inner + r2;
            x = width / 2 + Math.cos(a) * r,
            y = height / 2 + Math.sin(a) * r;
        context.fillCircle(x, y, r2);
    }
    if(iter > 1) {
        draw(inner + r2 * 2, iter - 1);
    }
}

