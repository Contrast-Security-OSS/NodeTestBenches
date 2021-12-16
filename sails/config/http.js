const { navRoutes } = require('@contrast/test-bench-utils');

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
    }),
    // TODO: Figure out if there is a way to re-wire the www middleware to
    // serve "assets" or "public" without the use of Grunt
  }
}
