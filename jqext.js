// Harshvardhan Sharma : 18 August 2018
var $jqScope = {};
var jqExt = {
    containers: ["div", "p", "span", "i", "strong", "small"],
    bootstrap: function () {
        var bindElements = document.querySelectorAll('[jqModel]');
        var nodes = Array.prototype.slice.call(bindElements, 0);
        nodes.forEach(function (element) {
            var objName = element.getAttribute("jqModel");
            var elements = document.querySelectorAll('[jqModel=\'' + objName + '\']');
            for (var index in elements) {
                if (elements[index].tagName) {
                    var tagName = elements[index].tagName.toLowerCase();
                    if (tagName === "input") {
                        var type = elements[index].type.toLowerCase();
                        if (type === "text") {
                            elements[index].onkeyup = function () {
                                for (var index in elements) {
                                    elements[index].value = this.value;
                                    updateInnerHtml(elements[index]);
                                }
                            };
                        }
                        else if (type === "checkbox") {
                            elements[index].onchange = function () {
                                for (var index in elements) {
                                    elements[index].value = this.checked;
                                    updateInnerHtml(elements[index]);
                                }
                            };
                        }
                    }
                    else if (tagName === "select") {
                        elements[index].onselect = function () {
                            for (var index in elements) {
                                elements[index].value = this.value;
                                updateInnerHtml(elements[index]);
                            }
                        };
                    }
                }
            }

            var updateInnerHtml = function (element) {
                if (element.tagName && jqExt.containers.indexOf(element.tagName.toLowerCase()) !== -1) {
                    element.innerHTML = element.value;
                }
            };

            try {
                Object.defineProperty($jqScope, objName, {
                    get: function () {
                        return elements[0].value;
                    },
                    set: function (newValue) {
                        for (var index in elements) {
                            if (elements[index].tagName) {
                                var tagName = elements[index].tagName.toLowerCase();
                                if (tagName === "input") {
                                    if (elements[index].type.toLowerCase() === "checkbox") {
                                        elements[index].checked = newValue;
                                    }
                                }
                                else if (jqExt.containers.indexOf(tagName) !== -1) {
                                    elements[index].innerHTML = newValue;
                                }
                            }

                            elements[index].value = newValue;
                        }
                    }
                });
            }
            catch (e) {
                // console.warn(e);
            }
        });
    }
};


