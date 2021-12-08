import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Menu } from 'antd';
import logo from '../../../images/logo.png';
import { Link } from 'react-router-dom';
import * as AiIcons from 'react-icons/ai';
import { Button } from 'react-bootstrap';

const { SubMenu } = Menu;
const member_id = localStorage.getItem('member_id');
const chapter = localStorage.getItem('chapter');

class Header extends Component {
   state = {
      current: 'mail',
   };

   handleClick = (e) => {
      console.log('click ', e);
      this.setState({ current: e.key });
   };

   logout = () => {
      localStorage.clear();
      window.location.href = '/login';
   };

   render() {
      const { current } = this.state;
      return (
         <div className=" bg-white pb-0 fixed-top">
            <Menu
               onClick={this.handleClick}
               selectedKeys={[current]}
               mode="horizontal"
               className=" mt-3 px-4"
            >
               <Menu.Item className="pb-3 me-auto " disabled>
                  <img
                     src={logo}
                     height="40vh"
                     className="img-responsive"
                     alt="Rotaract logo"
                  />
               </Menu.Item>

               <Menu.Item
                     key="home"
                     icon={<AiIcons.AiFillHome />}
                     className="item"
                  >
                   <Link to="/" >
                     Home
                  </Link>
                  </Menu.Item>

               <Menu.Item
                  key="events"
                  icon={<AiIcons.AiOutlineCalendar />}
                  className="item"
               >
                 <Link to=" " className="text-decoration-none">
                     Events
                  </Link>
                  
               </Menu.Item>

               <Menu.Item
                  key="alipay"
                  icon={<AiIcons.AiOutlineAccountBook />}
                  className="item"
               >
                  <Link to=" " className="text-decoration-none">
                     About 
                  </Link>
               </Menu.Item>

               <Menu.Item className=" ms-auto me-0 pe-0"> </Menu.Item>
              
            </Menu>
         </div>
      );
   }
}

export default Header;
