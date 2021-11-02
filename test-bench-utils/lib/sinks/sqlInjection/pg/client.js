'use strict';

const pg = require('pg');
const {
  PGUSER = 'postgres',
  PGHOST = 'localhost',
  PGDATABASE = 'testdb',
  PGPASSWORD = 'password',
  PGPORT = 5432
} = process.env;

const client = new pg.Client({
  user: PGUSER,
  host: PGHOST,
  database: PGDATABASE,
  password: PGPASSWORD,
  port: PGPORT
});

module.exports = client;
