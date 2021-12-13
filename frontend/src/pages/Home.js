import React from 'react';
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
import Flickity from 'react-flickity-component';
import '../css/footer.css';
import Carousel from './Carousel';
import '../css/card.css';

function Home() {
   const flickityOptions = {
      initialIndex: 2,
   };
   const handleClick = () => {
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
                     <Link to="/about" className="btn btn-primary">
                        {' '}
                        Learn More{' '}
                     </Link>
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
            className="container-fluid py-5
"
            style={{
               backgroundImage: 'url(' + svg + ')',
               backgroundSize: 'cover',
            }}
         >
            <div className=" text-center mb-5">
               <p className="text-secondary">ABOUT US</p>
               <h3 className="text-pink text-uppercase ">
                  {' '}
                  Zamboanga City Chapters{' '}
               </h3>
            </div>

            <div className="row">
               <div className="col-lg p-5 mx-3 text-center text-white">
                  <img src={image1} width="80%" height="70%" alt="serve qr" />
                  <h4 className="my-4 fw-bolder text-white ">ORGRANIZATION</h4>
                  <p>
                     Rotary International is a non-profit organization whose
                     main mission is to gather together corporate and
                     professional leaders to perform humanitarian service and
                     promote goodwill and peace around the world.{' '}
                  </p>
               </div>

               <div className="col-lg p-5  mx-3 text-center text-white">
                  <img src={image2} width="80%" height="70%" alt="serve qr" />
                  <h4 className="my-4 fw-bolder text-white ">GOAL </h4>
                  <p>
                     {' '}
                     Provide humanitarian service, encourage high ethical
                     standards in all vocations and help build goodwill and
                     peace in the world.{' '}
                  </p>
               </div>

               <div className="col-lg p-5  mx-3 text-center text-white">
                  <img src={image3} width="80%" height="70%" alt="serve qr" />
                  <h4 className="my-4 fw-bolder text-white ">
                     ZAMBOANGA CITY CLUBS
                  </h4>
                  <p className="">
                     The Rotaract Clubs have a total of 8 clubs in Zamboanga
                     City Chapter. Each club is composed of a President,
                     treasurer, secretary followed by its members, and the total
                     number of members varies per club.
                  </p>
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
                           Some quick example text to build on the card title
                           and make up the bulk of the card's content.
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
                           Some quick example text to build on the card title
                           and make up the bulk of the card's content.
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
                           Some quick example text to build on the card title
                           and make up the bulk of the card's content.
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
                           Some quick example text to build on the card title
                           and make up the bulk of the card's content.
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
                           Some quick example text to build on the card title
                           and make up the bulk of the card's content.
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
                           Some quick example text to build on the card title
                           and make up the bulk of the card's content.
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
                           Some quick example text to build on the card title
                           and make up the bulk of the card's content.
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
                           Some quick example text to build on the card title
                           and make up the bulk of the card's content.
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

         <div class="footer pt-5 mt-5 bg-light">
            <footer>
               <div class="container pb-5">
                  <div class="row">
                     <div class="col-sm-6 col-md-3 mt-5">
                        <h4>Info</h4>
                        <ul>
                           <li>Info 1</li>
                           <li>Info 1</li>
                           <li>Info 1</li>
                        </ul>
                     </div>
                     <div class="col-sm-6 col-md-3 mt-5">
                        <h4>Contact Us</h4>
                        <ul>
                           <li>Email</li>
                           <li>Phone</li>
                           <li>Address</li>
                        </ul>
                     </div>
                     <div class="col-md-6 mt-5">
                        <h4>Rotaract Zamboanga City Chapter</h4>
                        <p>
                           Praesent sed lobortis mi. Suspendisse vel placerat
                           ligula. Vivamus ac sem lacus. Ut vehicula rhoncus
                           elementum. Etiam quis tristique lectus. Aliquam in
                           arcu eget velit pulvinar dictum vel in justo.
                        </p>
                     </div>
                     <div class="mt-5 py-5 text-center">
                        <FaIcons.FaFacebook
                           className="me-5"
                           onClick={handleClick}
                           size="6vh"
                        />
                        <FaIcons.FaTwitter
                           className="me-5"
                           onClick={handleClick}
                           size="6vh"
                        />
                        <FaIcons.FaInstagram
                           className=""
                           onClick={handleClick}
                           size="6vh"
                        />
                     </div>
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
