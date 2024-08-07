// import APP1 from './app.mjs'

// globals

  let storeContainer = document.querySelector(".store-container");
  let selectedShoeContainer = document.querySelector(".store-selected-container");
  let homeMain = document.getElementById('main');

// pages
 
  const homePage = window.location.pathname.includes('index.html');
  const storePage = window.location.pathname.includes('store.html');
  const cartPage = window.location.pathname.includes('cart.html');
  const accountPage = window.location.pathname.includes('account.html');

// drop down links
  const loginLink = document.querySelector("#login-link");
  const registerLink = document.querySelector("#register-link");
  const settingsLink = document.querySelector("#settings-link");
 
// show mobile nav
  let mobileNavBarMenuBtn = document.querySelector('.nav-mobile-menu');
  let navBar = document.querySelector('.navbar');

// -------------> DOM Content Loaded Functions <--------------

document.addEventListener('DOMContentLoaded', () => {
 
   // all pages
    document.querySelector(".nav-list li #search-icon").addEventListener('click', searchBar)
    document.querySelector(".search-bar-exit__btn").addEventListener('click', exitSearchBar)
    showAccountDropDown();
    
    // console.log(loginLink)
    
  
  if(homePage){  // Home
    homeMain.addEventListener('scroll', scrollPage);

  } else if(storePage){  // Store 
      showShopSneakers();
      storeContainer.addEventListener("click", showSelectedSneaker)
      document.querySelector('.nav-cart-exit__btn').addEventListener('click', exitNavCart)
      document.querySelector(".removeBtn").addEventListener('click', removeAllItems)
      updateQuantity();
    } 
    else if(cartPage){  // Cart 
      updateCartFromLocalStorage();
      updateQuantity();
      document.querySelector(".removeBtn").addEventListener('click', removeAllItems)
      document.querySelector(".purchaseBtn").addEventListener('click', totalWithTax)
      checkCartLength();
    } else if(accountPage){ // Account page
       
        
        

      //  URLSearchParams constructor takes a string/URL that contains the query parameters (everything after the "?" character), parses this string into key-value pairs, making it easy to work with 
          // this is a lot better than using string methods on query strings 
          const urlParams = new URLSearchParams(window.location.search);
          const clickedLinkId = urlParams.get('id');
        // console.log(clickedLinkId);
    
        if(clickedLinkId === loginLink.id){
          showLoginForm();
            document.querySelector(".dont-have-account__btn").addEventListener("click", ()=> {
              showRegisterForm();
            });
        } else if(clickedLinkId === registerLink.id){
          showRegisterForm();
        } else if(clickedLinkId === settingsLink.id){
          showSettingsForm();
        }
      }   

});

// -------------> SearchBar Function <-------------

  function searchBar(){
    //  console.log("is this working ?");
      document.querySelector(".search-bar").classList.add("searchBar-active")
      let searchInput = document.querySelector(".search-input");
        searchInput.addEventListener('keydown', (event) => {
          if (event.key === 'Enter') {
            
            //im sending the search param in the url over to the page im visiting then taking it and applying it to the fetch
            // encodeURIComponent takes a string and prepares it to be included as a component in a URI by replacing special characters with their URL-encoded representations. 
            window.location.href = `store.html?search=${encodeURIComponent(searchInput.value)}`;
          }
        });

   }

  // -------------> Exit Search Bar Function <--------------
  function exitSearchBar(){
    let searchBar = document.querySelector(".search-bar");
    searchBar.classList.remove("searchBar-active");

  }

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

 function showAccountDropDown(){
   let accountIcon = document.querySelector("#account-icon");
  
   accountIcon.addEventListener("click", () => {
      document.querySelector('.drop-down__content').classList.toggle('drop-down-active');
      
    });
 }

  function showLoginForm(){
    loginForm.addEventListener("submit", loginWithLocalStorageData);
    document.querySelector(".dont-have-account__btn").addEventListener("click", showRegisterForm)

    document.getElementById('login').classList.add('visible-grid');
    document.getElementById('login').classList.remove('hidden');
    document.getElementById('register').classList.add('hidden');
    document.getElementById('settings').classList.add('hidden');
    console.log("login function running");
  }

  function showRegisterForm(){
    registerForm.addEventListener("submit", registerDataToLocalStorage);

    document.getElementById('register').classList.add('visible-grid');
    document.getElementById('register').classList.remove('hidden');
    document.getElementById('login').classList.add('hidden');
    document.getElementById('settings').classList.add('hidden');  
    console.log("register function running");
  }

  function showSettingsForm(){
    document.getElementById('settings').classList.add('visible-grid');
    document.getElementById('settings').classList.remove('hidden');
    document.getElementById('login').classList.add('hidden');
    document.getElementById('register').classList.add('hidden');  
    console.log("settings function running");
  }

