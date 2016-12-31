var ElementBuilder = {
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
}