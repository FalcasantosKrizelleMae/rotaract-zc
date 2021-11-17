import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

const Success = () => {
   const [payments, setPayments] = useState([]);

   //Display table
   useEffect(() => {
      Axios.get('https://api.paymongo.com/v1/payments', {
         headers: {
            'Content-Type': 'application/json',
            Authorization: 'Basic c2tfdGVzdF9NazhoMmttNFZ3MlU0c01NdDk0MWhXcjc6',
         },
      }).then((response) => {
         setPayments(response.data.data);
      });
   }, []);

   //CREATE PAYMENT API
   const create_payment = (req, res) => {
      var amount = parseInt(localStorage.getItem('amount'));
      var id = localStorage.getItem('id');
      var full_name = localStorage.getItem('name');

      let data = JSON.stringify({
         data: {
            attributes: {
               amount: amount,
               source: {
                  id: id,
                  type: 'source',
               },
               description: `Paid by ${full_name} Payment for Rotary monthly collections`,
               currency: 'PHP',
               statement_descriptor:
                  'Monthly dues payment for Zamboanga City Rotary Clubs',
            },
         },
      });
      Axios.post('https://api.paymongo.com/v1/payments', data, {
         headers: {
            'Content-Type': 'application/json',
            Authorization: 'Basic c2tfdGVzdF9NazhoMmttNFZ3MlU0c01NdDk0MWhXcjc6',
         },
      }).then((response) => {
         if (localStorage.getItem('amount') === '') {
            Swal.fire({
               title: 'Member Registered!',
               icon: 'success',
            });
         } else {
            localStorage.clear();
            console.log(response.data);
         }
      });
   };

   return (
      <div>
         <div className="container p-5">
            <Button variant="primary" onClick={create_payment}>
               Confirm payment
            </Button>
         </div>

         <h4 className="text-center mb-3"> Payment details </h4>
         <div className="container">
            <Table striped bordered hover responsive>
               <thead>
                  <tr>
                     <th>Email</th>
                     <th className="text-center">Amount</th>
                     <th>Status</th>
                     <th>Description</th>
                     <th>Payemnt date</th>
                  </tr>
               </thead>
               <tbody>
                  {payments &&
                     payments.map((payment) => {
                        return (
                           <tr key={payment.id}>
                              <td>{payment.attributes.billing.email}</td>
                              <td>{payment.attributes.amount}</td>

                              <td>{payment.attributes.status}</td>
                              <td>{payment.attributes.statement_descriptor}</td>
                              <td>{payment.attributes.date}</td>
                           </tr>
                        );
                     })}
               </tbody>
            </Table>
         </div>
      </div>
   );
};

export default Success;
