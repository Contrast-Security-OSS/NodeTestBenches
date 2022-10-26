'use strict';

const dynamodb = require('./dynamodb');
const mongodb = require('./mongodb');

module.exports = {
  ...dynamodb,
  ...mongodb
};

module.exports['r.insert'] = require('./rethinkdb/r-insert');
module.exports['r.update'] = require('./rethinkdb/r-update');
module.exports['r.filter'] = require('./rethinkdb/r-filter');
module.exports['r.match'] = require('./rethinkdb/r-match');
module.exports['r.js'] = require('./rethinkdb/r-js');
