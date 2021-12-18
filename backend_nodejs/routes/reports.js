const db = require('../Config/db_connection');

const express = require('express');

const reports = require('express').Router();
const cors = require('cors');
const nodemailer = require('nodemailer');
const { customAlphabet } = require('nanoid');
const moment = require('moment');
const { report } = require('./payment');

reports.use(cors());

//For cookies

reports.use(express.urlencoded({ extended: true }));
reports.use(express.json());

let transporter = nodemailer.createTransport({
   host: 'smtp.gmail.com',
   port: 587,
   ssl: 465, // true for 465, false for other ports
});

reports.post('/add_report', (req, res) => {
   const nanoid = customAlphabet('1234567890abcdc', 10);
   const report_id = nanoid();

   const event_id = req.body.event_id;

   const sqlGetData = 'SELECT * from events WHERE event_id = ?;';
   db.query(sqlGetData, event_id, (err, result) => {
      if (err) {
         res.send({ message: ' no data found' });
      } else {
         db.query(
            'UPDATE events SET status = "done" WHERE event_id = ?;',
            event_id,
            (err, set) => {
               if (err) {
                  res.send(err);
               } else {
                  db.query(
                     'SELECT * from reports WHERE event_id = ?;',
                     event_id,
                     (err, checked) => {
                        if (err) {
                           res.send(err);
                        } else {
                           if (checked.length === 1) {
                              res.send({ message: 'exist' });
                           } else {
                              const sqlInsert =
                                 'INSERT INTO reports (report_id, event_id, chapter, status, date_created) VALUES (?, ?, ?, "requested", CURRENT_TIMESTAMP())';
                              db.query(
                                 sqlInsert,
                                 [report_id, event_id, result[0].chapter],
                                 (err, response) => {
                                    if (err) {
                                       res.send(err);
                                    } else {
                                       console.log(response);
                                       res.send({ message: 'success' });
                                    }
                                 }
                              );
                           }
                        }
                     }
                  );
               }
            }
         );
      }
   });
});

reports.get('/all', (req, res) => {
   //    const sqlGetData =
   //       'SELECT attendance.member_id, attendance.status, members.first_name, members.last_name from attendance INNER JOIN members ON attendance.member_id = members.member_id WHERE event_id = ?;';

   db.query('SELECT * from reports', (err, result) => {
      if (err) {
         res.send(err);
      } else {
         res.send(result);
      }
   });
});

reports.get('/chapter/:chapter', (req, res) => {
   //    const sqlGetData =
   //       'SELECT attendance.member_id, attendance.status, members.first_name, members.last_name from attendance INNER JOIN members ON attendance.member_id = members.member_id WHERE event_id = ?;';

   const chapter = req.params.chapter;

   db.query(
      'SELECT * from reports WHERE chapter = ?',
      chapter,
      (err, result) => {
         if (err) {
            res.send(err);
         } else {
            res.send(result);
         }
      }
   );
});

reports.post('/decline', (req, res) => {
   const report_id = req.body.report_id;

   db.query(
      'UPDATE reports SET status = "declined", date_reviewed = CURRENT_TIMESTAMP() WHERE report_id = ?;',
      report_id,
      (err) => {
         if (err) {
            res.send(err);
         } else {
            res.send({ message: 'success' });
         }
      }
   );
});

reports.post('/accept', (req, res) => {
   const report_id = req.body.report_id;

   db.query(
      'UPDATE reports SET status = "accepted", date_reviewed = CURRENT_TIMESTAMP() WHERE report_id = ?;',
      report_id,
      (err) => {
         if (err) {
            res.send(err);
         } else {
            res.send({ message: 'success' });
         }
      }
   );
});

reports.post('/sent', (req, res) => {
   const report_id = req.body.report_id;
   db.query(
      'UPDATE reports SET status = "sent", date_sent = CURRENT_TIMESTAMP() WHERE report_id = ?;',
      report_id,
      (err) => {
         if (err) {
            res.send(err);
         } else {
            res.send({ message: 'success' });
         }
      }
   );
});

reports.get('/get_report', (req, res) => {
   const event_id = req.query.event_id;

   const sqlGetReport =
      'SELECT reports.*, events.* FROM reports INNER JOIN events ON reports.event_id = events.event_id WHERE events.event_id = ?;';
   db.query(sqlGetReport, event_id, (err, result) => {
      if (err) {
         res.send(err);
      } else {
         res.send(result);
         console.log(result);
      }
   });
});

reports.post('/send-mail', (req, res) => {
   const email = req.body.email;
   const description = req.body.description;
   const file = req.body.file;

   transporter.sendMail(
      {
         from: 'Rotary Zamboanga City <rotaryzamboangacity@gmail.com>', // sender address
         to: email, // list of receivers
         subject: 'Rotary Report', // Subject line
         text: description, // plain text body
         attachments: [
            {
               filename: 'Reports.pdf',
               path: 'Z:' + file,
            },
         ],
         auth: {
            user: 'rotaryzamboangacity@gmail.com', // generated ethereal user
            pass: 'rotaractzc', // generated ethereal password
         },
      },
      console.log('success')
   );
});

module.exports = reports;
