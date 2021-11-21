import React from 'react';
// import * as BiIcons from 'react-icons/bi';
import { Avatar, Image } from 'antd';
import qr from '../../../images/qrcode.png';
// import { Link } from 'react-router-dom';

function Profile() {
   return (
      <div>
         <div className="container">
            <div className=" bg-pink p-3 rounded mt-4">
               {/* <Link className="text-decoration-none text-dark" to="/member">
                     <BiIcaons.BiChevronLeft className="fs-1 " />
                     Back
                  </Link> */}

               <h5 className="text-white m-0 p-1">PROFILE</h5>
            </div>

            <div className="row m-1 h-100">
               <div className="col-md bg-white shadow p-4 me-4 mt-4">
                  <div className="d-flex justify-content-center image">
                     <Avatar
                        className="bg-white m-3 border-pink"
                        size={200}
                        src={
                           <Image
                              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                              height={200}
                              width={200}
                              className="image"
                           />
                        }
                     ></Avatar>
                  </div>
                  <div className=" text-center">
                     <h5 className="mt-4 m-0 text-uppercase text-secondary fw-bolder">
                        Krizelle Mae Falcasantos
                     </h5>
                     <p className="text-pink">Member</p>
                  </div>
                  <div className="">
                     <div className="m-3 pt-5 text-secondary">
                        <h5 className="text-pink fw-bolder mb-4">ABOUT</h5>
                        <p>Member ID: 123456 </p>
                        <p>Address: Tumaga</p>
                        <p>Contact: 0987654321</p>
                     </div>
                  </div>
               </div>

               <div className="col-md mt-4">
                  <div className="row h-25 p-4 rounded shadow bg-white">
                     <div className="col m-2">
                        <h5 className="text-pink fw-bolder">BALANCE</h5>

                        <h2 className="mt-2 text-secondary fw-bolder">
                           P 1000.00
                        </h2>
                     </div>
                     <div className="col d-flex align-items-center justify-content-end">
                        <button
                           className="btn btn-success btn-sm p-2"
                           type="button"
                        >
                           + Add payment
                        </button>
                     </div>
                  </div>

                  <div className="row p-4  mt-4 rounded shadow bg-white">
                     <div>
                        <h5 className="text-pink fw-bolder">QR CODE</h5>
                        <small>Click the image to view full screen</small>
                     </div>

                     <div className=" d-flex justify-content-center image">
                        <Avatar
                           className="bg-white m-1 p-1"
                           size={300}
                           shape="square"
                           src={<Image src={qr} />}
                        ></Avatar>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <footer className="bg-dark"></footer>
      </div>
   );
}

export default Profile;
