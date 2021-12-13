const db = require('../Config/db_connection');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const express = require('express');

const sect = require('express').Router();
const cors = require('cors');
const moment = require('moment');

sect.use(
   cors({
      origin: ['http://localhost:3000'],
      methods: ['GET', 'POST'],
      credentials: true,
   })
);

//For cookies
sect.use(cookieParser());
sect.use(express.urlencoded({ extended: true }));
sect.use(express.json());

sect.get('/all', (req, res) => {
   const sqlSelect = 'SELECT * FROM events WHERE chapter = "all"';
   db.query(sqlSelect, (err, result) => {
      if (err) {
         console.log(err);
      } else {
         res.send(result);
      }
   });
});

// GetData by ID
sect.get('/getData/:id', (req, res) => {
   const id = req.params.id;
   const sqlGetData = 'SELECT * from events WHERE id = ?';
   db.query(sqlGetData, id, (err, result) => {
      if (err) {
         res.send({ message: ' no data found' });
      } else {
         res.send(result);
      }
   });
});

// Getchapter users by ID
sect.get('/byChapter/:chapter', (req, res) => {
   const chapter = req.params.chapter;
   const sqlGetData = 'SELECT * from members WHERE chapter = ?';
   db.query(sqlGetData, chapter, (err, result) => {
      if (err) {
         res.send({ message: ' no data found' });
      } else {
         res.send(result);
      }
   });
});

sect.post('/add_attendance', (req, res) => {
   const member_id = req.body.member_id;
   const event_id = req.body.event_id;

   const sqlRegister =
      'INSERT INTO attendance (member_id, event_id, status, log) VALUES (?, ?, "present", CURDATE())';
   db.query(sqlRegister, [member_id, event_id], (err, result) => {
      if (err) {
         res.send({ message: 'invalid' });
      } else {
         res.send({ message: 'success' });
      }
   });
});

//CHECK AATTENDANCE
sect.get('/scan/:member_id', (req, res) => {
   const member_id = req.params.member_id;

   const scan = 'SELECT * FROM members WHERE member_id = ?';
   db.query(scan, member_id, (err, result) => {
      if (err) {
         res.send(err);
      } else {
         res.send(result);
      }
   });
});

//send reports
sect.post('/send_report', (req, res) => {
   const id = customAlphabet('1234567890', 6);
   const report_id = id();
});

// Getevemt by chapter
sect.get('/getEvent/:chapter', (req, res) => {
   const chapter = req.params.chapter;
   const sqlGetData = 'SELECT * from events WHERE  chapter = ?;';
   db.query(sqlGetData, chapter, (err, result) => {
      if (err) {
         res.send({ message: ' no data found' });
      } else {
         res.send(result);
      }
   });
});

sect.get('/check/:chapter', (req, res) => {
   const chapter = req.params.chapter;
   const member_id = req.query.member_id;

   const check = 'SELECT * from members WHERE member_id = ? AND chapter = ?';
   db.query(check, [member_id, chapter], (err, result) => {
      if (err) {
         res.send(err);
      } else {
         res.send(result);
         console.log(result);
      }
   });
});

sect.post('/addAttendance', (req, res) => {
   const member_id = req.body.member_id;
   const event_id = req.body.event_id;
   const mark = req.body.mark;

   const check =
      'SELECT * FROM attendance WHERE member_id = ? AND event_id = ?';
   db.query(check, [member_id, event_id], (err, result) => {
      if (err) {
         res.send(err);
      } else {
         if (result.length === 0) {
            const insert =
               'INSERT INTO attendance (member_id, event_id, status) VALUES (?, ?, ?)';
            db.query(insert, [member_id, event_id, mark], (err, response) => {
               if (err) {
                  res.send(err);
               } else {
                  console.log('success');
                  res.send({ message: 'success' });
               }
            });
         } else {
            res.send({ message: 'exist' });
         }
      }
   });
});

sect.get('get_report');
module.exports = sect;
