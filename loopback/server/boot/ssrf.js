'use strict';

const { get } = require('lodash');
const { utils } = require('@contrast/test-bench-utils');

const EXAMPLE_URL = 'http://www.example.com';

const sinkData = utils.getSinkData('ssrf', 'loopback');
const routeMeta = utils.getRouteMeta('ssrf');

// TODO
module.exports = function(server) {
  const router = server.loopback.Router();

  router.get('/', function(req, res, next) {
    res.render('pages/ssrf', {
      ...routeMeta,
      sinkData,
      requestUrl: EXAMPLE_URL
    });
  });

  sinkData.forEach(({ method, sink, name, key }) => {
    router[method](`/${name}/query`, async (req, res, next) => {
      try {
        const { input } = get(req, key);
        const url = `${EXAMPLE_URL}?q=${input}`;
        const result = await sink(url);
        res.send(result);
      } catch (err) {
        next(err);
      }
    });

    router[method](`/${name}/host`, async (req, res, next) => {
      try {
        const { input } = get(req, key);
        const url = `http://${input}`;
        const result = await sink(url);
        res.send(result);
      } catch (err) {
        next(err);
      }
    });

    router[method](`/${name}/path`, async (req, res, next) => {
      try {
        const { input } = get(req, key);
        const url = `${EXAMPLE_URL}/${input}`;
        const result = await sink(url);
        res.send(result);
      } catch (err) {
        next(err);
      }
    });
  });

  server.use('/ssrf', router);
};
