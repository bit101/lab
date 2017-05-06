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

var context = bitlib.context(window.innerWidth / 2, window.innerHeight - 50),
    width = context.width,
    height = context.height

var size = 40;
var wPercent = 0.5;
var spacing = 0;
var w = context.lineWidth = size * wPercent;
var text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

context.setShadow(0.5, 2, 2, 5);

panel
    .addTextArea("text", text, function(value) {
        text = value;
    })
    .addRange("size", 10, 100, size, 1, function(value) {
        size = value;
        w = size * wPercent;
        context.lineWidth = w;
    })
    .addRange("width", 0.01, 0.5, wPercent, 0.01, function(value) {
        wPercent = value;
        w = size * wPercent;
        context.lineWidth = w;
    })
    .addRange("spacing", 0, 1, spacing, 0.01, function(value) {
        spacing = value;
    })

context.canvas.style.position = "absolute";
context.canvas.style.left = "50%";
context.canvas.style.top = "25px";
context.canvas.style.transform = "translate(-50%, 0)";
// context.strokeStyle = "white";


context.clear("black");

var slice = Math.PI * 2 / 8;

bitlib.anim(update).start();

function update() {
    context.clear();
    var str = text;
    var x = y = size / 2;

    for(var i = 0; i < str.length; i++) {
        var char = str.charCodeAt(i);

        context.beginPath();
        for (var k = 0; k < 8; k++) {
            if (1 << k & char) {
                var angle = slice * k;
                context.beginPath();
                context.arc(x, y, Math.max(5, (size - w) / 2), angle, angle + slice);
                context.stroke();
            }
        }
        x += size + spacing * size;
        if (x > width - size / 2) {
            x = size / 2;
            y += size + spacing * size;
        }
    }
}
