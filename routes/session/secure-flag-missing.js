'use strict';

exports.name = 'hapitestbench.secureflagmissing';

/**
 * @param {string} type Name of the property of request to get the input from
 * @param {boolean} safe Whether or not to make the route safe
 */
function baseHandler(type, safe, request, h) {
  h.state('reply.state', 'valueSetInBaseHandler', {
    isSecure: safe
  });
  return safe ? 'safe' : 'unsafe';
}

function makeHandler(type, safe) {
  return baseHandler.bind(this, type, safe);
}

exports.register = function httpOnly(server, options) {
  const handlers = {
    safe: makeHandler('safe', true),
    unsafe: makeHandler('unsafe', false)
  };

  server.route([
    {
      method: 'GET',
      path: '/',
      handler: {
        view: 'secureflagmissing'
      }
    },
    { method: 'GET', path: '/safe', handler: handlers.safe },
    { method: 'GET', path: '/unsafe', handler: handlers.unsafe }
  ]);
};
