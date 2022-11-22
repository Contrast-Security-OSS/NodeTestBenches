'use strict';

/**
 * @typedef {Object} InputMap
 * @property {'get' | 'post'} method
 * @property {string} [key]
 * @property {string} [param]
 */

/**
 * @typedef {Object} FrameworkMap
 * @property {InputMap} query
 * @property {InputMap} params
 * @property {InputMap} headers
 * @property {InputMap} body
 * @property {InputMap} cookies
 * @property {InputMap} input
 */

const sharedMapping = {
  query: { method: 'get', key: 'query' },
  params: { method: 'get', key: 'params', param: ':input' },
  headers: { method: 'get', key: 'headers' },
  body: { method: 'post', key: 'body' },
  cookies: { method: 'post', key: 'cookies' },
  input: { method: 'get' }
};

/** @type {{ [framework: string]: FrameworkMap }} */
module.exports = {
  restify: sharedMapping,
  express: sharedMapping,
  kraken: sharedMapping,
  loopback: sharedMapping,
  'loopback@4': {
    ...sharedMapping,
    params: { method: 'get', key: 'params', param: '{input}' }
  },
  koa: {
    ...sharedMapping,
    body: { method: 'post', key: 'request.body' },
    cookies: { method: 'post', key: 'cookie' }
  },
  hapi: {
    ...sharedMapping,
    params: { method: 'get', key: 'params', param: '{input}' },
    body: { method: 'post', key: 'payload' },
    cookies: { method: 'post', key: 'state' }
  },
  sails: sharedMapping,
};
