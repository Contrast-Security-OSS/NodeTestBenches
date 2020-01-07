'use strict';

module.exports = {};
module.exports['sequelize.prototype.query'] = require('./sequelize');
module.exports['mysql/lib/Connection.query'] = require('./mysql');
module.exports[
  'pg.Connection.prototype.query (String)'
] = require('./pg_string');
module.exports[
  'pg.Connection.prototype.query (Object)'
] = require('./pg_object');
