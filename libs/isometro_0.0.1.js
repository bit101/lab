var IsoMetro = {
    context: null,
    buildings: null,
    groundPlane: null,
    
    create: function(context) {
        var obj = Object.create(this);
        obj.init(context);
        return obj;
    },
    
    init: function(context) {
        this.context = context;
        this.buildings = [];
    },
    
    addBuilding: function(building) {
        this.buildings.push(building);
    },
    
    setGroundPlane: function(groundPlane) {
        this.groundPlane = groundPlane;
    },
    
    render: function() {
        // this.sort();
        if(this.groundPlane) {
            this.groundPlane.render(this.context);
        }
        for(var i = 0; i < this.buildings.length; i++) {
            this.buildings[i].render(this.context);
        }
    },
    
    sort: function() {
        this.buildings.sort(function(a, b) {
            result = (a.x + a.y) - (b.x + b.y);
            if(result) return result;
            return a.z - b.z;
        });
    }
}

var IsoColumn = {
    x: 0,
    y: 0,
    z: 0,
    size: 100,
    height: 100,
    hue: 20,
    sat: 0.5,
    val: 1,
    wallTexture: null,
    topTexture: null,
    
    create: function(x, y, z, size, height) {
        var obj = Object.create(this);
        obj.init(x, y, z, size, height);
        return obj;
    },
    
    init: function(x, y, z, size, height) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.size = size * Math.SQRT1_2;
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
        this.drawColumn(context);
        this.drawTop(context);
        context.restore();
    },
    
    drawTop: function(context) {
        context.save();
        context.fillStyle = bitlib.color.hsv(this.hue, this.sat, this.val);
        context.scale(1, 0.5);
        context.fillCircle(0, 0, this.size / 2);
        
        // context.beginPath();
        // context.globalAlpha = 0.5;
        // context.fillStyle = "black";
        // context.arc(0, 0, this.size / 2 - 2, Math.PI, 0, false);
        // context.arc(0, 3, this.size / 2 - 2, 0, Math.PI, true);
        // context.fill();
        // if(this.topTexture) {
        //     this.topTexture.draw(context, this.size, this.size);
        // }
        context.restore();
    },
    
    drawColumn: function(context) {
        var gradient = context.createLinearGradient(-this.size / 2, 0, this.size / 2, 0);
        gradient.addColorStop(0, bitlib.color.hsv(this.hue, this.sat, this.val * 0.25));
        gradient.addColorStop(1, bitlib.color.hsv(this.hue, this.sat, this.val * 0.75));
        context.fillStyle = gradient;
        context.save();
        context.fillRect(-this.size / 2, 0, this.size, this.height);
        
        if(this.wallTexture) {
            this.wallTexture.draw(context, this.size * 0.5, this.height);
        }
        context.translate(0, this.height);
        context.scale(1, 0.5);
        context.fillCircle(0, 0, this.size / 2);

        context.restore();
    
    },
    
    
};

var IsoBox = {
    x: 0,
    y: 0,
    z: 0,
    size: 100,
    height: 100,
    hue: 20,
    sat: 0.5,
    val: 1,
    wallTexture: null,
    topTexture: null,
    
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
    
    setTextures: function(wallTexture, topTexture) {
        this.wallTexture = wallTexture;
        this.topTexture = topTexture;
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
        if(this.topTexture) {
            this.topTexture.draw(context, this.size, this.size);
        }
        context.restore();
    },
    
    drawRight: function(context) {
        context.save();
        context.fillStyle = bitlib.color.hsv(this.hue, this.sat, this.val * 0.75);
        context.transform(1, -0.5, 0, 1, 0, this.size * 0.25);
        context.fillRect(0, 0, this.size * 0.5, this.height);
    
        if(this.wallTexture) {
            this.wallTexture.draw(context, this.size * 0.5, this.height);
        }
        context.restore();
    },
    
    drawLeft: function(context) {
        context.save();
        context.fillStyle = bitlib.color.hsv(this.hue, this.sat, this.val * 0.5);
        context.transform(1, 0.5, 0, 1, -this.size * 0.5, 0);
        context.fillRect(0, 0, this.size * 0.5, this.height);
        if(this.wallTexture) {
            this.wallTexture.draw(context, this.size * 0.5, this.height);
        }
        context.restore();
    }
};

