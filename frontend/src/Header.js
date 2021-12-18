import React, {  useState } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import * as AiIcons from 'react-icons/ai';
import * as GrIcons from 'react-icons/gr';
import logo from './images/logo.png';



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

                  <Menu.Item
                     key="gal"
                     icon={<GrIcons.GrGallery/>}
                     className="item"
                  >
                        <a href='#gallery' onClick={closeMenu}>Gallery</a>
                  </Menu.Item>

                  <SubMenu
                     key="chap"
                     icon={<AiIcons.AiOutlineTeam />}
                     title="Clubs"
                     className="item"
                  >
                     <Menu.Item key="setting:1">   <Link to="/west" className="text-decoration-none">
                     Zamboanga City West
                     </Link></Menu.Item>
                     <Menu.Item key="setting:2"><Link to="/north" className="text-decoration-none">
                     Zamboanga City North
                     </Link></Menu.Item>
                     <Menu.Item key="setting:3"><Link to="/east" className="text-decoration-none">
                     Zamboanga City East
                     </Link></Menu.Item>
                     <Menu.Item key="setting:4"><Link to="/metro" className="text-decoration-none">
                     Zamboanga City Metro
                     </Link></Menu.Item>
                     <Menu.Item key="setting:5">
                     <Link to="/wmsu" className="text-decoration-none">
                     Western Mindanao State University
                     </Link>
                     </Menu.Item>
                     <Menu.Item key="setting:6"> <Link to="/uz" className="text-decoration-none">
                     Universidad de Zamboanga CES
                     </Link>
                     </Menu.Item>
                     <Menu.Item key="setting:7"><Link to="/tolosa" className="text-decoration-none">
                    Tolosa Community
                     </Link></Menu.Item>
                     <Menu.Item key="setting:8">
                     <Link to="/southern" className="text-decoration-none">
                     Southern City Colleges
                     </Link>
                     </Menu.Item>
                  </SubMenu>


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
 