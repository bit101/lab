(function() {
    $.getJSON("index.json", function(data) {
        var list = $("#list");
        for(var i = 0; i < data.length; i++) {
            var name = data[i].name,
                desc = data[i].desc,
                year = name.substr(0, 2),
                month = name.substr(2, 2),
                date = name.substr(4, 2),
                path = "20" + year + "/" + year + month + date + ".html",
                title = "20" + year + "-" + month + "-" + date;

            list.append("<li><a href='" + path + "' title='" + desc + "'>" + title + "</a></li>");
        }
    })
})();