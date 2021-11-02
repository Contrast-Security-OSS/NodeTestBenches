'use strict';

const pg = require('pg');
const {
  PSQL_USER = 'postgres',
  PSQL_HOST = 'localhost',
  PSQL_DATABASE = 'testdb',
  PSQL_PASSWORD = 'password',
  PSQL_PORT = 5432
} = process.env;

const client = new pg.Client({
  user: PSQL_USER,
  host: PSQL_HOST,
  database: PSQL_DATABASE,
  password: PSQL_PASSWORD,
  port: PSQL_PORT
});

module.exports = client;
