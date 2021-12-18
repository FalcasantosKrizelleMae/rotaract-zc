import React, { useState } from 'react';
import './../css/index.css';
import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';
import * as BiIcons from 'react-icons/bi';
import { Link } from 'react-router-dom';
import image12 from './../../../images/image12.svg';

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
         image: 'https://scontent.fcgy2-2.fna.fbcdn.net/v/t39.30808-6/241351955_4221486291298541_6418563645030569372_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=8bfeb9&_nc_eui2=AeGnkeZkIVHqKTOtpI1tKeJyo_QR-gqjSh6j9BH6CqNKHi2oESK_CAC72wq5tBGnZfVN6OQPE62lor9UN61gBK8y&_nc_ohc=GDRxK6KlNUAAX-nWLvN&_nc_ht=scontent.fcgy2-2.fna&oh=00_AT95oA9QDCAqblj0muJBvIXYrbBerDmF_2WaRJlLFeLZDg&oe=61C30607',
         caption: '',
      },
      {
         image: 'https://scontent.fcgy2-1.fna.fbcdn.net/v/t39.30808-6/240584713_4212062362240934_6240494217238472232_n.jpg?_nc_cat=100&_nc_rgb565=1&ccb=1-5&_nc_sid=8bfeb9&_nc_eui2=AeELgn1FWvzmH3WYa8HF5-92_1mTi43gBkz_WZOLjeAGTErBFq26p2Q_zcdjQ5nRTmLKlaoxDV4xr5Yafps0bRU2&_nc_ohc=OMtZzcPV76sAX84Sze5&tn=G0pwGMiOwPMtPw5o&_nc_ht=scontent.fcgy2-1.fna&oh=00_AT853x8bHN2RZKPYLKU8vsSYpJ-Tsr5XU1T8oTkSPv-g1Q&oe=61C28CFD',
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

   const chapter = 'Universidad De Zamboanga - CES';

   return (
      <>
         <div className=" px-5 py-4 mt-5 mb-5 mx-5">
            <div className="row my-5">
               <div className="col-sm my-auto ">
                  <h4>WELCOME TO </h4>
                  <h1 className="text-pink">
                     {' '}
                     ROTARACT CLUB OF UNIVERSIDAD DE ZAMBOANGA - CES{' '}
                  </h1>
                  <p className="row col-sm-8 mt-5">
                     An Organization aims to help the community through
                     perseverance and selfless service.{' '}
                  </p>
                  <div className="mt-5">
                     <Link
                        to={{
                           pathname: `/donate-uz`,
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
                  <img src={image12} width="90%" height="90%" alt="serve qr" />
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
                        Rotaract Club of Universidad de Zamboanga-CES
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
                     Rotaract Club of Universidad de Zamboanga-CES
                  </p>
               </div>
            </footer>
         </div>
      </>
   );
}
export default Home;
