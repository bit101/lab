var Handles = {
    onChangeHandler: null,

    create: function(context) {
        var obj = Object.create(this);
        obj.init(context);
        return obj;
    },

    init: function(context) {
        this.context = context;
        this.handles = [];
        this.radius = 10;
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.context.canvas.addEventListener("mousedown", this.onMouseDown);
    },

    add: function(x, y) {
        var handle = { x: x, y: y };
        this.handles.push(handle);
        if(this.onChangeHandler) {
            this.onChangeHandler();
        }
        return handle;
    },

    onMouseDown: function(event) {
        var rect = this.context.canvas.getBoundingClientRect(),
            x = event.clientX - rect.left,
            y = event.clientY - rect.top;
        for(var i = 0; i < this.handles.length; i++) {
            var h = this.handles[i],
                dx = x - h.x,
                dy = y - h.y,
                dist = Math.sqrt(dx * dx + dy * dy);
            if(dist < this.radius) {
                this.activeHandle = h;
                this.offsetX = dx;
                this.offsetY = dy;
                document.addEventListener("mousemove", this.onMouseMove);
                document.addEventListener("mouseup", this.onMouseUp);
                return;
            }
        }
    },

    onMouseMove: function(event) {
        var rect = this.context.canvas.getBoundingClientRect(),
            x = event.clientX - rect.left,
            y = event.clientY - rect.top;
        this.activeHandle.x = x - this.offsetX;
        this.activeHandle.y = y - this.offsetY;
        if(this.onChangeHandler) {
            this.onChangeHandler();
        }
    },

    onMouseUp: function(event) {
        document.removeEventListener("mousemove", this.onMouseMove);
        document.removeEventListener("mouseup", this.onMouseUp);
        this.activeHandle = null;
    },

    render: function() {
        context.save();
        for(var i = 0; i < this.handles.length; i++) {
            var h = this.handles[i];
            this.context.fillStyle = "rgba(0, 0, 0, 0.5)";
            this.context.fillCircle(h.x, h.y, this.radius);
        }
        context.restore();
    },

    get: function(index) {
        return this.handles[index];
    },


    line: function(handles) {
        this.context.beginPath();
        for(var i = 0; i < handles.length; i++) {
            var h = this.handles[handles[i]];
            if(h) {
                this.context.lineTo(h.x, h.y);
            }
        }
        this.context.stroke();
    },

    lineAll: function() {
        this.context.beginPath();
        for(var i = 0; i < this.handles.length; i++) {
            var h = this.handles[i];
            this.context.lineTo(h.x, h.y);
        }
        this.context.stroke();
    },

    quad: function(a, b, c) {
        var ha = this.handles[a],
            hb = this.handles[b],
            hc = this.handles[c];
        if(ha && hb && hc) {
            this.context.beginPath();
            this.context.moveTo(ha.x, ha.y);
            this.context.quadraticCurveTo(hb.x, hb.y, hc.x, hc.y);
            this.context.stroke();
        }
    },

    cubic: function(a, b, c, d) {
        var ha = this.handles[a],
            hb = this.handles[b],
            hc = this.handles[c],
            hd = this.handles[d];
        if(ha && hb && hc && hd) {
            this.context.beginPath();
            this.context.moveTo(ha.x, ha.y);
            this.context.bezierCurveTo(hb.x, hb.y, hc.x, hc.y, hd.x, hd.y);
            this.context.stroke();
        }
    }

};
