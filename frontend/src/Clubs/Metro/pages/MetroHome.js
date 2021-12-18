import React, { useState } from 'react';
import './../css/index.css';
import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';
import * as BiIcons from 'react-icons/bi';
import { Link } from 'react-router-dom';
import image8 from './../../../images/image8.svg';

import Carousel from './Carousel';

function Home() {
   const [click, setClick] = useState(false);
   const handleClick = () => setClick(!click);
   const closeMenu = () => setClick(false);

   const handleClick2 = () => {
      window.open('https://web.facebook.com/rotametzam');
   };
   const handleClick1 = () => {
      window.open('mailto:rotaractmetrozamboanga@gmail.com');
   };

   const data = [
      {
         image: 'https://scontent.fcgy2-2.fna.fbcdn.net/v/t39.30808-6/263477138_644677916912724_5391718727021497366_n.jpg?_nc_cat=103&_nc_rgb565=1&ccb=1-5&_nc_sid=8bfeb9&_nc_eui2=AeGCKIGPv7RRCWG2T1TH_3eA4uJY8DvfgD7i4ljwO9-APizZXyYx57BF8RoC1lDYoVrHvdtRXlkZFW8DYz5zgFUg&_nc_ohc=rxz2Cx86OAEAX9Z7MCO&_nc_ht=scontent.fcgy2-2.fna&oh=00_AT9j_lNJ1HyUl0ym66nKN_5nhx9YUfeadYCpcehsANCLkg&oe=61C24067',
         caption: '',
      },
      {
         image: 'https://scontent.fcgy2-2.fna.fbcdn.net/v/t39.30808-6/268074324_133277799115881_8938400988958528684_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=730e14&_nc_eui2=AeEknhwiyI9RN0ESi-DRpMA4ankjXQbViP1qeSNdBtWI_QE3ZZ2XN1UsFLGSCB3tBV-HeQyBxpAOCDyVdqMwWyZA&_nc_ohc=9dx5g6PnzZcAX-1Fpmr&_nc_ht=scontent.fcgy2-2.fna&oh=00_AT-W6xPQibKwsjXfLAKe5ZFw3XoxTBVzKOnu8hNA_Lhgyg&oe=61C2E184',
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
   const chapter = 'Metro Zamboanga';

   return (
      <>
         <div className=" px-5 py-4 mt-5 mb-5 mx-5">
            <div className="row my-5">
               <div className="col-sm my-auto ">
                  <h4>WELCOME TO </h4>
                  <h1 className="text-pink">
                     {' '}
                     ROTARACT CLUB OF METRO ZAMBOANGA
                  </h1>
                  <p className="row col-sm-8 mt-5">
                     Together, we see a world where people unite and take action
                     to create lasting change – across the globe, in our
                     communities, and in ourselves.{' '}
                  </p>
                  <div className="mt-5">
                     <Link
                        to={{
                           pathname: `/donate-metro`,
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
                  <img src={image8} width="90%" height="90%" alt="serve qr" />
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
                        Rotaract Club of Metro Zamboanga
                     </h2>
                     <p className="row col-sm-10 mt-5">
                        The Rotaract Club of Metro Zamboanga is a community
                        based nonprofit organization sponsored by the Rotary
                        Club of Metro Zamboanga. We are a YORP –Based
                        Organization composed of Young professionals,
                        Entrepreneurs, and Student leaders{' '}
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
                           onClick={handleClick2}
                           size="5vh"
                        />
                        <SiIcons.SiGmail
                           className="me-4"
                           onClick={handleClick1}
                           size="5vh"
                        />
                     </div>
                  </div>
                  <p className="copyright">
                     Rotaract Club of Zamboanga City Metro
                  </p>
               </div>
            </footer>
         </div>
      </>
   );
}
export default Home;
