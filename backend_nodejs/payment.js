const express = require('express');
const pay_route = require('express').Router();

pay_route.use(express.json());
pay_route.use(
   cors({
      origin: ['http://localhost:5000'],
      methods: ['GET', 'POST', 'OPTIONS', 'PUT'],
      credentials: true,
   })
);

import Paymongo from 'paymongo';

const paymongo = new Paymongo(process.env.SECRET_KEY);

const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
