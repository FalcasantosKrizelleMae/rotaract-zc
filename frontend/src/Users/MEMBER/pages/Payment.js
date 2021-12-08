import { PayPalButton } from 'react-paypal-button-v2';
import React from 'react';
import { useHistory } from 'react-router';
import Axios from 'axios';

export default function Payment() {
   const chapter = localStorage.getItem('chapter');
   // const amount = localStorage.getItem('amount');

   let history = useHistory();
   // const [orderID, setOrderID] = useState(false);
   // const [billingDetails, setBillingDetails] = useState('');

   // const createOrder = (data, actions) => {
   //    return actions.order
   //       .create({
   //          purchase_units: [
   //             {
   //                description: `paymen for ${chapter}`,
   //                amount: {
   //                   // charge users $499 per order
   //                   value: amountPay,
   //                   currency: 'PHP',
   //                },
   //             },
   //          ],
   //          // remove the applicaiton_context object if you need your users to add a shipping address
   //          application_context: {
   //             shipping_preference: 'NO_SHIPPING',
   //          },
   //       })
   //       .then((orderID) => {
   //          setOrderID(orderID);
   //          return orderID;
   //       });
   // };

   // // handles when a payment is confirmed for paypal
   // const
   // // handles payment errors

   return (
      <div className="container">
         <PayPalButton
            createOrder={(data, actions) => {
               return actions.order.create({
                  purchase_units: [
                     {
                        description: `Payment for ${chapter}`,
                        amount: {
                           value: '500.00',
                        },
                     },
                  ],
                  // application_context: {
                  //   shipping_preference: "NO_SHIPPING" // default is "GET_FROM_FILE"
                  // }
               });
            }}
            style={{
               color: 'blue',
               shape: 'pill',
               label: 'pay',
            }}
            onApprove={async (data, actions) => {
               // Capture the funds from the transaction
               return actions.order.capture().then(function (details) {
                  // Show a success message to your buyer
                  Axios.post('http://localhost:5000/payment/save')
                     .then((response) => {
                        alert('sucess');
                        history.push(`/`);
                     })
                     .catch((error) => {
                        console.log({
                           error,
                        });
                        alert('Authentication failed');
                     });
               });
            }}
            options={{
               'client-id':
                  chapter === 'Metro Zamboanga'
                     ? 'AeUH-TloPaiFneY_xxZboERWqyxCQpX1hQEgXXkyfS7SiUd2Gbf8jfTEW8K7tMgUEwjri74vYeQF79iN'
                     : chapter === 'Western Mindanao State University (WMSU)'
                     ? 'AZbmJPYtB1DsCgR5tAeF_bm8JxvwUYgDx_xitzoh30dIhrYqgYwEm2GVn5BjEhyN53AhatcOoXj1ykti'
                     : chapter === 'Southern City Colleges'
                     ? 'AcltDSmw1GGXyyHYnoH95j59iCfCH9isXlKAZRXwkYw83wFL2VMkQ9Pze-xWcnpH9Wu8r0__ME8VNbAX'
                     : '',
               currency: 'PHP',
            }}
         />
      </div>
   );
}
