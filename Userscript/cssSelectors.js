/*Find the most precise CSS selector based on the settings of the user,
and highlight the elements that matches it. */
function preciseSelector(checkboxes, doc) {
    function querySelectorAllOnce(selector) {
        if (typeof doc.innerHTML === "undefined") {
            if (typeof elements.current[selector] === "undefined") {
                elements.current[selector] = doc.querySelectorAll(selector);
            }
            return elements.current[selector];
        } else {
            if (typeof elements.raw[selector] === "undefined") {
                elements.raw[selector] = doc.querySelectorAll(selector);
            }
            return elements.raw[selector];
        }
    }
    function relatedSelector(element, multiple) {
        var classes = element.className.split(" "),
            empty = classes.lastIndexOf(""),
            tag = element.tagName;
        while (empty !== -1) {
            classes.splice(empty, 1);
            empty = classes.lastIndexOf("");
        }
        var selectors = []
        for (var c = classes.length - 1; c > -1; c--) {
            var selector = tag + "." + classes.slice(0, c + 1).join(".");
            var l = querySelectorAllOnce(selector).length;
            if (!multiple || l > minimumNodeListLength) {
                selectors.push([selector, l])
            }
        }
        if (selectors.length && selectors[0][1]) {
            for (var y = selectors.length - 1; y > -1; y--) {
                if (selectors[y][1] === selectors[0][1]) {
                    return selectors[y][0]
                }
            }
        }
        return tag;
    }
    var elementsSelectors = [];
    for (var h = 0; h < hovered.length; h++) {
        elementsSelectors.push(relatedSelector(hovered[h], checkboxes.multiple));
    }
    var indexSelector = "";
    var current = hovered[hovered.length - 1];
    if (checkboxes.sameIndexFromEnd && current.parentNode) {
        /*if the element doesn't have any siblings,using an index become useless,
         so we're checking for the parent of the parent*/
        var sibLength = removeTextNodes(current.parentNode.childNodes).length;
        if (sibLength > 1) {
            var index = sibLength - getIndex(current) + 1;
            if (querySelectorAllOnce(elementsSelectors.join(">") + ":nth-last-child(" + index + ")").length > minimumNodeListLength) {
                indexSelector += ":nth-last-child(" + index + ")";
            }
        } else if (current.parentNode.parentNode && elementsSelectors.length > 1 && removeTextNodes(current.parentNode.parentNode.childNodes).length > 1) {
            var index = removeTextNodes(current.parentNode.parentNode.childNodes).length - getIndex(current.parentNode) + 1;
            var esCopy = elementsSelectors.slice(0);
            esCopy[esCopy.length - 2] += ":nth-last-child(" + index + ") ";
            if (querySelectorAllOnce(esCopy.join(">")).length > minimumNodeListLength) {
                elementsSelectors[elementsSelectors.length - 2] += ":nth-last-child(" + index + ") ";
            }
        }
    }
    if (checkboxes.sameIndex) {
        if (removeTextNodes(current.parentNode.childNodes).length > 1) {
            if (querySelectorAllOnce(elementsSelectors.join(">") + indexSelector + ":nth-child(" + getIndex(current) + ")").length > minimumNodeListLength) {
                indexSelector += ":nth-child(" + getIndex(current) + ")";
            }
        } else if (current.parentNode.parentNode && elementsSelectors.length > 1 && removeTextNodes(current.parentNode.parentNode.childNodes).length > 1) {
            var esCopy = elementsSelectors.slice(0);
            var currentParentIndex = getIndex(current.parentNode);
            esCopy[esCopy.length - 2] += ":nth-last-child(" + currentParentIndex + ") ";
            if (querySelectorAllOnce(esCopy.join(">")).length > minimumNodeListLength) {
                elementsSelectors[elementsSelectors.length - 2] += ":nth-last-child(" + currentParentIndex + ") ";
            }
        }
    }
    return elementsSelectors.join(">") + indexSelector;
}
