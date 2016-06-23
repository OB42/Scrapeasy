/*Find the most precise CSS selector based on the settings of the user,
and highlight the elements that matches it. */
function preciseSelector(multiple, sameIndex, sameIndexFromEnd) {
	var es = [];
	var h = document.querySelectorAll(":hover");
	for (var hl = 0; hl < h.length; hl++) {
		es.push(relatedSelector(h[hl], multiple));
	}
	var indexSelector = "";
		var current = h[h.length - 1];
		if (sameIndexFromEnd && current.parentNode) {
			/*if the element doesn't have any siblings,using an index become useless,
			 so we're checking for the parent of the parent*/
			if (removeTextNodes(current.parentNode.childNodes).length > 1) {
				var index = removeTextNodes(current.parentNode.childNodes).length - getIndex(current) + 1;
				if(document.querySelectorAll(es.join(">") + ":nth-last-child(" + index + ")").length > minimumNodeListLength){
					indexSelector += ":nth-last-child(" + index + ")";
				}
			} else if (current.parentNode.parentNode && es.length > 1 && removeTextNodes(current.parentNode.parentNode.childNodes).length > 1) {
				var index = current.parentNode.parentNode.childNodes.length - getIndex(current.parentNode) + 1;
				var esCopy = es.slice(0);
				esCopy[esCopy.length - 2] += ":nth-last-child(" + index + ") ";
				if(document.querySelectorAll(esCopy.join(">")).length > minimumNodeListLength){
					es[es.length - 2] += ":nth-last-child(" + index + ") ";
				}
			}
		}
		if (sameIndex) {
			if (removeTextNodes(current.parentNode.childNodes).length > 1) {
				if(document.querySelectorAll(es.join(">") + indexSelector + ":nth-child(" + getIndex(current) + ")").length > minimumNodeListLength)
				{
					indexSelector += ":nth-child(" + getIndex(current) + ")";
				}
			} else if (current.parentNode.parentNode && es.length > 1 && removeTextNodes(current.parentNode.parentNode.childNodes).length > 1) {
				var esCopy = es.slice(0);
				esCopy[esCopy.length - 2] += ":nth-last-child(" + getIndex(current.parentNode) + ") ";
				if(document.querySelectorAll(esCopy.join(">")).length > minimumNodeListLength){
					es[es.length - 2] += ":nth-last-child(" + getIndex(current.parentNode) + ") ";
				}
			}
		}
	lastSelector = es.join(">") + indexSelector;
	highlight();
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
	    var l = document.querySelectorAll(selector).length;
	    if (!multiple || l > minimumNodeListLength) {
	        selectors.push([selector, l])
	    }
	}
	if(selectors.length){
	    for(var y = selectors.length - 1; y > -1; y--){
	        if(selectors[y][1] === selectors[0][1]){
	            return selectors[y][0]
	        }
	    }
	}
	return tag;
}
