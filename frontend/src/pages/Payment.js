import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import React, { useState } from 'react';

function Payment({ authorized }) {
   const [fee, setFee] = useState(0);
   const [line, setLine] = useState('');
   const [state, setState] = useState('');
   const [postal, setPostal] = useState('');
   const [city, setCity] = useState('');

   const [full_name, setFull_name] = useState('');
   const [phone, setPhone] = useState('');
   const [email, setEmail] = useState('');

   const pay_gcash = () => {
      let data = JSON.stringify({
         data: {
            attributes: {
               amount: fee,
               redirect: {
                  success: 'http://localhost:3000/success',
                  failed: 'http://localhost:3000/failed',
               },
               billing: {
                  address: {
                     line1: line,
                     state: state,
                     postal_code: postal,
                     city: city,
                     country: 'PH',
                  },
                  name: full_name,
                  phone: phone,
                  email: email,
               },
               type: 'gcash',
               currency: 'PHP',
            },
         },
      });
      Axios.post('https://api.paymongo.com/v1/sources', data, {
         headers: {
            'Content-Type': 'application/json',
            Authorization: 'Basic cGtfdGVzdF9hdnFjd0ZvYnpTemN0VFluSGZhNDV5clg6',
         },
      }).then((response) => {
         localStorage.setItem('id', response.data.data.id);
         localStorage.setItem('status', response.data.data.attributes.status);
         localStorage.setItem('type', response.data.data.attributes.type);
         localStorage.setItem('amount', fee);
         localStorage.setItem('name', full_name);
         localStorage.setItem('email', email);
         console.log(response.data);
      });
   };

   if (!authorized) {
      return <Redirect to="/login" />;
   }
   return (
      <div className="container p-5">
         <div className="row">
            <div className="col-sm">
               Set amount to pay:
               <Form>
                  <div className="col-sm-8">
                     <Form.Control
                        type="number"
                        placeholder="100.00"
                        className="mb-3"
                        name={fee}
                        onChange={(e) => {
                           setFee(parseInt(e.target.value));
                        }}
                     ></Form.Control>
                  </div>
               </Form>
            </div>

            <div className="col-sm">
               Amount to pay is: <br />
               <b className="fs-3"> {fee} </b>
               <Form className="col-sm-8 mt-5">
                  <Form.Control
                     type="text"
                     placeholder="Address"
                     className="mb-3"
                     name={line}
                     onChange={(e) => {
                        setLine(e.target.value);
                     }}
                  ></Form.Control>

                  <Form.Control
                     type="text"
                     placeholder="State"
                     className="mb-3"
                     name={state}
                     onChange={(e) => {
                        setState(e.target.value);
                     }}
                  ></Form.Control>

                  <Form.Control
                     type="text"
                     placeholder="Postal Code"
                     className="mb-3"
                     name={postal}
                     onChange={(e) => {
                        setPostal(e.target.value);
                     }}
                  ></Form.Control>

                  <Form.Control
                     type="text"
                     placeholder="City"
                     className="mb-3"
                     name={city}
                     onChange={(e) => {
                        setCity(e.target.value);
                     }}
                  ></Form.Control>

                  <Form.Control
                     type="text"
                     placeholder="Full name"
                     className="mb-3"
                     name={full_name}
                     onChange={(e) => {
                        setFull_name(e.target.value);
                     }}
                  ></Form.Control>

                  <Form.Control
                     type="text"
                     placeholder="Phone"
                     className="mb-3"
                     name={phone}
                     onChange={(e) => {
                        setPhone(e.target.value);
                     }}
                  ></Form.Control>

                  <Form.Control
                     type="text"
                     placeholder="Email"
                     name={email}
                     className="mb-3"
                     onChange={(e) => {
                        setEmail(e.target.value);
                     }}
                  ></Form.Control>
               </Form>
               <Button
                  type="submit"
                  className="btn btn-primary my-3"
                  onClick={pay_gcash}
               >
                  Pay now
               </Button>
            </div>

            <div className="col-sm">Payment Status</div>
         </div>
      </div>
   );
}

export default Payment;
