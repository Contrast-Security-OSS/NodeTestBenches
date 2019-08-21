'use strict';

const { EventEmitter } = require('events');
const { Db } = require('mongodb');

const origEval = Db.prototype.eval;
Db.prototype.eval = async function overloadedEval(code, params, opts) {
  // run the original eval asynchronously, ignoring any errors it will throw since we aren't connected.
  try {
    origEval.call(this, code, params, opts);
  } catch (err) {
    // throw it away
  }
  return { code };
};

const db = new Db('testbench', new EventEmitter(), {});

// /**
//  * @param {string} input user input string
//  * @param {Object} opts
//  * @param {boolean=} opts.safe are we calling the sink safely?
//  * @param {boolean=} opts.noop are we calling the sink as a noop?
//  */
// module.exports['mongodb.Collection.prototype.rename'] = async function rename(
//   input,
//   { safe = false, noop = false } = {}
// ) {};

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
