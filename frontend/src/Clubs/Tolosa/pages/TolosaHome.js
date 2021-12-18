import React, { useState } from 'react';
import './../css/index.css';
import * as FaIcons from 'react-icons/fa';
import * as BiIcons from 'react-icons/bi';
import { Link } from 'react-router-dom';
import image10 from './../../../images/image10.svg';

import Carousel from './Carousel';

function Home() {
   const [click, setClick] = useState(false);
   const handleClick = () => setClick(!click);
   const closeMenu = () => setClick(false);

   const handleClick2 = () => {
      window.open('https://web.facebook.com/rotametzam');
   };

   const data = [
      {
         image: 'https://scontent.fcgy2-2.fna.fbcdn.net/v/t1.6435-9/162430079_100293705495952_260392031787541081_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeGB6Qpi66xxr8keQFkBZHhpdzgj5IqZVKR3OCPkiplUpJERxTm_hEPyFmpRYjZE3h9JTpp-mKAtkrsY6mnMayQQ&_nc_ohc=X4IGAjGUrDMAX9oxFFN&tn=G0pwGMiOwPMtPw5o&_nc_ht=scontent.fcgy2-2.fna&oh=00_AT9QC4tn0vBrxkAzRt7vgWuzocjSNOaXNFHxTPvJwJntBg&oe=61E1F501',
         caption: '',
      },
      {
         image: 'https://scontent.fcgy2-1.fna.fbcdn.net/v/t39.30808-6/250927791_858785688165124_701156197907203806_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=8bfeb9&_nc_eui2=AeGLKovJ8A6QSve6Z3d9dij0AYMtr_U38p0Bgy2v9TfynS-3BLYle-lp6Ptb6DR-MYtnVdt6oQG3v8LnL2TW_bKp&_nc_ohc=ttUb617yd_4AX9hqie_&_nc_ht=scontent.fcgy2-1.fna&oh=00_AT_HzTXSTjQfzEA7I5-SXV7luRa2tdBRV8GE8XyRYLBdNQ&oe=61C3A38C',
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

   const chapter = 'Tolosa Community';

   return (
      <>
         <div className=" px-5 py-4 mt-5 mb-5 mx-5">
            <div className="row my-5">
               <div className="col-sm my-auto ">
                  <h4>WELCOME TO </h4>
                  <h1 className="text-pink">
                     {' '}
                     ROTARACT CLUB OF ZAMBOANGA CITY TOLOSA COMMUNITY{' '}
                  </h1>
                  <p className="row col-sm-8 mt-5">
                     Together, we see a world where people unite and take action
                     to create lasting change – across the globe, in our
                     communities, and in ourselves.{' '}
                  </p>
                  <div className="mt-5">
                     <Link
                        to={{
                           pathname: `/donate-tolosa`,
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
                  <img src={image10} width="90%" height="90%" alt="serve qr" />
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
                        Rotaract Club of Zamboanga City Tolosa Community
                     </h2>
                     <p className="row col-sm-10 mt-5">
                        An Organization aims to help the community through
                        perseverance and selfless service.{' '}
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
                     </div>
                  </div>
                  <p className="copyright">
                     Rotaract Club of Zamboanga City Tolosa Community
                  </p>
               </div>
            </footer>
         </div>
      </>
   );
}
export default Home;
