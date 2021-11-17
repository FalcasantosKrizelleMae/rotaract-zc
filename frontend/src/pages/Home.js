import React from 'react';
import { Link } from 'react-router-dom';
import serve from '../images/logo.png';
import Header from '../Header';
import * as FaIcons from 'react-icons/fa';
import Flickity from 'react-flickity-component';
import Card from './Card';
import '../css/footer.css';

function Home() {
   const flickityOptions = {
      initialIndex: 1,
   };

   return (
      <>
         <Header />
         <div className=" px-5 py-5 mt-5">
            <div className="row my-5">
               <div className="col-sm my-auto">
                  <div className="row banner">
                     <h3>WELCOME TO ROTARACT </h3>
                  </div>

                  <div className="m-0 mt-3">
                     <Link to="/about" className="btn btn-primary shadow">
                        {' '}
                        Learn More{' '}
                     </Link>
                     &nbsp; &nbsp;
                     <Link to="/about" className="btn btn-primary shadow">
                        {' '}
                        Pay Now{' '}
                     </Link>
                  </div>
               </div>

               <div className="col-sm">
                  <img src={serve} width="100%" height="100%" alt="serve qr" />
               </div>
            </div>
         </div>

         <div className="container-fluid bg-pink p-5 text-white">
            <div className="col-sm-6">
               <h3 className="text-white"> ABOUT US </h3>
               <p>
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum."
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
                  title="Card Title"
                  imageUrl=""
                  body="Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        nisi ut aliquip ex ea commodo consequat."
               />
               <Card
                  title="Card Title"
                  imageUrl=""
                  body="Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        nisi ut aliquip ex ea commodo consequat."
               />

               <Card
                  title="Card Title"
                  body="Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        nisi ut aliquip ex ea commodo consequat."
               />
               <Card
                  title="Card Title"
                  body="Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        nisi ut aliquip ex ea commodo consequat."
               />
            </Flickity>
         </div>
         <div class="footer-dark ">
            <footer>
               <div class="container">
                  <div class="row">
                     <div class="col-sm-6 col-md-3 item">
                        <h3>Services</h3>
                        <ul>
                           <li>Web design</li>
                           <li>Development</li>
                           <li>Hosting</li>
                        </ul>
                     </div>
                     <div class="col-sm-6 col-md-3 item">
                        <h3>About</h3>
                        <ul>
                           <li>Company</li>
                           <li>Contact Us;</li>
                           <li>Careers</li>
                        </ul>
                     </div>
                     <div class="col-md-6 item text">
                        <h3>Rotaract Clubs</h3>
                        <p>
                           Praesent sed lobortis mi. Suspendisse vel placerat
                           ligula. Vivamus ac sem lacus. Ut vehicula rhoncus
                           elementum. Etiam quis tristique lectus. Aliquam in
                           arcu eget velit pulvinar dictum vel in justo.
                        </p>
                     </div>
                     <div class="  mt-5 text-center">
                        <FaIcons.FaFacebook className="me-4" size="7vh" />
                        <FaIcons.FaTwitter className="me-4" size="7vh" />
                        <FaIcons.FaInstagram className="me-4" size="7vh" />
                     </div>
                  </div>
                  <p className="copyright">Rotary Clubs of Zamboanga City </p>
               </div>
            </footer>
         </div>
      </>
   );
}

export default Home;
