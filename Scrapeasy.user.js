// ==UserScript==
// @name            Scrapeasy
//check if jQuery is present
if(typeof jQuery === "undefined"){
    // @require https://code.jquery.com/jquery-2.2.3.min.js
}
// ==/UserScript==
function start(){
    var lockOnElement = false;
    document.addEventListener("keydown", function(e){
        if(e.which === 17){
            if(lockOnElement){lockOnElement = false;}
            else{lockOnElement = true;}}});
    var lasthover;
    document.addEventListener("mousemove", function(e){
        if(!lockOnElement){
            var hovered = document.elementFromPoint(e.clientX, e.clientY);
            if(lasthover !== hovered){
                lasthover = hovered;
                attrList.innerHTML = "";
                updateAttrList(hovered);
                replaceNhover();
                switch (parseInt(range.value)) {
                    case 0:
                        preciseSelector(true);
                        break;
                    case 1:
                        preciseSelector(false);
                        break;
                }
            }
        }
    });
}
function insertCss(){
    var newCss = document.createElement("style");
    newCss.innerHTML = scrapCss;
    document.head.appendChild(newCss);
}
function createRange(){
    var range = document.createElement("input");
    range.setAttribute("type", "range");
    range.setAttribute("style", "width:100%;");
    range.setAttribute("step", "1");
    range.setAttribute("min", "0");
    range.setAttribute("max", 1);
    range.value = 0;
    range.className = "not-nhover";
    return range;
}
function createUi(range){
    var ui = document.createElement("div");
    ui.className = "not-nhover not-nhover-main";
    ui.innerHTML = "<a href='#' class='not-nhover'>"
    +"<h1 class='not-nhover wsnw show-attr'>Start</h1></a>";
    ui.querySelector("a").onclick = function(){start(); return false;};
    body.insertBefore(ui, body.firstChild);
    ui.appendChild(range);
    return ui;
}
function createAttrList(ui){
    var attrList = document.createElement("div");
    attrList.className = "not-nhover";
    ui.appendChild(attrList);
    return attrList;
}
function showAttr(attr){
    var newAttr = document.createElement("div");
    var showBtn = document.createElement('span');
    showBtn.setAttribute("class", "not-nhover show-attr show-attr-btn");
    showBtn.innerHTML = "+";
    var name = document.createElement('span');
    name.setAttribute("class", "not-nhover show-attr");
    name.innerHTML = attr.name;
    var val = document.createElement('input');
    val.setAttribute("class", "not-nhover");
    val.setAttribute("readonly", "true");
    val.setAttribute("placeholder", attr.value);
    newAttr.appendChild(showBtn);
    newAttr.appendChild(name);
    newAttr.appendChild(val);
    attrList.appendChild(newAttr);
}

