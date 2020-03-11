// TODO: NYI

const { get } = require('lodash');
const uuid = require('uuid/v4');
const { utils } = require('@contrast/test-bench-utils');

const sinkData = utils.getSinkData('unsafeFileUpload', 'express');
const routeMeta = utils.getRouteMeta('unsafeFileUpload');

module.exports = function(server) {
  const router = server.loopback.Router();
  const model = server.loopback.getModel('unsafeFileUpload');

  router.get('/', function(req, res, next) {
    res.render('pages/unsafeFileUpload', {
      ...routeMeta,
      sinkData
    });
  });

  sinkData.forEach(({ method, uri, sink, key }) => {
    router[method](uri, async (req, res, next) => {
      try {
        const container = await model.createContainer({ name: uuid() });
        const uploadResult = await model.upload(container.name, req, res, {});
        const result = get(uploadResult, 'fields.input[0]');

        res.send(result);
      } catch (err) {
        next(err);
      }
    });
  });

  server.use('/unsafeFileUpload', router);
};
