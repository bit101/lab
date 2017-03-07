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

// if only humpty dumpty had a hat like this dude.

var context = bitlib.context(0, 0),
    width = context.width,
    height = context.height;

context.fillStyle = "white";
var vdir = 0;
var hdir = 0;

var body = {
    x: width / 2,
    y: height / 2,
    vx: 0,
    vy: 0,
    r: 30,
    damp: 0.98,
    rotation: 0
};

body.update = function() {
    this.vx += bitlib.random.float(-0.03, 0.03);
    this.vy += bitlib.random.float(-0.03, 0.03);
    this.x += this.vx;
    this.y += this.vy;
    this.vx *= this.damp;
    this.vy *= this.damp;

    this.rotation += (this.vx * 0.5 - this.rotation) * 0.2;

    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.rotation);
    prop.update();
    context.scale(1, 1.3);
    context.beginPath();
    context.circle(0, 0, this.r);
    context.restore();
    context.fill();
    context.stroke();

    if(this.x < -50) {
        this.x = width + 50;
    }
    else if(this.x > width + 50) {
        this.x = -50;
    }
    if(this.y < -50) {
        this.y = height + 50;
    }
    else if(this.y > height + 50) {
        this.y = -50;
    }
}

var prop = {
    angle: 0,
    speed: 0.2
};

prop.update = function() {
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(0, -55);
    context.stroke();
    context.save();
    context.lineWidth = 0;
    context.translate(0, -55);
    context.scale(1, 0.25);
    context.rotate(this.angle += this.speed);
    context.scale(1, 0.25);
    context.beginPath();
    context.circle(-20, 0, 20);
    context.moveTo(40, 0);
    context.circle(20, 0, 20);
    context.restore();
    context.fill();
    context.stroke();
};

bitlib.anim(update).start();

document.addEventListener("keydown", function(event) {
    if(event.keyCode == 38) {
        vdir = 1;
    }
    else if(event.keyCode == 40) {
        vdir = -1;
    }
    else if(event.keyCode == 37) {
        hdir = -1;
    }
    else if(event.keyCode == 39) {
        hdir = 1;
    }
});




document.addEventListener("keyup", function(event) {
    vdir = 0;
    hdir = 0;
});

function update() {
    context.clear("white");
    if(vdir === 1) {
        prop.speed = 0.4;
        body.vy -= 0.05;
    }
    else if(vdir === -1) {
        prop.speed = 0.07;
        body.vy += 0.05;
    }
    else {
        prop.speed = 0.2;
    }
    if(hdir === -1) {
        prop.speed = 0.3;
        body.vx -= 0.05;
    }
    else if(hdir === 1) {
        prop.speed = 0.3;
        body.vx += 0.05;
    }
    body.update();

}

