const db = require('../Config/db_connection');
const express = require('express');
const bodyParser = require('body-parser');
const { customAlphabet } = require('nanoid');
const nodemailer = require('nodemailer');

const event = require('express').Router();
const cors = require('cors');
const { response } = require('express');
event.use(bodyParser.json());

event.use(
   cors({
      origin: ['http://localhost:3000'],
      methods: ['GET', 'POST'],
      credentials: true,
   })
);

let transporter = nodemailer.createTransport({
   host: 'smtp.gmail.com',
   port: 587,
   ssl: 465, // true for 465, false for other ports
});

//all events (admin)
event.get('/all', (req, res) => {
   const sqlSelect =
      'SELECT * FROM events WHERE chapter = "all" and status = "pending"';
   db.query(sqlSelect, (err, result) => {
      if (err) {
         console.log(err);
      } else {
         res.send(result);
      }
   });
});

//all events (admin)
event.get('/sect/all', (req, res) => {
   const sqlSelect = 'SELECT * FROM events WHERE status != "cancelled"';
   db.query(sqlSelect, (err, result) => {
      if (err) {
         console.log(err);
      } else {
         res.send(result);
      }
   });
});

//CANCELEED
event.get('/cancelled', (req, res) => {
   const sqlSelect =
      'SELECT * FROM events WHERE chapter = "all" AND status = "cancelled"';
   db.query(sqlSelect, (err, result) => {
      if (err) {
         console.log(err);
      } else {
         res.send(result);
      }
   });
});

event.get(`/cancelled/:chapter`, (req, res) => {
   const chapter = req.params.chapter;
   const sqlSelect =
      'SELECT * FROM events WHERE  status = "cancelled" AND chapter = ?';
   db.query(sqlSelect, chapter, (err, result) => {
      if (err) {
         console.log(err);
      } else {
         res.send(result);
      }
   });
});

event.get(`/pres/:chapter`, (req, res) => {
   const chapter = req.params.chapter;
   const sqlSelect = 'SELECT * FROM events WHERE chapter = ?';
   db.query(sqlSelect, chapter, (err, result) => {
      if (err) {
         console.log(err);
      } else {
         res.send(result);
      }
   });
});

//ADD EVENT
event.post('/add_event', (req, res) => {
   const title = req.body.title;
   const start = req.body.start;
   const end = req.body.end;
   const description = req.body.description;
   const chapter = req.body.chapter;

   const id = customAlphabet('1234567890', 6);
   const event_id = id();

   const event_code = customAlphabet('1234567890abcdefghijk', 10);
   const code = event_code();

   const checkId = 'SELECT start FROM events WHERE start = ?';
   db.query(checkId, start, (err, result) => {
      if (result.length === 0) {
         const sqlAdd =
            'INSERT INTO events (event_id, title, start, end, description, chapter, event_code) VALUES (?, ?, ?, ?, ?, ?, ?)';
         db.query(
            sqlAdd,
            [event_id, title, start, end, description, chapter, code],
            (err) => {
               if (err) {
                  res.send({ message: 'invalid' });
               } else {
                  // const sql = 'SELECT email FROM members';
                  // db.query(sql, (err, response) => {
                  //    if (err) {
                  //       res.send({ message: 'invalid' });
                  //    } else {
                  //       let info = transporter.sendMail({
                  //          from: 'Rotary Zamboanga City <rotaryzamboangacity@gmail.com>', // sender address
                  //          to: response.data, // list of receivers
                  //          subject:
                  //             'A NEW EVENT FOR ALL ROTARY ZAMBOANGA MEMBERS', // Subject line

                  //          html: `<h4> A new event is coming your way. </h4> <br/> Event details: <br/> What: <b> ${title}</b> <br/> When: <b>${start}</b> <br/> Other details: <b> ${description}</b> <br/><br/> <i>NOTE: Kindly present your QR Code for attedance. Have a great day ahead!</i>`,

                  //          auth: {
                  //             user: 'rotaryzamboangacity@gmail.com', // generated ethereal user
                  //             pass: 'rotaractzc', // generated ethereal password
                  //          },
                  //       });

                  res.send({ message: 'success' });
               }
            }
         );
      }
   });
});

