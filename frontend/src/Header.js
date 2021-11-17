import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Menu } from 'antd';
import {
   MailOutlined,
   AppstoreOutlined,
   SettingOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import * as AiIcons from 'react-icons/ai';
import logo from './images/logo.png';

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
         <>
            <div
               className=" bg-white pb-0 fixed-top
         "
            >
               <Menu
                  onClick={this.handleClick}
                  selectedKeys={[current]}
                  mode="horizontal"
                  className=" mt-3
                px-4"
               >
                  <Menu.Item className="pb-3 me-auto ">
                     <Link to="/">
                        <img
                           src={logo}
                           height={50}
                           className="img-responsive"
                           alt="Rotaract logo"
                        />
                     </Link>
                  </Menu.Item>

                  <Menu.Item
                     key="mail"
                     icon={<MailOutlined />}
                     className="item"
                  >
                     Dashboard
                  </Menu.Item>
                  <Menu.Item
                     key="app"
                     icon={<AppstoreOutlined />}
                     className="item"
                  >
                     <Link to="/sect-events" className="text-decoration-none">
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
                  <Menu.Item
                     key="alipay"
                     icon={<MailOutlined />}
                     className="item"
                  >
                     <Link to="/sect-accounts" className="text-decoration-none">
                        Accounts
                     </Link>
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
}

export default Header;
