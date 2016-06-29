function createAttributeList(UI) {
	var attributeList = document.createElement("div");
	attributeList.className = "not-nhover";
	UI.appendChild(attributeList);
	return attributeList;
}
function updateAttributeList(lasthover) {
	attributeList.innerHTML = "";
	if (!lasthover.className.match("not-nhover")) {
		if (lasthover.innerHTML.length) {
			showAttribute({
				name: "innerText",
				value: lasthover.innerText
			}, attributeList);
			showAttribute({
				name: "innerHTML",
				value: lasthover.innerHTML
			}, attributeList);
		}
		if (lasthover.value) {
			showAttribute({
				name: "value",
				value: lasthover.value
			}, attributeList);
		}
		[].slice.call(lasthover.attributes).filter(function(a) {
			showAttribute(a, attributeList);
		});
	}
	[].slice.call(document.querySelectorAll(".show-attr-btn")).filter(function(b) {
		b.addEventListener("click", showMore);
	})
	unhighlight();
}
function showAttribute(toShow, list) {
	var attribute = document.createElement("div");
	var showMore = document.createElement('span');
	showMore.setAttribute("class", "not-nhover show-attr show-attr-btn");
	showMore.innerText = "+";
	var name = document.createElement('span');
	name.setAttribute("class", "not-nhover show-attr name");
	name.innerText = toShow.name;
	var value = document.createElement('input');
	value.setAttribute("class", "not-nhover");
	value.setAttribute("readonly", "true");
	value.setAttribute("placeholder", toShow.value);
	attribute.appendChild(showMore);
	attribute.appendChild(name);
	attribute.appendChild(value);
	list.appendChild(attribute);
}
