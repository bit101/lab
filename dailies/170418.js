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

var points = [],
    num = 100,
    mouseX = 0,
    mouseY = 0,
    size = 20,
    mouseRadius = 100,
    mouseStrength = 0.05,
    firmness = 0.05,
    hue = bitlib.random.int(360),
    bg = bitlib.color.hsv(hue, 0.15, 1),
    showPoints = false;
    
    
context.fillStyle = bitlib.color.hsv(hue, 0.75, 1);
context.setShadow("rgba(0,0,0,0.4)", 2, 2, 20);

panel
	.addRange("size", 5, 50, size, 1, function(value) {
		size = value;
	})
	.addRange("firmness", 0.01, 0.5, firmness, 0.001, function(value) {
		firmness = value;
	})
	.addRange("mouse radius", 20, 200, mouseRadius, 1, function(value) {
		mouseRadius = value;
	})
	.addRange("mouse strength", 0, 0.5, mouseStrength, 0.001, function(value) {
		mouseStrength = value;
	})
	.addBoolean("show points", showPoints, function(value) {
		showPoints = value;
	})
	.addRange("hue", 0, 360, hue, 1, function(value) {
		hue = value;
	    bg = bitlib.color.hsv(hue, 0.15, 1);
		context.fillStyle = bitlib.color.hsv(hue, 0.75, 1);
	})


for(var i = 0; i < num; i++) {
  var a = Math.PI * 2 / num * i;
  points.push({
    x: width / 2 + Math.cos(a) * 150 + bitlib.random.float(-5, 5),
    y: height / 2 + Math.sin(a) * 150 + bitlib.random.float(-5, 5),
    vx: 0,
    vy: 0,
    damp: 0.9
  });
}

document.addEventListener("mousemove", function(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;
});

bitlib.anim(update).start();

function update() {
  for(var i = 0; i < num - 1; i++) {
    var p0 = points[i];
    for(var j = i + 1; j < num; j++) {
      var p1 = points[j];
      compare(p0, p1, j === i + 1);
    }
  }
  compare(points[num - 1], points[0], true);
  updatePoints();
  draw();
}

function compare(p0, p1, siblings) {
      dx = p1.x - p0.x,
      dy = p1.y - p0.y,
      dist = Math.sqrt(dx * dx + dy * dy);

  if(siblings) {
    var tx = p0.x + dx / dist * size,
        ty = p0.y + dy / dist * size,
        ax = (tx - p1.x) * firmness,
        ay = (ty - p1.y) * firmness;
    p1.vx += ax;
    p1.vy += ay;
    p0.vx -= ax;
    p0.vy -= ay;
  }
  else if(dist < size * 2) {
    var tx = p0.x + dx / dist * size * 2,
        ty = p0.y + dy / dist * size * 2,
        ax = (tx - p1.x) * firmness,
        ay = (ty - p1.y) * firmness;
    p1.vx += ax;
    p1.vy += ay;
    p0.vx -= ax;
    p0.vy -= ay;
  }
}

function updatePoints() {
  for(var i = 0; i < num; i++) {
    var p = points[i],
        dx = p.x - mouseX,
        dy = p.y - mouseY,
        dist = Math.sqrt(dx * dx + dy * dy);
    if(dist < mouseRadius) {
      var tx = mouseX + dx / dist * mouseRadius,
          ty = mouseY + dy / dist * mouseRadius;
      p.vx += (tx - p.x) * mouseStrength;
      p.vy += (ty - p.y) * mouseStrength;
    }
    p.x += p.vx;
    p.y += p.vy;
    p.vx *= p.damp;
    p.vy *= p.damp;
  }
  
}


function draw() {
  context.clear(bg);
  context.fillMultiLoop(points);
  if(showPoints) {
  	context.save();
  	context.fillStyle = bitlib.color.hsv(hue, 1, 0.75);
	for(var i = 0; i < num; i++) {
  		context.fillCircle(points[i].x, points[i].y, 2);
  	}
  	context.restore();
  }
}