function updateAttrList(lasthover){
    if(!lasthover.className.match("not-nhover")){
        if(lasthover.innerText.length){
            showAttr({name: "Text", value: lasthover.innerText});
        }
        if(lasthover.value){
            showAttr({name: "Value", value: lasthover.value});
        }
        for(var t = 0; t < lasthover.attributes.length; t++){
            showAttr(lasthover.attributes[t]);
        }
    }
    var showBtn = document.querySelectorAll(".show-attr-btn");
    for(var s = 0; s < showBtn.length; s++){
        showBtn[s].addEventListener("click", showMore);
    }
}
function fxArea(){
    var area = document.createElement("textarea");
    area.setAttribute("class", "not-nhover");
    area.setAttribute("rows", "4");
    area.setAttribute("style", "");
    area.value = "return x;";
    this.parentNode.appendChild(area);
    this.removeEventListener("click", fxArea);
    this.addEventListener("click", function(){
        var area = this.parentNode.querySelector("textarea");
        if(area.getAttribute("style").length){
            area.setAttribute("style", "");
        }
        else{
            area.setAttribute("style", "display: none;");
        }
    });
}
function showMore(){
    if(this.innerHTML === "+"){
        this.innerHTML = "-";
        var div = document.createElement("div");
        div.setAttribute("class", "show-attr-plus");
        var inp = document.createElement("form");
        var setName = document.createElement("input");
        setName.setAttribute("type", "text");
        setName.setAttribute("placeholder", "Ex: Message.Author or Image");
        var fx = document.createElement("span");
        fx.setAttribute("class", "show-fx not-nhover show-attr show-attr-btn");
        fx.innerHTML = "f(x)";
        inp.innerHTML += "As:";
        inp.appendChild(setName);
        inp.innerHTML += "<br>";
        inp.appendChild(fx);
        inp.innerHTML += "Offset from:";
        var no = document.querySelectorAll(".nhover");
        var strtAt = document.createElement("input");
        strtAt.setAttribute("type", "number");
        strtAt.setAttribute("min", "0");
        strtAt.setAttribute("max", no.length - 1);
        strtAt.setAttribute("class", "strt-at");
        var stopAt = document.createElement("input");
        stopAt.setAttribute("type", "number");
        stopAt.setAttribute("min", "1");
        stopAt.setAttribute("max", no.length);
        stopAt.setAttribute("class", "stop-at");
        inp.appendChild(strtAt);
        inp.innerHTML += "To:";
        inp.appendChild(stopAt);
        div.appendChild(inp);
        this.parentNode.appendChild(div);
        var showFx = this.parentNode.querySelectorAll(".show-fx");
        for(var f = 0; f < showFx.length; f++){
            showFx[f].addEventListener("click", fxArea)
        }
        this.parentNode.querySelector(".strt-at").value = 0;
        this.parentNode.querySelector(".stop-at").value = no.length;
    }
    else{
        this.innerHTML = "+";
        var inp = this.parentNode.querySelector(".show-attr-plus");
        this.parentNode.removeChild(inp);
    }
}
function replaceNhover(){
    var no = document.querySelectorAll(".nhover");
    for(var n = 0; n < no.length; n++)
    {no[n].className = no[n].className.replace("nhover ", "");}
}
function preciseSelector(nonUnique){
    var es = [];
    var h = document.querySelectorAll(":hover");
    for(var hl = 0; hl < h.length; hl++){
        es.push(relatedSelector(h[hl], nonUnique));
    }
    var rel = document.querySelectorAll(es.join(">"));
    for(var r = 0; r < rel.length; r++){
        rel[r].className = "nhover " + rel[r].className;
    }
}
/*relatedSelector is trying to find the most precise tag+class
that is present at least 4 times, if we can't find one we only return the tagname.
hl is a NodeList of the .nhover class, h is the index of the node to test */
function relatedSelector(h, nonUnique){
    var c = h.className.split(" "),
    l = c.lastIndexOf(""),
    t = h.tagName;
    while(l != -1) {c.splice(l, 1); l = c.lastIndexOf("");}
    for(var d = c.length - 1; d > -1; d--){
        var s = t + "." + c.slice(0, d + 1).join(".");
        if(document.querySelectorAll(s).length > 4 || !nonUnique){
            return s;
        }
    }
    return t;
}
//handling browser compatibility for getIndex()
var prev = document.body.previousElementSibling ?
'previousElementSibling' : 'previousSibling';
function getIndex(n) {
     var i = 0; while (n = n[prev]) { ++i } return i;
}
var scrapCss = `
.wsnw {
    white-space: nowrap;
}
.nhover:not(.not-nhover) {
    background-color: cyan !important;
}
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
video.nhover:not(.not-nhover),
img.nhover:not(.not-nhover) {
    -webkit-filter: invert(100%) !important;
    filter: invert(100%) !important;
}
.not-nhover-main {
    background-color: white !important;
    z-index: 2147483647;
    border: 2px solid;
    width: 20%;
    resize: both;
    overflow: auto;
    left: 0;
    top: 0;
    position: fixed;
    opacity: 0.9;
}
.not-nhover > *:not(.wsnw):not(.show-attr) {
    all: initial;
}
.not-nhover > *:not(.wsnw):not(.show-attr) h1 {
    font-size: 0.6em !important;
    cursor: pointer !important;
}
.show-attr-btn{
    cursor: pointer !important;
    font-size: 0.6em !important;
}
.not-nhover input,
.not-nhover textarea{
    width: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
    color: inherit !important;
    background-color: inherit !important;
}
.not-nhover input{
    position: absolute;
    height: 1.4em !important;
}

.show-attr-plus input:not([type*=number]),
.show-attr-plus textarea{
    border: 1px solid #c8ccd0 !important;
    box-shadow: 0 1px 2px rgba(12,13,14,0.1) inset !important;
}

.not-nhover input[type*=number]{
    width: 2.5em !important;
    height: 2.6em !important;
}
.not-nhover input:not([type*=number]){
    position: absolute !important;
}
.not-nhover input{
    all: initial;
}
.not-nhover div{
    display: block !important;
}
`;
if(window === window.top){
    var head = document.querySelector("head");
    var body = document.querySelector("body");
    insertCss();
    var range = createRange();
    var ui = createUi(range);
    var attrList = createAttrList(ui);
}
