import React from 'react';
import Flickity from 'react-flickity-component';
import Card from './Event';
import metro from "./../../../images/metro.jpg";
import './../css/index.css';
import './../css/footer.css';
import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';

function Home() {
   const flickityOptions = {
      initialIndex: 1,
   };
   const handleClick = () => {
      window.open("https://web.facebook.com/rotametzam");
    };
    const handleClick1 = () => {
      window.open("mailto:rotaractmetrozamboanga@gmail.com");
    };

   return (
      <>
       
         <div className=" px-0 py-2 mt-3">
         <div  
        className="bg_image"
        style={{
          backgroundImage: 'url('+metro+')',
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
                  "The Rotaract Club of Metro Zamboanga is a community based nonprofit organization sponsored by the Rotary Club of Metro Zamboanga. We are a YORP –Based Organization composed of Young professionals, Entrepreneurs, and Student leaders"
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
                     
                      </div>
                  </div>
                  <p className="copyright">Rotaract Club of Metro Zamboanga</p>
               </div>
            </footer>
            </div>
       
      </>
   );
}
export default Home;

