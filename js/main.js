// import APP1 from './app.mjs'

(() => {
  showShopSneakers();
})();


// globals

let storeContainer = document.querySelector(".store-container");
let selectedShoeContainer = document.querySelector(".store-selected-container");


// -------------> Show Shop Sneakers Function <-------------

function showShopSneakers(){
   
let size = 10;
let search = "nike off white";
const url = `https://the-sneaker-database.p.rapidapi.com/sneakers?limit=${size}&brand=off-white`;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '5934dcae4emsh53f2cc4849fe19ap102d6ajsne10268c7d327',
		'X-RapidAPI-Host': 'the-sneaker-database.p.rapidapi.com'
	}
};

fetch(url, options)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // console.log(data) <----------- display the fetched data
    let sneakers = new DocumentFragment();
         
        try {
           // Iterate through the products and create elements for each
           data.results.forEach(item => {
             let sneaker = document.createElement('a'); 
             sneaker.href = `${item.id}`; // change this to a link to view each shoe individually 
             sneaker.classList.add('sneaker-card') 
            //  sneaker.classList.add('flex-center-column') 
             sneaker.innerHTML = `
               <img class="sneaker-card__img" src="${item.image.original}" alt="${item.silhouette}" />
                <div class="sneaker-card__content">
                  <h2>${item.silhouette}</h2>
                  <h3>${item.brand}</h3>
                  <p>$${item.retailPrice}</p>
                  <p>Release Date: ${item.releaseDate}</p>  
                  </div>
               <a class="sneaker-card__btn flex-center-row btn">Buy</a>
              `;
             sneakers.appendChild(sneaker);
           });
           // Append the DocumentFragment to the container in the DOM
           storeContainer.appendChild(sneakers)    
         } catch (error) {
           console.log("The function could not be completed", error);
         }
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);

  });

};

// -------------> Store Toggle Functions <--------------

function showSelectedResultDiv(){
  storeContainer.classList.toggle("hidden");
  storeContainer.classList.toggle("visible");
  selectedShoeContainer.classList.toggle("visible");
  selectedShoeContainer.classList.toggle("hidden");
}

function showStoreResultsDiv(){
  storeContainer.classList.toggle("visible");
  storeContainer.classList.toggle("hidden");
  selectedShoeContainer.classList.toggle("hidden");
  selectedShoeContainer.classList.toggle("visible");
}


// -------------> Show Buy (selected) Sneakers Function <--------------

document.addEventListener('DOMContentLoaded', () => {
  // Your code here

  // ...

  storeContainer.addEventListener("click", showSelectedSneaker)
});



function showSelectedSneaker(e){
   e.preventDefault();
   showSelectedResultDiv();
   let clickedCard = e.target.closest('.sneaker-card');

   let imageSrc = clickedCard.querySelector('.sneaker-card__img').src;
   let silhouette = clickedCard.querySelector('.sneaker-card__content h2').textContent;
   let brand = clickedCard.querySelector('.sneaker-card__content h3').textContent;
   let retailPrice = clickedCard.querySelector('.sneaker-card__content p').textContent;
   let releaseDate = clickedCard.querySelector('.sneaker-card__content p:last-child').textContent;

   let sneakerFragment = new DocumentFragment();
   let selectedSneakerDiv = document.createElement('div'); 
   selectedSneakerDiv.classList.add('selected-sneaker-div');
      selectedSneakerDiv.innerHTML = `
        <img class="sneaker-card__img" src="${imageSrc}" alt="${silhouette}" />
          <div class="sneaker-card__content">
            <h2>${silhouette}</h2>
            <h3>${brand}</h3>
            <p>${retailPrice}</p>
            <p>${releaseDate}</p>  
            </div>
         <a class="sneaker-card__btn flex-center-row btn">Buy</a>
        `;
    sneakerFragment.appendChild(selectedSneakerDiv);
    selectedShoeContainer.appendChild(sneakerFragment);
}