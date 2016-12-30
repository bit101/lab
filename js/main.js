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


(function() {

    $.getJSON("index.json", function(data) {
        Calendar.create(data, 2017, document.getElementById("calendarHolder"));
        parseTags(data);
        document.getElementsByClassName("content")[0].style.display = "block";
    });


    function parseTags(model) {
        var tags = [];
        for(var item in model) {
            var itemTags = model[item].tags.split(",");
            for(var j = 0; j < itemTags.length; j++) {
                var tag = itemTags[j];

                if(tags.indexOf(tag) === -1) {
                    tags.push(tag);
                }
            }
        }
        tags.sort();
        var tagDiv = document.getElementById("tags");
        for(var i = 0; i < tags.length; i++) {
            var a = document.createElement("a");
            a.innerText = tags[i];
            a.href = "#";
            a.addEventListener("click", function(event) {
                var tag = event.target.innerText;
                var resultsDiv = document.getElementById("results");
                resultsDiv.innerText = tag + ": ";
                var results = getResults(tag, model);
                for(var j = 0; j < results.length; j++) {
                    var result = document.createElement("a");
                    result.href = "dailies/" + results[j] + ".html";
                    result.innerText = results[j];
                    resultsDiv.appendChild(result);
                    if(j < results.length - 1) {
                        resultsDiv.append(", ");
                    }
                }
                event.preventDefault();
            });
            tagDiv.appendChild(a)
            if(i < tags.length - 1) {
                tagDiv.append(", ");
            }
        }
    }

    function getResults(tag, model) {
        var results = [];
        for(var item in model) {
            if(model[item].tags.indexOf(tag) > -1) {
                results.push(item);
            }
        }
        return results;
    }
})();