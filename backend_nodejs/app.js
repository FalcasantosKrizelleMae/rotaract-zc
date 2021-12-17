const express = require('express');
const cors = require('cors');
const moment = require('moment');
const schedule = require('node-schedule');

const db = require('./Config/db_connection');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//Import Routes
const authRoute = require('./routes/auth');
app.use('/auth', authRoute);

const adminRoute = require('./routes/admin');
app.use('/admin', adminRoute);

const eventsRoute = require('./routes/events');
app.use('/events', eventsRoute);

const sectsRoute = require('./routes/sect');
app.use('/sect', sectsRoute);

const webRoute = require('./routes/web');
app.use('/web', webRoute);

const paymentRoute = require('./routes/payment');
app.use('/payment', paymentRoute);

const fundsRoute = require('./routes/funds');
app.use('/funds', fundsRoute);

const donationsRoute = require('./routes/donations');
app.use('/donations', donationsRoute);

const reportsRoute = require('./routes/reports');
app.use('/reports', reportsRoute);

//Display all data from table
app.get('/api/list', (req, res) => {
   const sqlSelect = 'SELECT * FROM members';
   db.query(sqlSelect, (err, result) => {
      res.send(result);
   });
});

//Delete row by ID
app.delete('/api/delete', (req, res) => {
   const member_id = req.query.id;

   const sqlDelete = 'DELETE FROM members WHERE id = ?';
   db.query(sqlDelete, member_id, (err, result) => {});
});

app.get('/', (req, res) => {
   const date = moment();
   notifDate = date.subtract(1, 'hour').format('LLL');

   console.log(notifDate);
});

https: app.listen(5000, () => console.log('Server is running'));
