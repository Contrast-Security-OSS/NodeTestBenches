'use strict';

module.exports = {};
module.exports['sequelize.prototype.query'] = require('./sequelize').query;
module.exports['mysql/lib/Connection.query'] = require('./mysql').query;
