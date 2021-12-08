import React, { useEffect, useState } from 'react';

import Navbar from '../components/Navbar';
import Axios from 'axios';
import { Button, Modal } from 'antd';
import moment from 'moment';

import PaymentButton from './Payment';

function Transactions() {
   // const [amountPay, setAmount] = useState('');
   const [list, setList] = useState([]);
   const [dataList, setDataList] = useState([]);
   const chapter = localStorage.getItem('chapter');
   const id = localStorage.getItem('member_id');

   useEffect(() => {
      Axios.get(`http://localhost:5000/auth/get_user/${id}`).then(
         (response) => {
            if (response) {
               setList(response.data);
            }
         }
      );

      Axios.get(`http://localhost:5000/payment/get_payment/${chapter}`)
         .then((response) => {
            if (response) {
               // console.log(response.data);
               setDataList(response.data);
            }
         })

         .catch((error) => console.log(error));
   });

   // const pay = () => {
   //    Axios.post('http://localhost:5000/payment/pay')
   //       .then((response) => {
   //          window.location.href = response.data;
   //       })
   //       .catch((error) => {
   //          console.log({
   //             error,
   //          });
   //          alert('Authentication failed');
   //       });
   // };

   const info = () => {
      Modal.info({
         title: 'Choose a payment Method',
         content: (
            <div className="container mx-auto">
               <PaymentButton />
            </div>
         ),
      });
   };

   return (
      <div>
         <Navbar />
         <div className="main mx-5">
            <div className="container shadow-sm rounded border p-4">
               {list.map((item) => {
                  return (
                     <>
                        BALANCE: {''} <br />
                        <br />
                        <h3>{item.balance} php</h3>
                        <Button
                           onClick={info}
                           type="primary"
                           className="float-end"
                        >
                           Pay now
                        </Button>
                     </>
                  );
               })}

               {dataList.map((item) => {
                  return (
                     <h6 className="mb-3">
                        Payment for this month ({moment().format('MMMM')}):{' '}
                        <br />
                        {item.amount} php
                        <br />
                        <br />
                        Due Date:
                        {moment(item.due_date).format('llll')}
                        <br />
                        <br />
                     </h6>
                  );
               })}
            </div>
         </div>{' '}
      </div>
   );
}

export default Transactions;
