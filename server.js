const fastify = require('fastify')();
const path = require('path');

// setup ejs renderer
fastify.register(require('point-of-view'), {
  engine: {
    ejs: require('ejs')
  },
  templates: 'view',
  options: {
    layout: './view/layout.ejs'
  },
  includeViewExtension: true // dont want to write .ejs every time
});

// setup public assets
fastify.register(require('fastify-static'), {
  root: path.join(__dirname, 'public'),
  prefix: '/assets/'
});



fastify.register(require('./routes/index'));

const start = async () => {
  try {
    await fastify.listen(3000);
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
  }
};

start();
