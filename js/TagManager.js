var TagManager = {

    init: function() {
        if(!this.initialized) {
            this.initialized = true;
            this.onTagClick = this.onTagClick.bind(this);
            this.tags = [];
            this.tagDiv = document.getElementById("tags");
            this.resultsDiv = document.getElementById("results");
        }
    },


    addTags: function(model) {
        this.init();
        this.model = model;
        this.parseTags();

        for (var i = 0; i < this.tags.length; i++) {
            this.addTag(this.tags[i]);
            if (i < this.tags.length - 1) {
                this.tagDiv.appendChild(document.createTextNode(", "));
            }
        }
    },

    parseTags: function() {
        for (var item in this.model) {
            var itemTags = this.model[item].tags.split(",");
            for (var j = 0; j < itemTags.length; j++) {
                var tag = itemTags[j];

                if (this.tags.indexOf(tag) === -1) {
                    this.tags.push(tag);
                }
            }
        }
        this.tags.sort();
    },

    addTag: function(tag) {
        var a = document.createElement("a");
        a.innerText = tag;
        a.href = "#";
        a.addEventListener("click", this.onTagClick);
        this.tagDiv.appendChild(a)
    },

    onTagClick: function (event) {
        var tag = event.target.innerText;
        this.resultsDiv.innerText = tag + ": ";
        this.addItems(this.getItemsWithTag(tag));
        event.preventDefault();
    },

    addItems: function(items) {
        for(var i = 0; i < items.length; i++) {
            this.addItem(items[i]);
            if (i < items.length - 1) {
                this.resultsDiv.appendChild(document.createTextNode(", "));
            }
        }
    },

    addItem: function(item) {
        var link = document.createElement("a");
        link.href = "dailies/" + item + ".html";
        link.innerText = item;
        this.resultsDiv.appendChild(link);
    },


    getItemsWithTag: function(tag) {
        var items = [];
        for (var item in this.model) {
            if (this.model[item].tags.indexOf(tag) > -1) {
                items.push(item);
            }
        }
        return items;
    }

};