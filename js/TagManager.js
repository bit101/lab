var TagManager = {

    init: function(listView) {
        this.listView = listView;
        if(!this.initialized) {
            this.initialized = true;
            this.onTagClick = this.onTagClick.bind(this);
            this.tags = [];
            this.tagDiv = document.getElementById("tags");
        }
    },


    addTags: function(model) {
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
        window.location.href = "index.html?tag=" + tag;
        event.preventDefault();
    }
};