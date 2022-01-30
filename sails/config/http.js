'use strict';

module.exports.http = {
  middleware: {
    order: [
      'cookieParser',
      'session',
      'requestLogger',
      'queryParser',
      'bodyParser',
      'csp',
      'compress',
      'poweredBy',
      'router',
      'www',
      'favicon',
    ],
    queryParser: (function _configureQueryParser() {
      const qs = require('qs');
      return function(req, res, next) {
        req.query = qs.parse(req.query, { allowDots: true });
        return next();
      }
    })(),
    bodyParser: (function _configureBodyParser() {
      const skipper = require('skipper');
      const middlewareFn = skipper({ strict: true });
      return middlewareFn;
    })(),
    requestLogger: (function(req, res, next) {
      console.log("Requested :: ", req.method, req.url);
      return next();
    }),
    csp: require('lusca').csp({
      policy: { 'default-src': '*' }
    })
  }
}
