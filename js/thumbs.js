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


    var thumbHolder = document.getElementById("thumbHolder");
    thumbHolder.style.textAlign = "center";
    var ascending = true;
    var smallThumbs = false;

    $.getJSON("index.json", function(data) {
        var list = [];
        for(var item in data) {
            list.push(item);
        }

        list.sort();
        display();

        TagManager.addTags(data);

        var sortLink = document.getElementById("sortLink");
        sortLink.addEventListener("click", function(event) {
            list.sort();
            ascending = !ascending;
            if(!ascending) {
                list.reverse();
                sortLink.innerText = "New to Old";
            }
            else {
                sortLink.innerText = "Old to New";
            }
            display();
            event.preventDefault();
        });

        var thumbSizeLink = document.getElementById("thumbSizeLink");
        thumbSizeLink.addEventListener("click", function(event) {
            smallThumbs = !smallThumbs;
            if(smallThumbs) {
                $("img")
                    .fadeOut(500, function() {
                        $("img")
                            .css("width", "100px")
                            .css("height", "100px")
                            .fadeIn(500);

                    });
                thumbSizeLink.innerText = "Small";
            }
            else {
                $("img")
                    .fadeOut(500, function() {
                        $("img")
                            .css("width", "200px")
                            .css("height", "200px")
                            .fadeIn(500);

                    });
                thumbSizeLink.innerText = "Large";
            }
            event.preventDefault();
        });

        function display() {
            console.log("display")
            while(thumbHolder.firstChild) {
                thumbHolder.removeChild(thumbHolder.firstChild);
            }
            for (var i = 0; i < list.length; i++) {
                var item = list[i];
                var a = document.createElement("a");
                a.href = "dailies/" + item + ".html";

                var img = document.createElement("img");
                img.src = "thumbs/" + item + ".png";
                if(smallThumbs) {
                    img.style.width = "100px";
                    img.style.height = "100px";
                }

                a.appendChild(img);
                thumbHolder.appendChild(a);
            }
        }

    });


})();