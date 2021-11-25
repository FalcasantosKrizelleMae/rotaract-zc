const db = require('../Config/db_connection');

const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const paypal = require('paypal-rest-sdk');

const express = require('express');

const payment = require('express').Router();
const cors = require('cors');

payment.use(cors());

payment.use(express.urlencoded({ extended: true }));
payment.use(express.json());

paypal.configure({
   mode: 'sandbox', //sandbox or live
   client_id: process.env.CLIENT_ID,
   client_secret: process.env.CLIENT_SECRET,
});

//PAY
payment.post('/pay', (req, res) => {
   const create_payment_json = {
      intent: 'sale',
      payer: {
         payment_method: 'paypal',
      },
      redirect_urls: {
         return_url: 'http://localhost:5000/payment/success',
         cancel_url: 'http://localhost:3000/cancel',
      },
      transactions: [
         {
            amount: {
               currency: 'USD',
               total: '20.00',
            },
            description: 'Purchase',
         },
      ],
   };

   paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
         throw error;
      } else {
         for (let i = 0; i < payment.links.length; i++) {
            if (payment.links[i].rel === 'approval_url') {
               res.send(payment.links[i].href);
            }
         }
      }
   });
});

payment.get('/success', (req, res) => {
   const payerId = req.query.PayerID;
   const paymentId = req.query.paymentId;

   const execute_payment_json = {
      payer_id: payerId,
      transactions: [
         {
            amount: {
               currency: 'USD',
               total: '20.00',
            },
         },
      ],
   };

   paypal.payment.execute(
      paymentId,
      execute_payment_json,
      function (error, payment) {
         if (error) {
            console.log(error.response);
            throw error;
         } else {
            const data = payment.payer.payer_info;
            res.send(`
               Payment details: <br/>
               Payment id: ${payment.id} <br/>
               Sender name: ${data.first_name + ' ' + data.last_name}   <br/>
               Email: ${payment.transactions[0].payee.email} <br/> <br/>
               Transaction details: <br/> Amount:  ${
                  payment.transactions[0].amount.total +
                  ' ' +
                  payment.transactions[0].amount.currency
               }   <br/>

               Payment method: ${payment.payer.payment_method} <br/>
               Description: ${payment.transactions[0].description} <br/>
               Transaction fee: ${
                  payment.transactions[0].related_resources[0].sale
                     .transaction_fee.value +
                  ' ' +
                  payment.transactions[0].related_resources[0].sale
                     .transaction_fee.currency
               }
            `);
         }
      }
   );
});

module.exports = payment;