//UPDATE
event.get('/cancel_event/:id', (req, res) => {
   const id = req.params.id;

   // const checkId = 'SELECT start FROM events where start = CURDATE()?';
   // db.query(checkId, id, (err, result) => {
   //    if (result.length === 0) {
   const sqlCancel =
      'UPDATE events SET status = "cancelled" WHERE event_id = ?';
   db.query(sqlCancel, id, (err) => {
      if (err) {
         res.send(err);
      } else {
         res.send({ message: 'success' });
      }
   });
   //    } else {
   //       res.send({ message: 'today' });
   //    }
   // });
});

event.delete('/delete_event/:id', (req, res) => {
   const id = req.params.id;
   const sqlDeleteEvent = 'DELETE from events WHERE event_id = ?';
   db.query(sqlDeleteEvent, id, (err) => {
      if (err) {
         console.log(err);
      } else {
         res.send({ message: 'success' });
      }
   });
});

// GetData by ID
event.get('/getData/:id', (req, res) => {
   const id = req.params.id;
   const sqlGetData = 'SELECT * from events WHERE event_id = ?';
   db.query(sqlGetData, id, (err, result) => {
      if (err) {
         res.send({ message: ' no data found' });
      } else {
         res.send(result);
      }
   });
});

//UPDATE
event.put('/update_account/:id', (req, res) => {
   const id = req.params.id;
   const title = req.body.title;
   const start = req.body.start;
   const end = req.body.end;
   const description = req.body.description;
   const chapter = req.body.chapter;

   const sqlEdit =
      'UPDATE events SET title = ?,start = ?, end = ?, description = ?, chapter =? WHERE event_id = ?';
   db.query(sqlEdit, [title, start, end, description, chapter, id], (err) => {
      if (err) {
         res.send(err);
      } else {
         res.send({ message: 'success' });
      }
   });
});

//all members (sect)
event.get('/byChapter/:chapter', (req, res) => {
   const chapter = req.params.chapter;

   const all = 'SELECT * FROM members WHERE chapter = ?';
   db.query(all, chapter, (err, result) => {
      if (err) {
         res.send(err);
      } else {
         res.send(result);
         // const sqlEdit = 'UPDATE qrcode SET status = "present" WHERE id = ?';
         // db.query(sqlEdit, member_id, (err) => {
         //    if (err) {
         //       res.send(err);
         //    } else {
         //       res.send(result);
         //    }
         // });
      }
   });
});

//get chapter event
event.get('/:chapter', (req, res) => {
   const chapter = req.params.chapter;

   const all = 'SELECT * FROM events WHERE status = "accepted" AND chapter = ?';
   db.query(all, chapter, (err, result) => {
      if (err) {
         res.send(err);
      } else {
         res.send(result);
         // const sqlEdit = 'UPDATE qrcode SET status = "present" WHERE id = ?';
         // db.query(sqlEdit, member_id, (err) => {
         //    if (err) {
         //       res.send(err);
         //    } else {
         //       res.send(result);
         //    }
         // });
      }
   });
});

//get chapter event
event.get('/get/:chapter', (req, res) => {
   const chapter = req.params.chapter;

   const all = 'SELECT * FROM events WHERE chapter = ?';
   db.query(all, chapter, (err, result) => {
      if (err) {
         res.send(err);
      } else {
         res.send(result);
         // const sqlEdit = 'UPDATE qrcode SET status = "present" WHERE id = ?';
         // db.query(sqlEdit, member_id, (err) => {
         //    if (err) {
         //       res.send(err);
         //    } else {
         //       res.send(result);
         //    }
         // });
      }
   });
});

event.get('/accept/:id', (req, res) => {
   const id = req.params.id;

   const sqlEdit = 'UPDATE events SET status = "accepted" WHERE event_id = ?';
   db.query(sqlEdit, id, (err) => {
      if (err) {
         res.send(err);
      } else {
         res.send({ message: 'success' });
      }
   });
});

event.get('/decline/:id', (req, res) => {
   const id = req.params.id;

   const sqlEdit = 'UPDATE events SET status = "declined" WHERE event_id = ?';
   db.query(sqlEdit, id, (err) => {
      if (err) {
         res.send(err);
      } else {
         res.send({ message: 'success' });
      }
   });
});

event.get('/nano', (req, res) => {
   const nanoid = customAlphabet('1234567890', 10);
   const id = nanoid(); //=> "4f90d13a42"
   res.send(id);
});

module.exports = event;
