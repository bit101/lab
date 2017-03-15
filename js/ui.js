var panel;

function setup(yymmdd, prev, next, desc, issueNumber, links) {
    document.title = yymmdd;
    panel= QuickSettings.create(10, 10, yymmdd)
        .addHTML("home", '<a href="https://bit101.github.io/lab/">CALENDAR</a> - <a href="https://bit101.github.io/lab/thumbs.html">THUMBS</a>');

    var prevNext = '';
    if(prev) {
        prevNext += '<a href="' + prev + '.html">PREV</a>';
        if(next) {
            prevNext += " - ";
        }
    }
    if(next) {
        prevNext += '<a href="' + next + '.html">NEXT</a>'
    }

    panel
        .addHTML("Source, Comments, Social", '<a href="https://github.com/bit101/lab/blob/master/dailies/' + yymmdd + '.js"><img src="../images/github.png"></a><a href="https://github.com/bit101/lab/issues/' + issueNumber + '"><img src="../images/comment.png"></a><a href="https://twitter.com/home?status=Check it: https://bit101.github.io/lab/dailies/' + yymmdd + '.html"><img src="../images/twitter.png"></a><a href="https://www.facebook.com/sharer.php?u=https://bit101.github.io/lab/dailies/' + yymmdd + '.html&picture=https://bit101.github.io/lab/thumbs/' + yymmdd + '.png"><img src="../images/facebook.png"></a><a href="https://bit101.github.io/lab/feed.xml"><img src="../images/rss.png"></a>')
        .addHTML("hide", "H key toggles panel")
        .addHTML("prev_next", prevNext)
        .addHTML("Description", desc);

        if(links) {
            panel.addHTML("Links", "");
            for(var i = 0; i < links.length; i++) {
                panel.addHTML("link" + i, links[i]);
            }
        }
    panel
        .hideAllTitles()
        .showTitle("Source, Comments, Social")
        .showTitle("Description")
        .setKey("h");

    if(links) {
        panel.showTitle("Links");
    }

    var script = document.createElement("script");
    script.src = yymmdd + ".js";
    document.body.appendChild(script);
}
