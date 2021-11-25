import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Menu } from 'antd';
import logo from '../../../images/logo.png';
import { Link } from 'react-router-dom';
import * as AiIcons from 'react-icons/ai';

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

               <Menu.Item
                  key="dash"
                  icon={<AiIcons.AiOutlineAppstore />}
                  className="item"
               >
                  <Link to={{}}>Dashboard</Link>
               </Menu.Item>
               <Menu.Item
                  key="events"
                  icon={<AiIcons.AiOutlineCalendar />}
                  className="item"
               >
                  <Link to={{}}>Events</Link>
               </Menu.Item>

               <Menu.Item
                  key="alipay"
                  icon={<AiIcons.AiOutlineAccountBook />}
                  className="item"
               >
                  <Link
                     to={{ pathname: `/transaction/${member_id}` }}
                     className="text-decoration-none"
                  >
                     Transaction
                  </Link>
               </Menu.Item>

               <Menu.Item className=" ms-auto me-0 pe-0"> </Menu.Item>
               <SubMenu
                  key="SubMenu1"
                  icon={<AiIcons.AiOutlineCaretDown />}
                  classname="m-0"
                  title="MEMBER"
               >
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
