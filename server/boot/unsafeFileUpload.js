// TODO: NYI

const { utils } = require('@contrast/test-bench-utils');

const sinkData = utils.getSinkData('unsafeFileUpload', 'express');
const routeMeta = utils.getRouteMeta('unsafeFileUpload');

module.exports = function(server) {
  const router = server.loopback.Router();

  router.get('/', function(req, res, next) {
    res.render('pages/unsafeFileUpload', {
      ...routeMeta,
      sinkData
    });
  });

  server.use('/unsafeFileUpload', router);
};
