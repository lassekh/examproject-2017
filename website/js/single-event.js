//find url-variablen id
let url = new URL(window.location.href);
let variabler = new URLSearchParams(url.search);
let id = variabler.get("id");

async function getJson(){
	//Hent json
	let jsonObjekt = await fetch("http://siavonbulow.dk/wp/wp-json/wp/v2/events/"+id);
	let event = await jsonObjekt.json();

	console.log(event);

	document.querySelector(".start_date").textContent = event.acf.start_date;
	document.querySelector(".start_time").textContent = event.acf.start_time;
	document.querySelector(".event_image_link").setAttribute("src",event.acf.event_image_link.sizes.medium);
	document.querySelector(".event_image_link").setAttribute("alt",event.acf.event_image_link.alt);
	document.querySelector(".event_image_link").setAttribute("title",event.acf.event_image_link.title);
	document.querySelector(".presenting").textContent = event.acf.presenting;
	document.querySelector(".event_title").textContent = event.acf.event_title;
	document.querySelector(".subtitle").textContent = event.acf.subtitle;

	if (event.acf.performance_art_genre == true){
		document.querySelector(".genre").textContent = event.acf.performance_art_genre.name;
	} else if (event.acf.music_genre == true){
		document.querySelector(".genre").textContent = event.acf.music_genre.name;
	} else {
		document.querySelector(".genre").textContent = event.acf.event_type;
	}

	document.querySelector(".ticket_price").textContent = event.acf.ticket_price+" DKK";

	if (event.acf.ticket_link == true){
		document.querySelector(".go_to_ticket").setAttribute("href",event.acf.ticket_link);
	} else {
		document.querySelector(".go_to_ticket").style.display = "none";
	}

	document.querySelector(".scene").textContent = "Scene: "+event.acf.scene;



}
//læs script når DOM er hentet
document.addEventListener("DOMContentLoaded",getJson);