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


var Particle = {
    bounds: {
        x: 0,
        y: 0,
        w: 600,
        h: 600
    },
    x:  0,
    y:  0,
    vx: 0,
    vy: 0,
    damp: 0.95,
    bounce: -1,
    springTargetX: null,
    springTargetY: null,
    springTargetK: null,
    hasSpringTarget: false,
    edgeMode: null,


    create: function(x, y) {
        var obj = Object.create(this);
        obj.init(x, y);
        return obj;
    },

    init: function(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    },

    setSpringTarget: function(x, y, k) {
        this.springTargetX = x;
        this.springTargetY = y;
        this.springTargetK = k || 0.02;
        this.hasSpringTarget = true;
    },

    springFrom: function(x, y, d, k) {
        var dx = this.x - x,
            dy = this.y - y,
            dist = Math.sqrt(dx * dx + dy * dy);
        if(dist < d) {
            var tx = x + dx / dist * d,
                ty = y + dy / dist * d;
            this.vx += (tx - this.x) * k;
            this.vy += (ty - this.y) * k;
        }
    },

    update:  function() {
        if (this.hasSpringTarget) {
            this.vx += (this.springTargetX - this.x) * this.springTargetK;
            this.vy += (this.springTargetY - this.y) * this.springTargetK;
        }
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= this.damp;
        this.vy *= this.damp;
        this.checkEdges();
    },

    checkEdges: function() {
        if(this.edgeMode === "wrap") {
            this.wrapEdges();
        }
        else if(this.edgeMode === "bounce") {
            this.bounceEdges();
        }
    },

    wrapEdges:  function() {
        if(this.x > this.bounds.w) {
            this.x = 0;
        }
        else if(this.x < 0) {
            this.x = this.bounds.w;
        }
        if(this.y > this.bounds.h) {
            this.y = 0;
        }
        else if(this.y < 0) {
            this.y = this.bounds.h;
        }
    },

    bounceEdges:  function() {
        if(this.x > this.bounds.w) {
            this.x = this.bounds.w;
            this.vx *= this.bounce;
        }
        else if(this.x < 0) {
            this.x = 0;
            this.vx *= this.bounce;
        }
        if(this.y > this.bounds.h) {
            this.y = this.bounds.h;
            this.vy *= this.bounce;
        }
        else if(this.y < 0) {
            this.y = 0;
            this.vy *= this.bounce;
        }
    }
};

Particle.bounds.w = width;
Particle.bounds.h = height;


var particles,
    res = 20,
    springToHome = true,
    bounce = false,
    homeK = 0.02,
    mouseK = 0.04,
    mouseRadius = 200,
    bg = "white",
    size = 2;


panel
    .addRange("res", 10, 50, res, 1, function(value) {
        res = value;
        makeParticles();
    })
    .addBoolean("spring to  home", springToHome, function(value) {
        springToHome = value;
        if(springToHome) {
            Particle.edgeMode = null;
            panel.hideControl("bounce");
        }
        else {
            Particle.edgeMode = (bounce ? "bounce" : "wrap");
            console.log(Particle.edgeMode);
            panel.showControl("bounce");
        }
        makeParticles();
    })
    .addBoolean("bounce", bounce, function(value) {
        bounce = value;
        Particle.edgeMode = (bounce ? "bounce" : "wrap");
    })
    .addRange("home spring", 0.01, 1, homeK, 0.01, function(value) {
        homeK = value;
        makeParticles();
    })
    .addRange("mouse spring", 0, 1, mouseK, 0.01, function(value) {
        mouseK = value;
    })
    .addRange("mouse radius", 0, 500, mouseRadius, 1, function(value) {
        mouseRadius = value;
    })
    .addRange("particle size", 0.1, 50, size, 0.1, function(value) {
        size = value;
    })
    .addBoolean("invert", false, function(value) {
        if(value) {
            bg = "black";
            context.fillStyle = "white";
        }
        else {
            bg = "white";
            context.fillStyle = "black";
        }
    })
    .hideControl("bounce")
    // .setGlobalChangeHandler(function() {
    //     makeParticles();
    // })


makeParticles();

function makeParticles() {
    particles = [];
    for (var x = res / 2; x <= width; x += res) {
        for (var y = res / 2; y <= height ; y += res) {
            var p = Particle.create(x, y);
            if(springToHome) {
                p.setSpringTarget(x, y, homeK);
            }
            particles.push(p);
        }
    }
}

var xmouse = 0,
    ymouse = 0;

document.addEventListener("mousemove", function(event) {
    xmouse = event.clientX;
    ymouse = event.clientY;
})

bitlib.anim(update).start();

function update() {
    context.clear(bg);
    for(var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.springFrom(xmouse, ymouse, mouseRadius, mouseK);
        p.update();
        context.fillCircle(p.x, p.y, size);
    }
}

