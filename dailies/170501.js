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


var w = 5,
    curve = Math.PI / 2,
    alternate = true;
context.clear("white");
context.lineCap = "round";

panel
    .addRange("line width", 5, 20, w, 1, function(value) {
        w = value;
        c0.r = Math.max(c0.r, w / 2);
    })
    .addRange("curve", 0, Math.PI, curve, 0.01, function(value) {
        curve = value;
    })
    .addBoolean("alternate", alternate, function(value) {
        alternate = value;
    })

var c0 = {
    x: width / 2,
    y: height / 2,
    r: 50,
    a: Math.PI,
    ccw: false
}
var hue = 0;

bitlib.anim(update, 15).start();

function update() {
    context.setShadow(0, 0, 0, 0);
    context.clear(bitlib.color.rgba(255, 255, 255, bitlib.random.float(0.1)));
//   context.strokeStyle = bitlib.color.hsv(hue++, 1, 1);
    var angle = bitlib.random.float(-curve, curve),
        radius = bitlib.random.float(w / 1, w * 5)
    var c1 = {
        x: c0.x + Math.cos(angle) * (c0.r + radius),
        y: c0.y + Math.sin(angle) * (c0.r + radius),
        r: radius,
        a: Math.PI + angle,
        ccw: alternate ? !c0.ccw : c0.ccw
    };
    c0.b = angle;
    if(c1.x - c1.r > width) {
        c1.x = 0;
    }
    else if(c1.x + c1.r < 0) {
        c1.x = width;
    }
    if(c1.y - c1.r > height) {
        c1.y = 0;
    }
    else if(c1.y + c1.r < 0) {
        c1.y = height;
    }

    draw(c0);
    c0 = c1;

}

function draw(c) {
    context.setShadow(0.5, 5, 5, 10);

    context.lineWidth = w;
    context.strokeStyle = "black";// bitlib.color.hsv(hue++, 1, 1);
    context.beginPath();
    context.arc(c.x, c.y, c.r, c.a, c.b, c.ccw);
    context.stroke();

    context.fillStyle = bitlib.color.randomGray();//.hsv(hue, 1, 0.5);
    context.fillCircle(c.x, c.y, Math.max(0, c.r / 2));

}