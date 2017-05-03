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


var context = bitlib.context(400, 400),
    width = context.width,
    height = context.height;

context.canvas.style.position = "absolute";
context.canvas.style.left = "50%";
context.canvas.style.top = "50px";
context.canvas.style.transform = "translate(-50%, 0)";


var ants = [],
    numAnts = 500,
    foods = [],
    numFood = 2000;

for(var i = 0; i < numAnts; i++) {
    ants.push({
        x: bitlib.random.int(width),
        y: bitlib.random.int(height),
        vx: 0,
        vy: 0,
        carrying: false,
        wanderTime: 10
    });
}
for(var i = 0; i < numFood; i++) {
    foods.push({
        x: bitlib.random.int(width),
        y: bitlib.random.int(height)
    });
}

bitlib.anim(update).start();

function update() {
    context.clear("white");

    context.fillStyle = "#000000";
    for(i = 0; i < numFood; i++) {
        var food = foods[i];
        context.fillRect(food.x - 1.5, food.y - 1.5, 3, 3);
    }

    context.fillStyle = "#ff0000";
    for(var i = 0; i < numAnts; i++) {
        var ant = ants[i],
            dir = bitlib.random.float(Math.PI * 2);
        ant.vx += Math.cos(dir) * 0.25;
        ant.vy += Math.sin(dir) * 0.25;
        ant.x += ant.vx;
        ant.y += ant.vy;
        ant.vx *= 0.95;
        ant.vy *= 0.95;
        if(ant.x > width) {
            ant.x = 0;
        }
        else if(ant.x < 0) {
            ant.x = width;
        }
        if(ant.y > height) {
            ant.y = 0;
        }
        else if(ant.y < 0) {
            ant.y = height;
        }
        findFood(ant);
        if(ant.food) {
            ant.food.x = ant.x;
            ant.food.y = ant.y;
        }
        ant.wanderTime--;

        context.fillRect(ant.x - 0.5, ant.y - 0.5, 1, 1);
    }

}

function findFood(ant) {
    for(var i = 0; i < numFood; i++) {
        var food = foods[i];
        if(!food.carrying && (food != ant.food) && ant.wanderTime < 0) {
            var dx = food.x - ant.x,
                dy = food.y - ant.y,
                dist = Math.sqrt(dx * dx + dy * dy);
            if(dist < 2) {
                if(!ant.food) {
                    ant.food = food;
                    food.carrying = true;
                }
                else {
                    ant.wanderTime = 10;
                    ant.food.carrying = false;
                    ant.food = null;
//           ant.vx *= -1;
//           ant.vy *= -1;
                }
                return;
            }
        }
    }
}
