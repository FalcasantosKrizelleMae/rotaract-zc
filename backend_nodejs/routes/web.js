const db = require('../Config/db_connection');

const express = require('express');

const web = require('express').Router();
const cors = require('cors');
const nodemailer = require('nodemailer');
const { customAlphabet } = require('nanoid');
const moment = require('moment');
const { report } = require('./payment');

web.use(cors());

web.use(express.urlencoded({ extended: true }));
web.use(express.json());

web.get('/totalMembers', (req, res) => {
   db.query(
      "SELECT chapter, COUNT(*) AS 'uv' FROM members WHERE member_id != 12345678 GROUP BY chapter",
      (err, result) => {
         if (err) {
            res.send(err);
         } else {
            res.send(result);
         }
      }
   );
});

web.get('/funds', (req, res) => {
   db.query(
      'SELECT club_name, total_funds, expenses, collections, donations from funds',
      (err, result) => {
         if (err) {
            res.send(err);
         } else {
            res.send(result);
         }
      }
   );
});

web.get('/attendance', (req, res) => {
   db.query(
      'SELECT event_id, status, COUNT(*) AS "attendees" FROM attendance GROUP BY event_id;',
      (err, result) => {
         if (err) {
            res.send(err);
         } else {
            res.send(result);
         }
      }
   );
});

web.get('/selectEvent', (req, res) => {
   const id = req.query.event_id;
   const sqlGetData =
      'SELECT status, COUNT(*) AS "attendees" FROM attendance WHERE event_id = ? GROUP BY status;';
   db.query(sqlGetData, id, (err, result) => {
      if (err) {
         res.send(err);
      } else {
         res.send(result);
      }
   });
});

web.get('/funds_chapter', (req, res) => {
   const chapter = req.query.chapter;
   db.query(
      'SELECT club_name, total_funds, expenses, collections, donations from funds WHERE club_name = ?',
      chapter,
      (err, result) => {
         if (err) {
            res.send(err);
         } else {
            res.send(result);
         }
      }
   );
});

module.exports = web;
