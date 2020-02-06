'use strict';

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
  try {
    origCreateCollection.call(this, name, options, callback);
  } catch (err) {
    console.log(err);
  }
  return { name }
};

const topology = new EventEmitter();
debugger;
const db = new Db('testbench', topology, {});
// Call Collection constructor
const collection = new Collection(db, topology, 'testbench', 'collection', null, {});
console.log(collection);
// const collection = db.createCollection('testCollection', { capped: true}, (result) => {
  // console.log(result);
// });



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
  const newname = safe ? 'newName' : input
  const result = await collection.rename(newName);
  if (noop) return 'NOOP';

  if (safe) {
    return Collection.rename('newName', options, () => {});
  } else {
    // Pass in input somewhere
    return Collection.rename(input, options, callback);
    // return Collection.rename(input, options, callback);
  }
};
