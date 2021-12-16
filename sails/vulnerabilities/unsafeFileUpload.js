const { utils } = require('@contrast/test-bench-utils');

const sinkData = utils.getSinkData('unsafeFileUpload', 'express');
const routeMeta = utils.getRouteMeta('unsafeFileUpload');

module.exports = function(app, locals) {
  const sailsRoutes = {};
  // should return obj of routes {
  // 'GET /unsafeFileUpload' : ~view~ ,
  // '
  // }

  sailsRoutes[`GET /unsafeFileUpload`] = function(req, res, next) {
    return res.view('unsafeFileUpload', {
      ...routeMeta,
      sinkData,
      ...locals
    });
  };

  sinkData.forEach(({ method, params, uri, sinks, key }) => {
    sailsRoutes[`${method} /unsafeFileUpload${uri}`] = [
      async (req, res, next) => {
        req.file('file').upload({
          dirname: require('path').resolve(__dirname, 'uploads')
        }, function (err, files) {
          if (err) {
            console.log(err);
            return res.serverError(err);
          }
          next();
        });
      },
      async (req, res) => {
        const inputs = utils.getInput(req, key, params);
        const result = await sinks.unsafe(inputs); // doesn't really do anything
        res.send(result);
      }]
  });

  return sailsRoutes;
}
