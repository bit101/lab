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


var cellSize = 10,
    cols,
    rows,
    rule = 621,
    currentGrid,
    nextGrid,
    running = false;

panel
    .addNumber("rule", 0, 1023, rule, 1, function(value) {
        rule = value;
        init();
    })
    .addRange("cell size", 2, 50, cellSize, 1, function(value) {
        cellSize = value;
        init();
    })
    .addButton("Iterate 1x", iterate)
    .addBoolean("Run", false, function(value) {
        if(value) {
            anim.start();
            panel.hideControl("Iterate 1x");
        }
        else {
            panel.showControl("Iterate 1x");
            anim.stop();
        }
        running = value;
    })
    .addButton("Reset", function() {
        init();
        context.clear();
    })
    .addHTML("Instructions", "1. Choose a rule.<br/>2. Click \"Iterate 1x\" to iterate one time.<br/>4. Or select 'Run'.<br/>There are 1024 rules (0-1023). Very many of them will do nothing interesting at all. Others may cause seizures. But there are some gems too.")
    
init();

function init() {
    cols = Math.ceil(width  / cellSize);
    rows = Math.ceil(height / cellSize);
    currentGrid = createGrid();
    currentGrid[Math.round(cols / 2)][Math.round(rows / 2)] = 1;
}


var anim = bitlib.anim(iterate, 5);

function iterate() {
    var state,
        x, y;
    
    renderCurrentGrid();
    nextGrid = createGrid();
    
    for(var x = 0; x < cols; x++) {
        for(var y = 0; y < rows; y++) {
            var state = getState(x, y);
            if(rule & 1 << state) {
                nextGrid[x][y] = 1;
            }
        }
    }
    currentGrid = nextGrid;
}

function getState(x, y) {
    var state = 0;
    // left
    if(x === 0) {
        state += currentGrid[cols - 1][y] || 0;
    }
    else {
        state += currentGrid[x - 1][y] || 0;
    }
    // right
    if(x === cols - 1) {
        state += currentGrid[0][y] || 0;
    }
    else {
        state += currentGrid[x + 1][y] || 0;
    }
    // top
    if(y === 0) {
        state += currentGrid[x][rows - 1] || 0;
    }
    else {
        state += currentGrid[x][y - 1] || 0;
    }
    // bottom
    if(y === rows - 1) {
        state += currentGrid[x][0] || 0;
    }
    else {
        state += currentGrid[x][y + 1] || 0;
    }
    
    if(currentGrid[x][y]) {
        state += 5;
    }
    return state;
    
    
}

function createGrid() {
    var grid = [];
    for(var i = 0; i < cols; i++) {
        grid[i] = [];
    }
    return grid;
}

function renderCurrentGrid() {
    context.clear();
    for(var x = 0; x < cols; x++) {
        for(var y = 0; y < rows; y++) {
            if(currentGrid[x][y]) {
                context.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            }
        }
    }
}
