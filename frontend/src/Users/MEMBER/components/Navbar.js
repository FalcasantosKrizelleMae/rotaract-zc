import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as BiIcons from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import '../css/navbar.css';
import { IconContext } from 'react-icons';
import { Avatar, Image } from 'antd';
import { Button } from 'react-bootstrap';

function Navbar() {
   //DROPDOWN

   const [sidebar, setSidebar] = useState(false);

   const showSidebar = () => setSidebar(!sidebar);

   return (
      <>
         <IconContext.Provider value={{ color: '' }}>
            <div className="navbar bg-white shadow-sm w-100">
               <Link className="menu-bar">
                  <FaIcons.FaBars
                     onClick={showSidebar}
                     className=" fs-3 menu-icon"
                     color="#d91b5c"
                  />
               </Link>
               <div>
                  <h3>My Account</h3>
               </div>

               <div className="ms-auto">
                  <Avatar
                     className="bg-white"
                     size={50}
                     src={
                        <Image src="https://minimaltoolkit.com/images/randomdata/female/100.jpg" />
                     }
                  ></Avatar>
                  {/* DROPDOWN */}
               </div>
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
               <span className="close">
                  <Button
                     variant="none"
                     onClick={showSidebar}
                     className="menu-bars"
                  >
                     <BiIcons.BiX className="bi-x" />
                  </Button>
               </span>
               <ul className="nav-menu-items" onClick={showSidebar}>
                  <div className="d-flex justify-content-center">
                     <Avatar
                        className="border bg-light"
                        size={155}
                        src={
                           <Image src="https://minimaltoolkit.com/images/randomdata/female/100.jpg" />
                        }
                     ></Avatar>
                  </div>
                  <div className="name">
                     <h2 className="text-center my-4 mb-5 text-white">
                        {' '}
                        Krizelle Mae Falcasantos
                     </h2>
                  </div>

                  {SidebarData.map((item, index) => {
                     return (
                        <li key={index} className={item.cName}>
                           <Link to={item.path}>
                              <span className="list-icon">{item.icon}</span>
                              <span>{item.title}</span>
                           </Link>
                        </li>
                     );
                  })}

                  <li className="nav-text mt-5">
                     <Link>
                        <span className="list-icon">
                           <BiIcons.BiLogOut />
                        </span>
                        LOGOUT
                     </Link>
                  </li>
               </ul>
            </nav>
         </IconContext.Provider>
      </>
   );
}

export default Navbar;
