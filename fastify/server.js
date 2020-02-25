const fastify = require('fastify')({ logger: true });
const path = require('path');
const { navRoutes } = require('@contrast/test-bench-utils');

// setup ejs renderer
// god damn point-of-view doesnt support layouts like every other
// view front-end in node.
fastify.register(require('point-of-view'), {
  engine: {
    ejs: require('ejs')
  },
  templates: 'view',
  includeViewExtension: true // dont want to write .ejs every time
});

// shared route information
const context = { navRoutes, currentYear: new Date().getFullYear() };

// setup public assets
fastify.register(require('fastify-static'), {
  root: path.join(__dirname, 'public'),
  prefix: '/assets/'
});

fastify.register(require('./routes/index'), context);

// register routes for each vulnerability
// navRoutes.forEach(({ base }) => {
//    fastify.register(`./routes/${base.substring(1)}`, context);
// });
fastify.register(require(`./routes/cmdInjection`), context);

const start = async () => {
  try {
    await fastify.listen(3000);
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    console.log(err);
  }
};

start();
