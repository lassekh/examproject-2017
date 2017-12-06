/////////////////////////
// YOUR SITE LOCATION //
///////////////////////
let siteURL = "http://siavonbulow.dk/wp";
let template = document.querySelector("#main-menu_template");

function onLoadMenu() {
	topMenuLeft();
	topMenuRight();
	bottomMenuLeft();
	bottomMenuRight();
}
/////////////////////////////
// JSON | TOP MENU - LEFT //
///////////////////////////
async function topMenuLeft(){
	let container = document.querySelector("header .menu_left .container");

	//Get json
	let jsonObjekt = await fetch(siteURL+"/wp-json/menus/v1/menus/top-menu-left");
	let menu = await jsonObjekt.json();

	// console.log(menu.items);

	menu.items.forEach(function(item){
		let klon = template.cloneNode(true).content;

		// console.log(item.items);

		if(item.menu_item_parent == "0") {
			klon.querySelector(".menu_item").textContent = item.title;
			if (item.object == "pages_basic") {
				klon.querySelector(".menu_item").setAttribute("href","page-basic.html?id="+item.object_id);
			}
			if (item.object == "pages_contact") {
				klon.querySelector(".menu_item").setAttribute("href","page-contact.html?id="+item.object_id);
			}
			if(item.menu_order == "2") {
				klon.querySelector(".menu_item").setAttribute("href","events.html");
			}
			if(item.menu_order == "1") {
				klon.querySelector(".menu_item").setAttribute("href","index.html");
				klon.querySelector(".menu_item").classList.add("logo");
				klon.querySelector(".menu_item").innerHTML = "<img src='img/husetlogo.svg' alt='Huset - KBH' title='Huset - KBH' width='30px' hight='30px'/>";
			}
		} else {
			klon.querySelector(".menu_item").style.display = "none";
		}

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
			if (item.object == "pages_basic") {
				klon.querySelector(".menu_item").setAttribute("href","page-basic.html?id="+item.object_id);
			}
			if (item.object == "pages_contact") {
				klon.querySelector(".menu_item").setAttribute("href","page-contact.html?id="+item.object_id);
			}
		} else {
			klon.querySelector(".menu_item").style.display = "none";
		}

		container.appendChild(klon);
	});
}
////////////////////////////////
// JSON | BOTTOM MENU - LEFT //
//////////////////////////////
async function bottomMenuLeft(){
	let container = document.querySelector("footer .menu_left .container");

	//Get json
	let jsonObjekt = await fetch(siteURL+"/wp-json/menus/v1/menus/social");
	let menu = await jsonObjekt.json();

	// console.log(menu.items);

	menu.items.forEach(function(item){
		let klon = template.cloneNode(true).content;

		// console.log(item.items);

		if(item.menu_order == "1") {
			klon.querySelector(".menu_item").textContent = item.title;
			klon.querySelector(".menu_item").setAttribute("href","index.html");
		}
		if(item.post_name == "facebook") {
			klon.querySelector(".menu_item").classList.add("fa-icon");
			klon.querySelector(".menu_item").innerHTML = "<i class='fa fa-facebook-square' aria-hidden='true'></i>";
			klon.querySelector(".menu_item").setAttribute("href",item.url);
			klon.querySelector(".menu_item").setAttribute("target","_blank");
		}
		if(item.post_name == "twitter") {
			klon.querySelector(".menu_item").classList.add("fa-icon");
			klon.querySelector(".menu_item").innerHTML = "<i class='fa fa-twitter-square' aria-hidden='true'></i>";
			klon.querySelector(".menu_item").setAttribute("href",item.url);
			klon.querySelector(".menu_item").setAttribute("target","_blank");
		}
		if(item.post_name == "instagram") {
			klon.querySelector(".menu_item").classList.add("fa-icon");
			klon.querySelector(".menu_item").innerHTML = "<i class='fa fa-instagram' aria-hidden='true'></i>";
			klon.querySelector(".menu_item").setAttribute("href",item.url);
			klon.querySelector(".menu_item").setAttribute("target","_blank");
		}
		if(item.post_name == "flickr") {
			klon.querySelector(".menu_item").classList.add("fa-icon");
			klon.querySelector(".menu_item").innerHTML = "<i class='fa fa-flickr' aria-hidden='true'></i>";
			klon.querySelector(".menu_item").setAttribute("href",item.url);
			klon.querySelector(".menu_item").setAttribute("target","_blank");
		} 
		if(item.post_name == "yelp") {
			klon.querySelector(".menu_item").classList.add("fa-icon");
			klon.querySelector(".menu_item").innerHTML = "<i class='fa fa-yelp' aria-hidden='true'></i>";
			klon.querySelector(".menu_item").setAttribute("href",item.url);
			klon.querySelector(".menu_item").setAttribute("target","_blank");
		} 
		if(item.post_name == "tripadvisor") {
			klon.querySelector(".menu_item").classList.add("fa-icon");
			klon.querySelector(".menu_item").innerHTML = "<i class='fa fa-tripadvisor' aria-hidden='true'></i>";
			klon.querySelector(".menu_item").setAttribute("href",item.url);
			klon.querySelector(".menu_item").setAttribute("target","_blank");
		} 
		container.appendChild(klon);
	});
}

/////////////////////////////////
// JSON | BOTTOM MENU - RIGHT //
///////////////////////////////
async function bottomMenuRight(){
	let container = document.querySelector("footer .menu_right .container");

	//Get json
	let jsonObjekt = await fetch(siteURL+"/wp-json/menus/v1/menus/bottom-menu-right");
	let menu = await jsonObjekt.json();

	// console.log(menu.items);

	menu.items.forEach(function(item){
		let klon = template.cloneNode(true).content;

		// console.log(item.items);

		if(item.menu_item_parent == "0") {
			klon.querySelector(".menu_item").textContent = item.title;
			if (item.object == "pages_basic") {
				klon.querySelector(".menu_item").setAttribute("href","page-basic.html?id="+item.object_id);
			}
			if (item.object == "pages_contact") {
				klon.querySelector(".menu_item").setAttribute("href","page-contact.html?id="+item.object_id);
			}
		} else {
			klon.querySelector(".menu_item").style.display = "none";
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