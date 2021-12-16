import React, {  useState } from 'react';
import 'antd/dist/antd.css';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import * as AiIcons from 'react-icons/ai';

import logo from './../../../images/logo.png';



const { SubMenu } = Menu;


const Header = () => {
  
  
  
   const [click, setClick] = useState(false)
   const handleClick = () => setClick(!click)

   const closeMenu = () => setClick(false)
   
      return (
         
         <>
            <div
               className=" bg-white pb-0 fixed-top
         "
            >
               
               <Menu

                  mode="horizontal"
                  className=" mt-3
                px-4"
               >
                  <Menu.Item className="pb-3 me-auto ">
                     <Link to="/">
                        <img
                           src={logo}
                           height={45}
                           className="img-responsive"
                           alt="Rotaract logo"
                        />
                     </Link>
                  </Menu.Item>

                  <Menu.Item
                     key="home"
                     icon={<AiIcons.AiFillHome />}
                     className="item"
                  >
                   <a href='/' onClick={closeMenu}>Home</a>
                  </Menu.Item>

                  <Menu.Item
                     key="abt"
                     icon={<AiIcons.AiFillInfoCircle />}
                     className="item"
                  >
                        <a href='#about' onClick={closeMenu}>About</a>
                  </Menu.Item>
               
                  <Menu.Item className=" ms-auto me-0 pe-0"> </Menu.Item>

                  <Menu.Item key="logout" icon={<AiIcons.AiOutlineLogin />}>
                     <Link to="/login" className="text-decoration-none">
                        Login
                     </Link>
                  </Menu.Item>
               </Menu>
            </div>
         </> 
      );
   }


export default Header;
 