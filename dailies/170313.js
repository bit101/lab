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

var offsetX = (width - 600) / 2,
    offsetY = (height - 600) / 2;

var cols = [
    {
        w: 200,
        tw: 200
    },
    {
        w: 200,
        tw: 200
    },
    {
        w: 200,
        tw: 200
    }
];

var rows = [
    {
        h: 200,
        th: 200
    },
    {
        h: 200,
        th: 200
    },
    {
        h: 200,
        th: 200
    }
];



document.addEventListener("mousemove", function(event) {
    adjustCols(event.clientX - offsetX);
    adjustRows(event.clientY - offsetY);
});

function adjustCols(xpos) {
    var x = 0;
    if(xpos >= x &&
        xpos < x + cols[0].w) {
        cols[0].tw = 400;
        cols[1].tw = 100;
        cols[2].tw = 100;
        return;
    }
    x += cols[0].w;
    if(xpos >= x &&
        xpos < x + cols[1].w) {
        cols[0].tw = 100;
        cols[1].tw = 400;
        cols[2].tw = 100;
        return;
    }
    cols[0].tw = 100;
    cols[1].tw = 100;
    cols[2].tw = 400;
}

function adjustRows(ypos) {
    var y = 0;
    if(ypos >= y &&
        ypos < y + rows[0].h) {
        rows[0].th = 400;
        rows[1].th = 100;
        rows[2].th = 100;
        return;
    }
    y += rows[0].h;
    if(ypos >= y &&
        ypos < y + rows[1].h) {
        rows[0].th = 100;
        rows[1].th = 400;
        rows[2].th = 100;
        return;
    }
    rows[0].th = 100;
    rows[1].th = 100;
    rows[2].th = 400;
}

var img = document.createElement("img");
img.addEventListener("load", function() {
    bitlib.anim(update).start();
});
img.src = "monalisa.jpg";

function update() {
    context.clear();
    context.save();
    context.translate(offsetX, offsetY);
    draw();
    context.restore();
}
function draw() {
    for(var i = 0; i < rows.length; i++) {
        var row = rows[i];
        row.h += (row.th - row.h) * 0.05;
    }

    for(var j = 0; j < cols.length; j++) {
        var col = cols[j];
        col.w += (col.tw - col.w) * 0.05;
    }

    var y = 0;
    for(var i = 0; i < rows.length; i++) {
        var row = rows[i];
        var x = 0;
        for(var j = 0; j < cols.length; j++) {
            var col = cols[j];
            // context.fillStyle =
            //     bitlib.color.hsv((i + j)/ 6 * 360, 1, 1);
            // context.fillRect(x, y, col.w, row.maxH);
            context.drawImage(img, j / 3 * 600, i / 3 * 600, 200, 200, x, y, col.w, row.h);
            x += col.w;
        }
        y += row.h;
    }
}