// mobile navbar

 mobileNavBarMenuBtn.addEventListener('click', showMobileNav);

 function showMobileNav(){
   navBar.classList.toggle("navbar-active"); // translates to the regular position with this animation class added
   document.querySelector('.drop-down__content').classList.remove('drop-down-active');

   const navLinks = document.querySelectorAll('.link');
   navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      // Close the mobile navbar when a link is clicked
      navBar.classList.remove('navbar-active');
      
      if(link.id !== "account-icon"){
        document.querySelector('.drop-down__content').classList.remove('drop-down-active');
      }
      
    });
  });
}


// -------------> Scroll Page Function <--------------

  function scrollPage(){
    let winScroll = homeMain.scrollTop;
    let height1 = homeMain.scrollHeight - document.documentElement.clientHeight;
    let percent = (winScroll / height1) * 100;

    let pll1 = document.querySelector(".pll-1")
    let pll2 = document.querySelector(".pll-2")
    let pll3 = document.querySelector(".pll-3")
    let pll4 = document.querySelector(".pll-4")
    
    // console.log(percent);

    if(percent >= 100){
      showHomeFooter();
    }else if(percent <= 99){
      hideHomeFooter();
    }

    [pll1, pll2, pll3, pll4].forEach(icon => {
      icon.classList.remove("active-page-location__icon");
    });
  
    if (percent < 33.3) {
      pll1.classList.add("active-page-location__icon");
    } else if (percent < 66.6) {
      pll2.classList.add("active-page-location__icon");
    } else if (percent < 100) {
      pll3.classList.add("active-page-location__icon");
    } else {
      pll4.classList.add("active-page-location__icon");
    }

  }
  

    // -------------> Clear NavCart and Local Storage <--------------

    function removeAllItems(){
   
      if(storePage){
        let navCartLiContainer = document.querySelector(".nav-cart-items");
        navCartLiContainer.innerHTML = '';
        updateSubTotal();
      } 
      else if(cartPage){
        let cartItems = document.querySelector(".cart-container .container");
        cartItems.innerHTML = '';
        updateSubTotal();
     
      }
     
      localStorage.clear();
      checkCartLength();
    }

  // -------------> Check Cart Length <--------------
  
    function checkCartLength(){
      let cartContainer = document.querySelector(".cart-container .container");
      let cartItems = cartContainer.querySelectorAll('.container .selected-sneaker-div');
      let existingMessage = cartContainer.querySelector('.empty-cart-h3');
      // console.log(cartItems)
      
      if(cartItems.length === 0){

        cartContainer.style = "grid-template-columns: 1fr"

        if (existingMessage) {
          existingMessage.remove();
        }
    
        let noItemsMessage = document.createElement('h3');
        noItemsMessage.classList.add("empty-cart-h3");
        noItemsMessage.textContent = "Your Cart Is Empty !";
        cartContainer.appendChild(noItemsMessage);
  
      }
    }




