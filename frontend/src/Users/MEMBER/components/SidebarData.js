import React from 'react';
import * as BiIcons from 'react-icons/bi';

import * as MdIcons from 'react-icons/md';

export const SidebarData = [
   {
      title: 'Profile',
      path: '/member/profile',
      icon: <BiIcons.BiUser />,
      iName: 'icon-list',
      cName: 'nav-text',
   },
   {
      title: 'Transactions',
      path: '/member/transactions',
      icon: <MdIcons.MdPayment />,
      iName: 'icon-list',
      cName: 'nav-text',
   },
   {
      title: 'Events',
      path: '/member/events',
      icon: <BiIcons.BiCalendar />,
      iName: 'icon-list',
      cName: 'nav-text',
   },
];
