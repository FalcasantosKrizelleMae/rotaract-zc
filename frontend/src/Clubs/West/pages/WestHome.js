import React, { useState } from 'react';
import './../css/index.css';
import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';
import * as BiIcons from 'react-icons/bi';
import { Link } from 'react-router-dom';
import image13 from './../../../images/image13.svg';

import Carousel from './Carousel';

function Home() {
   const [click, setClick] = useState(false);
   const handleClick = () => setClick(!click);
   const closeMenu = () => setClick(false);

   const handleClick3 = () => {
      window.open('https://instagram.com/raczambowest?utm_medium=copy_link');
   };
   const handleClick1 = () => {
      window.open('https://web.facebook.com/RotaractClubZamboWest');
   };
   const handleClick2 = () => {
      window.open('mailto:raczambowest1@gmail.com');
   };

   const data = [
      {
         image: 'https://scontent.fcgy2-2.fna.fbcdn.net/v/t39.30808-6/260287189_4442909372501186_786300875508618491_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=730e14&_nc_eui2=AeHagvxKKzha-JRhTjnPcnL1pHmGw4wdw-ykeYbDjB3D7CsiKyLig7vUNI8vq22LIqiRY2wnkaSJUhP0blAdZcoD&_nc_ohc=SKE17eAeUQUAX9MXa3M&_nc_ht=scontent.fcgy2-2.fna&oh=00_AT96pGrOTD_ysOtTtRdQqxMV-ySkStSaLnhb75HPe6x1gg&oe=61C2F039',
         caption: '',
      },
      {
         image: 'https://scontent.fcgy2-1.fna.fbcdn.net/v/t39.30808-6/248417561_4375108832614574_2841135477559560567_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=8bfeb9&_nc_eui2=AeE_PoO_TQlexyRfL4TmkqCvHpYkdsGSoiMeliR2wZKiI52f675cLKA6DcMwPbNgVK9rQ-XoXKpFqLiI-ST06tv1&_nc_ohc=qb5gXSB1QnoAX9IV9a8&_nc_ht=scontent.fcgy2-1.fna&oh=00_AT-L65aCauWOpJ84tVQwFOfLMYCconUaIvZapn1wL7qxyg&oe=61C2B7E1',
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

   const chapter = 'Zamboanga City West';

   return (
      <>
         <div className=" px-5 py-4 mt-5 mb-5 mx-5">
            <div className="row my-5">
               <div className="col-sm my-auto ">
                  <h4>WELCOME TO </h4>
                  <h1 className="text-pink">
                     {' '}
                     ROTARACT CLUB OF ZAMBOANGA CITY WEST{' '}
                  </h1>
                  <p className="row col-sm-8 mt-5">
                     The Rotaract Club of Zamboanga City West of RI District
                     3850 is composed of Rotaractors from Zamboanga City,
                     Western Mindanao ages 18-30 years old.{' '}
                  </p>
                  <div className="mt-5">
                     <Link
                        to={{
                           pathname: `/donate-west`,
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
                        Explore <BiIcons.BiRightArrowAlt />
                     </a>{' '}
                  </div>
               </div>
               <div className="col-sm mt-5">
                  <img src={image13} width="90%" height="90%" alt="serve qr" />
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
                        Rotaract Club of Zamboanga City East
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
                           onClick={handleClick2}
                           size="5vh"
                        />
                        <FaIcons.FaInstagram
                           className="me-4"
                           onClick={handleClick1}
                           size="5vh"
                        />
                     </div>
                  </div>
                  <p className="copyright">
                     Rotaract Club of Zamboanga City West
                  </p>
               </div>
            </footer>
         </div>
      </>
   );
}
export default Home;
