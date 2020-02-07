'use strict';

const { EventEmitter } = require('events');
const { Db, Collection } = require('mongodb');

const origEval = Db.prototype.eval;
Db.prototype.eval = async function overloadedEval(code, params, opts) {
  this.s.topology.s = { promiseLibrary: this.s.promiseLibrary };
  this.s.topology.command = function() {
    return false;
  };
  this.s.topology.hasSessionSupport = function() {
    return false;
  };
  this.s.topology.isDestroyed = function() {
    return false;
  };
  // run the original eval asynchronously, ignoring any errors it will throw since we aren't connected.
  try {
    origEval.call(this, code, params, opts);
  } catch (err) {
    // throw it away
  }
  return { code };
};

const topology = new EventEmitter();
const db = new Db('testbench', topology, {});
const collection = new Collection(
  db,
  topology,
  'testbench',
  'collection',
  null,
  {}
);
const origRename = Collection.prototype.rename;
Collection.prototype.rename = async function overloadedRename(
  name,
  options,
  callback
) {
  this.s.topology.s = { promiseLibrary: this.s.promiseLibrary };
  this.s.topology.command = function() {
    return false;
  };
  this.s.topology.hasSessionSupport = function() {
    return false;
  };
  // run the original rename asynchronously, ignoring any errors it will throw since we aren't connected.
  try {
    origRename.call(this, name, options, callback);
  } catch (err) {
    // throw it away
  }
  return { name };
};

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

  const fn = safe ? 'function() {}' : input;
  const result = await db.eval(fn);

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

  const newName = safe ? 'newName' : input;
  const result = await collection.rename(newName).catch((err) => {});

  return `<pre>${JSON.stringify(result, null, 2)}</pre>`;
};
