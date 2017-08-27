// elements ================================================
let content 		= document.getElementById('content'); 
const searchForm 	= document.getElementById('searchForm');
const searchBtn 	= document.getElementById('searchBtn'); 
const scrollLine 	= document.querySelector('.scroll-line');


// functions ===============================================
	// get JSON data
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	   		let response 		= JSON.parse(xhttp.responseText);
	   		let fullAddress		=  '';  

	   		// process response
	   		for(let i = 0; i < response.length; i++) {
	   			let companyName 	= response[i].company.name; 
	   			let addrs 			= response[i].company.addrs; 
	   			fullAddress = ''; 

	   			// get list items
	   			if(addrs.length == 0) {
	   				fullAddress = '<p><em>Das Unternehmen hat bisher noch keine Adresse hinterlegt.</em></p>'; 
	   			} else {

					for(let i = 0; i < addrs.length; i++) {
						
							let street 	= addrs[i].street; 
							let zip 	= addrs[i].zip; 
							let city 	= addrs[i].city; 

							fullAddress += 		'<p class="street">' + street + '</p>' +
										  		'<p class="zip">' + zip + ' ' + '<span class="city">' + city + '</span>' + '</p>' ; 
					}	  				
	   			}

	   			// build full list
	   			content.innerHTML += 
	   							'<div class="addressCard animated bounceInUp col-lg-3 col-sm-6">' +
		   							'<div class="companyName"><h3>' + companyName + '</h3></div>' + 
		   								'<div class="address">' +fullAddress + '</div>' + 
								'</div>'; 

	   		}
	    }
	};
	xhttp.open("GET", "companies.json", true);
	xhttp.send();


	// search functionality
	function addrsSearch (e) {
		e.preventDefault(); 
		let input = document.getElementById('input').value; 
		let cards = document.querySelectorAll('.addressCard');

		// compare input with card content
		for (let card of cards) {
			if(card.innerHTML.toLowerCase().indexOf(input.toLowerCase()) >= 0) {
				card.classList.remove('inactive'); 
			} else {
				card.classList.add('inactive'); 
			}
		}
	}

	// typed.js functionality 
	const typed = new Typed('#input', {
	    strings: ["Was suchen Sie?"], 
	    stringsElement: null,
	    typeSpeed: 65,
	    backSpeed: 25,
	    startDelay: 100, 
	    shuffle: false, 
	    showCursor: true, 
	    backDelay: 5000,
	    loop: false
	});

	// clear field on click
	function clearThis(target) {
		target.value = ""; 
	}


	// build scrollLine 
    function fillScrollLine() {
      const windowHeight    = window.innerHeight;
      const fullHeight      = document.body.clientHeight;
      const scrolled        = window.scrollY;
      const percentScrolled = (scrolled / (fullHeight - windowHeight)) * 100;
      scrollLine.style.width = `${percentScrolled}%`;
    }

    // default debounce function -> required for scrollLine to work
    function debounce(func, wait = 15, immediate) {
      var timeout;
      return function() {
        var context = this, args = arguments;
        var later = function() {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    }


// listeners ===============================================
window.addEventListener('scroll', debounce(fillScrollLine));
searchForm.addEventListener('submit', addrsSearch);  



// greeting
    console.log('Hi there, fellow developer!'); 
