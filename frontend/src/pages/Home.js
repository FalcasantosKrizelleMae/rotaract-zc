import React from 'react';
import { Link } from 'react-router-dom';
import rotaractt from '../images/rotaractt.png';
import Header from '../Header';
import * as FaIcons from 'react-icons/fa';
import Flickity from 'react-flickity-component';
import Card from './Card';
import '../css/footer.css';
import  Carousel from "./Carousel";

function Home() {
   const flickityOptions = {
      initialIndex: 1,
   };
   const handleClick = () => {
      window.open("https://web.facebook.com/rotametzam");
    };
   const data = [
      {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/GoldenGateBridge-001.jpg/1200px-GoldenGateBridge-001.jpg",
        caption: `<div>
          San Francisco<br/><span>Next line</span>
        </div>`,
      },
      {
        image:
          "https://cdn.britannica.com/s:800x450,c:crop/35/204435-138-2F2B745A/Time-lapse-hyper-lapse-Isle-Skye-Scotland.jpg",
        caption: "<div>San Francisco</div>",
      },
      {
        image:
          "https://static2.tripoto.com/media/filter/tst/img/735873/TripDocument/1537686560_1537686557954.jpg",
        caption: "<div>San Francisco</div>",
      },
      {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Palace_of_Fine_Arts_%2816794p%29.jpg/1200px-Palace_of_Fine_Arts_%2816794p%29.jpg",
        caption: "<div>San Francisco</div>",
      },
      {
        image:
          "https://i.natgeofe.com/n/f7732389-a045-402c-bf39-cb4eda39e786/scotland_travel_4x3.jpg",
        caption: "<div>San Francisco</div>",
      },
      {
        image:
          "https://www.tusktravel.com/blog/wp-content/uploads/2020/07/Best-Time-to-Visit-Darjeeling-for-Honeymoon.jpg",
        caption: "Darjeeling",
      },
      {
        image:
          "https://www.omm.com/~/media/images/site/locations/san_francisco_780x520px.ashx",
        caption: "<div>San Francisco</div>",
      },
      {
        image:
          "https://images.ctfassets.net/bth3mlrehms2/6Ypj2Qd3m3jQk6ygmpsNAM/61d2f8cb9f939beed918971b9bc59bcd/Scotland.jpg?w=750&h=422&fl=progressive&q=50&fm=jpg",
        caption: "<div>San Francisco</div>",
      },
      {
        image:
          "https://www.oyorooms.com/travel-guide/wp-content/uploads/2019/02/summer-7.jpg",
        caption: "<div>San Francisco</div>",
      },
    ];
  
    const captionStyle = {
      fontSize: "2em",
      fontWeight: "bold",
    };
    const slideNumberStyle = {
      fontSize: "20px",
      fontWeight: "bold",
    };

   return (
      <>
         <Header />
         
         <div className=" px-5 py-5 mt-5">
            <div className="row my-3">
               <div className="col-sm my-auto">
                  <div className="row banner">
                     <h3>WELCOME TO ROTARACT </h3>  

                  <div className="m-0 mt-3">
                     <Link to="/about" className="btn btn-primary shadow">
                        {' '}
                        Learn More{' '}
                     </Link>
                     &nbsp; &nbsp;
                     <Link to="/about" className="btn btn-primary shadow">
                        {' '}
                        Pay Now{' '}
                     </Link>
                  </div>
               </div>
               </div>
               <div className="col-sm">
                  <img src={rotaractt} width="80%" height="70%" alt="serve qr" />
               </div>
            </div>
         </div>
  

         <div className=" container-fluid bg-pink p-5 text-white">
            <div className="col-sm-6">
               <h3 className="text-white"> ABOUT US </h3>
               <p>
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum."
               </p>
            </div>
         </div>
         
         <div className="mt-5 py-5">
            <Flickity
               className={'carousel'} // default ''
               elementType={'div'} // default 'div'
               options={flickityOptions} // takes flickity options {}
               disableImagesLoaded={false} // default false
               reloadOnUpdate // default false
               static // default false
            >
               <Card
                  title="Card Title"
                  imageUrl=""
                  body="Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        nisi ut aliquip ex ea commodo consequat."
               />
               <Card
                  title="Card Title"
                  imageUrl=""
                  body="Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        nisi ut aliquip ex ea commodo consequat."
               />

               <Card
                  title="Card Title"
                  imageUrl=""
                  body="Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        nisi ut aliquip ex ea commodo consequat."
               />
               <Card
                  title="Card Title"
                  imageUrl=""
                  body="Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        nisi ut aliquip ex ea commodo consequat."
               />
            </Flickity>
         </div>
         <div style={{ textAlign: 'center' }}>
            <h2>GALLERY</h2>

            <div
               style={{
                  padding: '0 20px',
               }}
            ></div>
            <Carousel
               data={data}
               time={2000}
               width="850px"
               height="500px"
               captionStyle={captionStyle}
               radius="10px"
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
                  maxWidth: '850px',
                  margin: '40px auto',
               }}
            />
         </div>

         <div class="footer-dark ">
            <footer>
               <div class="container">
                  <div class="row">
                     <div class="col-sm-6 col-md-3 item">
                        <h3>Services</h3>
                        <ul>
                           <li>Web design</li>
                           <li>Development</li>
                           <li>Hosting</li>
                        </ul>
                     </div>
                     <div class="col-sm-6 col-md-3 item">
                        <h3>About</h3>
                        <ul>
                           <li>Chapter</li>
                           <li>Contact Us;</li>
                           <li>Careers</li>
                        </ul>
                     </div>
                     <div class="col-md-6 item text">
                        <h3>Rotaract Clubs</h3>
                        <p>
                           Praesent sed lobortis mi. Suspendisse vel placerat
                           ligula. Vivamus ac sem lacus. Ut vehicula rhoncus
                           elementum. Etiam quis tristique lectus. Aliquam in
                           arcu eget velit pulvinar dictum vel in justo.
                        </p>
                     </div>
                     <div class="  mt-5 text-center">
                        <FaIcons.FaFacebook className="me-4" onClick={handleClick} size="7vh" />
                        <FaIcons.FaTwitter className="me-4" size="7vh" />
                        <FaIcons.FaInstagram className="me-4" size="7vh" />
                     </div>
                  </div>
                  <p className="copyright">Rotary Clubs of Zamboanga City </p>
               </div>
            </footer>
         </div>

      </>
   );
}
export default Home;
