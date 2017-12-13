// JavaScript Document
function onLoadFunctions() {
/*
	document.querySelector(".main-top .content .main-sidebar-left .page_subtitle").addEventListener("click", function () {
		if (document.querySelector(".page_subtitle.active")) {
			document.querySelector(".page_subtitle").classList.remove("active");
			document.querySelector(".main-top .content .main-sidebar-left .history").classList.add("none");
		} else {
			document.querySelector(".page_subtitle").classList.add("active");
			document.querySelector(".main-top .content .main-sidebar-left .history").classList.remove("none");
		}
	});
*/

showMore();
	
function showMore() {

	document.querySelector(".read-more").addEventListener("click", function(){
		if(document.querySelector(this).parentElement.children.className = "content active") {
			document.querySelector(this).classList.remove("less");
		} else {
			document.querySelector(this).classList.add("less");
		}
	});
}

} // onLoad

document.addEventListener("DOMContentLoaded", function () {
	onLoadFunctions();
});