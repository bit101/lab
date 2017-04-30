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
    Like I said, very similar to yesterday. But I'm using a 3d simplex noise field and moving through it on the z axis.
    There are a fixed number of iterations per frame. So the pattern constantly changes. Higher iterations create a more complete
    picture, but can also grind the animation to a halt, so I capped it at 1000.

    Particles whose simplex value is not over a certain magnitude are not drawn.

    Blending is done between frames.
 */

var context = bitlib.context(0, 0),
    width = context.width,
    height = context.height;

context.lineWidth = 0.5;
context.strokeStyle = "white";

var particles = [],
    scale = 0.002,
    rot = 10,
    speed = 5,
    gridSize = 40,
    seed = 0,
    count = 200,
    z = 0,
    blend = 0.2,
    threshold = 0.5;

panel
    .addRange("grid size", 40, 200, gridSize, 1, function(value) {
        gridSize = value;
    })
    .addRange("perlin scale", 0.001, 0.02, scale, 0.001, function(value) {
        scale = value;
    })
    .addRange("rotation", 0.01, 10, rot, 0.01, function(value) {
        rot = value;
    })
    .addRange("speed", 0.1, 10, speed, 0.1, function(value) {
        speed = value;
    })
    .addRange("iter per frame", 100, 1000, count, 1, function(value) {
        count = value;
    })
    .addRange("threshold", 0, 1, threshold, 0.1, function(value) {
        threshold = value;
    })
    .addRange("blend", 0.05, 1, blend, 0.01, function(value) {
        blend = value;
    })
    .addNumber("seed", 0, 1000000, seed, 1, function(value) {
        seed = value;
    })
    .setGlobalChangeHandler(init);


function init() {
    particles = [];
    // context.clear("white");
    noise.seed(bitlib.random.int(seed));

    for (var x = 0; x < width; x += gridSize) {
        for (var y = 0; y < height; y += gridSize) {
            particles.push({
                x: x,
                y: y,
                heading: 0
            });
        }
    }
}

init();

bitlib.anim(update).start();
function update() {
    init();
    context.clear(bitlib.color.rgba(0, 0, 0, blend));
    for (var i = 0; i < count; i++) {
        draw();
    }
    z += 0.001;
}

function draw() {
    context.beginPath();
    for(var i = 0; i < particles.length; i++) {
        var p = particles[i];
        var v = noise.simplex3(p.x * scale, p.y * scale, z);
        if(Math.abs(v) > threshold) {
            p.heading += v * rot;
            context.moveTo(p.x, p.y);
            p.x += Math.cos(p.heading) * speed;
            p.y += Math.sin(p.heading) * speed;
            context.lineTo(p.x, p.y);
        }
    }
    context.stroke();
}