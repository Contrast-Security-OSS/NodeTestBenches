'use strict';

module.exports = {};
module.exports['sequelize.prototype.query'] = require('./sequelize');
module.exports['mysql/lib/Connection.query'] = require('./mysql');
