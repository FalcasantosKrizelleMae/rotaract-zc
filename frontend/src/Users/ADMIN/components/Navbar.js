import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Menu } from 'antd';
import {
   MailOutlined,
   AppstoreOutlined,
   SettingOutlined,
} from '@ant-design/icons';
import logo from '../../../images/logo.png';
import { Link } from 'react-router-dom';
import * as AiIcons from 'react-icons/ai';

const { SubMenu } = Menu;

class Header extends Component {
   state = {
      current: 'mail',
   };

   handleClick = (e) => {
      console.log('click ', e);
      this.setState({ current: e.key });
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

               <Menu.Item key="mail" icon={<MailOutlined />} className="item">
                  <Link to="/admin" className="text-decoration-none">
                     Dashboard
                  </Link>
               </Menu.Item>
               <Menu.Item
                  key="app"
                  icon={<AppstoreOutlined />}
                  className="item"
               >
                  <Link to="/admin-events" className="text-decoration-none">
                     Events
                  </Link>
               </Menu.Item>

               <SubMenu
                  key="SubMenu"
                  icon={<SettingOutlined />}
                  title="Navigation Three - Submenu"
                  className="item"
               >
                  <Menu.Item key="setting:1">Option 1</Menu.Item>
                  <Menu.Item key="setting:2">Option 2</Menu.Item>
               </SubMenu>
               <Menu.Item key="alipay" icon={<MailOutlined />} className="item">
                  <Link to="/accounts" className="text-decoration-none">
                     Accounts
                  </Link>
               </Menu.Item>

               <Menu.Item className=" ms-auto me-0 pe-0"></Menu.Item>
               <SubMenu
                  key="SubMenu1"
                  icon={<AiIcons.AiOutlineCaretDown />}
                  classname="m-0"
                  title="ADMIN"
               >
                  <Menu.Item key="profile">Profile</Menu.Item>
                  <Menu.Item key="logout">
                     <Link to="/login" className="text-decoration-none">
                        Logout
                     </Link>
                  </Menu.Item>
               </SubMenu>
            </Menu>
         </div>
      );
   }
}

export default Header;
