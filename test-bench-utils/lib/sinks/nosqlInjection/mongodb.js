'use strict';

const { MongoClient } = require('mongodb');
//const mock = require('mongodb-mock-server');
// const server = mock.createServer();
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/';

const { EventEmitter } = require('events');
const { Db, Collection } = require('mongodb');

const origEval = Db.prototype.eval;
Db.prototype.eval = async function overloadedEval(code, params, opts) {
  // run the original eval asynchronously, ignoring any errors it will throw since we aren't connected.
  try {
    origEval.call(this, code, params, opts);
  } catch (err) {
    // throw it away
    console.log(err);
  }
  return { code };
};

const origRename = Collection.prototype.rename;
Collection.prototype.rename = async function overloadedRename(name, options, callback) {
  this.s.topology.s = { promiseLibrary: this.s.promiseLibrary };
  this.s.topology.command = function() { return false; };
  this.s.topology.hasSessionSupport = function() { return false; }
  try {
    origRename.call(this, name, options, callback);
  } catch (err) {
    console.log(err);
  }
  return { name };
};

const topology = new EventEmitter();
const db = new Db('testbench', topology, {});
// Call Collection constructor
const collection = new Collection(
  db,
  topology,
  'testbench',
  'collection',
  null,
  {}
);

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

  // const client = await MongoClient.connect(url);
  debugger;

  const fn = safe ? 'function() {}' : input;
  const result = await db.eval(fn);
  // const result = await client
  //   .db('testbench')
  //   .eval(fn)
  //   .catch(() => ({ code: fn }));
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
  const newName = safe ? 'newName' : input;
  // const result = await collection.rename(newName);
  if (noop) return 'NOOP';
  const result = await collection.rename(newName);
  return `<pre>${JSON.stringify(result, null, 2)}</pre>`;
};

// const client = await MongoClient.connect(url);
// const collection = await client.db('testbench').createCollection('new');

// const newName = safe ? 'newName' : input;
// const result = await collection
//   .rename(newName)
//   .catch(() => ({ name: newName }));
