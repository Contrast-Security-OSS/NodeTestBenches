'use strict';

const bluebird = require('bluebird');

const {
  MYSQL_USER = 'root',
  MYSQL_HOST = 'localhost',
  MYSQL_DATABASE = 'testdb',
  MYSQL_PASSWORD = 'password',
  MYSQL_PORT = 3306
} = process.env;

module.exports = {
  user: MYSQL_USER,
  host: MYSQL_HOST,
  database: MYSQL_DATABASE,
  password: MYSQL_PASSWORD,
  port: MYSQL_PORT,
  Promise: bluebird
};
