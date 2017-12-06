let url = new URL(window.location.href);
let variabler = new URLSearchParams(url.search);
let id = variabler.get("id");

async function getJson(){
			//find DOM elementer
			let template = document.querySelector("#event-template");
			let eventsContainer = document.querySelector("#eventcontainer");
			//Hent json
			let jsonObjekt = await fetch("http://siavonbulow.dk/wp/wp-json/menus/v1/menus/top?id=428");
			let events = await jsonObjekt.json();
			console.log(events);
			
			events.forEach(function(event){
				//klon template og vis i DOM/indsæt data
				let klon = template.cloneNode(true).content;
				klon.querySelector(".start_date").textContent = event.acf.start_date;
				klon.querySelector(".start_time .hour").textContent = event.acf.start_time_hour;
				klon.querySelector(".start_time .minute").textContent = event.acf.start_time_minute;
				klon.querySelector(".event_image_link").setAttribute("src",event.acf.event_image_link.sizes.medium);
				klon.querySelector(".event_image_link").setAttribute("alt",event.acf.event_image_link.alt);
				klon.querySelector(".event_image_link").setAttribute("title",event.acf.event_image_link.title);
				klon.querySelector(".presenting").textContent = event.acf.presenting;
				klon.querySelector(".event_title").textContent = event.acf.event_title;
				klon.querySelector(".subtitle").textContent = event.acf.subtitle;

				console.log(event.acf.performance_art_genre);
				
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
				klon.querySelector(".ticket_price").textContent = event.acf.ticket_price+" DKK";

				if (event.acf.ticket_link == true){
					klon.querySelector(".go_to_ticket").setAttribute("href",event.acf.ticket_link);
				} else {
					klon.querySelector(".go_to_ticket").style.display = "none";
				}

				klon.querySelector(".scene").textContent = event.acf.scene;
				klon.querySelector(".go_to_event").setAttribute("href","single-event.html?id="+event.id);

				//klon.querySelector(".music_events").setAttribute("href","event.html?id="+event.acf.event_type.Music);

				eventsContainer.appendChild(klon);
			});
		}
		//læs script når DOM er hentet
	document.addEventListener("DOMContentLoaded",getJson);