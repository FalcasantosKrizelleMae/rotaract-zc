const db = require('../Config/db_connection');

// const dotenv = require('dotenv');

// dotenv.config({ path: './.env' });

const paypal = require('paypal-rest-sdk');

const express = require('express');

const nodemailer = require('nodemailer');
const schedule = require('node-schedule');

const moment = require('moment');

const payment = require('express').Router();
const cors = require('cors');

payment.use(cors());

payment.use(express.urlencoded({ extended: true }));
payment.use(express.json());

let transporter = nodemailer.createTransport({
   host: 'smtp.gmail.com',
   port: 587,
   ssl: 465, // true for 465, false for other ports
});

// //PAY
// payment.post('/pay', (req, res) => {
//    const create_payment_json = {
//       redirect_urls: {
//          return_url: 'http://localhost:5000/payment/success',
//          cancel_url: 'http://localhost:3000/cancel',
//       },
//    };

//    paypal.payment.create(create_payment_json, function (error, payment) {
//       if (error) {
//          throw error;
//       } else {
//          for (let i = 0; i < payment.links.length; i++) {
//             if (payment.links[i].rel === 'approval_url') {
//                res.send(payment.links[i].href);
//             }
//          }
//       }
//    });
// });

// payment.get('/success', (req, res) => {
//    const payerId = req.query.PayerID;
//    const paymentId = req.query.paymentId;

//    const execute_payment_json = {
//       payer_id: payerId,
//       transactions: [
//          {
//             amount: {
//                currency: 'USD',
//                total: '20.00',
//             },
//          },
//       ],
//    };

//    paypal.payment.execute(
//       paymentId,
//       execute_payment_json,
//       function (error, payment) {
//          if (error) {
//             console.log(error.response);
//             throw error;
//          } else {
//             const data = payment.payer.payer_info;
//             res.send(`
//                Payment details: <br/>
//                Payment id: ${payment.id} <br/>
//                Sender name: ${data.first_name + ' ' + data.last_name}   <br/>
//                Email: ${payment.transactions[0].payee.email} <br/> <br/>
//                Transaction details: <br/> Amount:  ${
//                   payment.transactions[0].amount.total +
//                   ' ' +
//                   payment.transactions[0].amount.currency
//                }   <br/>

//                Payment method: ${payment.payer.payment_method} <br/>
//                Description: ${payment.transactions[0].description} <br/>
//                Transaction fee: ${
//                   payment.transactions[0].related_resources[0].sale
//                      .transaction_fee.value +
//                   ' ' +
//                   payment.transactions[0].related_resources[0].sale
//                      .transaction_fee.currency
//                }
//             `);
//          }
//       }
//    );
// });

//SET PAYMENT
payment.post('/set_payment', (req, res) => {
   const amount = req.body.amount;
   const due_date = req.body.due_date;
   const chapter = req.body.chapter;

   const new_due = moment(due_date).subtract(12, 'hours').format();

   const sqlSetPay =
      'INSERT INTO payments (amount, due_date, chapter) VALUES (?, ?, ?)';
   db.query(sqlSetPay, [amount, new_due, chapter], (err, result) => {
      if (err) {
         res.send({ message: 'error' });
      } else {
         const sql = 'SELECT email FROM members WHERE chapter = ?';
         db.query(sql, chapter, (err, response) => {
            if (err) {
               res.send(err);
            } else {
               const emailList = JSON.parse(JSON.stringify(response));

               emailList.forEach((element) => {
                  let info = transporter.sendMail({
                     from: 'Rotary Zamboanga City <rotaryzamboangacity@gmail.com>', // sender address
                     to: element.email, // list of receivers
                     subject: 'A reminder for your payment!', // Subject line

                     html: `<b>REMINDER!!!! <br/> Monthly dues must be paid on time, thank you! </h4>  Event details: <br/> Amount: <b> ${amount}</b> <br/> <div classname="text-danger">Due date: <b>${moment(
                        due_date
                     ).format(
                        'll'
                     )}</b> </div> <br/> Other details: <br/><br/> <i>You can using Paypal and credit card</i>`,

                     auth: {
                        user: 'rotaryzamboangacity@gmail.com', // generated ethereal user
                        pass: 'rotaractzc', // generated ethereal password
                     },
                  });
               });

               schedule.scheduleJob(new_due, function () {
                  emailList.forEach((element) => {
                     let info = transporter.sendMail({
                        from: 'Rotary Zamboanga City <rotaryzamboangacity@gmail.com>', // sender address
                        to: element.email, // list of receivers
                        subject: 'A reminder for your payment!', // Subject line

                        html: `<b>Hi! Today is the due date for your monthly dues. <br/> Monthly dues must be paid on time, thank you! </h4>  Event details: <br/> Amount: <b> ${amount}</b> <br/> <div classname="text-danger">Due date: <b>${moment(
                           due_date
                        ).format(
                           'll'
                        )}</b> </div> <br/> Other details:  <br/><br/> <i>You can using Paypal and credit card</i>`,

                        auth: {
                           user: 'rotaryzamboangacity@gmail.com', // generated ethereal user
                           pass: 'rotaractzc', // generated ethereal password
                        },
                     });
                  });
               });

               const setBal =
                  'UPDATE members SET balance = ? WHERE chapter = ?';
               db.query(setBal, [amount, chapter], (err, response) => {
                  if (err) {
                     res.send(err);
                  } else {
                     console.log('success');
                  }
               });
               res.send({ message: 'success' });
            }
         });
      }
   });
});

payment.get(`/get_payment/:chapter`, (req, res) => {
   const chapter = req.params.chapter;
   const sqlGet =
      'SELECT * from payments WHERE status = "current" AND chapter = ?';
   db.query(sqlGet, chapter, (err, result) => {
      if (err) {
         res.send({ message: 'error' });
      } else {
         res.send(result);
      }
   });
});

payment.post('/save', (req, res) => {
   const name = req.body.name;
   const amount = req.body.amount;
   const chapter = req.body.chapter;
   const order_id = req.body.order_id;

   const save =
      'INSERT INTO transaction (name, amount, chapter, order_id) VALUES (?,?,?,?)';
   db.query(save, [name, amount, chapter, order_id], (err, result) => {
      if (err) {
         res.send({ message: 'error' });
      } else {
         res.send({ message: 'success' });
         res.send(result);
      }
   });
});

payment.post('/test', (req, res) => {
   console.log(req.body.details);
});

module.exports = payment;
