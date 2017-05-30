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
var x = 0,
    y = 0,
    z = 0,
    size = 100,
    h = 100,
    hue = 20,
    sat = 0.5,
    val = 1;

panel
    .addRange("x", -500, 500, x, 1)
    .addRange("y", -500, 500, y, 1)
    .addRange("z", -500, 500, z, 1)
    .addRange("size", 10, 1000, size, 1)
    .addRange("h", 0, 1000, h, 1)
    .addRange("hue", 0, 360, hue, 1)
    .addRange("sat", 0, 1, sat, 0.01)
    .addRange("val", 0, 1, val, 0.01)
    .setGlobalChangeHandler(draw);


var IsoBox = {
    x: 0,
    y: 0,
    z: 0,
    size: 100,
    height: 100,
    hue: 20,
    sat: 0.5,
    val: 1,

    create: function(x, y, z, size, height) {
        var obj = Object.create(this);
        obj.init(x, y, z, size, height);
        return obj;
    },

    init: function(x, y, z, size, height) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.size = size;
        this.height = height;
    },

    setHSV: function(hue, sat, val) {
        this.hue = hue;
        this.sat = sat;
        this.val = val;
        return this;
    },

    render: function(context) {
        var x = Math.round((this.x - this.y) / 2),
            y = Math.round((this.x + this.y) / 4) - this.z;
        context.save();
        context.translate(x, y - this.height);
        this.drawBack(context);
        this.drawLeft(context);
        this.drawRight(context);
        this.drawTop(context);
        context.restore();
    },

    drawBack: function(context) {
        context.fillStyle = bitlib.color.hsv(this.hue, this.sat, this.val);
        context.beginPath();
        context.moveTo(-this.size / 2, 0);
        context.lineTo(this.size / 2, 0);
        context.lineTo(0, this.height + this.size / 4);
        context.fill();
    },

    drawTop: function(context) {
        context.save();
        context.fillStyle = bitlib.color.hsv(this.hue, this.sat, this.val);
        context.scale(1, 0.5);
        context.rotate(Math.PI / 4);
        context.scale(Math.SQRT1_2, Math.SQRT1_2);
        context.translate(-this.size / 2, -this.size / 2);
        context.fillRect(0, 0, this.size, this.size);
        context.restore();
    },

    drawRight: function(context) {
        context.save();
        context.fillStyle = bitlib.color.hsv(this.hue, this.sat, this.val * 0.75);
        context.transform(1, -0.5, 0, 1, 0, this.size * 0.25);
        context.fillRect(0, 0, this.size * 0.5, this.height);
        context.restore();
    },

    drawLeft: function(context) {
        context.save();
        context.fillStyle = bitlib.color.hsv(this.hue, this.sat, this.val * 0.5);
        context.transform(1, 0.5, 0, 1, -this.size * 0.5, 0);
        context.fillRect(0, 0, this.size * 0.5, this.height);
        context.restore();
    }
};

draw();

function draw() {
    x = panel.getValue("x");
    y = panel.getValue("y");
    z = panel.getValue("z");
    size = panel.getValue("size");
    h = panel.getValue("h");
    hue = panel.getValue("hue");
    sat = panel.getValue("sat");
    val = panel.getValue("val");
    context.save();
    context.clear();
    context.translate(width / 2, height / 2);
    var building = IsoBox.create(x, y, z, size, h);
    building.setHSV(hue, sat, val);
    building.render(context);
    context.restore();
}