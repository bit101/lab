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

// my new best friend.

var context = bitlib.context(0, 0),
    width = context.width,
    height = context.height;


// yeah, the code for this is all pretty nasty.
// you can get away with a lot when you call it an "experiment" :)
// maybe someday I'll clean it up and make it reusable.
// maybe not.
// maybe you will.

context.fillStyle = "white";

var gravity = 0.4;
var speed = 0.15;
var bodyHeight = 140;

panel
    .addRange("gravity", 0, 1, gravity, 0.01, function(value) {
        gravity = value;
    })
    .addRange("speed", 0.01, 0.2, speed, 0.01, function(value) {
        speed = value;
    })
    .addRange("height", 0, 300, bodyHeight, 1, function(value) {
        bodyHeight = value;
    })
    .addRange("stride", 15, 200, 40, 1, function(value) {
        for(var i = 0; i < numFeet; i++) {
            feet[i].length = value;
        }
    })
    .addHTML("Controls", "<b>Left/Right Arrows</b> - move left/right.<br/><b>Up/Down Arrows</b> - jump up/down<br/><br/><b>Note:</b> Click on screen after using sliders, or arrow keys will move sliders.");


var body = {
    x: width / 2,
    y: height / 2,
    r: 30,
    vx: 0,
    vy: 0,
    rotation: 0,
    speed: 0,
    damp: 0.95,
    render: function(context) {
        context.beginPath();
        context.circle(this.x, this.y, this.r);
        context.fill();
        context.stroke();
    },
    update: function() {
        this.rotation += this.speed;
        this.vy += gravity;
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= this.damp;
        this.vy *= this.damp;
        if(this.y + this.r > height) {
            this.y = height - this.r;
            this.vx = this.vy = 0;
        }
        if(this.y - this.r < 0) {
            this.y = this.r;
            this.vx = this.vy = 0;
        }
    }
};

function footUpdate() {
    var tx = body.x + Math.cos(this.angle + body.rotation) * this.length,
        ty = body.y + Math.sin(this.angle + body.rotation) * this.length + bodyHeight;
    var ax = (tx - this.x) * 0.05,
        ay = (ty - this.y) * 0.05;
    body.vx -= ax;
    body.vy -= ay;
    this.vx += ax;
    this.vy += ay;
    this.vy += gravity;
    this.x += this.vx;
    this.y += this.vy;
    this.vx *= this.damp;
    this.vy *= this.damp;
    this.renderAngle = Math.PI / 2;

    if(this.y > height) {
        this.y = height;
        this.vx = this.vy = 0;
    }
    else if(this.y < 0) {
        this.y = 0;
        this.vx = this.vy = 0;
        this.renderAngle = -Math.PI / 2;
    }
    if(this.x > width) {
        this.x = width;
        this.vx = this.vy = 0;
        this.renderAngle = 0;
    }
    else if(this.x < 0) {
        this.x = 0;
        this.vx = this.vy = 0;
        this.renderAngle = -Math.PI;
    }
}

function footRender(context) {
    context.beginPath();
    context.moveTo(body.x, body.y);
    if(this.y > body.y) {
        context.quadraticCurveTo(this.x, body.y, this.x, this.y);
    }
    else {
        context.quadraticCurveTo(body.x, this.y, this.x, this.y);
    }
    context.stroke();

    context.beginPath();
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.renderAngle);
    context.arc(0, 0, this.r, Math.PI / 2, -Math.PI / 2);
    context.closePath();
    context.fill();
    context.stroke();
    context.restore();
};

var feet = [];
var numFeet = 2;
for(var i = 0; i < numFeet; i++) {
    var angle = Math.PI * 2 / numFeet * i,
        foot = {
            x: body.x + Math.cos(angle) * 50,
            y: body.y + Math.sin(angle) * 50,
            length: 40,
            angle: angle,
            damp: 0.95,
            vx: 0,
            vy: 0,
            r: 5,
            renderAngle: null
        };
    foot.render = footRender;
    foot.update = footUpdate;
    feet.push(foot);
}
var hair = [];
var numHair = 6;
for(var i = 0; i < numHair; i++)
{
    var h = {
        x: body.x + 50,
        y: body.y - 50,
        vx: 0,
        vy: 0,
        k: bitlib.random.float(0.1, 0.3),
        offset: (i - numHair / 2) * 10 + bitlib.random.float(-4, 4),
        height: bitlib.random.float(40, 50),
        damp: 0.7,
    }
    h.update = hairUpdate;
    h.render = hairRender;
    hair.push(h);
}

function hairUpdate() {
    var tx = body.x + this.offset,
        ty = body.y - this.height;
    this.vx += (tx - this.x) * this.k;
    this.vy += (ty - this.y) * this.k;
    this.x += this.vx;
    this.y += this.vy;
    this.vx *= this.damp;
    this.vy *= this.damp;
}

function hairRender(context) {
    context.beginPath();
    context.moveTo(body.x + this.offset * 0.5, body.y)
    context.quadraticCurveTo(body.x, this.y, this.x, this.y);
    context.stroke();
}


bitlib.anim(update).start();

function update() {
    context.clear("white");
    body.update();
    for(var i = 0; i < feet.length; i++) {
        var foot = feet[i];
        foot.update();
        foot.render(context);
    }
    for(var i = 0; i < numHair; i++) {
        hair[i].update();
        hair[i].render(context);
    }
    body.render(context);
}

document.addEventListener("keydown", function(event) {
    // console.log(event.keyCode);
    if(event.keyCode === 39) {
        if(gravity >= 0) {
            body.speed = speed;
        }
        else {
            body.speed = -speed;
        }
    }
    else if(event.keyCode === 37) {
        if(gravity >= 0) {
            body.speed = -speed;
        }
        else {
            body.speed = speed;
        }
    }

});

document.addEventListener("keyup", function() {
    body.speed = 0;
    if(event.keyCode === 38) {
        for(var i = 0; i < numFeet; i++) {
            feet[i].vy -= 20;
        }
        body.vy -= 20;
    }
    else if(event.keyCode === 40) {
        for(var i = 0; i < numFeet; i++) {
            feet[i].vy += 20;
        }
        body.vy += 20;
    }
});


