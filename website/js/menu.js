/////////////////////////
// YOUR SITE LOCATION //
///////////////////////
let siteURL = "http://eksamenprojekt.volteriax.com";
let template = document.querySelector("#main-menu_template");

function onLoadMenu() {
	topMenu();
	document.querySelector("header .main-menu .main-submenu .menu-title").addEventListener("click", function(){
		document.querySelector("header .main-menu .main-submenu .menu-title").classList.toggle("active");
		document.querySelector("header .main-menu .main-submenu .container").classList.toggle("active");
	});

}
//////////////////////
// JSON | TOP MENU //
////////////////////
async function topMenu(){
	let container = document.querySelector("header .main-menu .main-submenu .container");

	//Get json
	let jsonObjekt = await fetch(siteURL+"/wp-json/menus/v1/menus/top");
	let menu = await jsonObjekt.json();

	// console.log(menu.items);

	menu.items.forEach(function(item){
		let klon = template.cloneNode(true).content;

		// console.log(item.items);

		klon.querySelector(".menu_item").textContent = item.title;

		container.appendChild(klon);
	});
}
//////////////////////////////
// JSON | TOP MENU - RIGHT //
////////////////////////////
async function topMenuRight(){
	let container = document.querySelector("header .menu_right .container");

	//Get json
	let jsonObjekt = await fetch(siteURL+"/wp-json/menus/v1/menus/top-menu-right");
	let menu = await jsonObjekt.json();

	// console.log(menu.items);

	menu.items.forEach(function(item){
		let klon = template.cloneNode(true).content;

		// console.log(item.items);

		if(item.menu_item_parent == "0") {
			klon.querySelector(".menu_item").textContent = item.title;
		} else {
			klon.querySelector(".menu_item").textContent = item.title;
			klon.querySelector(".menu_item").style.display = "none";
		}
		
		if(item.menu_order == "2") {
			klon.querySelector(".menu_item").classList.add("parent");
		}

		container.appendChild(klon);
	});
}


////////////////////////////////////////////
// LOAD DOCUMENT ONLOAD DOMCONTENTLOADED //
//////////////////////////////////////////
document.addEventListener("DOMContentLoaded", function () {
	onLoadMenu();
});