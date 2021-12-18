const db = require('../Config/db_connection');
const express = require('express');
const bodyParser = require('body-parser');
const { customAlphabet } = require('nanoid');
const nodemailer = require('nodemailer');
const schedule = require('node-schedule');
const event = require('express').Router();
const cors = require('cors');
const { response } = require('express');
const moment = require('moment');

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
event.post('/add_event-admin', (req, res) => {
   const title = req.body.title;
   const start = req.body.start;
   const end = req.body.end;
   const description = req.body.description;
   const type = req.body.type;
   const platform = req.body.platform;
   const link = req.body.link;
   const host = req.body.host;
   const venue = req.body.venue;
   const source = req.body.source;
   const total = req.body.total;
   const email = req.body.email;
   const chairperson = req.body.chairperson;
   const preparedby = req.body.preparedby;
   const chapter = req.body.chapter;
   const status = 'admin';

   const id = customAlphabet('1234567890', 6);
   const event_id = id();

   const checkId = 'SELECT start FROM events WHERE start = ?';
   db.query(checkId, start, (err, result) => {
      if (result.length === 0) {
         const sqlAdd =
            'INSERT INTO events (event_id, title, start, end, description, type, platform, link, participants, host, venue, source, total_cost, email, chairperson, prepared_by, chapter) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
         db.query(
            sqlAdd,
            [
               event_id,
               title,
               start,
               end,
               description,
               type,
               platform,
               link,
               0,
               host,
               venue,
               source,
               total,
               email,
               chairperson,
               preparedby,
               chapter,
            ],
            (error) => {
               if (error) {
                  res.send({ message: 'invalid' });
                  console.log(err);
               } else {
                  const sql = 'SELECT email FROM members';
                  db.query(sql, (err, response) => {
                     if (err) {
                        res.send({ message: 'invalid' });
                     } else {
                        const eventDate = moment(start);
                        const today = eventDate.format();
                        const emailList = JSON.parse(JSON.stringify(response));
                        const notifDate = eventDate
                           .subtract(1, 'hour')
                           .format();

                        emailList.forEach((element) => {
                           let info = transporter.sendMail({
                              from: 'Rotary Zamboanga City <rotaryzamboangacity@gmail.com>', // sender address
                              to: element.email, // list of receivers
                              subject:
                                 ' A NEW EVENT FOR ALL ROTARY ZAMBOANGA MEMBERS', // Subject line

                              html: `<h4>A new event is coming your way. </h4> <br/> Event details: <br/> What: <b> ${title}</b> <br/> When: <b>${moment(
                                 start
                              ).format(
                                 'LLL'
                              )}</b> <br/> Other details: <b> ${description}</b> <br/> Platform: <b> ${platform}</b> <br/> Link: <a href="${link}"> ${link}</a> <br/> Hosted by: <b> ${host}</b> <br/> Venue: <b> ${venue}</b> <br/> Email: <b> ${email}</b> <br/> Chairperson: <b> ${chairperson}`,

                              auth: {
                                 user: 'rotaryzamboangacity@gmail.com', // generated ethereal user
                                 pass: 'rotaractzc', // generated ethereal password
                              },
                           });
                        });

                        res.send({ message: 'success' });

                        schedule.scheduleJob(notifDate, function () {
                           emailList.forEach((element) => {
                              let info = transporter.sendMail({
                                 from: 'Rotary Zamboanga City <rotaryzamboangacity@gmail.com>', // sender address
                                 to: element.email, // list of receivers
                                 subject:
                                    ' A NEW EVENT FOR ALL ROTARY ZAMBOANGA MEMBERS', // Subject line

                                 html: `<b>REMINDER!!!! <br/> 1 hour left until the event. See you!<br/></b><h4> A new event is coming your way. </h4>  Event details: <br/> What: <b> ${title}</b> <br/> When: <b>${moment(
                                    start
                                 ).format(
                                    'LLL'
                                 )}</b> <br/> Other details: <b> ${description}</b> <br/><br/> <i>NOTE: Kindly present your QR Code for attedance. Have a great day ahead!</i>`,

                                 auth: {
                                    user: 'rotaryzamboangacity@gmail.com', // generated ethereal user
                                    pass: 'rotaractzc', // generated ethereal password
                                 },
                              });
                           });
                        });
                     }
                  });
               }
            }
         );
      }
   });
});

