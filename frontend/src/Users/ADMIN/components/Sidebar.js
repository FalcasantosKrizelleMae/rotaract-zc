// import Header from "../Header";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/sidebar.css';
import 'boxicons/css/boxicons.css';
import logo from '../../../images/logo.png';
import { Avatar, Image } from 'antd';

function Admin() {
   const [sidebar, setSidebar] = useState('sidebar close');
   const [sidebarBtn, setSidebarBtn] = useState('bx bx-menu');

   useEffect(() => {
      let arrow = document.querySelectorAll('.arrow');
      for (var i = 0; i < arrow.length; i++) {
         arrow[i].addEventListener('click', (e) => {
            let arrowParent = e.target.parentElement.parentElement; //selecting main parent of arrow
            arrowParent.classList.toggle('showMenu');
         });
      }
   }, []);

   const isActive = () => {
      if (sidebar === 'sidebar close') {
         setSidebarBtn('bx bx-x');
         setSidebar('sidebar');
      } else {
         setSidebarBtn('bx bx-menu');
         setSidebar('sidebar close');
      }
   };
   return (
      <>
         <div className="header shadow-sm">
            <img
               src={logo}
               height="50vh"
               className="img-responsive"
               alt="Rotaract logo"
            />
            <div className="ms-auto">
               <Avatar
                  className="bg-white"
                  size={50}
                  src={
                     <Image src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
               ></Avatar>
               {/* DROPDOWN */}
            </div>
         </div>

         <div className={sidebar}>
            <div className="logo bg-pink">
               <i className={sidebarBtn} onClick={isActive}></i>
            </div>
            <ul className="nav-links">
               <li className="">
                  <Link>
                     <i className="bx bx-line-chart"></i>
                     <span className="link_name">Dashboard</span>
                  </Link>
               </li>
               <li>
                  <div className="icon-link">
                     <Link>
                        <i className="bx bx-collection"></i>
                        <span className="link_name">Funds</span>
                     </Link>
                  </div>
               </li>
               <li>
                  <div className="icon-link active">
                     <Link to="accounts">
                        <i className="bx bx-user"></i>
                        <span className="link_name">Accounts</span>
                     </Link>
                  </div>
               </li>
               <li>
                  <div className="icon-link">
                     <Link>
                        <i className="bx bx-globe"></i>
                        <span className="link_name">Webpage</span>
                     </Link>
                     <i className="bx bxs-chevron-down arrow"></i>
                  </div>
                  <ul class="sub-menu">
                     <ul>
                        <Link className="sub-links">Details</Link>
                     </ul>
                     <ul>
                        <Link className="sub-links">Announcements</Link>
                     </ul>
                     <ul>
                        <Link className="sub-links">Gallery</Link>
                     </ul>
                  </ul>
               </li>
               <li>
                  <Link to="/profile-admin">
                     <i className="bx bxs-wrench"></i>
                     <span className="link_name">Settings</span>
                  </Link>
               </li>
               <li>
                  <Link>
                     <i className="bx bxs-help-circle"></i>
                     <span className="link_name">Help</span>
                  </Link>
               </li>
            </ul>

            {/* Main pag here    */}
            <div className="section"></div>
         </div>
      </>
   );
}

export default Admin;
