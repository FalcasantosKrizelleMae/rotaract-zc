import React from 'react';
import Flickity from 'react-flickity-component';
import Card from './Event';
import wmsuu from "./../../../images/wmsuu.jpg";
import './../css/index.css';
import './../css/footer.css';
import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';

function Home() {
   const flickityOptions = {
      initialIndex: 1,
   };
   const handleClick = () => {
      window.open("https://web.facebook.com/RotaractWMSU");
    };
    const handleClick1 = () => {
      window.open("mailto:racwmsu@gmail.com");   
    };
    const handleClick2 = () => {
     
      window.open("https://instagram.com/rotaract_wmsu?utm_medium=copy_link");
    };
   
   return (
      <>
       
         <div className=" px-0 py-2 mt-3">
         <div  
        className="bg_image"
        style={{
          backgroundImage: 'url('+wmsuu+')',
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
                  "Rotaract is a Rotary-sponsored service club for young men and women ages 18 to 30. Rotaract clubs are either community or university based, and they’re sponsored by a local Rotary club. This makes them true "partners in service" and key members of the family of Rotary.
                  As one of Rotary’s most significant and fastest-growing service programs, with more than 8,400 clubs in about 170 countries and geographical areas, Rotaract has become a worldwide phenomenon.
                  <br />
                  <br />
                  Est. Sept 30, 2012, Chartered Jan. 9, 2014. Our legacy of Leadership and Service to Humanity continues.
                  "
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
                  <p className="copyright">Rotaract Club of Western Mindanao State University</p>
               </div>
            </footer>
            </div>
       
      </>
   );
}
export default Home;

