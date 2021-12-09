'use strict';

module.exports = {};
module.exports['sequelize.prototype.query'] = require('./sequelize');
module.exports['mysql/lib/Connection.query'] = require('./mysql/string');
module.exports[
  'pg.Connection.prototype.query (String)'
] = require('./pg/string');
module.exports[
  'pg.Connection.prototype.query (Object)'
] = require('./pg/object');
module.exports['typeorm.Repository.prototype.query'] = require('./typeorm')[
  'typeorm.Repository.prototype.query'
];
module.exports['typeorm.Connection.prototype.query'] = require('./typeorm')[
  'typeorm.Connection.prototype.query'
];

module.exports = { ...module.exports, ...require('./sqlite3') };
