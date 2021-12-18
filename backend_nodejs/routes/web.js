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

module.exports = web;
