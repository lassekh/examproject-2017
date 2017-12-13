/////////////////////////
// JSON | INDEX //
///////////////////////

async function getJson(){
	//Hent json
	let jsonObjekt = await fetch(siteURL+"/wp-json/wp/v2/pages/246");
	let page = await jsonObjekt.json();

	console.log(page);

	document.querySelector(".main-top .page_description").innerHTML = page.acf.area_1_text;
	
	if (page.acf.page_links == "false") {
		document.querySelector(".main-top .content .main-sidebar-left article").style.display = "none";
	} else {
		page.acf.page_links.forEach(function(item){
			getPageLinks_Page(item);
		});
	}
	if (page.acf.product_links == "false") {
		document.querySelector(".main-top .content .main-sidebar-left article").style.display = "none";
	} else {
		page.acf.product_links.forEach(function(product){
			getProduct_links_Page(product);
		});
	}
}
async function getPageLinks_Page(item){
	//Hent json
	let pageLinksObjekt = await fetch(siteURL+"/wp-json/wp/v2/pages/"+item.ID);
	let pageLinks = await pageLinksObjekt.json();

	console.log(pageLinks);

	if (item.ID == "217") {
		document.querySelector(".main-top .subpage_subtitle").innerHTML = pageLinks.title.rendered;
		document.querySelector(".main-top .subpage_description").innerHTML = pageLinks.acf.area_1_text;
		document.querySelector(".main-top .content .go_to").setAttribute("href","page-basic.html?id="+pageLinks.id);
	}
	if (item.ID == "220") {
		document.querySelector("#area_1 .content").innerHTML = pageLinks.acf.area_1_text;
		document.querySelector("#area_1 .img_1").style.backgroundImage = 'url("'+pageLinks.acf.area_1_img.sizes.large+'")';

		document.querySelector("#area_2 .content").innerHTML = pageLinks.acf.area_2_text;
		document.querySelector("#area_2 .img_2").style.backgroundImage = 'url("'+pageLinks.acf.area_2_img.sizes.large+'")';

		document.querySelector("#area_3 .content").innerHTML = pageLinks.acf.area_3_text;
		document.querySelector("#area_3 .img_3").style.backgroundImage = 'url("'+pageLinks.acf.area_3_img.sizes.large+'")';

		document.querySelector("#area_4 .content").innerHTML = pageLinks.acf.area_4_text;
		document.querySelector("#area_4 .img_4").style.backgroundImage = 'url("'+pageLinks.acf.area_4_img.sizes.large+'")';

		document.querySelector("#area_5 .content").innerHTML = pageLinks.acf.area_5_text;
		document.querySelector("#area_5 .img_5").style.backgroundImage = 'url("'+pageLinks.acf.area_5_img.sizes.large+'")';

		document.querySelector("#area_6 .content").innerHTML = pageLinks.acf.area_6_text;
		document.querySelector("#area_6 .img_6").style.backgroundImage = 'url("'+pageLinks.acf.area_6_img.sizes.large+'")';
	}
}
async function getProduct_links_Page(product){
	//Hent json
	let productLinksObjekt = await fetch(siteURL+"/wp-json/wp/v2/produkter/"+product.ID);
	let productLinks = await productLinksObjekt.json();

	console.log(productLinks.produkt_gruppe);

	let productTemplate = document.querySelector("#product_template");
	let productContainer = document.querySelector("#product_container");

	let klon = productTemplate.cloneNode(true).content;

	klon.querySelector(".product_img").setAttribute("src",productLinks.acf.produkt_billede.sizes.medium);
	klon.querySelector(".product_img").setAttribute("alt",productLinks.acf.produkt_billede.alt);
	klon.querySelector(".product_img").setAttribute("title",productLinks.acf.produkt_billede.title);

	klon.querySelector(".product_title").innerHTML = productLinks.title.rendered;
	klon.querySelector(".product_description").innerHTML = productLinks.acf.produkt_beskrivelse;
	klon.querySelector(".product_info_description").innerHTML = productLinks.acf.produkt_maal;

	let productCategoryObjekt = await fetch(siteURL+"/wp-json/wp/v2/produkt_gruppe/"+productLinks.produkt_gruppe);
	let productCategory = await productCategoryObjekt.json();

	klon.querySelector(".go_to_category").innerHTML = productCategory.name;



	productContainer.appendChild(klon);

}

//læs script når DOM er hentet
document.addEventListener("DOMContentLoaded",getJson);