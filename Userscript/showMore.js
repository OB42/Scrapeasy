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
//Create all the input elements needed by the user to create a new rule.
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
