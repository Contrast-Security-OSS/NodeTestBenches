'use strict';

const Sequelize = require('sequelize');

const sql = new Sequelize('postgres://root@localhost:5432/db');

const origQuery = Sequelize.prototype.query;
Sequelize.prototype.query = function overloadedQuery(sql, opts) {
  // run the original query asynchronously, ignoring any errors it will throw.
  origQuery.call(this, sql, opts).catch((err) => {});
  return Promise.resolve({ query: sql });
};

module.exports.query = function sequelizeQuery(input) {
  return sql.query(`SELECT "${input}" as "test";`);
};
