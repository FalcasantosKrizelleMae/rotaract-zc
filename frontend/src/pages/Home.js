import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';
import image1 from '../images/image1.svg';
import image2 from '../images/image2.svg';
import image3 from '../images/image3.svg';
import svg from '../images/svg.png';
import west from '../images/west.jpg';
import east from '../images/east.jpg';
import metro from '../images/metro.jpg';
import uz from '../images/uz.png';
import wmsuu from '../images/wmsuu.jpg';
import tolosaa from '../images/tolosaa.jpg';
import south from '../images/south.jpg';
import north from '../images/north.png';
import Header from '../Header';
import * as FaIcons from 'react-icons/fa';
import * as BiIcons from 'react-icons/bi';
import * as FiIcons from 'react-icons/fi';
import Flickity from 'react-flickity-component';
import '../css/footer.css';
import Carousel from './Carousel';
import '../css/card.css';

function Home() {
   const [click, setClick] = useState(false);
   const handleClick = () => setClick(!click);
   const closeMenu = () => setClick(false);

   const flickityOptions = {
      initialIndex: 2,
   };
   const handleClick1 = () => {
      window.open('https://web.facebook.com/rotametzam');
   };

   const data = [
      {
         image: 'https://scontent.fcgy2-2.fna.fbcdn.net/v/t39.30808-6/244417609_159160476407141_5776292729667220496_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=730e14&_nc_eui2=AeFKqGYWikhV99W6qZ93z0zszebQ4EpLCsfN5tDgSksKx3C_-pjHSCraU_IvfOGQsLb_MV1hTn6Cg0FQRhPrfvxk&_nc_ohc=e0oK4hht2MYAX-k4UYZ&_nc_ht=scontent.fcgy2-2.fna&oh=00_AT_qnlWHlW7P2vROhC6BFbATA-5BpIXrWfZWEOD0ROqfwA&oe=61C2C587',
         caption: '',
      },
      {
         image: 'https://scontent.fcgy2-2.fna.fbcdn.net/v/t39.30808-6/260287189_4442909372501186_786300875508618491_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=730e14&_nc_eui2=AeHagvxKKzha-JRhTjnPcnL1pHmGw4wdw-ykeYbDjB3D7CsiKyLig7vUNI8vq22LIqiRY2wnkaSJUhP0blAdZcoD&_nc_ohc=SKE17eAeUQUAX9MXa3M&_nc_ht=scontent.fcgy2-2.fna&oh=00_AT96pGrOTD_ysOtTtRdQqxMV-ySkStSaLnhb75HPe6x1gg&oe=61C2F039',
         caption: '',
      },
      {
         image: 'https://scontent.fcgy2-1.fna.fbcdn.net/v/t39.30808-6/248417561_4375108832614574_2841135477559560567_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=8bfeb9&_nc_eui2=AeE_PoO_TQlexyRfL4TmkqCvHpYkdsGSoiMeliR2wZKiI52f675cLKA6DcMwPbNgVK9rQ-XoXKpFqLiI-ST06tv1&_nc_ohc=qb5gXSB1QnoAX9IV9a8&_nc_ht=scontent.fcgy2-1.fna&oh=00_AT-L65aCauWOpJ84tVQwFOfLMYCconUaIvZapn1wL7qxyg&oe=61C2B7E1',
         caption: '',
      },
      {
         image: 'https://scontent.fcgy2-2.fna.fbcdn.net/v/t39.30808-6/252310780_4353027488156042_692752812978759530_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=730e14&_nc_eui2=AeGxQrxAkgV2KIT-YPvhcXiY7dg_VISoh-7t2D9UhKiH7nV7qDtsREHeIcPnvmEbxMR2Aqj2jKo7lTFf9xmOr8Xp&_nc_ohc=hYmI9C6hQ8UAX9pU8_N&_nc_ht=scontent.fcgy2-2.fna&oh=00_AT-t2uBBY5jKQyd_qUkkSxAvp6MMu2HPiQe9qJ5E5xa6yw&oe=61C3A202',
         caption: '',
      },
      {
         image: 'https://scontent.fcgy2-1.fna.fbcdn.net/v/t39.30808-6/248059562_963949114464666_5628637395049046275_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=730e14&_nc_eui2=AeE8ljk3Wi-PrlMEFfnKFPMTWrvWlXFweEBau9aVcXB4QB91N5ol2lhhCoJ42bpngNQQ0JabWgsLRw7_DK_Nk0hN&_nc_ohc=Z1BWk8vr6tIAX8kmnSa&_nc_ht=scontent.fcgy2-1.fna&oh=00_AT8lYbvdulGhr-nJHYILE7oofT7e54axzMzIMdZXONBSjQ&oe=61C22C5F',
         caption: '',
      },
      {
         image: 'https://scontent.fcgy2-2.fna.fbcdn.net/v/t39.30808-6/263477138_644677916912724_5391718727021497366_n.jpg?_nc_cat=103&_nc_rgb565=1&ccb=1-5&_nc_sid=8bfeb9&_nc_eui2=AeGCKIGPv7RRCWG2T1TH_3eA4uJY8DvfgD7i4ljwO9-APizZXyYx57BF8RoC1lDYoVrHvdtRXlkZFW8DYz5zgFUg&_nc_ohc=rxz2Cx86OAEAX9Z7MCO&_nc_ht=scontent.fcgy2-2.fna&oh=00_AT9j_lNJ1HyUl0ym66nKN_5nhx9YUfeadYCpcehsANCLkg&oe=61C24067',
         caption: '',
      },
      {
         image: 'https://scontent.fcgy2-2.fna.fbcdn.net/v/t39.30808-6/264414241_4486785468113576_9049602934727068773_n.jpg?_nc_cat=104&_nc_rgb565=1&ccb=1-5&_nc_sid=730e14&_nc_eui2=AeHCIlBpMsU48kx9FDnKL7S2_YI2KZjVrJX9gjYpmNWslaWinMuvO40zc6NXrd3VQJGl0cCA0J_aE--k8cWGe33Y&_nc_ohc=BuTSjcIMrCkAX-iPteR&_nc_ht=scontent.fcgy2-2.fna&oh=00_AT-kidpA_LSCqQp4q81UmwO35QxqtlPdLU4NKTuvfMaRKQ&oe=61C3B9EA',
         caption: '',
      },
      {
         image: 'https://scontent.fcgy2-1.fna.fbcdn.net/v/t39.30808-6/249862750_4329472050511586_3197559657567231910_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=8bfeb9&_nc_eui2=AeHP10CBUBAoeBf54hf7tM9eJTQCBI7XCswlNAIEjtcKzAiD_d9ILpEFWKbPrnxv0MQZ9zyOfC9lj9hcZLZ9zMPx&_nc_ohc=8avQouLH3w8AX9QOiuB&_nc_ht=scontent.fcgy2-1.fna&oh=00_AT9lwKF3DK0lVRpr5yWEkeP25T5XDzxjyESIG54dKRmazQ&oe=61C39F2A',
         caption: '',
      },
      {
         image: 'https://scontent.fcgy2-2.fna.fbcdn.net/v/t39.30808-6/240394594_4124770727648387_6353064691621258274_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=8bfeb9&_nc_eui2=AeFXTEjypw4ivSGF_IVk4HZmXnOXBFGdxuBec5cEUZ3G4A2uqBqJeQsed8V_LtCrry4cmeOSO3QlV8wTx1tZLoDU&_nc_ohc=Uqc53VmofrQAX86E7Ju&tn=G0pwGMiOwPMtPw5o&_nc_ht=scontent.fcgy2-2.fna&oh=00_AT-v1miEaU35DcPBK-2zX2UEFBsmRmaxEbUrgAtthaFkgw&oe=61C3796B',
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

   return (
      <>
         <Header />

         <div className=" px-5 py-4 mt-5 mb-5 mx-5">
            <div className="row my-5">
               <div className="col-lg my-auto ">
                  <h4>WELCOME TO </h4>
                  <h1 className="text-pink">ZAMBOANGA CITY ROTARACT CLUB </h1>
                  <p className="row col-lg-8 mt-5">
                     Together, we see a world where people unite and take action
                     to create lasting change – across the globe, in our
                     communities, and in ourselves.{' '}
                  </p>
                  <div className="mt-5">
                     <a
                        href="#about"
                        onClick={closeMenu}
                        className="btn btn-primary"
                     >
                        Explore{' '}
                     </a>
                     &nbsp; &nbsp;
                     <Link to="/about" className="btn bg-light px-3 text-pink">
                        {' '}
                        Pay Now <BiIcons.BiRightArrowAlt />
                     </Link>
                  </div>
               </div>
               <div className="col-lg mt-5">
                  <img src={logo} width="100%" height="100%" alt="serve qr" />
               </div>
            </div>
         </div>

         <div
            className="container-fluid py-5"
            style={{
               backgroundImage: 'url(' + svg + ')',
               backgroundSize: 'cover',
            }}
         >
            <div className=" text-center mb-5">
               <div className="about" id="about">
                  <p className="text-secondary">ABOUT US</p>
                  <h3 className="text-pink text-uppercase ">
                     {' '}
                     Zamboanga City Chapters{' '}
                  </h3>

                  <div className="row">
                     <div className="col-lg p-5 mx-3 text-center text-white">
                        <img
                           src={image1}
                           width="80%"
                           height="70%"
                           alt="serve qr"
                        />
                        <h4 className="my-4 fw-bolder text-white ">
                           ORGRANIZATION
                        </h4>
                        <p>
                           Rotary International is a non-profit organization
                           whose main mission is to gather together corporate
                           and professional leaders to perform humanitarian
                           service and promote goodwill and peace around the
                           world.{' '}
                        </p>
                     </div>

                     <div className="col-lg p-5  mx-3 text-center text-white">
                        <img
                           src={image2}
                           width="80%"
                           height="70%"
                           alt="serve qr"
                        />
                        <h4 className="my-4 fw-bolder text-white ">GOAL </h4>
                        <p>
                           {' '}
                           Provide humanitarian service, encourage high ethical
                           standards in all vocations and help build goodwill
                           and peace in the world.{' '}
                        </p>
                     </div>

                     <div className="col-lg p-5  mx-3 text-center text-white">
                        <img
                           src={image3}
                           width="80%"
                           height="70%"
                           alt="serve qr"
                        />
                        <h4 className="my-4 fw-bolder text-white ">
                           ZAMBOANGA CITY CLUBS
                        </h4>
                        <p className="">
                           The Rotaract Clubs have a total of 8 clubs in
                           Zamboanga City Chapter. Each club is composed of a
                           President, treasurer, secretary followed by its
                           members, and the total number of members varies per
                           club.
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <div className="container-fluid ">
            <div className="mt-5 py-5 mb-5">
               <p className="text-secondary text-center mt-3">ROTARY CLUBS</p>
               <h3 className="text-pink text-center col-lg p-1 text-uppercase fw-bolder  mb-5 pb-5">
                  {' '}
                  Zamboanga City Clubs{' '}
               </h3>
               {/* <p class="text-secondary text-center mb-5 pb-5">
                  {' '}
                  There are a total of 8 rotaract clubs here in Zamboanga City
               </p> */}
               <Flickity
                  className={'carousel'} // default ''
                  elementType={'div'} // default 'div'
                  options={flickityOptions} // takes flickity options {}
                  disableImagesLoaded={false} // default false
                  reloadOnUpdate // default false
                  static // default false
               >
                  <div className="card-container me-5 mb-5 pb-4">
                     <div class="card-body p-4 ">
                        <h5 class="card-title text-center">WEST</h5>
                        <img
                           src={west}
                           width="100%"
                           height="130px"
                           alt="serve qr"
                        />
                        <p class="card-text my-4">
                           The Rotaract Club of Zamboanga City West of RI
                           District 3850 is composed of Rotaractors from
                           Zamboanga City.
                        </p>
                        <Link
                           to="/west"
                           className="btn bg-light px-3 text-pink"
                        >
                           {' '}
                           Visit <BiIcons.BiRightArrowAlt />
                        </Link>
                     </div>
                  </div>

                  <div className="card-container me-5 mb-5 ">
                     <div class="card-body p-4">
                        <h5 class="card-title text-center">EAST</h5>
                        <img
                           src={east}
                           width="100%"
                           height="130px"
                           alt="serve qr"
                        />
                        <p class="card-text my-4">
                           The Rotaract Club of Zamboanga City West of RI
                           District 3850 is composed of Rotaractors from
                           Zamboanga City, Western Mindanao ages 18-30 years
                           old.
                        </p>
                        <Link
                           to="/east"
                           className="btn bg-light px-3 text-pink"
                        >
                           {' '}
                           Visit <BiIcons.BiRightArrowAlt />
                        </Link>
                     </div>
                  </div>

                  <div className="card-container me-5 mb-5 ">
                     <div class="card-body p-4">
                        <h5 class="card-title text-center">NORTH</h5>
                        <img
                           src={north}
                           width="100%"
                           height="130px"
                           alt="serve qr"
                        />
                        <p class="card-text my-4">
                           A Youth Community Service Club based on Zamboanga
                           City.
                           <br />
                           <br />
                           <br />
                           <br />
                        </p>
                        <Link
                           to="/north"
                           className="btn bg-light px-3 text-pink"
                        >
                           {' '}
                           Visit <BiIcons.BiRightArrowAlt />
                        </Link>
                     </div>
                  </div>

                  <div className="card-container me-5 mb-5 ">
                     <div class="card-body p-4">
                        <h5 class="card-title text-center">METRO</h5>
                        <img
                           src={metro}
                           width="100%"
                           height="130px"
                           alt="serve qr"
                        />
                        <p class="card-text my-4">
                           The Rotaract Club of Metro Zamboanga is a community
                           based nonprofit organization sponsored by the Rotary
                           Club of Metro Zamboanga.
                        </p>
                        <Link
                           to="/metro"
                           className="btn bg-light px-3 text-pink"
                        >
                           {' '}
                           Visit <BiIcons.BiRightArrowAlt />
                        </Link>
                     </div>
                  </div>

                  <div className="card-container me-5 mb-5 ">
                     <div class="card-body p-4">
                        <h5 class="card-title text-center">UZ CES</h5>
                        <img
                           src={uz}
                           width="100%"
                           height="130px"
                           alt="serve qr"
                        />
                        <p class="card-text my-4">
                           An Organization aims to help the community through
                           perseverance and selfless service.
                           <br />
                           <br />
                           <br />
                        </p>
                        <Link to="/uz" className="btn bg-light px-3 text-pink">
                           {' '}
                           Visit <BiIcons.BiRightArrowAlt />
                        </Link>
                     </div>
                  </div>

                  <div className="card-container me-5 mb-5 ">
                     <div class="card-body p-4">
                        <h5 class="card-title text-center">TOLOSA COMMUNITY</h5>
                        <img
                           src={tolosaa}
                           width="100%"
                           height="130px"
                           alt="serve qr"
                        />
                        <p class="card-text my-4">
                           An Organization aims to help the community through
                           perseverance and selfless service.
                           <br />
                           <br />
                           <br />
                        </p>
                        <Link
                           to="/tolosa"
                           className="btn bg-light px-3 text-pink"
                        >
                           {' '}
                           Visit <BiIcons.BiRightArrowAlt />
                        </Link>
                     </div>
                  </div>

                  <div className="card-container me-5 mb-5 ">
                     <div class="card-body p-4">
                        <h5 class="card-title text-center">SOUTHERN</h5>
                        <img
                           src={south}
                           width="100%"
                           height="130px"
                           alt="serve qr"
                        />
                        <p class="card-text my-4">
                           It was on September 16, 2011 when the Rotaract Club
                           of Southern City Colleges was formed. As one of the
                           active school-based organizations.
                           <br />
                           <br />
                        </p>
                        <Link
                           to="/southern"
                           className="btn bg-light px-3 text-pink"
                        >
                           {' '}
                           Visit <BiIcons.BiRightArrowAlt />
                        </Link>
                     </div>
                  </div>

                  <div className="card-container me-5 mb-5 ">
                     <div class="card-body p-4">
                        <h5 class="card-title text-center">WMSU</h5>
                        <img
                           src={wmsuu}
                           width="100%"
                           height="130px"
                           alt="serve qr"
                        />
                        <p class="card-text my-4">
                           Est. Sept 30, 2012, Chartered Jan. 9, 2014. Our
                           legacy of Leadership and Service to Humanity
                           continues.
                           <br />
                           <br />
                           <br />
                        </p>
                        <Link
                           to="/wmsu"
                           className="btn bg-light px-3 text-pink"
                        >
                           {' '}
                           Visit <BiIcons.BiRightArrowAlt />
                        </Link>
                     </div>
                  </div>
               </Flickity>
            </div>
         </div>
         <div className="gallery" id="gallery">
            <div style={{ textAlign: 'center' }} className="container mb-5 mt-5 pt-5 rounded">
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
                  thumbnailWidth="100px"
                  showNavBtn={true}
                  style={{
                     textAlign: 'center',
                     maxWidth: '100%',
                     margin: '100px auto',
                  }}
               />
            </div>
         </div>
         <div class="footer pt-5 mt-5 bg-light">
            <footer>
               <div class="row ">
                
                  <div class="m-5 p-5 col-lg-6 ">
                     <h4 className="text-uppercase text-bold mb-5">Rotaract Zamboanga City Chapter</h4>
                     <p class="col-lg-7">
                        Rotaract clubs bring together people ages 18 and older,
                        Zamboanga City has a total of 8 Rotaract Clubs, which
                        aims to develop leadership and professional skills, and
                        have fun through service.
                     </p>
                  </div>

                  <div class="m-5 p-5 col-lg">
                     <h5>Contact and Follow us: </h5>
                     <FaIcons.FaFacebook
                        className="me-5"
                        onClick={handleClick1}
                        size="5vh"
                     />
                     <FaIcons.FaInstagram
                        className="me-5"
                        onClick={handleClick1}
                        size="5vh"
                     />
                     <FiIcons.FiPhoneCall className="me-1" size="5vh" />
                     +639673654339
                  </div>
               </div>

               <p className="copyright bg-pink text-white text-center p-1">
                  Rotary Clubs of Zamboanga City
               </p>
            </footer>
         </div>
      </>
   );
}
export default Home;
