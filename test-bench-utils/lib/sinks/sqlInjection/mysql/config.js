'use strict';

const mysql = require('mysql');

const {
  MYSQL_USER = 'root',
  MYSQL_HOST = 'localhost',
  MYSQL_DATABASE = 'testdb',
  MYSQL_PASSWORD = 'password',
  MYSQL_PORT = 3306
} = process.env;

const con = mysql.createConnection({
  user: MYSQL_USER,
  host: MYSQL_HOST,
  database: MYSQL_DATABASE,
  password: MYSQL_PASSWORD,
  port: MYSQL_PORT,
  connectTimeout: 30000
});

module.exports = con;
