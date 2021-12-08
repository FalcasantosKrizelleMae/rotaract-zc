import React from 'react';
import Flickity from 'react-flickity-component';
import Card from './Event';
import tolosaa from "./../../../images/tolosaa.jpg";
import './../css/index.css'
import './../css/footer.css';
import * as FaIcons from 'react-icons/fa';

function Home() {
   const flickityOptions = {
      initialIndex: 1,
   };
   const handleClick = () => {
      window.open("https://web.facebook.com/Rotaract-Club-of-Tolosa-Community-8823354-100286158830040");
    };
   
   
   return (
      <>
       
         <div className=" px-0 py-2 mt-3">
         <div  
        className="bg_image"
        style={{
          backgroundImage: 'url('+tolosaa+')',
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
                  "It was on September 16, 2011 when the Rotaract Club of Southern City Colleges was formed. It was during that year when the SCCians get to know and appreciate the work and services of Rotary International. As one of the active school-based organizations."
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
                       
                     
                      </div>
                  </div>
                  <p className="copyright">Rotaract Club of Tolosa Community-8823354</p>
               </div>
            </footer>
            </div>
       
      </>
   );
}
export default Home;