//ADD EVENT
event.post('/add_event', (req, res) => {
   const title = req.body.title;
   const start = req.body.start;
   const end = req.body.end;
   const description = req.body.description;
   const type = req.body.type;
   const platform = req.body.platform;
   const link = req.body.link;
   const host = req.body.host;
   const venue = req.body.venue;
   const source = req.body.source;
   const total = req.body.total;
   const email = req.body.email;
   const chairperson = req.body.chairperson;
   const preparedby = req.body.preparedby;
   const chapter = req.body.chapter;

   const id = customAlphabet('1234567890', 6);
   const event_id = id();

   const checkId = 'SELECT start FROM events WHERE start = ?';
   db.query(checkId, start, (err, result) => {
      if (result.length === 0) {
         const sqlAdd =
            'INSERT INTO events (event_id, title, start, end, description, type, platform, link, participants, host, venue, source, total_cost, email, chairperson, prepared_by, chapter) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
         db.query(
            sqlAdd,
            [
               event_id,
               title,
               start,
               end,
               description,
               type,
               platform,
               link,
               0,
               host,
               venue,
               source,
               total,
               email,
               chairperson,
               preparedby,
               chapter,
            ],
            (error) => {
               if (error) {
                  res.send({ message: 'invalid' });
                  console.log(err);
               } else {
                  const sql = 'SELECT email FROM members';
                  db.query(sql, (err, response) => {
                     if (err) {
                        res.send({ message: 'invalid' });
                     } else {
                        res.send({ message: 'success' });
                     }
                  });
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
         //       res.send(resust);
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
         const sqlAll = 'SELECT * FROM events WHERE event_id = ?';
         db.query(sqlAll, id, (err, result) => {
            db.query(
               'SELECT email FROM members WHERE chapter = ?',
               result[0].chapter,
               (err, respo) => {
                  const eventDate = moment(result[0].start);
                  const emailList = JSON.parse(JSON.stringify(respo));
                  const notifDate = eventDate.subtract(1, 'hour').format();

                  emailList.forEach((element) => {
                     let info = transporter.sendMail({
                        from: 'Rotary Zamboanga City <rotaryzamboangacity@gmail.com>', // sender address
                        to: element.email, // list of receivers
                        subject: ` A ${result[0].title} EVENT FOR ZAMBOANGA MEMBERS`, // Subject line

                        html: `<h4>A new event is coming your way. </h4> <br/> Event details: <br/> What: <b> ${
                           result[0].title
                        }</b> <br/> When: <b>${moment(result[0].start).format(
                           'LLL'
                        )}</b> <br/> Other details: <b> ${
                           result[0].description
                        }</b> <br/> Platform: <b> ${
                           result[0].platform
                        }</b> <br/> Link: <a href="${result[0].link}"> ${
                           result[0].link
                        }</a> <br/> Hosted by: <b> ${
                           result[0].host
                        }</b> <br/> Venue: <b> ${
                           result[0].venue
                        }</b> <br/> Email: <b> ${
                           result[0].email
                        }</b> <br/> Chairperson: <b> ${result[0].chairperson}
 
                        <br/> </b> <br/> </b> <br/>  <i>NOTE: For virtual events, kindly present your QR Code for attedance. Have a great day ahead!</i>`,

                        auth: {
                           user: 'rotaryzamboangacity@gmail.com', // generated ethereal user
                           pass: 'rotaractzc', // generated ethereal password
                        },
                     });
                  });

                  schedule.scheduleJob(notifDate, function () {
                     emailList.forEach((element) => {
                        let info = transporter.sendMail({
                           from: 'Rotary Zamboanga City <rotaryzamboangacity@gmail.com>', // sender address
                           to: element.email, // list of receivers
                           subject: ' A NEW EVENT FOR YOU!', // Subject line

                           html: `<b>REMINDER!!!! <br/> 1 hour left until the event. See you!<br/></b><h4> A new event is coming your way. </h4>  Event details: <br/> What: <b> ${
                              result[0].title
                           }</b> <br/> When: <b>${moment(
                              result[0].start
                           ).format('LLL')}</b> <br/> Other details: <b> ${
                              result[0].description
                           }</b> <br/><br/> <i>NOTE: Kindly present your QR Code for attedance. Have a great day ahead!</i>`,

                           auth: {
                              user: 'rotaryzamboangacity@gmail.com', // generated ethereal user
                              pass: 'rotaractzc', // generated ethereal password
                           },
                        });
                     });
                  });
                  res.send({ message: 'success' });
               }
            );
         });
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
