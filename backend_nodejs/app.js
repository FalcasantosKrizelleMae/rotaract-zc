const express = require('express');
const cors = require('cors');

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
app.use('/web', eventsRoute);

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

app.get('/success', (req, res) => {
   alert('Payment successful');
});

https: app.listen(5000, () => console.log('Server is running'));
