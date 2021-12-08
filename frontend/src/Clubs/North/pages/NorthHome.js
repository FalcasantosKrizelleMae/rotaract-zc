import React from 'react';
import Flickity from 'react-flickity-component';
import Card from './Event';
import north from "./../../../images/north.png";
import './../css/index.css';
import './../css/footer.css';
import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';

function Home() {
   const flickityOptions = {
      initialIndex: 1,
   };
   const handleClick = () => {
      window.open("https://web.facebook.com/RACZCNORTH");
    };
   
    const handleClick1 = () => {
      window.open("mailto:raczcnorth3850@gmail.com");
   };
   const handleClick2 = () => {
      window.open("https://instagram.com/rac.zcnorth?utm_medium=copy_link");
   }; 
   return (
      <>
       
         <div className=" px-0 py-2 mt-3">
         <div  
        className="bg_image"
        style={{
          backgroundImage: 'url('+north+')',
          backgroundSize: "cover",
          height: "93vh",
          width: '99vw',
          
        }}
      > 
      </div>
         </div>
  
          
         <div className=" container-fluid bg-pink p-5 text-white">
            <div className="col-sm-6">
               <h3 className="text-white"> ABOUT US </h3>
               <p>
                  "A Youth Community Service Club based on Zamboanga City."
               </p>
            </div>
            </div>
            <div className="mt-5 py-5">
            <Flickity
               className={'carousel'} // default ''
               elementType={'div'} // default 'div'
               options={flickityOptions} // takes flickity options {}
               disableImagesLoaded={false} // default false
               reloadOnUpdate // default false
               static // default false
            >
               <Card
                  title="Event Name"
                  imageUrl=""
                  body="Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        nisi ut aliquip ex ea commodo consequat."
               />
               <Card
                  title="Event Name"
                  imageUrl=""
                  body="Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        nisi ut aliquip ex ea commodo consequat."
               />

               <Card
                  title="Event Name"
                  imageUrl=""
                  body="Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        nisi ut aliquip ex ea commodo consequat."
               />
               <Card
                  title="Event Name"
                  imageUrl=""
                  body="Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        nisi ut aliquip ex ea commodo consequat."
               />
            </Flickity>
            </div>
            <div class="footer-dark ">
            <footer>
               <div class="container">
                  <div class="row">
                      <div class="  mt-3 text-center">
                      <FaIcons.FaFacebook className="me-4" onClick={handleClick} size="5vh" />
                        <SiIcons.SiGmail className="me-4" onClick={handleClick1} size="5vh" /> 
                        <FaIcons.FaInstagram className="me-4" onClick={handleClick2} size="5vh" /> 
                     
                      </div>
                  </div>
                  <p className="copyright">Rotaract Zamboanga City Metro</p>
               </div>
            </footer>
            </div>
       
      </>
   );
}
export default Home;

