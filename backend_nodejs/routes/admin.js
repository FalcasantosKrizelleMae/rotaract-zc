const db = require('../Config/db_connection');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const express = require('express');
const bodyParser = require('body-parser');

const admin = require('express').Router();
const cors = require('cors');
admin.use(bodyParser.json());

admin.use(
   cors({
      origin: ['http://localhost:3000'],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
   })
);

//Register
admin.post('/add_account', (req, res) => {
   const member_id = req.body.member_id;
   const qrcode = req.body.qrcode;
   const firstName = req.body.firstName;
   const lastName = req.body.lastName;
   const role = req.body.role;
   const chapter = req.body.chapter;

   const checkId = 'SELECT member_id FROM members WHERE member_id = ?';
   db.query(checkId, member_id, (err, result) => {
      if (result.length === 0) {
         //new user logic
         const sqlRegister =
            'INSERT INTO members (member_id, qrcode, first_name, last_name, role, chapter) VALUES (?, ?, ?, ?, ?, ?)';
         db.query(
            sqlRegister,
            [member_id, qrcode, firstName, lastName, role, chapter],
            (err) => {
               if (err) {
                  res.send({ message: 'invalid' });
               } else {
                  const password = 'rotaractzc';
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
               }
            }
         );
      } else if (err) {
         res.send(err);
      } else {
         res.send({ message: 'exists' });
      }
   });
});

//Display all data from table
admin.get('/list', (req, res) => {
   const sqlSelect = 'SELECT * FROM members';
   db.query(sqlSelect, (err, result) => {
      res.send(result);
   });
});

//UPDATE
admin.put('/update_account/:member_id', (req, res) => {
   const member_id = req.params.member_id;
   const firstName = req.body.newfirstname;
   const lastName = req.body.newlastname;
   const role = req.body.newrole;
   const chapter = req.body.newchapter;

   const sqlEdit =
      'UPDATE members SET first_name = ?,last_name = ?, role = ?, chapter = ? WHERE member_id = ?';
   db.query(sqlEdit, [firstName, lastName, role, chapter, member_id], (err) => {
      if (err) {
         res.send(err);
      } else {
         const sqlUpdate = 'UPDATE users SET role = ? WHERE member_id = ?';
         db.query(sqlUpdate, [role, member_id], (err) => {
            res.send({ message: 'success' });
         });
      }
   });
});

// GetData by ID
admin.get('/getData/:member_id', (req, res) => {
   const member_id = req.params.member_id;
   const sqlGetData = 'SELECT * from members WHERE member_id = ?';
   db.query(sqlGetData, member_id, (err, result) => {
      if (err) {
         res.send({ message: ' no data found' });
      } else {
         res.send(result);
      }
   });
});

//DELETE ACCOUNT
admin.delete('/delete_account/:member_id', (req, res) => {
   const member_id = req.params.member_id;
   const sqlDeleteMember = 'DELETE from members WHERE member_id = ?';
   db.query(sqlDeleteMember, member_id, (err) => {
      if (err) {
         console.log(err);
      } else {
         const sqlDeleteUser = 'DELETE from users WHERE member_id = ?';
         db.query(sqlDeleteUser, member_id, (err) => {
            if (err) {
               console.log(err);
            } else {
               res.send({ message: 'success' });
            }
         });
      }
   });
});

//Display all data from table
admin.get('/list', (req, res) => {
   const sqlSelect = 'SELECT * FROM members';
   db.query(sqlSelect, (err, result) => {
      res.send(result);
   });
});

//ADMIN ACCOUNT
admin.get('/getAdmin', (req, res) => {
   const sqlGetAdmin = 'SELECT * from users WHERE role = "admin"';
   db.query(sqlGetAdmin, (err, result) => {
      if (err) {
         res.send({ message: ' no data found' });
      } else {
         res.send(result);
      }
   });
});

//CALENDAR
admin.get('/getEvent', (req, res) => {});

module.exports = admin;
