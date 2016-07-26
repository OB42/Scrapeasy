// ==UserScript==
// @name        Scrapeasy
// @include     *
// @namespace   oabtm_gm
// @grant       none
// @run-at      document-start
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
var UI, attributeList, prev, rawHTML;
var lastScrapingMethod = "default";
var hovered = document.querySelectorAll(":hover");
var minimumNodeListLength = 3;
var rules = {};
var elements = {
    raw: {},
    current: {}
};
var lastSelector = ":not(*)";

function load() {
    //handling browser compatibility for getIndex()
    prev = document.body.previousElementSibling ?
        'previousElementSibling' : 'previousSibling';
    insertCss();
    UI = createUI();
    attributeList = createAttributeList(UI);
}
//checking that we're not in an iframe
if (window === window.top) {
    fetch(window.location)
        .then(function(response) {
            return response.text();
        })
        .then(function(html) {
            rawHTML = new DOMParser().parseFromString(html, "text/html");
            if (document.readyState === "complete") {
                load();
            } else {
                window.addEventListener("load", load)
            }
        })
}
