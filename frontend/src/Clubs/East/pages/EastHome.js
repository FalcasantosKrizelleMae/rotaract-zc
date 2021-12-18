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
      window.open('https://web.facebook.com/RACEastZambo');
   };
   const handleClick1 = () => {
      window.open('mailto:rotaractzamboeast@gmail.com');
   };

   const data = [
      {
         image: 'https://scontent.fcgy2-1.fna.fbcdn.net/v/t39.30808-6/241369838_400694365123020_1126905923448218816_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=8bfeb9&_nc_eui2=AeGh_fjxfu9AKuq5WBwqnEMTxbWti2Aus0HFta2LYC6zQVXJF6pwDKGkWmXhsvnUkpg48f0sMujsU5hZ_EnfgcMf&_nc_ohc=HREjIn-6RfwAX-_fpv9&tn=G0pwGMiOwPMtPw5o&_nc_ht=scontent.fcgy2-1.fna&oh=00_AT_NZ8yHJAdr4Rsgcy4muYsOgdkHCzq8ycExRsdG-919Aw&oe=61C37C5E',
         caption: '',
      },
      {
         image: 'https://scontent.fcgy2-2.fna.fbcdn.net/v/t39.30808-6/263294389_431609392031517_8592547320758427375_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=730e14&_nc_eui2=AeEb-NljkvQxt9G99VGd6kPniUqTv1oE8euJSpO_WgTx6-wTC8HxeKgQOFtL1cmgzcxbrLGSpfCSbppr-s1BQXxD&_nc_ohc=TEi-5ePqE9QAX_dT9yI&_nc_ht=scontent.fcgy2-2.fna&oh=00_AT9EPVyaqwa1BAg29xZt3orj5LzXi-A75lHI4P-ukm9fZQ&oe=61C36918',
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

   const chapter = 'Zamboanga City East';
   return (
      <>
         <div className=" px-5 py-4 mt-5 mb-5 mx-5">
            <div className="row my-5">
               <div className="col-sm my-auto ">
                  <h4>WELCOME TO </h4>
                  <h1 className="text-pink">
                     {' '}
                     ROTARACT CLUB OF ZAMBOANGA CITY EAST{' '}
                  </h1>
                  <p className="row col-sm-8 mt-5">
                     The Rotaract Club of Zamboanga City West of RI District
                     3850 is composed of Rotaractors from Zamboanga City,
                     Western Mindanao ages 18-30 years old.{' '}
                  </p>
                  <div className="mt-5">
                     <Link
                        to={{
                           pathname: `/donate-east`,
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
                        Explore {''} <BiIcons.BiRightArrowAlt />{' '}
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
                     Rotaract Club of Zamboanga City East
                  </p>
               </div>
            </footer>
         </div>
      </>
   );
}
export default Home;
