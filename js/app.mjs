

// globals
// const SneaksAPI = require('sneaks-api');
// const sneaks = new SneaksAPI();
// let shoeData = [];

import { getProducts } from './sneaksWrapper.mjs';

let APP1 = {
  fetchSneakers: function (callback) {
    getProducts("nike off white", 10, callback);
  },
};

export default APP1;


// 1st Namespace APP

    //  navSlide : () => {
    //     const burger = document.querySelector('.burger');
    //     const nav = document.querySelector('nav ul');
    //     const links = document.querySelectorAll('nav li');
    //      //toggle nav
    //     burger.addEventListener('click', () => {
    //         nav.classList.toggle('nav-active');
           
    //        //animate links
    //         links.forEach((link, index) => {
    //             if(link.style.animation){
    //              link.style.animation = '';
    //              }
    //              else {
    //                  link.style.animation =  `navLinkFade .3s ease forwards ${index / 7 + 0.5}s`;
    //              }
    //          });
    
    //          burger animation
    //          burger.classList.toggle('toggle');
            
    //     });
    // },
   


    // stabdard form code 


// </main>
    
            //  <div class="login__wrap register__wrap">
                        
            //       <form action="#" class="login__form">
            //           <div class="form-grid">
            //             <fieldset>

            //               <!-- title -->
            //               <legend>
            //                   <h1 class="login__title">Contact Me</h1>
            //               </legend>
                 

            //               <!-- Name -->
            //               <div class="form-unit  full">
            //                   <label class="full-width-label" for="fName">Full Name*</label>
            //                   <input 
            //                       type="text" 
            //                       id="fName" 
            //                       name="fName" 
            //                       autofocus
            //                       required
            //                       aria-label="full name input"
            //                       >
            //               </div>

            //               <!-- Email & Phone  -->
                    
            //                   <label class="full-width-label" for="email">Email*  <input  
            //                       type="email" 
            //                       id="email" 
            //                       name="email" 
            //                       required
            //                       aria-label="email input"
            //                       >
            //                   </label>

            //                   <label class="full-width-label" for="tel">Phone*  <input 
            //                       type="tel" 
            //                       id="tel" 
            //                       name="tel" 
            //                       required
            //                       aria-label="phone input"
            //                       >
            //                   </label>
                     
                     
                    

            //               <!-- Preferred Contact Method -->
            //               <div class="form-unit"> 
            //                   <h2 class="full-width-label">Preferred Contact Method</h2>
            //                    <div class="form-unit__row">

                            
            //                       <label class="email-radio" for="email-radio">Email  <input 
            //                           type="radio" 
            //                           id="email-radio" 
            //                           name="contact"
            //                           aria-label="email radio checkbox"
            //                           >
            //                       </label>

                            
            //                       <label class="phone-radio" for="tel-radio">Phone  <input 
            //                           type="radio" 
            //                           id="tel-radio" 
            //                           name="contact"
            //                           aria-label="phone radio checkbox"
            //                           >
            //                       </label>
                             
            //                   </div>
            //               </div>

            //               <!-- Subjects -->
            //               <div class="form-unit full">
            //                   <label class="full-width-label" for="subject">Subject*</label>
            //                       <select id="subject" name="subject">
            //                           <option value="" selected disabled>Select One Below</option>
            //                           <option value="subject1">Job Opportunity</option>
            //                           <option value="subject2">Freelance</option>
            //                           <option value="subject3">Personal</option>
            //                       </select>
            //               </div>

            //               <!-- Message -->
            //               <div class="form-unit full">
            //                   <label class="full-width-label" for="message">Message*</label>
            //                   <textarea 
            //                       placeholder="Write a message...."
            //                       id="message" 
            //                       name="message" 
            //                       rows="4" 
            //                       cols="45" 
            //                       required
            //                       aria-label="quick message input"
            //                       >
            //               </textarea>
            //               </div>

            //               <!-- Submit Button -->
            //               <div class="form-unit full">
            //                   <input  
            //                       type="submit" 
            //                       class="form-btn" 
            //                       value="Submit">
            //               </div>
            //           </fieldset>

            //       </form>

            //    </div>



            // <!-------------- contact ------------------>
            // <div class="register-container container container--text ">
                
            //          <div class="login__wrap register__wrap">
    
            //             <form action="#" id="register" class="register__form">
            //                 <div class="form-grid">
            //                   <fieldset>
      
            //                     <!-- title -->
            //                     <legend>
            //                         <h1 class="login__title">Contact Me</h1>
            //                     </legend>
                       
      
            //                     <!-- Name -->
            //                     <div class="form-unit  full">
            //                         <label class="full-width-label" for="fName">Full Name*</label>
            //                         <input 
            //                             type="text" 
            //                             id="fName" 
            //                             name="fName" 
            //                             autofocus
            //                             required
            //                             aria-label="full name input"
            //                             >
            //                     </div>
      
            //                     <!-- Email & Phone  -->
                          
            //                         <label class="full-width-label" for="email">Email*  <input  
            //                             type="email" 
            //                             id="email" 
            //                             name="email" 
            //                             required
            //                             aria-label="email input"
            //                             >
            //                         </label>
      
            //                         <label class="full-width-label" for="tel">Phone*  <input 
            //                             type="tel" 
            //                             id="tel" 
            //                             name="tel" 
            //                             required
            //                             aria-label="phone input"
            //                             >
            //                         </label>
                           
                           
                          
      
            //                     <!-- Preferred Contact Method -->
            //                     <div class="form-unit"> 
            //                         <h2 class="full-width-label">Preferred Contact Method</h2>
            //                          <div class="form-unit__row">
      
                                  
            //                             <label class="email-radio" for="email-radio">Email  <input 
            //                                 type="radio" 
            //                                 id="email-radio" 
            //                                 name="contact"
            //                                 aria-label="email radio checkbox"
            //                                 >
            //                             </label>
      
                                  
            //                             <label class="phone-radio" for="tel-radio">Phone  <input 
            //                                 type="radio" 
            //                                 id="tel-radio" 
            //                                 name="contact"
            //                                 aria-label="phone radio checkbox"
            //                                 >
            //                             </label>
                                   
            //                         </div>
            //                     </div>
      
            //                     <!-- Subjects -->
            //                     <div class="form-unit full">
            //                         <label class="full-width-label" for="subject">Subject*</label>
            //                             <select id="subject" name="subject">
            //                                 <option value="" selected disabled>Select One Below</option>
            //                                 <option value="subject1">Job Opportunity</option>
            //                                 <option value="subject2">Freelance</option>
            //                                 <option value="subject3">Personal</option>
            //                             </select>
            //                     </div>
      
            //                     <!-- Message -->
            //                     <div class="form-unit full">
            //                         <label class="full-width-label" for="message">Message*</label>
            //                         <textarea 
            //                             placeholder="Write a message...."
            //                             id="message" 
            //                             name="message" 
            //                             rows="4" 
            //                             cols="45" 
            //                             required
            //                             aria-label="quick message input"
            //                             >
            //                     </textarea>
            //                     </div>
      
            //                     <!-- Submit Button -->
            //                     <div class="form-unit full">
            //                         <input  
            //                             type="submit" 
            //                             class="form-btn" 
            //                             value="Submit">
            //                     </div>
            //                 </fieldset>
      
            //             </form>
            //          </div>
            //      </div>