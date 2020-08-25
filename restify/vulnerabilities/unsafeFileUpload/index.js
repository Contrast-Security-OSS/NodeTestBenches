'use strict';

const { Router } = require('restify-router');
const path = require('path');

const { utils } = require('@contrast/test-bench-utils');

const router = new Router();
const sinkData = utils.getSinkData('unsafeFileUpload', 'restify');
const routeMeta = utils.getRouteMeta('unsafeFileUpload');

router.get('/', function (req, res) {
  res.render(path.resolve(__dirname, 'views', 'index'), {
    ...routeMeta,
    sinkData,
  });
});

sinkData.forEach(({ method, params, uri, sink, key }) => {
  router[method](uri, async (req, res) => {
    const inputs = utils.getInput(req, key, params);
    const result = await sink(inputs); // doesn't really do anything
    res.send(result);
  });
});

module.exports = router;