var IsoPyramid = {
    x: 0,
    y: 0,
    z: 0,
    size: 100,
    height: 100,
    hue: 20,
    sat: 0.5,
    val: 1,
    wallTexture: null,
    
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
    
    setTextures: function(wallTexture, topTexture) {
        this.wallTexture = wallTexture;
        this.topTexture = topTexture;
        return this;
    },
    
    render: function(context) {
        var x = Math.round((this.x - this.y) / 2),
            y = Math.round((this.x + this.y) / 4) - this.z;
        context.save();
        context.translate(x, y - this.height);
        this.drawLeft(context);
        this.drawRight(context);
        context.restore();
    },
    
    drawRight: function(context) {
        context.save();
        context.fillStyle = bitlib.color.hsv(this.hue, this.sat, this.val * 0.75);
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(this.size / 2, this.height);
        context.lineTo(0, this.height + this.size * 0.25);
        context.fill();
        
        if(this.wallTexture) {
            this.wallTexture.draw(context, this.size * 0.5, this.height);
        }
        context.restore();
    },
    
    drawLeft: function(context) {
        context.save();
        context.fillStyle = bitlib.color.hsv(this.hue, this.sat, this.val * 0.5);

        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(0, this.height + this.size * 0.25);
        context.lineTo(-this.size / 2, this.height);
        context.fill();

        if(this.wallTexture) {
            this.wallTexture.draw(context, this.size * 0.5, this.height);
        }
        context.restore();
    }
    
}

