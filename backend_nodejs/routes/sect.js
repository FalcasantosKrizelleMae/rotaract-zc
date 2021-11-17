const db = require('../Config/db_connection');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const express = require('express');

const sect = require('express').Router();
const cors = require('cors');

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

module.exports = sect;
