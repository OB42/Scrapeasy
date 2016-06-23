var css = `
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
	width: 340px;
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
	max-height: 32px;
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
