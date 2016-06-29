// Save a new rule in the object "rules" when an user click on the SAVE button created by showMore()
function save() {
	var as = this.parentNode.querySelector('input[type="text"]').value;
	if (as.indexOf("[n]") === -1 || as.match(/\[n\][^.]/) {
		alert('"As:" must follow this pattern: array[n] or array[n].property !');
	} else {
		if (typeof rules[lastSelector] === "undefined") {
			rules[lastSelector] = [];
		}
		var max = 0
		if (parseInt(this.parentNode.querySelector(".stop-at").value) !== document.querySelectorAll(".nhover").length) {
			max = parseInt(this.parentNode.querySelector(".stop-at").value);
		}
		rules[lastSelector].push({
			scrapingMethod: lastScrapingMethod,
			attribute: this.parentNode.parentNode.querySelector('.name').innerText,
			as: as,
			function: (this.parentNode.querySelector('textarea') || {
				value: "return x;"
			}).value,
			offset: {
				from: parseInt(this.parentNode.querySelector(".start-at").value),
				to: max
			}
		});
	}
}
//Generate a node.js script and open it in a new tab
function generate() {
	if (!Object.getOwnPropertyNames(rules).length) {
		alert("You haven't selected any elements!");
	} else {
		var script = `var scrapeasy = require("scrapeasy")\nvar pattern = `
		+ JSON.stringify(rules, null, 8) + '\nscrapeasy("' + window.location
		+ '", pattern, function(err, data){\n	if(err){\n		console.log(err)\n	}\n	else{\n		console.log(data)\n	}\n})';
		window.open("data:text/javascript,	" + encodeURIComponent(script), "_blank");
	}
}
