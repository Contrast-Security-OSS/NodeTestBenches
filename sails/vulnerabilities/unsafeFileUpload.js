const { utils } = require('@contrast/test-bench-utils');

const sinkData = utils.getSinkData('unsafeFileUpload', 'sails');
const routeMeta = utils.getRouteMeta('unsafeFileUpload');

module.exports = function(app, locals) {
  const sailsRoutes = {};

  sailsRoutes[`GET /unsafeFileUpload`] = function(req, res, next) {
    return res.view('unsafeFileUpload', {
      ...routeMeta,
      sinkData,
      ...locals
    });
  };

  sinkData.forEach(({ method, params, uri, sinks, key }) => {
    sailsRoutes[`${method} /unsafeFileUpload${uri}`] = [
      async (req, res) => {
        req.file('file').upload({
          dirname: require('path').resolve(__dirname, 'uploads')
        }, async function (err, files) {
          if (err) return res.serverError(err);
          const inputs = utils.getInput(req, key, params);
          const result = await sinks.unsafe(inputs); // doesn't really do anything
          res.send(result);
        });
      }]
  });

  return sailsRoutes;
}
