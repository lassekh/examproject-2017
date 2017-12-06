/////////////////////////
// JSON | INDEX //
///////////////////////

async function getJson(){
	//Hent json
	let jsonObjekt = await fetch(siteURL+"/wp-json/wp/v2/pages_basic/525");
	let page = await jsonObjekt.json();

	console.log(page);

	document.querySelector(".bg_image img").setAttribute("src",page.acf.bg_image.sizes.large);
	document.querySelector(".bg_image img").setAttribute("alt",page.acf.bg_image.alt);
	document.querySelector(".bg_image img").setAttribute("title",page.acf.bg_image.title);
	document.querySelector(".page_title").textContent = page.acf.page_title;
	document.querySelector(".page_description").innerHTML = page.acf.description;
	document.querySelector(".sidebar_title").textContent = page.acf.sidebar_title;
	document.querySelector(".sidebar_description").innerHTML = page.acf.sidebar_description;
	
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
	if (page.acf.website_link != "") {
		document.querySelector(".pages_links").innerHTML = "<li><a class='sidebar_link' href='"+page.acf.website_link+"' target='_blank'>Gå til siden her...</a></li>";
	}
	document.querySelector(".text_area_1").innerHTML = page.acf.text_area_1;
	document.querySelector(".text_area_2").innerHTML = page.acf.text_area_2;
	document.querySelector(".text_area_3").innerHTML = page.acf.text_area_3;
	document.querySelector(".text_area_4").innerHTML = page.acf.text_area_4;
}
//læs script når DOM er hentet
document.addEventListener("DOMContentLoaded",getJson);