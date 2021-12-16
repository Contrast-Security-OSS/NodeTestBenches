const { navRoutes } = require('@contrast/test-bench-utils');
const { PORT = 3000, HOST = 'localhost' } = process.env;

module.exports.setup = function(app) {
  process.env.SAILS_LOCALS = {
    navRoutes,
    currentYear: new Date().getFullYear()
  };

  return {
    session: { secret: 'keyboard cat' },
    log: { level: 'silly' },
    port: PORT,
    explicitHost: HOST
  };
}
