// ==UserScript==
// @name	Scrapeasy
// ==/UserScript==
var UI, attributeList;
var rules = {};
window.addEventListener("load", function() {
	//checking that we're not in an iframe
	if (window === window.top) {
		insertCss();
		UI = createUI();
		attributeList = createAttributeList(UI);
	}
})
function generate(){
	if(!Object.getOwnPropertyNames(rules).length){
	    alert("You haven't selected any elements!");
	}
	else{
	    var script = "data:text/javascript," +
	    `var Scrapeasy = require("Scrapeasy");
	    var pattern = ` + JSON.stringify(rules) + `;
	    Scrapeasy("` + window.location + `", pattern, function(err, data){
	        if(err) throw err;
	        console.log(data);
	    });`
		window.open(script, "_blank");
	}
}
function start(e) {
	var lastSelector = "";
	var lockOnElement = false;
	this.querySelector("h1").innerText = "Generate script";
	this.removeEventListener("click", start);
	this.addEventListener("click", generate);
	document.addEventListener("keydown", function(e) {
		if (e.which === 17) {
			if (lockOnElement) {
				lockOnElement = false;
			} else {
				lockOnElement = true;
			}
		}
	});
	var lasthover;
	var sameIndex = UI.querySelector(".same-index"),
		sameIndexEnd = UI.querySelector(".same-index-end"),
		unique = UI.querySelector(".non-unique");
	document.addEventListener("mousemove", function(e) {
		if (!lockOnElement) {
			var hovered = document.elementFromPoint(e.clientX, e.clientY);
			if (lasthover) {
				lasthover.className = lasthover.className.replace(" current-hover", "");
			}
			hovered.className += " current-hover";
			if (lasthover !== hovered) {
				lasthover = hovered;
				updateAttributeList(hovered);
				removeHighlighting();
				preciseSelector(unique.checked, sameIndex.checked, sameIndexEnd.checked);
			}
		}
	});
	e.preventDefault();
}

function insertCss() {
	var newCss = document.createElement("style");
	newCss.innerHTML = scrapCss;
	document.head.appendChild(newCss);
}

function cBox(bClass) {
	return '<input class="' + bClass + ' not-nhover" type="checkbox">'
}

function createUI() {
	var UI = document.createElement("div");
	UI.className = "not-nhover not-nhover-main";
	UI.innerHTML = `<a href='#' class='not-nhover'>
    <h1 class='not-nhover wsnw show-attr'>Less</h1></a>
	<a href='#' class='not-nhover'>
    <h1 class='not-nhover wsnw show-attr'>Start</h1></a>
    <br> Multiple css selectors only?` + cBox("non-unique") +
	"<br> Same index only?" + cBox("same-index") +
	"<br> Same index from last only?" + cBox("same-index-end") + "<hr>";
	UI.querySelectorAll("a")[0].addEventListener("click", less);
	UI.querySelectorAll("a")[1].addEventListener("click", start);
	document.body.insertBefore(UI, document.body.firstChild);
	UI.querySelector(".non-unique").checked = true;
	return UI;
}
function less(e){
	if(this.innerText === "Less"){
		this.querySelector("h1").innerText = "More";
		UI.className += " minimizeUI";
	}
	else{
		this.querySelector("h1").innerText = "Less";
		UI.className = UI.className.replace(" minimizeUI", "");
	}
	UI.scrollTop = 0;
	e.preventDefault();
}

function createAttributeList(UI) {
	var attributeList = document.createElement("div");
	attributeList.className = "not-nhover";
	UI.appendChild(attributeList);
	return attributeList;
}

function showAttribute(attr, list) {
	var newAttr = document.createElement("div");
	var showBtn = document.createElement('span');
	showBtn.setAttribute("class", "not-nhover show-attr show-attr-btn");
	showBtn.innerHTML = "+";
	var name = document.createElement('span');
	name.setAttribute("class", "not-nhover show-attr name");
	name.innerHTML = attr.name;
	var val = document.createElement('input');
	val.setAttribute("class", "not-nhover");
	val.setAttribute("readonly", "true");
	val.setAttribute("placeholder", attr.value);
	newAttr.appendChild(showBtn);
	newAttr.appendChild(name);
	newAttr.appendChild(val);
	list.appendChild(newAttr);
}

function updateAttributeList(lasthover) {
	attributeList.innerHTML = "";
	if (!lasthover.className.match("not-nhover")) {
		if (lasthover.innerText.length) {
			showAttribute({
				name: "Text",
				value: lasthover.innerText
			}, attributeList);
		}
		if (lasthover.value) {
			showAttribute({
				name: "value",
				value: lasthover.value
			}, attributeList);
		}
		for (var t = 0; t < lasthover.attributes.length; t++) {
			showAttribute(lasthover.attributes[t], attributeList);
		}
		[].slice.call(lasthover.attributes).filter(function(a) {
			showAttribute(a,attributeList);
		});
	}
	var showBtn = document.querySelectorAll(".show-attr-btn");
	for (var s = 0; s < showBtn.length; s++) {
		showBtn[s].addEventListener("click", showMore);
	}
}

