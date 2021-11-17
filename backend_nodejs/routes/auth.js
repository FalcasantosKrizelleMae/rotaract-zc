const db = require('../Config/db_connection');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const express = require('express');

const auth = require('express').Router();
const cors = require('cors');

auth.use(
   cors({
      origin: ['http://localhost:3000'],
      methods: ['GET', 'POST'],
      credentials: true,
   })
);

//For cookies
auth.use(cookieParser());
auth.use(express.urlencoded({ extended: true }));
auth.use(express.json());

auth.use(
   session({
      key: 'userID',
      secret: 'rotaract',
      resave: false,
      saveUninitialized: false,
      cookie: {
         expires: 60 * 60 * 24,
      },
   })
);

//Login POST
auth.post('/api/login', (req, res) => {
   const member_id = req.body.member_id;
   const password = req.body.password;

   const sqlLogin = 'SELECT * from users WHERE member_id = ?;';
   db.query(sqlLogin, member_id, (err, result) => {
      if (err) {
         console.log({ err: err });
      }

      if (result.length > 0) {
         bcrypt.compare(password, result[0].password, (err, response) => {
            if (response) {
               const sqlname =
                  'SELECT chapter, first_name from members WHERE member_id = ?;';
               db.query(sqlname, member_id, (err, response) => {
                  if (err) {
                     console.log({ err: err });
                  } else {
                     res.send({
                        role: result[0].role,
                        chapter: response[0].chapter,
                        name: response[0].first_name,
                     });
                  }
               });
            } else if (member_id === '') {
               res.send({
                  message: 'Please input member id',
               });
            } else if (password === '') {
               res.send({
                  message: 'Please input password',
               });
            } else {
               res.send({ message: 'Wrong member id/password combination!' });
            }
         });
      } else {
         res.send({
            message: "User doesn't exist",
         });
      }
   });
});

//Register
auth.post('/api/register', (req, res) => {
   const member_id = req.body.member_id;
   const password = req.body.password;
   const role = req.body.role;

   bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
         console.log(err);
      }

      const sqlRegister =
         'INSERT INTO users (member_id, password, role) VALUES (?, ?, ?)';
      db.query(sqlRegister, [member_id, hash, role], (err) => {
         if (err) {
            res.send({ err });
         } else {
            res.send({
               message: 'success',
            });
         }
      });
   });
});

//Insert into database
auth.post('/api/insert', (req, res) => {
   const first_name = req.body.first_name;
   const last_name = req.body.last_name;
   const chapter = req.body.chapter;

   const sqlInsert =
      'INSERT INTO members ( first_name, last_name, chapter) VALUES ( ?, ?, ?)';
   db.query(sqlInsert, [first_name, hash, chapter], (err) => {});
});

auth.post('/insert_qr', (req, res) => {
   const member_id = req.body.member_id;
   const qrcode = req.body.qrcode;

   const sqlInsert = 'INSERT INTO qrcode (id, img) VALUES (?, ?)';
   db.query(sqlInsert, [member_id, qrcode], (err, result) => {
      if (err) {
         res.send(err);
      } else {
         res.send({ message: 'success' });
      }
   });
});

//Display all data from table
auth.get('/list', (req, res) => {
   const sqlSelect = 'SELECT * FROM qrcode';
   db.query(sqlSelect, (err, result) => {
      res.send(result);
   });
});

//UPDATE

module.exports = auth;
