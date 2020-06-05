'use strict';

module.exports = function(server) {
  const router = server.loopback.Router();

  router.get('/', function(req, res, next) {
    res.render('pages/parampollution', {});
  });

  server.use('/parampollution', router);
}
