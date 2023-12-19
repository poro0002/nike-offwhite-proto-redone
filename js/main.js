// import APP1 from './app.mjs'

// (() => {
//    showSneakers();
// })();


// // function showSneakers(){
// //     console.log(APP2.shoeData)
// // }

// function showSneakers(){

//     APP1.fetchSneakers(function(err, products) {
//         if (err) {
//           console.error('Error fetching products:', err.message);
//         } else {
//           // Create a DocumentFragment to hold the sneakers
//           let sneakers = new DocumentFragment();
    
//           try {
//             // Iterate through the products and create elements for each
//             products.forEach(item => {
//               let sneaker = document.createElement('div');
//               sneaker.innerHTML = `
//                 <h2>${item.make}</h2>
//                 <img src="${item.thumbnail}" alt="${item.silhoutte}" />
//                 <p>${item.retailPrice}</p>
//                 <p>Stock X:${item.lowerResellPrice.stockX} flightClub:${item.lowerResellPrice.flightClub} goat:${item.lowerResellPrice.goat}</p>`;
//               sneakers.appendChild(sneaker);
//             });
//             // Append the DocumentFragment to the container in the DOM
//             document.querySelector(".store-content .container").appendChild(sneakers);

//           } catch (error) {
//             console.log("The function could not be completed", error);
//           }
//         }
//       });
//     };
let size = 10;
let search = "nike off white"
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
    let sneakers = new DocumentFragment();
         
        try {
           // Iterate through the products and create elements for each
           data.results.forEach(item => {
             let sneaker = document.createElement('a'); 
             sneaker.href = `${item.id}`; // change this to a link to view each shoe individually 
             sneaker.classList.add('sneaker-card') 
            //  sneaker.classList.add('flex-center-column') 
             sneaker.innerHTML = `
               <img src="${item.image.original}" alt="${item.silhouette}" />
               <h2>${item.silhouette}</h2>
               <h3>${item.brand}</h3>
               <p>$${item.retailPrice}</p>
               <p>Release Date: ${item.releaseDate}</p>
               <a class="sneaker-card__btn flex-center-row btn">Buy</a>`;
             sneakers.appendChild(sneaker);
           });
           // Append the DocumentFragment to the container in the DOM
           document.querySelector(".store-content .container").appendChild(sneakers)    
         } catch (error) {
           console.log("The function could not be completed", error);
         }
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);

  });




