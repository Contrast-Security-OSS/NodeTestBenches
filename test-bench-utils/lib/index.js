'use strict';

const { map, pick } = require('lodash');
const content = require('./content');
const routes = require('./routes');
const utils = require('./utils');

/** @typedef {import("./response-preparers").ResponsePreparer} ResponsePreparer */
/** @typedef {import("./sinks").Param} Param */
/** @typedef {import("./sinks").SinkParams} SinkParams */
/** @typedef {import("./sinks").SinkOpts} SinkOpts */
/** @typedef {import("./sinks").SinkFn} SinkFn */
/** @typedef {import("./sinks").SinkObj} SinkObj */
/** @typedef {import("./sinks").Sink} Sink */
/** @typedef {import("./frameworks").InputMap} InputMap */
/** @typedef {import("./frameworks").FrameworkMap} FrameworkMap */
/** @typedef {import("./routes").Product} Product */
/** @typedef {import("./routes").Input} Input */
/** @typedef {import("./routes").Route} Route */

const navRoutes = map(routes, (route) =>
  pick(route, ['base', 'name', 'products'])
);

module.exports = {
  content,
  navRoutes,
  routes,
  utils
};
