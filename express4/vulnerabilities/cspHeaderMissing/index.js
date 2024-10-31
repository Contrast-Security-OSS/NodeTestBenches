'use strict';

module.exports = require('../../utils/controllerFactory')('cspHeaderMissing');

// const path = require('path');
// const sink = require('../../node_modules/@contrast/test-bench-utils/lib/sinks/csp-header-missing');
// const utils = require('../../node_modules/@contrast/test-bench-utils/lib/utils');

// module.exports = (function(router) {
//   const routeMeta = utils.getRouteMeta('cspHeaderMissing');

//   router.get('/', function(req, res) {
//     sink(res);
//     res.render(path.resolve(__dirname, '.', 'view'), { ...routeMeta });
//   });

//   return router;
// })(require('express').Router());
