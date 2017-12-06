async function getJson(){
	//find DOM elementer
	let template = document.querySelector("#event-template");
	let eventsContainer = document.querySelector("#eventcontainer");
	//Hent json
	let jsonObjekt = await fetch("http://siavonbulow.dk/wp/wp-json/wp/v2/events?per_page=100");
	let events = await jsonObjekt.json();
	// console.log(events);

	events.sort(function (a, b) {
		return a.acf.start_date.localeCompare(b.acf.start_date);
	});
	events.forEach(function(event){
		//klon template og vis i DOM/indsæt data
		let klon = template.cloneNode(true).content;
		klon.querySelector(".start_date").textContent = event.acf.start_date;
		klon.querySelector(".start_time").textContent = event.acf.start_time;
		klon.querySelector(".event_image_link").setAttribute("src",event.acf.event_image_link.sizes.medium);
		klon.querySelector(".event_image_link").setAttribute("alt",event.acf.event_image_link.alt);
		klon.querySelector(".event_image_link").setAttribute("title",event.acf.event_image_link.title);
		if (event.acf.presenting != ""){
			klon.querySelector(".presenting").textContent = event.acf.presenting+" præsenterer:";
		}
		klon.querySelector(".event_title").textContent = event.acf.event_title;
		klon.querySelector(".subtitle").textContent = event.acf.subtitle;

		// console.log(event.acf.performance_art_genre);

		if (event.acf.music_genre != undefined){
			klon.querySelector(".genre").textContent = event.acf.music_genre[0].name;
		} else if (event.acf.movie_genre != undefined){
			klon.querySelector(".genre").textContent = event.acf.movie_genre[0].name;
		} else if (event.acf.spoken_word_genre != undefined){
			klon.querySelector(".genre").textContent = event.acf.spoken_word_genre[0].name;
		} else if (event.acf.performance_art_genre != ""){
			klon.querySelector(".genre").textContent = event.acf.performance_art_genre[0].name;
		} else if (event.acf.event_type != undefined){
			klon.querySelector(".genre").textContent = event.acf.event_type;
		} else {
			klon.querySelector(".genre").textContent = event.acf.event_type;
		}

		klon.querySelector(".short_description").textContent = event.acf.short_description;

		if (event.acf.ticket_link == true){
			klon.querySelector(".go_to_ticket").setAttribute("href",event.acf.ticket_link);
		} else {
			klon.querySelector(".go_to_ticket").style.display = "none";
		}

		klon.querySelector(".scene").textContent = event.acf.scene;

		if (event.acf.ticket_options == "Free Admission"){
			klon.querySelector(".ticket_options").textContent = "Free";
			klon.querySelector(".ticket_options").style.display = "block";
		} else if (event.acf.ticket_options == "Sold Out"){
			klon.querySelector(".ticket_options").textContent = "Sold Out";
			klon.querySelector(".ticket_options").style.display = "block";
		} else {
			klon.querySelector(".ticket_price").textContent = event.acf.ticket_price+" DKK";
			klon.querySelector(".ticket_price").style.display = "block";
		}

		klon.querySelector(".go_to_event").setAttribute("href","single-event.html?id="+event.id);

		//klon.querySelector(".music_events").setAttribute("href","event.html?id="+event.acf.event_type.Music);

		eventsContainer.appendChild(klon);
	});

	let jsonPageObjekt = await fetch("http://siavonbulow.dk/wp/wp-json/wp/v2/pages_basic/460");
	let page = await jsonPageObjekt.json();

	// console.log(page);

	document.querySelector(".bg_image img").setAttribute("src",page.acf.bg_image.sizes.large);
	document.querySelector(".bg_image img").setAttribute("alt",page.acf.bg_image.alt);
	document.querySelector(".bg_image img").setAttribute("title",page.acf.bg_image.title);
	document.querySelector(".page_title").textContent = page.acf.page_title;
	document.querySelector(".page_description").innerHTML = page.acf.description;
	document.querySelector(".sidebar_title").textContent = page.acf.sidebar_title;
	document.querySelector(".sidebar_description").innerHTML = page.acf.sidebar_description;

	let container = document.querySelector(".pages_links");
	let link_template = document.querySelector("#pages_links");

	page.acf.pages_links.forEach(function(item){
		let klon = link_template.cloneNode(true).content;

		if (item.post_type == "pages_basic") {
			klon.querySelector(".sidebar_link").setAttribute("href","page-basic.html?id="+item.ID);
		}
		if (item.post_type == "pages_contact") {
			klon.querySelector(".sidebar_link").setAttribute("href","page-contact.html?id="+item.ID);
		}

		container.appendChild(klon);
	});

	

}

//læs script når DOM er hentet
document.addEventListener("DOMContentLoaded", getJson);