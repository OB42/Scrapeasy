/*text nodes count as  child elements in JS but not in CSS,
in order to get an accurate index for an element, we need to use this function to ignore text nodes*/
function removeTextNodes(list) {
	var temp = [];
	[].slice.call(list).filter(function(n) {
		if (n.nodeType !== 3) {
			temp.push(n);
		}
	})
	return temp;
}
//handling browser compatibility for getIndex()
var prev = document.body.previousElementSibling ?
	'previousElementSibling' : 'previousSibling';

function getIndex(e) {
	var i = 1;
	while (e = e[prev]) {
		i++;
	}
	return i;
}
