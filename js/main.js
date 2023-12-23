// import APP1 from './app.mjs'

// globals

let storeContainer = document.querySelector(".store-container");
let selectedShoeContainer = document.querySelector(".store-selected-container");
let homeMain = document.getElementById('main');

 // show mobile nav
 let mobileNavBarMenuBtn = document.querySelector('.nav-mobile-menu');
 let navBar = document.querySelector('.navbar');

// -------------> DOM Content Loaded Functions <--------------

document.addEventListener('DOMContentLoaded', () => {
  showShopSneakers();
  storeContainer.addEventListener("click", showSelectedSneaker)
  document.querySelector('.nav-cart-exit__btn').addEventListener('click', exitNavCart)
  
});

// checkScreenSize();


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
        console.log(data) 
        let sneakers = new DocumentFragment();
            
            try {
              // Iterate through the products and create elements for each
              data.results.forEach(item => {
                let sneaker = document.createElement('a'); 
                sneaker.setAttribute("data-id", `${item.id}`)  // change this to a link to view each shoe individually 
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
                  
                  `;
                  // <a class="sneaker-card__btn flex-center-row btn">Buy</a>
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

  function showHomeFooter(){
     document.querySelector('.home-footer').classList.add('visible');
     document.querySelector('.home-footer').classList.remove('hidden');
  }

  function hideHomeFooter(){
    document.querySelector('.home-footer').classList.add('hidden');
    document.querySelector('.home-footer').classList.remove('visible');
 }

// mobile navbar

 mobileNavBarMenuBtn.addEventListener('click', showMobileNav);

 function showMobileNav(){
   navBar.classList.toggle("navbar-active"); // translates to the regular position with this animation class added
   
   const navLinks = document.querySelectorAll('.link');
   navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      // Close the mobile navbar when a link is clicked
      navBar.classList.remove('navbar-active');
    });
  });
}


// -------------> Scroll Page Function <--------------

  function scrollPage(){
    let winScroll = homeMain.scrollTop;
    let height1 = homeMain.scrollHeight - document.documentElement.clientHeight;
    let percent = (winScroll / height1) * 100
    // console.log(percent);

    if(percent >= 100){
      showHomeFooter();
    }else if(percent <= 99){
      hideHomeFooter();
    }
  }

  homeMain.addEventListener('scroll', scrollPage);
 


// -------------> Display Selected Sneaker Function <-------------

function showSelectedSneaker(e){
    e.preventDefault();
    let clickedCard = e.target.closest('.sneaker-card');
    //  console.log(clickedCard)

    if(clickedCard){
        showSelectedResultDiv();
        let imageSrc = clickedCard.querySelector('.sneaker-card__img').src;
        let silhouette = clickedCard.querySelector('.sneaker-card__content h2').textContent;
        let brand = clickedCard.querySelector('.sneaker-card__content h3').textContent;
        let retailPrice = clickedCard.querySelector('.sneaker-card__content p').textContent;
        let releaseDate = clickedCard.querySelector('.sneaker-card__content p:last-child').textContent;
        let clickedDataId = clickedCard.getAttribute("data-id");
      
        let sneakerFragment = new DocumentFragment();
        

        let selectedSneakerDiv = document.createElement('div'); 
        selectedSneakerDiv.setAttribute('data-id', clickedDataId)
        selectedSneakerDiv.classList.add('selected-sneaker-div');
          selectedSneakerDiv.innerHTML = `
            <img class="sneaker-card__img" src="${imageSrc}" alt="${silhouette}" />
              <div class="sneaker-card__content">
                <h2>${silhouette}</h2>
                <h3>${brand}</h3>
                <p>${retailPrice}</p>
                <p>${releaseDate}</p>  
                </div>
              <a class="sneaker-card-cart__btn flex-center-row btn--secondary">Add To Cart</a>
              <a href="cart.html" class="sneaker-card-cart__btn flex-center-row btn">Buy</a>
            `;
        sneakerFragment.appendChild(selectedSneakerDiv);
        selectedShoeContainer.appendChild(sneakerFragment);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    

    // Popout Nav Cart Event
      let selectedSneakerCartBtn = document.querySelector('.sneaker-card-cart__btn');
      selectedSneakerCartBtn.addEventListener("click", addToAllCarts)
    
      // Popout/main Cart function
        function addToAllCarts(e){

          updateCartFromLocalStorage();
          
          // navcart code
            let navCart = document.querySelector(".nav-cart");
            navCart.classList.add("nav-cart-active");
            let navCartLiContainer = document.querySelector(".nav-cart-items");
            let itemToAdd = e.target.closest('.selected-sneaker-div');
            let dataIdToAdd = itemToAdd.getAttribute('data-id');
            
          // Check if the item is already in the cart by matching the data-ids/ array methods return truthy falsy conditions
              let isItemInCart = Array.from(navCartLiContainer.children).some(cartItem => {
                return cartItem.getAttribute('data-id') === dataIdToAdd;
              });
              
              // this variable is looping through the local storage keys and checking if the key includes the same data-id that the parent target has
              // some looks for any of the keys to match and returns boolean
              let storageIncludes = Object.keys(localStorage).some(key => key.includes(itemToAdd.getAttribute('data-id')));
             
     
              if (!isItemInCart && !storageIncludes) {
                let clonedItem = itemToAdd.cloneNode(true);
                clonedItem.classList.add('nav-cart__item');

                // also add a remove btn to the nav cart item
                let removeBtn = document.createElement('a');
                removeBtn.classList.add('remove-item-btn');
                removeBtn.innerHTML = `<i class="material-icons">delete</i> Delete`;
                
                removeBtn.addEventListener('click', ()=>{
                  removeBtn.parentElement.remove();
                  localStorage.removeItem(`localSneaker${clonedItem.getAttribute('data-id')}`);
                })
                  
              
                
                // make sure the remove btn is appended to each popout nav cart item
                // then add an event listener that removes that specific popout nav cart item using the closest method
                clonedItem.insertBefore(removeBtn, clonedItem.firstChild);
              
              // select all & loop through the buttons in the targeted HTML and remove them
                let buttonsToRemove = clonedItem.querySelectorAll('.sneaker-card-cart__btn');
                buttonsToRemove.forEach(button => button.remove());
                navCartLiContainer.appendChild(clonedItem);
                return localStorage.setItem(`localSneaker${dataIdToAdd}`, clonedItem.outerHTML);

              }else{
                alert("that item is already in your bag");
              }
          // main cart code
      }
// SHOW SELECTED SNEAKER FUNCTION BRACKETS
  }
}



// -------------> Exit Nav Cart Function <--------------
  function exitNavCart(){
    let navCart = document.querySelector(".nav-cart");
    navCart.classList.remove("nav-cart-active");

  }

// -------------> Update Cart With Local Storage Function <--------------
  
  function updateCartFromLocalStorage() {
    let navCartLiContainer = document.querySelector(".nav-cart-items");

    // Clear the current content of the cart
    navCartLiContainer.innerHTML = '';

    // Iterate over local storage items
    for (let item in localStorage) {
      if (item.startsWith('localSneaker')) {
        // Retrieve the HTML from local storage
        let storedHTML = localStorage.getItem(item);
        let cartItemDiv = document.createElement('div');
        cartItemDiv.innerHTML = storedHTML;

        let removeBtn = cartItemDiv.querySelector('.remove-item-btn');
          removeBtn.addEventListener('click', (e) =>{
            let currentCardItem = e.target.closest('.selected-sneaker-div');
            removeBtn.parentElement.remove();
            localStorage.removeItem(`localSneaker${currentCardItem.getAttribute('data-id')}`);
          })

        navCartLiContainer.appendChild(cartItemDiv);
      }
    }
  }


 





