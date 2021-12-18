import React, { useEffect, useState } from 'react';

import Navbar from '../components/Navbar';
import Axios from 'axios';
import { Button } from 'antd';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

function Transactions() {
   // const [amountPay, setAmount] = useState('');
   let history = useHistory();
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

   return (
      <div>
         <Navbar />
         <div className="main">
            <div className="container shadow-sm rounded border p-4">
               {list.map((item) => {
                  return (
                     <>
                        BALANCE: {''} <br />
                        <br />
                        <h3>{item.balance} php</h3>
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
                        Due Date: <br />
                        {moment(item.due_date).format('llll')}
                        <br />
                        <br />
                     </h6>
                  );
               })}

               <Button
                  type="primary"
                  onClick={() => {
                     history.push('/pay-mem');
                  }}
               >
                  Pay now
               </Button>
            </div>
         </div>{' '}
      </div>
   );
}

export default Transactions;