function fxArea() {
	var area = document.createElement("textarea");
	area.setAttribute("class", "not-nhover");
	area.setAttribute("rows", "4");
	area.setAttribute("style", "");
	area.value = "return x;";
	this.parentNode.appendChild(area);
	this.removeEventListener("click", fxArea);
	this.addEventListener("click", function() {
		var area = this.parentNode.querySelector("textarea");
		if (area.getAttribute("style").length) {
			area.setAttribute("style", "");
		} else {
			area.setAttribute("style", "display: none;");
		}
	});
}

function numberInput(min, max, iClass) {
	var input = document.createElement("input");
	input.setAttribute("type", "number");
	input.setAttribute("min", min);
	input.setAttribute("max", max);
	input.setAttribute("class", iClass);
	return input;
}

function save(){
	var as = this.parentNode.querySelector('input[type="text"]').value;
	if(as.indexOf("[n]") === -1){
		alert('"As:" must follow this pattern: array[n] or array[n].property !');
	}
	else{
		if(typeof rules[lastSelector] === "undefined"){
			rules[lastSelector] = [];
		}
		var max = -1;
		if(parseInt(this.parentNode.querySelector(".stop-at").value) !== document.querySelectorAll(".nhover").length){
			max = parseInt(this.parentNode.querySelector(".stop-at").value);
		}
		rules[lastSelector].push({
				attribute: this.parentNode.parentNode.querySelector('.name').innerText,
				as:	as,
				function: (this.parentNode.querySelector('textarea') || {value: "return x;"}).value,
				offset:{from: parseInt(this.parentNode.querySelector(".start-at").value), to: max}
		});
	}
	return false;
}

function showMore() {
	if (this.innerHTML === "+") {
		this.innerHTML = "-";
		var inp = document.createElement("div");
		inp.setAttribute("class", "show-attr-plus");
		var setName = document.createElement("input");
		setName.setAttribute("type", "text");
		setName.setAttribute("placeholder", "Ex: image[n] or message[n].author");
		var fx = document.createElement("span");
		fx.setAttribute("class", "show-fx not-nhover show-attr show-attr-btn");
		fx.innerHTML = "f(x)";
		inp.innerHTML += "As:";
		inp.appendChild(setName);
		inp.innerHTML += "<br>";
		inp.appendChild(fx);
		inp.innerHTML += "Offset: from:";
		var no = document.querySelectorAll(".nhover");
		var startAt = numberInput(0, no.length - 1, "start-at");
		var stopAt = numberInput(1, no.length, "stop-at");
		var saveButton = document.createElement("span");
		saveButton.setAttribute("class", "not-nhover show-attr save");
		saveButton.innerText = "SAVE";
		saveButton.addEventListener("click", save);
		inp.appendChild(startAt);
		inp.innerHTML += "To:";
		inp.appendChild(stopAt);
		inp.innerHTML += " &nbsp;";
		inp.appendChild(saveButton);
		this.parentNode.appendChild(inp);
		inp.querySelector(".show-fx").addEventListener("click", fxArea)
		function checkOffset(e) {
			// We make sure that startAt value isn't bigger than stopAt and vice versa
			if (this.className === "stop-at") {
				lastStopValue = parseInt(this.value);
				startAt.max = parseInt(this.value) - 1;

			} else {
				laststartValue = parseInt(this.value);
				stopAt.min = parseInt(this.value) + 1;
			}
		}
		startAt = inp.querySelector(".start-at");
		stopAt = inp.querySelector(".stop-at");
		startAt.value = 0;
		stopAt.value = no.length;
		var lastStopValue = stopAt.value,
			laststartValue = startAt.value;
		stopAt.addEventListener("input", checkOffset);
		startAt.addEventListener("input", checkOffset);
	} else {
		this.innerHTML = "+";
		var inp = this.parentNode.querySelector(".show-attr-plus");
		this.parentNode.removeChild(inp);
	}
}

function removeHighlighting() {
	[].slice.call(document.querySelectorAll(".nhover")).filter(function(e) {
		e.className = e.className.replace("nhover ", "");
	});
}

function highlight() {
	var rel = document.querySelectorAll(lastSelector);
	for (var r = 0; r < rel.length; r++) {
		rel[r].className = "nhover " + rel[r].className;
	}
}

/*text nodes count as a child element in JS but not in CSS,
in order to get an accurate index for an elemnt, we can use this function to ignore text nodes*/
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

function getIndex(n) {
	var i = 1;
	while (n = n[prev]) {
		i++;
	}
	return i;
}

