// ==UserScript==
// @name        Scrapeasy
// @namespace   oabtm
// @include     *
// @version     1
// @grant       none
// @require     UI.js
// @require     list.js
// @require     mainButtons.js
// @require     generate.js
// @require     showMore.js
// @require     highlight.js
// @require     domManipulation.js
// @require     cssSelectors.js
// @require     css.js
// ==/UserScript==

var minimumNodeListLength = 3;
window.addEventListener("load", function() {
	//checking that we're not in an iframe
	if (window === window.top) {
		insertCss();
		UI = createUI();
		attributeList = createAttributeList(UI);
	}
})
