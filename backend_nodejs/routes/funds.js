const db = require('../Config/db_connection');

const cookieParser = require('cookie-parser');

const express = require('express');

const funds = require('express').Router();
const cors = require('cors');
const moment = require('moment');

funds.use(
   cors({
      origin: ['http://localhost:3000'],
      methods: ['GET', 'POST'],
      credentials: true,
   })
);

//For cookies
funds.use(cookieParser());
funds.use(express.urlencoded({ extended: true }));
funds.use(express.json());

funds.get('/all', (req, res) => {
   const sqlSelect = 'SELECT * FROM funds;';
   db.query(sqlSelect, (err, result) => {
      if (err) {
         res.send(err);
      } else {
         res.send(result);
      }
   });
});

module.exports = funds;
