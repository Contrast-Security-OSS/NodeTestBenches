'use strict';
// Provides a structured mapping of how each source input maps to a given http method and key on req
const sharedMapping = {
  query: { method: 'get', key: 'query' },
  params: { method: 'put', key: 'params' },
  headers: { method: 'get', key: 'headers' },
  body: { method: 'post', key: 'body' },
  cookies: { method: 'post', key: 'cookies' }
};

module.exports = {
  koa: sharedMapping,
  express: sharedMapping,
  kraken: sharedMapping,
  hapi: {
    query: { method: 'get', key: 'query' },
    params: { method: 'put', key: 'params' },
    headers: { method: 'get', key: 'headers' },
    body: { method: 'post', key: 'payload' },
    cookies: { method: 'post', key: 'state' }
  }
};
