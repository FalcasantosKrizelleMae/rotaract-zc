import React, { useState } from 'react';
import './../css/index.css';
import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';
import * as BiIcons from 'react-icons/bi';
import { Link } from 'react-router-dom';
import image9 from './../../../images/image9.svg';

import Carousel from './Carousel';

function Home() {
   const [click, setClick] = useState(false);
   const handleClick = () => setClick(!click);
   const closeMenu = () => setClick(false);

   const handleClick3 = () => {
      window.open('https://web.facebook.com/RACZCNORTH');
   };

   const handleClick1 = () => {
      window.open('mailto:raczcnorth3850@gmail.com');
   };
   const handleClick2 = () => {
      window.open('https://instagram.com/rac.zcnorth?utm_medium=copy_link');
   };

   const data = [
      {
         image: 'https://scontent.fcgy2-1.fna.fbcdn.net/v/t39.30808-6/264121539_991127385080172_5641602254026740894_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=730e14&_nc_eui2=AeGEqLjlWeErl1vOTCaR6sI9_XFjoCyZOFf9cWOgLJk4V2NJla6SXxoi4ppKrYZ7O59-ivNhztrtyH32ujnps-zk&_nc_ohc=3HNJ2QRQtNkAX_9u-RY&_nc_ht=scontent.fcgy2-1.fna&oh=00_AT9hj-_Mrq4ryOKvQTWuA06BQegK8QKqNYNImeI6dtgEDg&oe=61C2408F',
         caption: '',
      },
      {
         image: 'https://scontent.fcgy2-2.fna.fbcdn.net/v/t39.30808-6/252450313_973483766844534_2509778158919583419_n.png?_nc_cat=101&_nc_rgb565=1&ccb=1-5&_nc_sid=730e14&_nc_eui2=AeFjQ4XjjhS-7REcm-YLHE9W-yFPr8o8oqP7IU-vyjyioxKtw_1eCi36AGamA-PqZ_2rpw3rK8v3FVcWruNqOnYD&_nc_ohc=edAq4CrYR0oAX8dFliz&tn=G0pwGMiOwPMtPw5o&_nc_ht=scontent.fcgy2-2.fna&oh=00_AT84S-F9yQGIhu8Kv_eezGJ9t-v1aWXEPfE4Sqyer1KIRg&oe=61C2469B',
         caption: '',
      },
   ];

   const captionStyle = {
      fontSize: '2em',
      fontWeight: 'bold',
   };
   const slideNumberStyle = {
      fontSize: '20px',
      fontWeight: 'bold',
   };

   const chapter = 'Zamboanga City North';

   return (
      <>
         <div className=" px-5 py-4 mt-5 mb-5 mx-5">
            <div className="row my-5">
               <div className="col-sm my-auto ">
                  <h4>WELCOME TO </h4>
                  <h1 className="text-pink">
                     {' '}
                     ROTARACT CLUB OF ZAMBOANGA CITY NORTH{' '}
                  </h1>
                  <p className="row col-sm-8 mt-5">
                     A Youth Community Service Club based on Zamboanga City.{' '}
                  </p>
                  <div className="mt-5">
                     <Link
                        to={{
                           pathname: `/donate-north`,
                           state: {
                              chapter: chapter,
                           },
                        }}
                        className="btn btn-primary me-3"
                     >
                        {' '}
                        Donate
                     </Link>
                     &nbsp; &nbsp;
                     <a
                        href="#about"
                        onClick={closeMenu}
                        className="btn bg-light px-3 text-pink"
                     >
                        Explore {''}
                        <BiIcons.BiRightArrowAlt />{' '}
                     </a>
                  </div>
               </div>
               <div className="col-sm mt-5">
                  <img src={image9} width="90%" height="90%" alt="serve qr" />
               </div>
            </div>
         </div>

         <div className="container">
            <div className="about" id="about">
               <div class="row">
                  <div className="col  mx-2 mb-3 ">
                     <div style={{ textAlign: 'center' }}>
                        <Carousel
                           data={data}
                           time={2000}
                           width="100%"
                           height="700px"
                           captionStyle={captionStyle}
                           slideNumber={true}
                           slideNumberStyle={slideNumberStyle}
                           captionPosition="bottom"
                           automatic={true}
                           dots={true}
                           pauseIconColor="white"
                           pauseIconSize="40px"
                           slideBackgroundColor="darkgrey"
                           slideImageFit="cover"
                           thumbnails={true}
                           thumbnailWidth="70px"
                           showNavBtn={true}
                           style={{
                              textAlign: 'center',
                              maxWidth: '100%',
                           }}
                        />
                     </div>
                  </div>
                  <div className="col  p-4 mx-2 mb-3">
                     <br />
                     <br />
                     <br />
                     <br />
                     <br />
                     <br />
                     <br />
                     <br />
                     <h4>About</h4>
                     <h2 className="text-pink">
                        {' '}
                        Rotaract Club of Zamboanga City North
                     </h2>
                     <p className="row col-sm-10 mt-5">
                        Together, we see a world where people unite and take
                        action to create lasting change – across the globe, in
                        our communities, and in ourselves.{' '}
                     </p>
                  </div>
               </div>
            </div>
         </div>

         <div class="footer-dark ">
            <footer>
               <div class="container">
                  <div class="row">
                     <div class="  mt-3 text-center">
                        <FaIcons.FaFacebook
                           className="me-4"
                           onClick={handleClick3}
                           size="5vh"
                        />
                        <SiIcons.SiGmail
                           className="me-4"
                           onClick={handleClick1}
                           size="5vh"
                        />
                        <FaIcons.FaInstagram
                           className="me-4"
                           onClick={handleClick2}
                           size="5vh"
                        />
                     </div>
                  </div>
                  <p className="copyright">
                     Rotaract Club of Zamboanga City North
                  </p>
               </div>
            </footer>
         </div>
      </>
   );
}
export default Home;
