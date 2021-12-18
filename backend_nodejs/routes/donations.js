const db = require('../Config/db_connection');

const express = require('express');

const donations = require('express').Router();
const cors = require('cors');
const nodemailer = require('nodemailer');
const moment = require('moment');

donations.use(cors());

//For cookies

donations.use(express.urlencoded({ extended: true }));
donations.use(express.json());

let transporter = nodemailer.createTransport({
   host: 'smtp.gmail.com',
   port: 587,
   ssl: 465, // true for 465, false for other ports
});

donations.post('/save_donation', (req, res) => {
   console.log(req.body.details.purchase_units.amount);

   const order_id = req.body.details.id;
   const name =
      req.body.details.payer.name.given_name +
      ' ' +
      req.body.details.payer.name.surname;
   const amount = req.body.amount;
   const date = req.body.details.update_time;
   const chapter = req.body.chapter;
   const status = req.body.details.status;

   if (status == 'COMPLETED') {
      const save =
         'INSERT INTO donations (order_id, name, amount, date, club_name, status) VALUES (?, ?, ?, ?, ?, ?);';
      db.query(save, [order_id, name, amount, date, chapter, status], (err) => {
         if (err) {
            console.log(err);
         } else {
            const set =
               'UPDATE funds SET total_funds = total_funds + ?, donations = donations + ?  WHERE club_name = ?';
            db.query(set, [amount, amount, chapter], (err, result) => {
               if (err) {
                  res.send(err);
               } else {
                  const sqlAll = 'SELECT email FROM members WHERE chapter = ?';
                  db.query(sqlAll, chapter, (err, result) => {
                     const emailList = JSON.parse(JSON.stringify(result));

                     emailList.forEach((element) => {
                        let info = transporter.sendMail({
                           from: 'Rotary Zamboanga City <rotaryzamboangacity@gmail.com>', // sender address
                           to: element.email, // list of receivers
                           subject: 'DONATION RECEIVED', // Subject line

                           html: `<h1>SOMEONE DONATED IN YOUR CLUB</h1> <br/>
                        <h3>Donation details: </h3> <br/> 
                        <h3>Name: ${name}</b> <br/> Date: <b>${moment(
                              date
                           ).format('LLLL')} <br/>
                        Amount:${amount} </b>   <br/>.
                        <i> CHAPTER: ${chapter}
                        </i>`,

                           auth: {
                              user: 'rotaryzamboangacity@gmail.com', // generated ethereal user
                              pass: 'rotaractzc', // generated ethereal password
                           },
                        });
                     });
                     res.send({ message: 'success' });
                  });
               }
            });
         }
      });
   } else {
      res.send({ message: 'failed' });
   }
});

module.exports = donations;
