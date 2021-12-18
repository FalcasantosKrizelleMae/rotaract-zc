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

                     html: `<b>REMINDER!!!! <br/> Monthly dues must be paid on time, thank you! </h4>  DETAILS: <br/> Amount: <b> ${amount}</b> <br/> <div classname="text-danger">Due date: <b>${moment(
                        due_date
                     ).format(
                        'll'
                     )}</b> </div> <br/> Other details: <br/><br/> <i>You can pay thru Paypal or using Credit card</i>`,

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

payment.get(`/get_transaction/:chapter`, (req, res) => {
   const chapter = req.params.chapter;
   const sqlGet = 'SELECT * from transaction WHERE chapter = ?';
   db.query(sqlGet, chapter, (err, result) => {
      if (err) {
         res.send({ message: 'error' });
      } else {
         res.send(result);
      }
   });
});

payment.post('/save_payment', (req, res) => {
   console.log(req.body.details);
   const order_id = req.body.details.id;
   const name =
      req.body.details.payer.name.given_name +
      ' ' +
      req.body.details.payer.name.surname;
   const amount = req.body.amount;
   const date = req.body.details.update_time;
   const chapter = req.body.chapter;
   const status = req.body.details.status;
   const member_id = req.body.member_id;
   if (status === 'COMPLETED') {
      const save =
         'INSERT INTO transaction (order_id, name, amount, date, chapter, status, member_id) VALUES (?, ?, ?, ?, ?, ?, ?);';
      db.query(
         save,
         [order_id, name, amount, date, chapter, status, member_id],
         (err, result) => {
            if (err) {
               console.log(err);
            } else {
               const setBal =
                  'UPDATE members SET balance = balance - ? WHERE member_id = ?';
               db.query(setBal, [amount, member_id], (err) => {
                  if (err) {
                     res.send(err);
                  } else {
                     const set =
                        'UPDATE funds SET total_funds = total_funds + ?, collections = collections + ?  WHERE club_name = ?';
                     db.query(set, [amount, amount, chapter], (err) => {
                        if (err) {
                           res.send(err);
                        } else {
                           const sql =
                              'UPDATE payments SET no_of_payers = no_of_payers + 1 WHERE chapter = ? AND status = "current"';
                           db.query(sql, chapter, (err) => {
                              if (err) {
                                 res.send(err);
                              } else {
                                 res.send(result);
                              }
                           });
                        }
                     });
                  }
               });
            }
         }
      );
   } else {
      res.send({ message: 'error' });
   }
});

payment.get(`/get_transaction`, (req, res) => {
   const member_id = req.query.member_id;
   const sqlGet = 'SELECT * from transaction WHERE member_id = ?';
   db.query(sqlGet, member_id, (err, result) => {
      if (err) {
         res.send(err);
      } else {
         res.send(result);
      }
   });
});

module.exports = payment;
