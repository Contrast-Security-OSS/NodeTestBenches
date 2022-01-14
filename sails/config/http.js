'use strict';

module.exports.http = {
  middleware: {
    order: [
      'cookieParser',
      'session',
      'requestLogger',
      'bodyParser',
      'compress',
      'poweredBy',
      'router',
      'www',
      'favicon',
    ],
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
