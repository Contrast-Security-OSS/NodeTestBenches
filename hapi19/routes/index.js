'use strict';

exports.register = (server, options) => {
  server.route([
    {
      method: 'GET',
      path: '/',
      handler: {
        view: 'index'
      }
    },
    {
      method: 'GET',
      path: '/public/app.css',
      handler(request, h) {
        return h.file(`${__dirname}/../public/app.css`);
      }
    },
    {
      method: 'GET',
      path: '/quit',
      handler: (request, h) => {
				request.events.on('finish', () => process.exit()); // eslint-disable-line
        return 'adieu, cherie';
      }
    }
  ]);
};

exports.pkg = require('../package.json');
