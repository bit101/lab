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
    Basically what is happening here is that you start with a grid of particles. Each particle has a speed and heading (direction of travel).
    That heading changed based on the value of the simplex (similar to perlin) noise field at that position. Higher (positive or negative)
    values make the  particle turn more to the left or right. So you can get circular trails as the particle keeps turning
    in the same direction. Or you get loopy trails as the particle goes back and forth between positive and negative regions and it
    keeps alternating from left to right turns.

    The rotation value controls how much actual "steering" the simplex noise values get. The particle speed also affects
    the size of the loops that are made.
 */


var context = bitlib.context(0, 0),
    width = context.width,
    height = context.height;

context.lineWidth = 0.25;

var particles = [],
    scale = 0.004,
    rot = 0.5,
    speed = 2,
    gridSize = 50,
    seed = 0;

panel
    .addRange("grid size", 10, 200, gridSize, 1, function(value) {
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
    .addRange("line width", 0.01, 1, context.lineWidth, 0.01, function(value) {
        context.lineWidth = value;
    })
    .addNumber("seed", 0, 1000000, seed, 1, function(value) {
        seed = value;
    })
    .setGlobalChangeHandler(init);


function init() {
    particles = [];
    context.clear("white");
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
    context.beginPath();
    for(var i = 0; i < particles.length; i++) {
        var p = particles[i];
        var v = noise.simplex2(p.x * scale, p.y * scale);
        p.heading += v * rot;
        context.moveTo(p.x, p.y);
        p.x += Math.cos(p.heading) * speed;
        p.y += Math.sin(p.heading) * speed;
        context.lineTo(p.x, p.y);
    }
    context.stroke();
}