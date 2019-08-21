'use strict';

const { map, pick } = require('lodash');

const routes = require('./routes');

const navRoutes = map(routes, (route) =>
  pick(route, ['base', 'name', 'products'])
);

module.exports = {
  content: require('./content'),
  navRoutes,
  routes,
  utils: require('./utils')
};
