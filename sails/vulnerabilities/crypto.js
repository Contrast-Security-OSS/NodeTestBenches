'use strict';

const { utils } = require('@contrast/test-bench-utils');

const sinkData = utils.getSinkData('crypto', 'sails');
const routeMeta = utils.getRouteMeta('crypto');
const groupedSinkData = utils.groupSinkData(sinkData);

const crypto = require('crypto');

module.exports = function(app, locals){
  return {
    'GET /crypto': { view: 'crypto', locals: {
      ...routeMeta,
      groupedSinkData,
      sinkData,
        ...locals
    }},
    'GET /crypto/query/cryptoBadMac/:sink': function(req, res) {
      if (req.params.sink === 'noop') return res.send('NOOP');

      const algorithm = req.params.sink === 'safe' ? 'sha512' : 'md5';

      res.send(crypto
        .createHash(algorithm)
        .update('salt')
        .digest('hex'));
    },
    'GET /crypto/query/cryptoBadCiphers/:sink': function (req, res) {
      if (req.params.sink === 'noop') return res.send('NOOP');

      const { algorithm, bytes, key_length } = safe
      ? { algorithm: 'aes-256-cbc', bytes: 16, key_length: 32}
      : { algorithm: 'camellia-128-cbc', bytes: 16, key_length: 16 };
  
      const key = Buffer.alloc(key_length);
      const iv = Buffer.alloc(bytes);
      const cipher = crypto.createCipheriv(algorithm, key, iv);
      cipher.update('woot', 'utf8', 'base64');

      res.send(cipher.final('base64'));
    },
    'GET /crypto/query/cryptoWeakRandomness/:sink': function(req, res) {
      if (req.params.sink === 'noop') return res.send('NOOP');

      res.send(req.params.sink === 'safe'
        ? crypto.randomBytes(10).toString('hex')
        : Math.random(10).toString());
    }
  }
}
