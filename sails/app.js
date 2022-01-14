const { navRoutes } = require('@contrast/test-bench-utils');
const { PORT = 3000, HOST = 'localhost', SSL } = process.env;

const pem = require('pem');
const util = require('util');
const isHttps = SSL === '1' ? true : false;
const createCertificate = util.promisify(pem.createCertificate);

module.exports.setup = async function (app, ready) {
  process.env.SAILS_LOCALS = {
    navRoutes,
    currentYear: new Date().getFullYear()
  };

  const config = {
    session: {
      secret: 'keyboard cat',
      cookie: { maxAge: 60000, httpOnly: false, secure: false }
    },
    log: { level: 'silly' },
    port: PORT,
    explicitHost: HOST
  };

  if (isHttps) {
    try {
      const keys = await createCertificate({ days: 1, selfSigned: true });
      config.ssl = {
        key: keys.serviceKey,
        cert: keys.certificate
      };
      console.log('set ssl keys');
    } catch (err) {
      console.log(err);
      ready(err, config);
    }
  }

  ready(null, config);
}
