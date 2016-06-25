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

function start(e) {
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
            var hover = document.elementFromPoint(e.clientX, e.clientY);
            if (lasthover) {
                lasthover.setAttribute("class", lasthover.getAttribute("class").replace(" current-hover", ""))
            }
            hover.setAttribute("class", hover.getAttribute("class") + " current-hover")
            if (lasthover !== hover) {
                lasthover = hover;
                updateAttributeList(hover);
                hovered = document.querySelectorAll(":hover");
                var checkboxes = {
                    multiple: unique.checked,
                    sameIndex: sameIndex.checked,
                    sameIndexFromEnd: sameIndexEnd.checked
                };
                var defaultSelector = preciseSelector(checkboxes, document);
                var rawSelector = preciseSelector(checkboxes, rawHTML);
                var defaultSelectorLength = document.querySelectorAll(defaultSelector).length;
                var rawSelectorLength = rawHTML.querySelectorAll(rawSelector).length;
                if (defaultSelectorLength === rawHTML.querySelectorAll(defaultSelector).length) {
                    lastScrapingMethod = "default"
                } else if (rawSelectorLength === defaultSelectorLength) {
                    lastScrapingMethod = "raw"
                } else {
                    lastScrapingMethod = "headless"
                }
                lastSelector = defaultSelector
                highlight();
            }
        }
    });
    e.preventDefault();
}