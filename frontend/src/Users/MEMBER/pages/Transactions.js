import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Axios from 'axios';
import { Button } from 'antd';
import moment from 'moment';

function Transactions() {
   const [list, setList] = useState([]);
   const [dataList, setDataList] = useState([]);
   const chapter = localStorage.getItem('chapter');
   const id = localStorage.getItem('member_id');
   const pay = () => {
      Axios.post('http://localhost:5000/payment/pay')
         .then((response) => {
            window.location.href = response.data;
         })
         .catch((error) => {
            console.log({
               error,
            });
            alert('Authentication failed');
         });
   };

   useEffect(() => {
      Axios.get(`http://localhost:5000/payment/get_payment/${chapter}`)
         .then((response) => {
            if (response) {
               setDataList(response.data);
            }
         })

         .catch((error) => console.log(error));
   });

   useEffect(() => {
      Axios.get(`http://localhost:5000/auth/get_user/${id}`)
         .then((response) => {
            if (response) {
               setList(response.data);
            }
         })

         .catch((error) => console.log(error));
   });
   return (
      <div>
         <Navbar />
         <div className="main mx-5">
            <div className="container shadow-sm rounded border p-4">
               {list.map((item) => {
                  return (
                     <h6>
                        BALANCE: {''} <br />
                        <br />
                        <h3>{item.balance} php</h3>
                        <Button
                           onClick={pay}
                           type="primary"
                           className="float-end"
                        >
                           Pay now
                        </Button>
                     </h6>
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
         </div>
      </div>
   );
}

export default Transactions;
