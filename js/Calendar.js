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

var Calendar = {

    months: ["January", "February", "March", "April", "May", "June",
             "July", "August", "September", "October", "November", "December"],

    create: function(model, year, parent) {
        this.model = model;
        this.container = this.createElement(parent, "div", "calendar");
        this.createElement(this.container, "div", "calendarHeader", year);

        for(var i = 0; i < 12; i++) {
            this.addMonth(year, i);
        }
    },

    addMonth: function(year, month) {
        var monthDiv = this.createElement(this.container, "div", "month"),
            title = this.createElement(monthDiv, "div", "title", this.months[month]),
            dateContainer = this.createElement(monthDiv, "div", "dateContainer");

        for(var i = 0; i < 42; i++) {
            this.addDate(dateContainer, year, month, i);
        }
    },

    addDate: function(parent, year, month, index) {
        var first = new Date(year, month, 1).getDay(),
            maxDate = this.getMaxDate(month, year),
            date = index - first + 1,
            dateDiv = this.createElement(parent, "div", "date"),
            title = this.formatDate(year, month, date);

        if(index > 0 && !(index % 7)) {
            dateDiv.style.clear = "both";
        }
        if(date >= 1 && date <= maxDate) {
            dateDiv.innerText = date;
            if(this.model[title]) {
                dateDiv.dataset.date = title;
                dateDiv.className += " active";
                dateDiv.addEventListener("click", function(event) {
                    window.location.href = "dailies/" + event.target.dataset.date + ".html";
                });
            }
        }

    },

    formatDate: function(year, month, date) {
        month++;
        if(month < 10) month = "0" + month;
        if(date < 10) date = "0" + date;
        return ("" + year).substring(2) + month + date;
    },

    getMaxDate: function(month, year) {
        switch(month) {
            case 0:
            case 2:
            case 4:
            case 6:
            case 7:
            case 9:
            case 11:
                return 31;

            case 1:
                if(year % 4) {
                    return 28;
                }
                return 29;
        }
        return 30
    },

    createElement: function(parent, type, className, innerText) {
        var element = document.createElement(type);
        if(className) {
            element.className = className;
        }
        if(innerText) {
            element.innerText = innerText;
        }
        if(parent) {
            parent.appendChild(element);
        }
        return element;
    }
};