'use strict';

const sharedMapping = {
  query: { method: 'get', key: 'query' },
  params: { method: 'get', key: 'params', param: ':input' },
  headers: { method: 'get', key: 'headers' },
  body: { method: 'post', key: 'body' },
  cookies: { method: 'post', key: 'cookies' }
};

module.exports = {
  express: sharedMapping,
  kraken: sharedMapping,
  koa: {
    ...sharedMapping,
    body: { method: 'post', key: 'request.body' }
  },
  hapi: {
    ...sharedMapping,
    params: { method: 'get', key: 'params', param: '{input}' },
    body: { method: 'post', key: 'payload' },
    cookies: { method: 'post', key: 'state' }
  }
};
