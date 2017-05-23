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

context.globalAlpha = 0.5;
context.lineWidth = 5;
var hue = bitlib.random.int(360);
var c0 = {
  x: width * 0.3,
  y: height * 0.7,
  r: 40,
  c: bitlib.color.hsv(hue - 40, 1, 1)
};
var c1 = {
  x: width * 0.7,
  y: height * 0.3,
  r: 40,
  c: bitlib.color.hsv(hue + 40, 1, 1)
};

panel
    .bindRange("r", 10, 200, c0.r, 1, c0)
    .bindRange("r", 10, 200, c1.r, 1, c1)

var circles = [c0, c1];

function drawCircles() {
  for(var i = 0; i < circles.length; i++) {
    var c = circles[i];
    context.fillStyle = c.c;
    context.fillCircle(c.x, c.y, c.r);
  }
}
bitlib.anim(update).start();

function update() {
  context.clear(bitlib.color.hsv(hue, 0.25, 1));
  drawCircles();
  var midx = (c0.x + c0.r + c1.x - c1.r) / 2,
      midy = height;
  var tan0 = bitlib.math.tangentPointToCircle(midx, midy, c0.x, c0.y, c0.r, true);
  var tan1 = bitlib.math.tangentPointToCircle(midx, midy, c1.x, c1.y, c1.r);

  context.beginPath();
  context.moveTo(c0.x - c0.r, height);
  context.lineTo(c0.x - c0.r, c0.y);
  context.arc(c0.x, c0.y, c0.r, Math.PI, Math.atan2(tan0.y - c0.y, tan0.x - c0.x));
  context.quadraticCurveTo(midx, midy, tan1.x, tan1.y);
  var angle1 = Math.atan2(-c1.y + tan1.y, -c1.x + tan1.x);
  context.arc(c1.x, c1.y, c1.r, angle1, 0);
  context.lineTo(c1.x + c1.r, height);
  context.stroke();

}

context.canvas.addEventListener("mousedown", onMouseDown);
function onMouseDown(event) {
   if(bitlib.math.dist(event.clientX, event.clientY, c0.x, c0.y) < c0.r) {
    offsetX = event.clientX - c0.x;
    offsetY = event.clientY - c0.y;
    dragging = c0;
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  }
  if(bitlib.math.dist(event.clientX, event.clientY, c1.x, c1.y) < c1.r) {
    offsetX = event.clientX - c1.x;
    offsetY = event.clientY - c1.y;
    dragging = c1;
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  }
}

function onMouseMove(event) {
  dragging.x = event.clientX - offsetX;
  dragging.y = event.clientY - offsetY;
}

function onMouseUp(event) {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
    dragging = null;
}