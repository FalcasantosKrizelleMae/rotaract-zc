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
         image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/GoldenGateBridge-001.jpg/1200px-GoldenGateBridge-001.jpg',
         caption: `<div>
          San Francisco<br/><span>Next line</span>
        </div>`,
      },
      {
         image: 'https://cdn.britannica.com/s:800x450,c:crop/35/204435-138-2F2B745A/Time-lapse-hyper-lapse-Isle-Skye-Scotland.jpg',
         caption: '<div>San Francisco</div>',
      },
      {
         image: 'https://static2.tripoto.com/media/filter/tst/img/735873/TripDocument/1537686560_1537686557954.jpg',
         caption: '<div>San Francisco</div>',
      },
      {
         image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Palace_of_Fine_Arts_%2816794p%29.jpg/1200px-Palace_of_Fine_Arts_%2816794p%29.jpg',
         caption: '<div>San Francisco</div>',
      },
      {
         image: 'https://i.natgeofe.com/n/f7732389-a045-402c-bf39-cb4eda39e786/scotland_travel_4x3.jpg',
         caption: '<div>San Francisco</div>',
      },
      {
         image: 'https://www.tusktravel.com/blog/wp-content/uploads/2020/07/Best-Time-to-Visit-Darjeeling-for-Honeymoon.jpg',
         caption: 'Darjeeling',
      },
      {
         image: 'https://www.omm.com/~/media/images/site/locations/san_francisco_780x520px.ashx',
         caption: '<div>San Francisco</div>',
      },
      {
         image: 'https://images.ctfassets.net/bth3mlrehms2/6Ypj2Qd3m3jQk6ygmpsNAM/61d2f8cb9f939beed918971b9bc59bcd/Scotland.jpg?w=750&h=422&fl=progressive&q=50&fm=jpg',
         caption: '<div>San Francisco</div>',
      },
      {
         image: 'https://www.oyorooms.com/travel-guide/wp-content/uploads/2019/02/summer-7.jpg',
         caption: '<div>San Francisco</div>',
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
               <div className="col-sm my-auto ">
                  <h4>WELCOME TO </h4>
                  <h1 className="text-pink">ZAMBOANGA CITY ROTARACT CLUB </h1>
                  <p className="row col-sm-8 mt-5">
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
               <div className="col-sm mt-5">
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
            <div style={{ textAlign: 'center' }} className="mb-5 mt-5 pt-5">
               <Carousel
                  data={data}
                  time={2000}
                  width="100%"
                  height="790px"
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
               <div class="row">
                  <div class="col-sm-4 col-md-2 mt-2"></div>
                  <div class="mt-2 py-2 col-sm">
                     <h4>Rotaract Zamboanga City Chapter</h4>
                     <p>
                        Rotaract clubs bring together people ages 18 and older,
                        Zamboanga City has a total of 8 Rotaract Clubs, which
                        aims to develop leadership and professional skills, and
                        have fun through service.
                     </p>
                  </div>

                  <div class="mt-2 py-2 col-sm">
                     <h5>Contact and Follow us: </h5>
                     <FaIcons.FaFacebook
                        className="me-1"
                        onClick={handleClick1}
                        size="5vh"
                     />
                     <FaIcons.FaInstagram
                        className="me-1"
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
