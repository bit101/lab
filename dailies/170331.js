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
 * This code is a direct port from the code found in this article:
 *
 * https://generateme.wordpress.com/2016/05/04/curvature-from-noise/
 *
 * I highly recommend you read the article to understand what's going on, and follow and read the rest of the blog,
 * as well as Tomasz's tumblr, twitter, etc. Brilliant, brilliant stuff. I can't praise it enough.
 */


var context = bitlib.context(0, 0),
    width = context.width,
    height = context.height;

context.globalAlpha = 0.05; // 0.01 - 0.1
var scale = 0.005,
    agentCount = 5000,
    rectSize = 400,
    angleDelta = 3,
    seed = 0,
    agentSize = 0.5;


panel
    .addRange("scale", 0.001, 0.05, scale, 0.001, function(value) {
        scale = value;
    })
    .addRange("agent count", 1, 10000, agentCount, 1, function (value) {
        agentCount = value;
    })
    .addRange("rect size", 50, 1000, rectSize, 1, function (value) {
        rectSize = value;
    })
    .addRange("angle delta", 0, 10, angleDelta, 0.1, function (value) {
        angleDelta = value;
    })
    .addRange("agent size", 0.1, 5, agentSize, 0.1, function (value) {
        agentSize = value;
    })
    .addRange("alpha", 0.01, 0.1, context.globalAlpha, 0.01, function (value) {
        context.globalAlpha = value;
    })
    .addNumber("seed", 0, 10000, seed, 1, function (value) {
        seed = value;
    })
    .setGlobalChangeHandler(setup);


var Agent = {
    create: function() {
        var obj = Object.create(this);
        return obj;
    },
    
    x: 0,
    y: 0,
    angle: 0,
    
    update: function() {
        this.x += Math.cos(this.angle);
        this.y += Math.sin(this.angle);
        
        var xx = this.x * scale;
        var yy = this.y * scale;
        
        var offset = noise.perlin2(xx, yy) * angleDelta
        this.angle += offset;
    }
}

var agents;

function setup() {
    noise.seed(bitlib.random.int(seed));
    context.clear();
    var r = rectSize / 2;
    
    agents = [];
    for(var i = 0; i < agentCount; i++) {
        var a = Agent.create();
        a.x = width / 2 + bitlib.random.float(-r, r);
        a.y = height / 2 + bitlib.random.float(-r, r);
        a.angle = bitlib.random.float(Math.PI * 2);
        agents.push(a);
    }
}

setup();
bitlib.anim(update).start();

function update() {
    for(var i = 0; i < agents.length; i++) {
        var a = agents[i];
        context.fillCircle(a.x, a.y, agentSize / 2);
        a.update();
    }
}