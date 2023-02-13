/* eslint-disable @typescript-eslint/no-var-requires */

import { navRoutes } from '@contrast/test-bench-utils';
import fastify, { FastifyInstance } from 'fastify';
import path from 'path';
import pem from 'pem';
import view from '@fastify/view';
import cookie from '@fastify/cookie';
import formbody from '@fastify/formbody';
import multipart from '@fastify/multipart';

const isHttps = process.env.SSL === '1' ? true : false;
const isHttp2 = process.env.HTTP2 === '1' ? true : false;

const createServer = async (): Promise<FastifyInstance> => {
  const opts: { logger: boolean, http2?: boolean, https?: any } = { logger: true };
  if (!isHttps && !isHttp2) return fastify(opts);

  return new Promise((resolve, reject) => {
    pem.createCertificate({ days: 1, selfSigned: true }, (err: Error, result: any) => {
      if (err) return reject(err);

      opts.http2 = isHttp2;
      opts.https = {
        key: result.serviceKey,
        cert: result.certificate
      };

      return resolve(fastify(opts));
    });
  });
};

const build = async (): Promise<FastifyInstance> => {
  const app = await createServer();

  app.register(require('fastify-qs'), { allowDots: true });
  app.register(formbody);

  // setup ejs renderer
  // god damn point-of-view doesnt support layouts like every other
  // view front-end in node.
  app.register(view, {
    engine: {
      ejs: require('ejs')
    },
    templates: path.join(__dirname, '..', 'view'),
    includeViewExtension: true // dont want to write .ejs every time
  });

  app.register(multipart, { addToBody: true });
  app.register(cookie);

  // shared route information
  const context = { navRoutes, currentYear: new Date().getFullYear() };

  // setup public assets
  app.register(require('@fastify/static'), {
    root: path.join(__dirname, '..', 'public'),
    prefix: '/assets/'
  });

  app.register(require('./routes/index'), context);

  // register routes for each vulnerability
  navRoutes.forEach(({ base }) => {
    app.register(require(`./routes/${base.substring(1)}`), context);
  });

  // one off routes that are not members of navroutes
  app.register(require('./routes/header-injection'), context);
  app.register(require('./routes/csp-header'), context);
  app.register(require('./routes/cookies'), context);
  app.register(require('./routes/class-validator'), context);

  return app;
};

export default build;
