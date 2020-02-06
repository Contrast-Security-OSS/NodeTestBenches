'use strict';

const { MongoClient } = require('mongodb');
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/';

/**
 * @param {string} input user input string
 * @param {Object} opts
 * @param {boolean=} opts.safe are we calling the sink safely?
 * @param {boolean=} opts.noop are we calling the sink as a noop?
 */
module.exports['mongodb.Db.prototype.eval'] = async function _eval(
  input,
  { safe = false, noop = false } = {}
) {
  if (noop) return 'NOOP';

  const client = await MongoClient.connect(url);

  const fn = safe ? 'function() {}' : input;
  const result = await client
    .db('testbench')
    .eval(fn)
    .catch(() => ({ code: fn }));
  return `<pre>${JSON.stringify(result, null, 2)}</pre>`;
};

/**
 * @param {string} input user input string
 * @param {Object} opts
 * @param {boolean=} opts.safe are we calling the sink safely?
 * @param {boolean=} opts.noop are we calling the sink as a noop?
 */
module.exports['mongodb.Collection.prototype.rename'] = async function rename(
  input,
  { safe = false, noop = false } = {}
) {
  if (noop) return 'NOOP';

  const client = await MongoClient.connect(url);
  const collection = await client.db('testbench').createCollection('new');

  const newName = safe ? 'newName' : input;
  const result = await collection
    .rename(newName)
    .catch(() => ({ name: newName }));
  return `<pre>${JSON.stringify(result, null, 2)}</pre>`;
};
