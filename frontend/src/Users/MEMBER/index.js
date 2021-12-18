import Events from './pages/Events';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;

function MemberPage() {
   let history = useHistory();

   const id = localStorage.getItem('member_id');
   const name = localStorage.getItem('name');
   const status = localStorage.getItem('status');

   useEffect(() => {
      if (status === 'new') {
         confirm({
            title: 'Welcome to Rotary Zamboanga ',
            icon: <ExclamationCircleOutlined />,
            content:
               'Kindly change your password and input your personal details. Thank you!',
            okText: 'Proceed',
            onOk() {
               return new Promise((resolve, reject) => {
                  setTimeout(Math.random() > 0.6 ? resolve : reject, 1000);
                  history.push({
                     pathname: `/profile/${id}`,
                     state: {
                        status: status,
                        name: name,
                     },
                  });
               }).catch(() => console.log('Oops errors!'));
            },
            onCancel() {},
         });
      } else {
         console.log('old');
      }
   });

   return (
      <div>
         <Events />
      </div>
   );
}

export default MemberPage;
