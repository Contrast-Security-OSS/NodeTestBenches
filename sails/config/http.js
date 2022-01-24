'use strict';

module.exports.http = {
  middleware: {
    order: [
      'cookieParser',
      'session',
      'requestLogger',
      'queryParser',
      'bodyParser',
      'compress',
      'poweredBy',
      'router',
      'www',
      'favicon',
    ],
    queryParser: (function _configureQueryParser(){
      var qs = require('qs');
      return function (req, res, next){
        req.query = qs.parse(req.query, { allowDots: true });
        return next();
      }
    })(),
    bodyParser: (function _configureBodyParser(){
      var skipper = require('skipper');
      var middlewareFn = skipper({ strict: true });
      return middlewareFn;
    })(),
    requestLogger: (function (req, res, next) {
      console.log("Requested :: ", req.method, req.url);
      return next();
    })
  }
}
