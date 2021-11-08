const db = require('../Config/db_connection');
const express = require('express');
const bodyParser = require('body-parser');

const event = require('express').Router();
const cors = require('cors');
event.use(bodyParser.json());

event.use(
   cors({
      origin: ['http://localhost:3000'],
      methods: ['GET', 'POST'],
      credentials: true,
   })
);

event.get('/all', (req, res) => {
   const sqlSelect =
      'SELECT * FROM events WHERE chapter = "all" AND status = "coming"';
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

//ADD EVENT
event.post('/add_event', (req, res) => {
   const title = req.body.title;
   const start = req.body.start;
   const end = req.body.end;
   const description = req.body.description;
   const chapter = req.body.chapter;
   const code = req.body.code;

   const checkId = 'SELECT start FROM events WHERE start = ?';
   db.query(checkId, start, (err, result) => {
      if (result.length === 0) {
         //new user logic
         const sqlAdd =
            'INSERT INTO events (title, start, end, description, chapter, event_code) VALUES (?, ?, ?, ?, ?, ?)';
         db.query(
            sqlAdd,
            [title, start, end, description, chapter, code],
            (err) => {
               if (err) {
                  res.send({ message: 'invalid' });
               } else {
                  res.send({ message: 'success' });
               }
            }
         );
      } else {
         res.send('exists');
      }
   });
});

//UPDATE
event.get('/cancel_event/:id', (req, res) => {
   const id = req.params.id;

   // const checkId = 'SELECT start FROM events where start = CURDATE()?';
   // db.query(checkId, id, (err, result) => {
   //    if (result.length === 0) {
   const sqlCancel = 'UPDATE events SET status = "cancelled" WHERE id = ?';
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
   const sqlDeleteEvent = 'DELETE from events WHERE id = ?';
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
   const sqlGetData = 'SELECT * from events WHERE id = ?';
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
      'UPDATE events SET title = ?,start = ?, end = ?, description = ?, chapter =? WHERE id = ?';
   db.query(sqlEdit, [title, start, end, description, chapter, id], (err) => {
      if (err) {
         res.send(err);
      } else {
         res.send({ message: 'success' });
      }
   });
});

module.exports = event;
