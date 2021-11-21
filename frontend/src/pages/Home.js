import React from 'react';
import { Link } from 'react-router-dom';
import serve from '../images/this.png';
import Header from '../Header';
import * as FaIcons from 'react-icons/fa';
import Flickity from 'react-flickity-component';
import Card from './Card';
import '../css/footer.css';

function Home() {
   const flickityOptions = {
      initialIndex: 2,
   };

   return (
      <>
         <Header />
         <div className=" px-5 py-5 mt-5">
            <div className="row my-5 banner">
               <div className="col-sm-5 my-auto">
                  <div className="row ">
                     <h3 className="mb-4 text-pink">
                        WELCOME TO ROTARY ZAMBOANGA{' '}
                     </h3>
                     <p className="mb-4 fs-6">
                        "Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat. "
                     </p>
                  </div>

                  <div className="m-0 mt-3">
                     <Link
                        to="/about"
                        className="btn btn-outline-primary shadow-sm"
                     >
                        {' '}
                        Learn More{' '}
                     </Link>
                     &nbsp; &nbsp;
                     <Link to="/about" className="btn btn-dark shadow-sm">
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

         <div className="container-fluid bg-light p-5 d-flex align-items-center">
            <div className="col-sm-6 banner ">
               <h3 className="mb-5"> ABOUT US </h3>
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

            <div className="col-sm-6 fs-1 mx-5">PHOTO HERE</div>
         </div>

         <div className="mx-5 py-5 h-100 ">
            <h3 className="mb-5 text-center text-pink">
               {' '}
               CLUBS IN ZAMBOANGA CHAPTER{' '}
            </h3>
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
               <Card
                  title="Card Title"
                  body="Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        nisi ut aliquip ex ea commodo consequat."
               />
            </Flickity>
         </div>
         <div class="footer-dark ">
            <footer>
               <div class="container text-white">
                  <div class="row">
                     <div class="col-sm-6 col-md-3 ">
                        <h3 className="text-white fs-5 mb-4">Services</h3>
                        <ul>
                           <li>LIST 1</li>
                           <li>LIST 2</li>
                           <li>LIST 3</li>
                        </ul>
                     </div>
                     <div class="col-sm-6 col-md-3 ">
                        <h3 className="text-white fs-5 mb-4">About</h3>
                        <ul>
                           <li>LIST 1</li>
                           <li>LIST 2</li>
                           <li>LIST 3</li>
                        </ul>
                     </div>
                     <div class="col-md-6  ">
                        <h3 className="text-white fs-5 mb-4">Rotaract Clubs</h3>
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
