//Minimize/Maximize the User Interface
function moreOrLess(e) {
	if (this.innerText === "Less") {
		this.querySelector("h1").innerText = "More";
		UI.className += " minimizeUI";
	} else {
		this.querySelector("h1").innerText = "Less";
		UI.className = UI.className.replace(" minimizeUI", "");
	}
	UI.scrollTop = 0;
	e.preventDefault();
}
//Highlight hovered elements and display their attributes in attributeList
function start(e) {
	var lastSelector = ":not(*)";
	var lockOnElement = false;
	this.querySelector("h1").innerText = "Generate script";
	this.removeEventListener("click", start);
	this.addEventListener("click", generate);
	document.addEventListener("keydown", function(e) {
		if (e.which === 18) {
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
				lasthover.setAttribute("class", lasthover.getAttribute("class").replace(" current-hover", ""))
			}
			hovered.setAttribute("class", hovered.getAttribute("class") + " current-hover")
			if (lasthover !== hovered) {
				lasthover = hovered;
				updateAttributeList(hovered);
				unhighlight();
				preciseSelector(unique.checked, sameIndex.checked, sameIndexEnd.checked);
			}
		}
	});
	e.preventDefault();
}
