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


// tags = "gradient,explorer"

/*
    The parameters to createRadialGradient are not the most intuitive. Made this gradient explorer to
    be able to play with them in real time.
 */

var context = bitlib.context(0, 0),
    width = context.width,
    height = context.height;


panel
    .setWidth(350)
    .addRange("radius", 0, 300, 300, 1, update)
    .addRange("x1", -300, 300, 0, 1, update)
    .addRange("y1", -300, 300, 0, 1, update)
    .addRange("r1", 0, 300, 300, 1, update)
    .addColor("c1", "#000000", update)
    .addRange("x2", -300, 300, 150, 1, update)
    .addRange("y2", -300, 300, -150, 1, update)
    .addRange("r2", 0, 300, 20, 1, update)
    .addColor("c2", "#ffffff", update)
    .addTextArea("output", "")
    .setTextAreaRows("output", 12);

update();


function update() {
    var radius = panel.getValue("radius"),
        x1 = panel.getValue("x1"),
        y1 = panel.getValue("y1"),
        r1 = panel.getValue("r1"),
        c1 = panel.getValue("c1")
        x2 = panel.getValue("x2"),
        y2 = panel.getValue("y2"),
        r2 = panel.getValue("r2"),
        c2 = panel.getValue("c2");

    var output = "context.translate(x, y);\n";
    output += "var gradient = context.createRadialGradient(" + x1 + "," +  y1 + "," + r1 + "," + x2 + "," + y2 + "," + r2 + ");\n";
    output += "gradient.addColorStop(0, " + c1 + ");\n";
    output += "gradient.addColorStop(1, " + c2 + ");\n";
    output += "context.fillStyle = gradient;\n";
    output += "context.beginPath();\n";
    output += "context.arc(0, 0, " + radius + ", 0, Math.PI * 2);\n";
    output += "context.fill();";
    panel.setValue("output", output);


        context.clear();
    context.save();
    context.translate(width / 2, height / 2);

    var gradient = context.createRadialGradient(x1, y1, r1, x2, y2, r2);
    gradient.addColorStop(0, c1);
    gradient.addColorStop(1, c2);
    context.fillStyle = gradient;

    context.fillCircle(0, 0, radius);


    context.restore();
}