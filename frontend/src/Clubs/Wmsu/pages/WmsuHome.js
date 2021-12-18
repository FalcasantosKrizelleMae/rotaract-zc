import React, { useState } from 'react';
import './../css/index.css';
import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';
import * as BiIcons from 'react-icons/bi';
import { Link } from 'react-router-dom';
import image1 from './../../../images/image1.svg';

import Carousel from './Carousel';

function Home() {
   const [click, setClick] = useState(false);
   const handleClick = () => setClick(!click);
   const closeMenu = () => setClick(false);

   const handleClick3 = () => {
      window.open('https://web.facebook.com/RotaractWMSU');
   };
   const handleClick1 = () => {
      window.open('mailto:racwmsu@gmail.com');
   };
   const handleClick2 = () => {
      window.open('https://instagram.com/rotaract_wmsu?utm_medium=copy_link');
   };

   const data = [
      {
         image: 'https://scontent.fcgy2-2.fna.fbcdn.net/v/t39.30808-6/s720x720/241219828_5059089317469492_6320118367430758327_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=730e14&_nc_eui2=AeG2lasUELT74VVMTpOcxlnH6BLeu_XQd2_oEt679dB3b2Js7YQB_2wkRKbD5noaD1-qhf4KxRK9IfpEA4et79N2&_nc_ohc=bEQqlFScE6IAX--qrJk&_nc_ht=scontent.fcgy2-2.fna&oh=00_AT-3T7N4LQ4YT8wZA__JPSMTtrGnUY8uRZ45G6tTmtYGyw&oe=61C3381A',
         caption: '',
      },
      {
         image: 'https://scontent.fcgy2-1.fna.fbcdn.net/v/t39.30808-6/240604100_4938879629490462_2127695116955784816_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=730e14&_nc_eui2=AeGgP3Fp3yidZXzFw_53KENfwCCtb1ytDQbAIK1vXK0NBiU2MgnfnVU-mZtU_3xBiiJVur2SI4z3xxs6kasnB0A5&_nc_ohc=N6rtiNK3YjMAX_ZuosF&_nc_ht=scontent.fcgy2-1.fna&oh=00_AT9hG5_GmmCBpsmkCLR4Wd5u_h4khtDqbD08bVejYPWNiw&oe=61C345A5',
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
   const chapter = 'Western Mindanao State University (WMSU)';

   return (
      <>
         <div className=" px-5 py-4 mt-5 mb-5 mx-5">
            <div className="row my-5">
               <div className="col-sm my-auto ">
                  <h4>WELCOME TO </h4>
                  <h1 className="text-pink">
                     {' '}
                     ROTARACT CLUB OF WESTERN MINDANAO STATE UNIVERSITY{' '}
                  </h1>
                  <p className="row col-sm-8 mt-5">
                     Est. Sept 30, 2012, Chartered Jan. 9, 2014. Our legacy of
                     Leadership and Service to Humanity continues.{' '}
                  </p>
                  <div className="mt-5">
                     <Link
                        to={{
                           pathname: `/donate-wmsu`,
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
                        Explore <BiIcons.BiRightArrowAlt />{' '}
                     </a>
                  </div>
               </div>
               <div className="col-sm mt-5">
                  <img src={image1} width="90%" height="90%" alt="serve qr" />
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
                        Rotaract Club of Western Mindanao State University
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
                     Rotaract Club of Western Mindanao State University
                  </p>
               </div>
            </footer>
         </div>
      </>
   );
}
export default Home;
