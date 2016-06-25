function unhighlight() {
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