// -------------> Show Shop Sneakers Function <-------------

  function showShopSneakers(){

    let noResultHeader = document.createElement("h2");
    noResultHeader.remove();

  let size = 50;
  // Get the search parameter from the URL
  let search = new URLSearchParams(window.location.search).get('search') || "off-white";
  const url = `https://the-sneaker-database.p.rapidapi.com/sneakers?limit=${size}&brand=${encodeURIComponent(search)}`;
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
          if(data.results.length === 0){
            noResultHeader.classList.add("no-result__header");
            noResultHeader.classList.add("flex-center-row");
            noResultHeader.textContent = "No Results Match That Search";
            document.querySelector(".store-container").appendChild(noResultHeader);
            return;
          }
      let sneakers = new DocumentFragment();
          
          try {
            // Iterate through the products and create elements for each
            data.results.forEach(item => {
              let sneaker = document.createElement('a'); 
              sneaker.setAttribute("data-id", `${item.id}`)  // change this to a link to view each shoe individually 
              sneaker.classList.add('sneaker-card') 
              //  sneaker.classList.add('flex-center-column') 
              
              const imgSrc = item.image.original || "content/social-media-logos/no-image-icon-23494.png";

              sneaker.innerHTML = `
                <img class="sneaker-card__img" src="${imgSrc}" alt="${item.silhouette}" />
                  <div class="sneaker-card__content">
                    <h2>${item.name}</h2>
                    <h3>${item.brand}</h3>
                    <p>$${item.estimatedMarketValue}</p>
                    <p>Release Date: ${item.releaseDate}</p>  
                    </div>
                
                `;
                // <a class="sneaker-card__btn flex-center-row btn">Buy</a>
              
              //  if(!sneaker.querySelector(".sneaker-card__img").src){
              //   sneaker.querySelector(".sneaker-card__img").src = "content/social-media-logos/no-image-icon-23494.png";
              // }
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
                <p class="sneaker-card__price"><strong>${retailPrice}</strong></p>
                <p>${releaseDate}</p> 
                <label for="size">Size:</label>
                <select class="sneaker-card__size" id="size" name="size">
                  <option value="6">6</option>
                  <option value="6.5">6.5</option>
                  <option value="7">7</option>
                  <option value="7.5">7.5</option>
                  <option value="8">8</option>
                  <option value="8.5">8.5</option>
                  <option value="9">9</option>
                  <option value="9.5">9.5</option>
                  <option value="10">10</option>
                </select>
                <a class="sneaker-card-cart__btn flex-center-row btn--secondary">Add To Cart</a>
                <a href="cart.html" class="sneaker-card-buy__btn flex-center-row btn">Buy</a>
              </div>
              
            `;
        sneakerFragment.appendChild(selectedSneakerDiv);
        selectedShoeContainer.appendChild(sneakerFragment);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    

    // Popout Nav Cart Event
      let selectedSneakerCartBtn = document.querySelector('.sneaker-card-cart__btn');
      selectedSneakerCartBtn.addEventListener("click", addToAllCarts)
    
      // Pop out/main Cart function
      function addToAllCarts(e){
      
         
          exitSearchBar();

          // navcart code
            let navCart = document.querySelector(".nav-cart");
            navCart.classList.add("nav-cart-active");
            let navCartLiContainer = document.querySelector(".nav-cart-items");
            let itemToAdd = e.target.closest('.selected-sneaker-div');
            let dataIdToAdd = itemToAdd.getAttribute('data-id');
            let selectedSneakerSize = itemToAdd.querySelector(".sneaker-card__size").value;
            updateCartFromLocalStorage(selectedSneakerSize);
            
          // Check if the item is already in the cart by matching the data-ids/ array methods return truthy falsy conditions
              let isItemInCart = Array.from(navCartLiContainer.children).some(cartItem => {
                return cartItem.getAttribute('data-id') === dataIdToAdd;
              });
              

              // this variable is looping through the local storage keys and checking if the key includes the same data-id that the parent target has
              // some looks for any of the keys to match and returns boolean
              let storageIncludes = Object.keys(localStorage).some(key => key.includes(itemToAdd.getAttribute('data-id')));
              let cartItemObj;
           
            //if the item is not in cart and storage doesn't include it 
              if(!isItemInCart && !storageIncludes) {
                
                let clonedItem = itemToAdd.cloneNode(true);
                clonedItem.classList.add('nav-cart__item');

           
                // also add a REMOVE BTN to the nav cart item
                let removeBtn = document.createElement('a');
                removeBtn.classList.add('remove-item-btn');
                removeBtn.innerHTML = `<i class="material-icons">delete</i> Delete`;



                removeBtn.addEventListener('click', ()=>{
                  removeBtn.parentElement.parentElement.remove();
                  localStorage.removeItem(`localSneaker${clonedItem.getAttribute('data-id')}`);
                  updateQuantity();
                  updateSubTotal();
                })

              // add a quantity input 
                     let quantityInput = document.createElement('input');
                     quantityInput.value = 1;
                     quantityInput.classList.add('quantity-input');
                     quantityInput.type = 'number';
              
              // add the selected size to the nav item
              clonedItem.querySelector("label").innerHTML += ` <strong>${selectedSneakerSize}</strong>`;
              clonedItem.querySelector('.sneaker-card__size').remove();
              
              
                     
              // make sure the remove btn is appended to each popout nav cart item
                 
                  // clonedItem.insertBefore(removeBtn, clonedItem.firstChild);
                  let clonedExtraContainer = document.createElement("div");
                  clonedExtraContainer.classList.add("quant-remove__cont");
                  clonedExtraContainer.append(quantityInput, removeBtn)

                  // clonedItem.appendChild(quantityInput);
                  // clonedItem.appendChild(removeBtn);
                  clonedItem.appendChild(clonedExtraContainer);

              // select all & loop through the buttons in the targeted HTML and remove them
                  let cartBtnToRemove = clonedItem.querySelector('.sneaker-card-cart__btn');
                  let buyBtnToRemove = clonedItem.querySelector('.sneaker-card-buy__btn');
                  cartBtnToRemove.remove();
                  buyBtnToRemove.remove();

                  // select the size value

                  cartItemObj = {
                    dataId: dataIdToAdd,
                    quantity: 1, 
                    size:  selectedSneakerSize,
                    html: clonedItem.outerHTML,
                  };
          
               // Save the object as a JSON string to local storage
                 localStorage.setItem(`localSneaker${dataIdToAdd}`, JSON.stringify(cartItemObj));

                //append cloned item to the navcart item container and set in local storage
                  navCartLiContainer.appendChild(clonedItem);
                  updateQuantity();
                  updateSubTotal();
              } else{
                // if the same item exists, replace the size with what you changed on the selected sneaker and update the local storage
                  Array.from(navCartLiContainer.children).some(cartItem => {
                    if(cartItem.getAttribute('data-id') === dataIdToAdd){
                      cartItem.querySelector('label strong').textContent = itemToAdd.querySelector('.sneaker-card__size').value;
 
                          for (let item in localStorage) {
                            if (item.startsWith('localSneaker')) {
                              // Retrieve the HTML from local storage
                              let storedString = localStorage.getItem(item);
                              let storedObject = JSON.parse(storedString);
                              // if the data ids match when adding && if the size has been changed 
                                if(storedObject.dataId === dataIdToAdd && storedObject.size !== selectedSneakerSize){
                                    alert("Size Has Been Changed");
                                  storedObject.size = selectedSneakerSize;
                                  localStorage.setItem(item, JSON.stringify(storedObject));
                             // if the data ids match && if the size HASN'T been changed 
                                }else if(storedObject.dataId === dataIdToAdd && storedObject.size === selectedSneakerSize){
                                    alert("that item is already in your bag");
                                }
                              }
                            }
                       
                    }
                    updateQuantity();
                  });
                
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

// in this function it grabs all of the sneakerItems local storage data and loops through them and displays it in the nav-cart-items container
  
  function updateCartFromLocalStorage(newSize) {
    let navCartLiContainer = document.querySelector(".nav-cart-items");
    let mainCartContainer = document.querySelector(".cart-container .container");

    // clears whatever is in the cart
    navCartLiContainer.innerHTML = '';

    // Iterate over local storage items
    for (let item in localStorage) {
      if (item.startsWith('localSneaker')) {
        // Retrieve the HTML from local storage
        let storedString = localStorage.getItem(item);
        let storedObject = JSON.parse(storedString);
        let storedQuantity = storedObject.quantity;
        let storedDataId = storedObject.dataId;
        let storedSize = storedObject.size;


        let cartItemDiv = document.createElement('div');
        cartItemDiv.innerHTML = storedObject.html;
        
        
        
        // added cartItemObject again so its properties can be can be re-updated/stringed to storage whenever the function runs again
        let cartItemObj = {
          dataId: storedDataId,
          quantity: storedQuantity,  
          size: storedSize,
          html: cartItemDiv.innerHTML,
        }
         
        cartItemDiv.querySelector("label strong").textContent = newSize; 
       

        if(storePage){
          navCartLiContainer.insertAdjacentHTML('beforeend', cartItemObj.html);
        }
        else if(cartPage){
         mainCartContainer.insertAdjacentHTML('beforeend', cartItemObj.html);
        }
     
      }
    }
  }

 // -------------> Update Quantity Function <--------------

  // This just loops through the nav cart items and adds event listeners to the inputs, it then updates the local storage quantity
    function updateQuantity(){

      let navCartItems = document.querySelectorAll(".nav-cart__item");
      
      if(navCartItems.length > 0){
        navCartItems.forEach(navItem => {
          let quantityInput = navItem.querySelector(".quantity-input");
          let navCartItemDataId = navItem.getAttribute('data-id');
          let removeBtn = navItem.querySelector('.remove-item-btn');

          removeBtn.addEventListener('click', (e) =>{
            let currentCardItem = e.target.closest('.selected-sneaker-div');
            removeBtn.parentElement.parentElement.remove();
            localStorage.removeItem(`localSneaker${currentCardItem.getAttribute('data-id')}`);
            updateQuantity(); // re-updates after deleting an item
            updateSubTotal();
            checkCartLength();
          });


        // quantities input event listener
          quantityInput.addEventListener("input", () => {
            for (let item in localStorage) {
              if (item.startsWith('localSneaker')) {
                // Retrieve the HTML from local storage
                let storedString = localStorage.getItem(item);
                let storedObject = JSON.parse(storedString);
                

                  if(navCartItemDataId === storedObject.dataId){
                    storedObject.quantity = quantityInput.value; // here
                    localStorage.setItem(item, JSON.stringify(storedObject));
                  }
                }
              // makes it so you cant make quantity neg/0 or something other than a number
                if(isNaN(quantityInput.value) || quantityInput.value <= 0 ){
                  quantityInput.value = 1;
                   }

                   
              }
              updateSubTotal();
            });

      // So.. the FIRST loop is to add the event & set the input value and when the cart is displayed
      // The SECOND loop is to update the local storage quantity when the input in the cart is changed.

            for (let item in localStorage) {
              if (item.startsWith('localSneaker')) {
                // Retrieve the HTML from local storage
                let storedString = localStorage.getItem(item);
                let storedObject = JSON.parse(storedString); 

                  if(navCartItemDataId === storedObject.dataId){
                    quantityInput.value = storedObject.quantity; // here
                  }
                }
              }
              updateSubTotal();
        });
      }
    }
 
    // -------------> Update Cart SubTotal Function <--------------

    function updateSubTotal(){
      let navCartItems = document.querySelectorAll(".nav-cart__item");
         let totalSubTotal = 0;

         if (navCartItems.length > 0) {
          navCartItems.forEach(navItem => {
            let sneakerPrice = navItem.querySelector('.sneaker-card__price');
            let quantityInput = navItem.querySelector('.quantity-input');

              let navItemPrice = sneakerPrice.textContent;
              let removeDollarSign = navItemPrice.substring(1);
              let priceToNumber = parseFloat(removeDollarSign);
              
              // form inputs return their values as strings so I had to convert the string to a number with potential decimal points
              totalSubTotal += priceToNumber * parseFloat(quantityInput.value);
           
          });
        }
        
        let navSubTotal = document.querySelector(".total-subtotal__span");
        navSubTotal.textContent = "$" + totalSubTotal.toFixed(2);
          if(cartPage){
            let mainCartSub = document.querySelector(".main-cart-subtotal__span");
            mainCartSub.textContent = navSubTotal.textContent;
          } 
      }


// -------------> Total Price with tax <--------------

  function totalWithTax(){
    let navCartItems = document.querySelectorAll(".nav-cart__item");
    let mainCartSubTotal = document.querySelector(".main-cart-subtotal__span")
    let purchaseDiv = document.querySelector(".purchase-cont");
    purchaseDiv.innerHTML = "";
    
    let grandTotalSpan = document.createElement("span")
    grandTotalSpan.classList.add("main-cart-total__span");


    let purchaseMessage = document.createElement('p');
    

    let removeDollarSign = mainCartSubTotal.textContent.substring(1);
    let priceToNumber = parseFloat(removeDollarSign);
    let salesTax = 0.15;
    
       let amountOfTax =  priceToNumber * (salesTax / 1);
       let grandTotal = amountOfTax + priceToNumber;
       

       grandTotalSpan.textContent = "$" + grandTotal.toFixed(2);

       if(navCartItems.length > 0){
          purchaseDiv.appendChild(grandTotalSpan);
          
          purchaseMessage.textContent = "Thank You For Your Purchase !";
          purchaseDiv.appendChild(purchaseMessage);
       }else{
          purchaseMessage.textContent = "You Have No Items In Your Cart";
          purchaseDiv.appendChild(purchaseMessage);
       }
       
  }

// -------------------------------- Account Page ---------------------------------

// globals
let registerForm = document.querySelector(".register__form");
let loginForm = document.querySelector(".login__form");



// -------------> Create a LocalStorage Object With The Register Data <--------------


 function registerDataToLocalStorage(e){
    // <-- Register Vars -->
  let regNameInput = document.querySelector("#fName");
  let regUserInput = document.querySelector("#register-username");
  let regPassInput = document.querySelector("#register-password");
  let regConfirmPassInput = document.querySelector("#confirm-password");
  let regEmailInput = document.querySelector("#email");
  let regPhoneInput = document.querySelector("#tel");

  e.preventDefault();
 
  

  let userCountLocal = JSON.parse(localStorage.getItem('userCountLocal')) || 0;
  userCountLocal++;
  // if(regPhoneInput.length > 0){
  //   inputValue = inputValue.match(/^(\d{1,3})(\d{1,3})?(\d{1,4})?/);
  // }
  
  // Rule Object 
  // if you have done the condition correct maybe make it so the border of the corresponding input is green / if not make it red
  const registerFormRules = [
      {nameRules:[
        {condition: value => {
           let firstLastCount = value.split(/\s+/);
           return firstLastCount.length >= 1;
        }, message: "you must provide a first and last name"}
      ]},
      {passwordRules:[
      { condition: value => value.length >= 8, message: "Password must be at least 8 characters long." },
      { condition: value => /[a-z]/.test(value), message: "Password must contain at least one lowercase letter." },
      { condition: value => /[A-Z]/.test(value), message: "Password must contain at least one uppercase letter." },
      { condition: value => /\d/.test(value), message: "Password must contain at least one digit." },
      { condition: value => /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(value), message: "Password must contain at least one of the symbols." },
    ],},
      {emailRules:[
        {condition: value => /^[^ ]+@[a-zA-Z0-9.-]+\.[a-z]{2,3}$/.test(value), 
        message: "Must be a valid Email", },
      ]},
      {phoneRules:[
          {condition: value => {
            return value.length >= 10;
        }, message: "you must provide a valid phone number"}
      ]},
      {usernameRules:[
        {condition: value => {
          return value.length >= 6;
      }, message: "username must be at least 6 digits long" }
    ]},
      
    ];
  
  // checks if the form was filled out properly before proceeding  
    if (registerForm.checkValidity()) {

      
      let currentUser = {
          name: regNameInput.value,
          username: regUserInput.value,
          password: regConfirmPassInput.value,
          email: regEmailInput.value,
          phone: regPhoneInput.value
        };

        const nameCondition = registerFormRules[0].nameRules[0].condition;
        const passwordRuleConditions = registerFormRules[1].passwordRules.map(rule => rule.condition);
        const emailCondition = registerFormRules[2].emailRules[0].condition;
        const phoneCondition = registerFormRules[3].phoneRules[0].condition;
        const usernameCondition = registerFormRules[4].usernameRules[0].condition;
       
        console.log("Name condition:", nameCondition(regNameInput.value));
        console.log("Password conditions:", passwordRuleConditions.map(condition => condition(regConfirmPassInput.value)));
        console.log("Email condition:", emailCondition(regEmailInput.value));
        console.log("Phone condition:", phoneCondition(regPhoneInput.value));
        console.log("Username condition:", usernameCondition(regUserInput.value));




        // console.log(passwordRuleConditions)
        // The every method checks if every condition is returning true/ "all are met"
          // had to create a map of the password rules so the every method would work 
        let confirmPass = passwordRuleConditions.every(condition => condition(regConfirmPassInput.value));
        
        // some method checks if at least one item in the array  satisfies the condition we are comparing
        // takes an object and returns and array of each one
          let accountExists = Object.keys(localStorage).some(key => {
            if (key.startsWith("user")) {
              let user = JSON.parse(localStorage.getItem(key));
              return user.email === regEmailInput.value || user.phone === regPhoneInput.value ;
            }
            return false;
          });
          
       
        // checks for existing account first
        if(accountExists){
           alert("that email and or phone number is already registered");
        }
       else if(nameCondition(regNameInput.value) && confirmPass && emailCondition(regEmailInput.value) && phoneCondition(regPhoneInput.value) && usernameCondition(regUserInput.value) && !accountExists){
          alert("everything follows my rules");
          
          localStorage.setItem('userCountLocal', userCountLocal);
          let newUserKey = `user${userCountLocal}`; 
          

          localStorage.setItem(newUserKey, JSON.stringify(currentUser))
          document.querySelector(".register__form fieldset").innerHTML = `<h2>Account Created !</h2> <a class="register-login__link">Login Here</a>`;
            document.querySelector(".register-login__link").addEventListener("click", showLoginForm);
            
        }  else{
          alert("please try again")
        }    
      }
    
 }

 // -------------> Loop Through the Local Storage user Objects Till You Find A Match <--------------



  function loginWithLocalStorageData(){
  
        // <-- login Vars -->
    let loginUserInput = document.querySelector("#username");
    let loginPassInput = document.querySelector("#password");
    let loginSuccess = false;
    
    for (let key in localStorage) {
      if(key.startsWith("user")){
        let user = JSON.parse(localStorage.getItem(key));

          if(user.username === loginUserInput.value && user.password === loginPassInput.value){
            alert("You Have Successfully Logged In"); 
            document.querySelector(".login__form fieldset").innerHTML = `<h2>Login Successful !</h2> <a href="store.html" class="login-store__link">Enter Store</a>`;
            loginSuccess = true;
            break; // get out of the loop once a match is found
          }
            window.location.pathname = 'store.html';
      }
     
    }
    if(loginSuccess === false){
      alert("there was something wrong with the login information, Please Try Again"); 
      window.location.reload();
      
    } 
 

  }