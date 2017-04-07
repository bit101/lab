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

context.lineWidth = 0.25;

var shakeAngle = 0.01,
    shakePos = 0.5,
    layerHeight = 1,
    viewAngle = Math.PI / 4,
    rectCount = 100,
    roundCount = 20;

panel
    .addRange("shake angle", 0, 0.5, shakeAngle, 0.01, function(value) {
        shakeAngle = value;
    })
    .addRange("shake pos", 0, 5, shakePos, 0.1, function(value) {
        shakePos = value;
    })
    .addRange("layer height", 1, 10, layerHeight, 1, function(value) {
        layerHeight = value;
    })
    .addRange("view angle", -Math.PI / 2, Math.PI / 2, viewAngle, 0.01, function(value) {
        viewAngle = value;
    })
    .addRange("rect buildings", 0, 500, rectCount, 1, function(value) {
        rectCount = value;
    })
    .addRange("round buildings", 0, 500, roundCount, 1, function(value) {
        roundCount = value;
    })
    .addButton("Build", function() {
        makeBuildings();
        build();
    })



var buildings = [];
var maxH = 0;


function makeBuildings() {
    buildings = [];
    for (var i = 0; i < rectCount; i++) {
        buildings.push({
            type: "rect",
            x: bitlib.random.float(width),
            y: bitlib.random.float(height),
            w: bitlib.random.float(20, 100),
            d: bitlib.random.float(20, 100),
            h: bitlib.random.float(20, 150),
            c: bitlib.color.hsv(bitlib.random.int(360), bitlib.random.float(0, 0.5), bitlib.random.float(0.5, 1))
        });
    }
    for (var i = 0; i < roundCount; i++) {
        buildings.push({
            type: "round",
            x: bitlib.random.float(width),
            y: bitlib.random.float(height),
            r: bitlib.random.float(10, 40),
            h: bitlib.random.float(80, 150),
            c: bitlib.color.hsv(bitlib.random.int(360), bitlib.random.float(0, 0.5), bitlib.random.float(0.5, 1))
        });
    }
    maxH = 0;
    for(var i = 0; i < buildings.length; i++) {
        maxH = Math.max(maxH, buildings[i].h);
    };
}




makeBuildings();
build();

function build() {
    context.clear(bitlib.color.hsv(bitlib.random.int(360), 0.15, 1));
    for(var ypos = 0; ypos <= maxH; ypos += layerHeight) {
        for(var i = 0; i < buildings.length; i++) {
            draw(buildings[i], ypos);
        }
    }
}

function draw(b, ypos) {
    if(ypos <= b.h) {
        context.save();
        context.translate(b.x + bitlib.random.float(-shakePos, shakePos),
            b.y - ypos - bitlib.random.float(-shakePos, shakePos));
        context.scale(1, 0.5);
        context.rotate(viewAngle + bitlib.random.float(-shakeAngle, shakeAngle));
        context.fillStyle = b.c;
        context.beginPath();
        if(b.type === "rect") {
            context.rect(-b.d / 2, - b.w / 2, b.d, b.w);
        }
        else {
            context.circle(0, 0, b.r);
        }
        context.fill();
        context.stroke();

        context.restore();
    }
}