function preciseSelector(nonUnique, sameIndex, sameIndexFromEnd) {
	var es = [];
	var h = document.querySelectorAll(":hover");
	for (var hl = 0; hl < h.length; hl++) {
		es.push(relatedSelector(h[hl], nonUnique));
	}
	var indexSelector = "";
	if (h.length > 1) {
		var current = h[h.length - 1];
		if (sameIndexFromEnd && current.parentNode) {
			/*if the parentNode doesn't have any others children,
			using an index become useless, so we're checking for the parent of the parent*/
			if (removeTextNodes(current.parentNode.childNodes).length > 1) {
				var index = removeTextNodes(current.parentNode.childNodes).length - getIndex(current) + 1;
				indexSelector += ":nth-last-child(" + index + ")";

			} else if (current.parentNode.parentNode && es.length > 1 &&
				removeTextNodes(current.parentNode.parentNode.childNodes).length > 1) {
				var index = current.parentNode.parentNode.childNodes.length - getIndex(current.parentNode) + 1;
				es[es.length - 2] += ":nth-last-child(" + index + ") ";
			}

		}
		if (sameIndex) {
			if (removeTextNodes(current.parentNode.childNodes).length > 1) {
				indexSelector += ":nth-child(" + getIndex(current) + ")";
			} else if (current.parentNode.parentNode && es.length > 1 &&
				removeTextNodes(current.parentNode.parentNode.childNodes).length > 1) {
				es[es.length - 2] += ":nth-last-child(" + getIndex(current.parentNode) + ") ";
			}
		}
	}
	lastSelector = es.join(">") + indexSelector;
	highlight();
}

/*return a css selector made of the tagName + the classes of an elemnt,
if nonUnique is true, we remove the classes used by less than 3 elements */
function relatedSelector(element, nonUnique) {
	var classes = element.className.split(" "),
		empty = classes.lastIndexOf(""),
		tag = element.tagName;
	while (empty !== -1) {
		classes.splice(empty, 1);
		empty = classes.lastIndexOf("");
	}
	for (var c = classes.length - 1; c > -1; c--) {
		var selector = tag + "." + classes.slice(0, c + 1).join(".");
		if (!nonUnique || document.querySelectorAll(selector).length > 3) {
			return selector;
		}
	}
	return tag;
}
var scrapCss = `
/*////////////////// Showing attributes //////////////////*/

.show-attr {
    background-color: #337ab7;
    display: inline !important;
    padding: .2em .6em .3em !important;
    font-size: 0.6em !important;
    font-weight: 700 !important;
    line-height: 2em !important;
    color: #fff !important;
    text-align: center !important;
    white-space: nowrap !important;
    vertical-align: baseline !important;
    border-radius: .25em !important;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif !important;
}
.show-attr-plus{
    margin-top: 5px !important;
    line-height: 1.7em !important;
}
.show-attr:not(.name){
	cursor: pointer !important;
}
.not-nhover.show-attr.save,
.not-nhover.show-attr.show-fx{
    bottom: 2px !important;
    position: relative !important;
    font-size: 0.8em !important;
}
.show-attr-btn{
    cursor: pointer !important;
    font-size: 0.6em !important;
}
.not-nhover input[type="text"]{
    height: 1.4em !important;
}
.not-nhover input[type*=number]{
    width: 2.5em !important;
}
.not-nhover input:not([type="checkbox"]),
.not-nhover textarea{
	width: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
    color: inherit !important;
    background-color: inherit !important;
}
.show-attr-plus input:not([type="number"]),
.show-attr-plus textarea{
    border: 1px solid #c8ccd0 !important;
    box-shadow: 0 1px 2px rgba(12,13,14,0.1) inset !important;
}
.show-attr-plus input{
	max-width: 310px !important;
}
.show-attr-plus,
.show-attr-plus textarea{
	max-width: 340px !important;
}

/*////////////////// Highlighting //////////////////*/

.current-hover:not(html):not(.not-nhover):not(hr){
    background-color: red !important;
}
.nhover:not(.not-nhover):not(hr):not(.current-hover){
	background-color: cyan !important;
}
.nhover:not(html):not(.not-nhover):not(.not-nhover):not(hr):not(.current-hover) {
	filter: sepia(100%) !important;
	-webkit-filter: sepia(100%) !important;
}

/*////////////////// General //////////////////*/
.not-nhover-main {
	color: black !important;
	font-size: 18px !important;
    background-color: white !important;
    z-index: 2147483647;
    border: 2px solid;
    height: 20em;
	min-width: 340px;
    resize: both;
    overflow: auto;
    left: 0;
    top: 0;
    position: fixed;
    opacity: 0.95;
}
.minimizeUI{
	resize: none !important;
	overflow: hidden !important;
	width: 64px !important;
	min-width: 64px !important;
	max-height: 36px;
}
.not-nhover > *:not(.wsnw):not(.show-attr):not(hr) {
    all: initial;
}
.not-nhover hr{
    width: 100% !important;
    border: none !important;
    height: 2px !important;
    color: #9fa6ad !important;
    background-color: #9fa6ad !important;
}
.not-nhover div{
    display: block !important;
}
.not-nhover{
    letter-spacing: 1px !important;
}
h1.not-nhover.wsnw.show-attr,
.less{
	font-size: 1em !important;
    white-space: nowrap;
}
.not-nhover > *::not(.show-attr) h1:not(.wsnw) {
    font-size: 0.6em !important;
    cursor: pointer !important;
}
.not-nhover input:not([type*=number]){
    position: absolute !important;
}
.not-nhover input[type="checkbox"]{
    height: 1em !important;
    width: 1em !important;
}
.not-nhover input{
    all: initial;
}
.not-nhover input[type*=number]{
    width: 2.5em !important;
}
`;
