import React from 'react';
import Navbar from '../components/Navbar';
import Axios from 'axios';
import { Button } from 'react-bootstrap';

function Transactions() {
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
   return (
      <div>
         <Navbar />
         <div className="main mx-5">
            <h3>Amount to pay: 100</h3>
            <Button onClick={pay}>Pay now</Button>
         </div>
      </div>
   );
}

export default Transactions;
