import React, { useState } from 'react';
import './../css/index.css';
import * as FaIcons from 'react-icons/fa';
import * as BiIcons from 'react-icons/bi';

import image6 from './../../../images/image6.svg';
import { Link } from 'react-router-dom';

import Carousel from './Carousel';

function Home() {
   const [click, setClick] = useState(false);
   const handleClick = () => setClick(!click);
   const closeMenu = () => setClick(false);

   const handleClick1 = () => {
      window.open('https://web.facebook.com/RACSCC');
   };

   const data = [
      {
         image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Palace_of_Fine_Arts_%2816794p%29.jpg/1200px-Palace_of_Fine_Arts_%2816794p%29.jpg',
      },
      {
         image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Palace_of_Fine_Arts_%2816794p%29.jpg/1200px-Palace_of_Fine_Arts_%2816794p%29.jpg',
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

   const chapter = 'Southern City Colleges';

   return (
      <>
         <div className=" px-5 py-4 mt-5 mb-5 mx-5">
            <div className="row my-5">
               <div className="col-sm my-auto ">
                  <h4>WELCOME TO </h4>
                  <h1 className="text-pink"> {chapter} </h1>
                  <p className="row col-sm-8 mt-5">
                     It was on September 16, 2011 when the Rotaract Club of
                     Southern City Colleges was formed. It was during that year
                     when the SCCians get to know and appreciate the work and
                     services of Rotary International. As one of the active
                     school-based organizations.{' '}
                  </p>
                  <div className="mt-5">
                     &nbsp; &nbsp;
                     <Link
                        to={{
                           pathname: `/donate/${chapter}`,
                           state: {
                              chapter: chapter,
                           },
                        }}
                        className="btn btn-primary me-3"
                     >
                        {' '}
                        Donate
                     </Link>
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
                  <img src={image6} width="90%" height="90%" alt="serve qr" />
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
                        Rotaract Club of Southern City Colleges
                     </h2>
                     <p className="row col-sm-10 mt-5">
                        It was on September 16, 2011 when the Rotaract Club of
                        Southern City Colleges was formed. It was during that
                        year when the SCCians get to know and appreciate the
                        work and services of Rotary International. As one of the
                        active school-based organizations, Rotaract Club of
                        Southern City Colleges, sponsored by the Rotary Club of
                        Zamboanga City West, inspired to render services to its
                        community through reaching out to those less fortunate,
                        connect with the people who need our help and transform
                        lives in order to see the change we want to achieve. We
                        are living with the mantra of "Service above Self" and
                        that make us people of action. We continue to lend a
                        hand and to reach people in the community in our one
                        little ways. Because we believe that a small act of
                        kindness can make a big impact to other people's lives{' '}
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
                           onClick={handleClick1}
                           size="5vh"
                        />
                     </div>
                  </div>
                  <p className="copyright">
                     Rotaract Club of Zamboanga City Sothern City College
                  </p>
               </div>
            </footer>
         </div>
      </>
   );
}
export default Home;
