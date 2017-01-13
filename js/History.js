var History = {
    dates: [],

    add: function(date) {
        if(this.dates.indexOf(date) == -1) {
            this.dates.push(date);
            this.save();
            this.apply();
        }
    },

    clear: function() {
        for(var i = 0; i < this.dates.length; i++) {
            $("#" + this.dates[i]).css({
                color:  "#000000",
                textDecoration: "none"
            });
        }
        this.dates.length = 0;
        this.save();
    },

    save: function() {
        localStorage.setItem("history", this.dates.join(","));
    },

    load: function() {
        var items = localStorage.getItem("history");
        if(items) {
            this.dates = items.split(",");
        }
        else {
            this.dates = [];
        }
        this.apply();
    },

    apply: function() {
        for(var i = 0; i < this.dates.length; i++) {
            $("#" + this.dates[i]).css({
                color:  "#555555",
                textDecoration: "line-through"
            });
        }
    }

}