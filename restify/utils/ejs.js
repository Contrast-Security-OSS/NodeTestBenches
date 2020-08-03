'use strict';
const renderFile = require('ejs-locals');
const { navRoutes } = require('@contrast/test-bench-utils');


module.exports = function renderEJS(req, res, next) {
  res.render = async function(path, options) {
    try {
      debugger;
      options.locals = {...options.locals, navRoutes, currentYear: new Date().getFullYear(), _layoutFile: '/layout' }
      options.settings = { ['view engine']: 'ejs', views: `${__dirname}/../views` };
      renderFile(path, options, function(err, html) {
        res.setHeader('content-type', 'text/html');
        res.send(html);
      });
    } catch(err) {
      console.error(err.stack);
      next(err);
    }
  }

  next();
}
