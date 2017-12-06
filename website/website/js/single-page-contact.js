//find url-variablen id
let url = new URL(window.location.href);
let variabler = new URLSearchParams(url.search);
let id = variabler.get("id");

async function getJson(){
	//Hent json
	let jsonObjekt = await fetch(siteURL+"/wp-json/wp/v2/pages_contact/"+id);
	let page = await jsonObjekt.json();

	console.log(page);

	document.querySelector(".bg_image img").setAttribute("src",page.acf.bg_image.sizes.large);
	document.querySelector(".bg_image img").setAttribute("alt",page.acf.bg_image.alt);
	document.querySelector(".bg_image img").setAttribute("title",page.acf.bg_image.title);
	document.querySelector(".page_title").textContent = page.acf.page_title;
	document.querySelector(".page_description").innerHTML = page.acf.description;
	document.querySelector(".section-main-top .sidebar_title").innerHTML = page.acf.sidebar_title;
	document.querySelector(".section-main-top .sidebar_description").innerHTML = page.acf.sidebar_description;
	
	if (page.acf.pages_links != "") {
		let container = document.querySelector(".pages_links");
		let link_template = document.querySelector("#pages_links");

		page.acf.pages_links.forEach(function(item){
			let klon = link_template.cloneNode(true).content;

			klon.querySelector(".sidebar_link").textContent = item.post_title;

			if (item.post_type == "pages_basic") {
				klon.querySelector(".sidebar_link").setAttribute("href","page-basic.html?id="+item.ID);
			}
			if (item.post_type == "pages_contact") {
				klon.querySelector(".sidebar_link").setAttribute("href","page-contact.html?id="+item.ID);
			}

			container.appendChild(klon);
		});
	}
	if (page.acf.selected_contacts != "") {
		let container = document.querySelector(".contact_list");
		let contact_template = document.querySelector("#contact_list");

		page.acf.selected_contacts.forEach(function(item){
			let klon = contact_template.cloneNode(true).content;

			klon.querySelector("option").textContent = item.post_title;
			klon.querySelector("option").setAttribute("value",item.post_title);

			container.appendChild(klon);
		});
	}
	document.querySelector("#contact_container .sidebar_title").innerHTML = page.acf.content_sidebar_title;
	document.querySelector("#contact_container .sidebar_description").innerHTML = page.acf.content_sidebar_description;
	document.querySelector(".text_area_1").innerHTML = page.acf.text_area_1;
	document.querySelector(".text_area_2").innerHTML = page.acf.text_area_2;
	document.querySelector(".text_area_3").innerHTML = page.acf.text_area_3;
	document.querySelector(".text_area_4").innerHTML = page.acf.text_area_4;

}
//læs script når DOM er hentet
document.addEventListener("DOMContentLoaded",getJson);