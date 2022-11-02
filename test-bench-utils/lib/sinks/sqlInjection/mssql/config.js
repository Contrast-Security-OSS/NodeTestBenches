'use strict';

const {
  MSSQL_USER = 'user',
  MSSQL_HOST = 'localhost',
  MSSQL_DATABASE = 'test',
  MSSQL_PASSWORD = 'password', // pragma: allowlist secret
  MSSQL_PORT = 1433,
} = process.env;

const config = {
  user: MSSQL_USER,
  password: MSSQL_PASSWORD,
  server: MSSQL_HOST,
  port: MSSQL_PORT,
  database: MSSQL_DATABASE
};

module.exports = config;
