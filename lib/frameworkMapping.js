'use strict';

const sharedMapping = {
  query: { method: 'get', key: 'query' },
  params: { method: 'get', key: 'params', param: ':input' },
  headers: { method: 'get', key: 'headers' },
  body: { method: 'post', key: 'body' },
  cookies: { method: 'post', key: 'cookies' }
};

module.exports = {
  koa: sharedMapping,
  express: sharedMapping,
  kraken: sharedMapping,
  hapi: {
    query: { method: 'get', key: 'query' }, // shared
    params: { method: 'get', key: 'params', param: '{input}' }, // shared
    headers: { method: 'get', key: 'headers' }, // shared
    body: { method: 'post', key: 'payload' },
    cookies: { method: 'post', key: 'state' }
  }
};
