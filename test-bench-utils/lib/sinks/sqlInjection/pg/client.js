'use strict';

const pg = require('pg');

const client = new pg.Client({
  user: process.env.USER,
  host: 'localhost',
  database: process.env.USER,
  password: null,
  port: 5432
});

module.exports = client;
