const dynamodb = require('./dynamodb');
const mongodb = require('./mongodb');
const rethinkdb = require('./rethinkdb');

module.exports = {
  ...dynamodb,
  ...mongodb,
  ...rethinkdb
};
