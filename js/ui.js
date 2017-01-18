var panel;

function setup(yymmdd, prev, next, desc, issueNumber, links) {
    document.title = yymmdd;
    panel= QuickSettings.create(10, 10, yymmdd)
        .addHTML("home", '<a href="https://bit101.github.io/lab/">CALENDAR</a> - <a href="https://bit101.github.io/lab/thumbs.html">THUMBS</a>')
        .addHTML("Description", desc);

    if(links) {
        panel.addHTML("Links", "");
        for(var i = 0; i < links.length; i++) {
            panel.addHTML("link" + i, links[i]);
        }
    }

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

    var tweets = ["Check it!", "Look!", "Check this out!", "I'm looking at this:", "Click this:", "Today's BIT-101 Lab:", "Have you seen this?", "A thing:", "Hey!"],
        tweet = tweets[bitlib.random.int(tweets.length)];

    panel
        .addHTML("source_comments", '<a href="https://github.com/bit101/lab/blob/master/dailies/' + yymmdd + '.js"><img src="../images/github.png"></a><a href="https://github.com/bit101/lab/issues/' + issueNumber + '"><img src="../images/comment.png"></a><a href="https://twitter.com/home?status=' + tweet +  ' https://bit101.github.io/lab/dailies/' + yymmdd + '.html"><img src="../images/twitter.png"></a><a href="https://www.facebook.com/sharer.php?u=https://bit101.github.io/lab/dailies/' + yymmdd + '.html"><img src="../images/facebook.png"></a>')
        .addHTML("prev_next", prevNext)
        .hideAllTitles()
        .showTitle("Description");

    if(links) {
        panel.showTitle("Links");
    }

    var script = document.createElement("script");
    script.src = yymmdd + ".js";
    document.body.appendChild(script);
}
