function insertCss() {
	var style = document.createElement("style");
	style.innerHTML = css;
	document.head.appendChild(style);
}
function createUI() {
	function cBox(bClass) {
		return '<input class="' + bClass + ' not-nhover" type="checkbox">'
	}
	var UI = document.createElement("div");
	UI.className = "not-nhover not-nhover-main";
	UI.innerHTML = `<a href='#' class='not-nhover'>
	<h1 class='not-nhover wsnw show-attr'>Less</h1></a>
	<a href='#' class='not-nhover'><h1 class='not-nhover wsnw show-attr'>Start</h1></a><br>
	<p class='not-nhover'>Click on Start then move your mouse to select elements, <br>press ALT to lock on a group of elements.</p>
	<br><br> Multiple css selectors only?` + cBox("non-unique")
	+ "<br> Same index only?" + cBox("same-index")
	+ "<br> Same index from last only?" + cBox("same-index-end") + "<hr>";
	UI.querySelectorAll("a")[0].addEventListener("click", moreOrLess);
	UI.querySelectorAll("a")[1].addEventListener("click", start);
	document.body.insertBefore(UI, document.body.firstChild);
	UI.querySelector(".non-unique").checked = true;
	return UI;
}
