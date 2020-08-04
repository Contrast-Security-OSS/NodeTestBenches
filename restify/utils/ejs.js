'use strict';
const renderFile = require('ejs-locals');
const { navRoutes } = require('@contrast/test-bench-utils');

/**
 * Adds a render method to `res` so you can render ejs templates
 * w/ layouts
 *
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 * @param {Function} next
 */
module.exports = function renderEJS(req, res, next) {
  /**
   * Renders a template
   *
   * @param {string} path location of .ejs
   * @param {Object} options to pass to template
   */
  res.render = function (path, options) {
    try {
      options.locals = {
        ...options.locals,
        navRoutes,
        currentYear: new Date().getFullYear(),
        _layoutFile: '/layout',
      };
      options.settings = {
        ['view engine']: 'ejs',
        views: `${__dirname}/../views`,
      };
      renderFile(`${path}.ejs`, options, function (err, html) {
        res.setHeader('content-type', 'text/html');
        res.send(html);
      });
    } catch (err) {
      console.error(err.stack);
      next(err);
    }
  };

  next();
};