var IsoTexture = {

    createContext: function(w, h) {
        var canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        // document.body.appendChild(cvs);
        return canvas.getContext("2d");
    },
    
    wood: function(w, h, alpha) {
        var context = this.createContext(w, h);
        for(var i = 0; i < 10000; i++) {
            context.globalAlpha = alpha || 0.5;
            context.fillStyle = bitlib.color.randomGray();
            context.fillRect(
                bitlib.random.float(w),
                bitlib.random.float(h),
                1.5, 15);
        }
        return {
            draw:  function(ctx, width, height) {
                var x = bitlib.random.int(0, w - width),
                    y = bitlib.random.int(0, h - height);
                ctx.drawImage(context.canvas,
                    x, y, width, height,
                    0, 0, width, height);
            }
        }
    },
    
    camo:  function(w, h, alpha, sizeMin, sizeMax) {
        var context = this.createContext(w, h);
        sizeMin = sizeMin || 1;
        sizeMax = sizeMax || 7;
        for(var i = 0; i < 10000; i++) {
            context.globalAlpha = alpha || 0.5;
            context.fillStyle = bitlib.color.randomGray();
            context.beginPath();
            context.arc(
                bitlib.random.float(w),
                bitlib.random.float(h),
                bitlib.random.float(sizeMin, sizeMax),
                0, Math.PI * 2);
            context.fill();
        }
        return {
            draw:  function(ctx, width, height) {
                var x = bitlib.random.int(0, w - width),
                    y = bitlib.random.int(0, h - height);
                ctx.drawImage(context.canvas,
                    x, y, width, height,
                    0, 0, width, height);
            }
        }
    },
    
    circles: function(w, h, alpha, count, sizeMin, sizeMax, width, color) {
        var context = this.createContext(w, h),
            count = count || w * h / 100,
            sizeMin = sizeMin || 2,
            sizeMax = sizeMax || 10;
        context.lineWidth = width || 0.5;
        context.strokeStyle = color || "white";
        context.globalAlpha = alpha;
        for(var i = 0; i < count; i++) {
            context.beginPath();
            context.arc(
                bitlib.random.float(w),
                bitlib.random.float(h),
                bitlib.random.float(sizeMin, sizeMax),
                0, Math.PI * 2);
            context.stroke();
        }
        return {
            draw:  function(ctx, width, height) {
                var x = bitlib.random.int(0, w - width),
                    y = bitlib.random.int(0, h - height);
                ctx.drawImage(context.canvas,
                    x, y, width, height,
                    0, 0, width, height);
            }
        }
    },
    
    perlin: function(w, h, alpha, sx, sy) {
        var context = this.createContext(w, h);
        context.globalAlpha = alpha || 0.5;
        sx = sx || 0.15;
        sy = sy || 0.15;
        for(var x = 0; x < w; x++) {
            for(var y = 0; y < h; y++) {
                var p = noise.perlin2(x * sx, y * sy),
                    value = bitlib.math.map(p, -1, 1, 0, 255);
                context.fillStyle = bitlib.color.gray(value);
                context.fillRect(x, y, 1, 1);
            }
        }
        return {
            draw:  function(ctx, width, height) {
                var x = bitlib.random.int(0, w - width),
                    y = bitlib.random.int(0, h - height);
                ctx.drawImage(context.canvas,
                    x, y, width, height,
                    0, 0, width, height);
            }
        }
    },
    
    lines: function(w, h, alpha) {
        var context = this.createContext(w, h);
        // context.fillRect(0, 0, 100, 500);
        context.strokeStyle = "black";
        context.lineWidth = 0.75;
        context.globalAlpha = alpha || 0.5;
        for(var y = 0; y < h; y += 3) {
            context.beginPath();
            for(var x = 0; x < w; x += 2) {
                context.lineTo(x, y + bitlib.random.float(-1, 1));
            }
            context.stroke();
        }
        return {
            draw: function (ctx, width, height) {
                var x = bitlib.random.int(0, w - width),
                    y = bitlib.random.int(0, h - height);
                ctx.drawImage(context.canvas,
                    x, y, width, height,
                    0, 0, width, height);
            }
        }
    },
    
    bricks: function(w, h, alpha) {
        var context = this.createContext(w, h);
        context.globalAlpha = alpha || 0.5;
        var even = true,
            bw = 12,
            bh = bw / 2;
        for(var y = 0; y < h + bh; y += bh) {
            for(var x = 0; x < w + bw; x += bw) {
                var xx = x + (even ? 0 : -bw / 2);
                context.fillRect(xx, y, bw - 1, bh - 1);
            }
            even = !even;
        }
        return {
            draw:  function(ctx, width, height) {
                var x = bitlib.random.int(0, w - width),
                    y = bitlib.random.int(0, h - height);
                ctx.drawImage(context.canvas,
                    x, y, width, height,
                    0, 0, width, height);
            }
        }
    },
    
    windows: function(w, h, ww, wh, color, alpha) {
        ww = ww || 5;
        wh = wh || 10;
        var context = this.createContext(w, h);
        context.fillStyle = color || bitlib.color.randomRGB();
        context.globalAlpha = alpha || 0.5;
        for(var y = 0; y < h + wh; y += wh) {
            for(var x = 0; x < w + ww; x += ww) {
                context.fillRect(x, y + 2, ww - 2, wh - 2);
            }
        }
        return {
            draw:  function(ctx, width, height) {
                ctx.drawImage(context.canvas,
                    0, 0, width, height,
                    0, 0, width, height);
            }
        }
    },
    
    topLip: function(border, height, alpha) {
        border = border || 4;
        height = height || 4;
        
        return {
            draw: function(ctx, w, h) {
                ctx.save();
                ctx.fillStyle = "black";
                ctx.globalAlpha = 0.33;
                ctx.fillRect(border, border, height, h - border * 2);
                ctx.globalAlpha = 0.45;
                ctx.fillRect(border + height, border, w - border * 3, height);
                ctx.restore();
                
            }
        }
    }
};

