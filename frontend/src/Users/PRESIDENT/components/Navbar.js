import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Menu } from 'antd';

import logo from '../../../images/logo.png';
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;
const member_id = localStorage.getItem('member_id');

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

               <Menu.Item key="mail" className="item">
                  <Link
                     to={{
                        pathname: `/president/${member_id}`,
                     }}
                     className="text-decoration-none"
                  >
                     Dashboard
                  </Link>
               </Menu.Item>

               <SubMenu key="SubMenu3" classname="m-0" title="Requests">
                  <Menu.Item key="setting:1">Reports</Menu.Item>
                  <Menu.Item key="setting:2">
                     <Link
                        to={{
                           pathname: `/pres-events/${member_id}`,
                        }}
                        className="text-decoration-none"
                     >
                        Events
                     </Link>
                  </Menu.Item>
               </SubMenu>

               <Menu.Item key="setting:3">Funds</Menu.Item>

               <Menu.Item key="alipay" className="item">
                  <Link
                     to={{
                        pathname: `/pres-accounts/${member_id}`,
                     }}
                     className="text-decoration-none"
                  >
                     Members
                  </Link>
               </Menu.Item>

               <Menu.Item className=" ms-auto me-0 pe-0"></Menu.Item>
               <SubMenu key="SubMenu1" classname="m-0" title="PRESIDENT">
                  <Menu.Item key="profile">Profile</Menu.Item>
                  <Menu.Item key="logout">
                     <button
                        onClick={() => {
                           localStorage.clear();
                           window.location.href = '/login';
                        }}
                        className="btn"
                     >
                        Logout
                     </button>
                  </Menu.Item>
               </SubMenu>
            </Menu>
         </div>
      );
   }
}

export default Header;
