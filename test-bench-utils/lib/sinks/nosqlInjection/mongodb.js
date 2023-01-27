'use strict';

const escape = require('escape-html');
const { MongoClient } = require('mongodb');

const {
  MONGO_COLLECTION = 'documents',
  MONGO_DB = 'testbench',
  MONGO_URL = 'mongodb://localhost:27017'
} = process.env;

const client = new MongoClient(MONGO_URL);

const initDb = async () => {
  await client.connect();
  const db = client.db(MONGO_DB);

  const collections = await db.collections();
  await Promise.all(
    collections.map((collection) =>
      db.dropCollection(collection.collectionName).catch((err) => {
        // this handles a race condition that can occur where we try to drop a
        // collection after it has already been dropped
        if (!err.codeName || err.codeName !== 'NamespaceNotFound') throw err;
      })
    )
  );

  await db.collection(MONGO_COLLECTION).insertOne({
    hello: 'world'
  });

  return db;
};

/**
 * @param {Object} params
 * @param {string} params.input user input string
 * @param {Object} opts
 * @param {boolean} [opts.safe] are we calling the sink safely?
 * @param {boolean} [opts.noop] are we calling the sink as a noop?
 */
module.exports['mongodb.Collection.prototype.rename'] = async function rename(
  { input },
  { safe = false, noop = false } = {}
) {
  if (noop) return 'NOOP';

  const newName = safe ? 'newName' : input;
  const db = await initDb();
  const result = await db
    .collection(MONGO_COLLECTION)
    .rename(newName)
    .catch((err) => {});

  return `<pre>${escape(JSON.stringify(result.collectionName, null, 2))}</pre>`;
};

/**
 * @param {Object} params
 * @param {string} params.input user input string
 * @param {Object} opts
 * @param {boolean} [opts.safe] are we calling the sink safely?
 * @param {boolean} [opts.noop] are we calling the sink as a noop?
 */
module.exports['mongodb.Collection.prototype.findOne'] = async function rename(
  { input },
  { safe = false, noop = false } = {}
) {
  if (noop) return 'NOOP';

  const value = safe ? 'world' : input;
  const db = await initDb();
  const result = await db
    .collection(MONGO_COLLECTION)
    .findOne({ hello: value })
    .catch((err) => {});

  return `<pre>${escape(JSON.stringify(result, null, 2))}</pre>`;
};

/**
 * @param {Object} params
 * @param {string} params.input user input string
 * @param {Object} opts
 * @param {boolean} [opts.safe] are we calling the sink safely?
 * @param {boolean} [opts.noop] are we calling the sink as a noop?
 */
module.exports['mongodb.Collection.prototype.findOne__$function'] = async function rename(
  { input },
  { safe = false, noop = false } = {}
) {
  if (noop) return 'NOOP';

  const value = safe ? '() => { return true } || true' : input;
  const db = await initDb();
  const result = await db
    .collection(MONGO_COLLECTION)
    .findOne({ $expr: { $function: { body: `${value} || true`, args: [], lang: 'js' } } })
    .catch((err) => {});
  return `<pre>${escape(JSON.stringify(result, null, 2))}</pre>`;
};

module.exports['mongodb.Collection.prototype.findOneAndUpdate__$function'] = async function findOneAndUpdate(
  { input },
  { safe = false, noop = false } = {}
) {
  if (noop) return 'NOOP';

  const value = safe ? '() => { return true } || true' : input;
  const db = await initDb();
  const result = await db
    .collection(MONGO_COLLECTION)
    .findOneAndUpdate({ $expr: { $function: { body: `${value} || true`, args: [], lang: 'js' } } }, { $set: { hello: 'updated value' } })
    .catch((err) => {});

  return `<pre>${escape(JSON.stringify(result, null, 2))}</pre>`;
};

/**
 * @param {Object} params
 * @param {string} params.input user input string
 * @param {Object} opts
 * @param {boolean} [opts.safe] are we calling the sink safely?
 * @param {boolean} [opts.noop] are we calling the sink as a noop?
 */
module.exports['mongodb.Collection.prototype.updateOne'] = async function rename(
  { input },
  { safe = false, noop = false } = {}
) {
  if (noop) return 'NOOP';

  // In this example, the filter is SAFE, but the update object might not be
  const value = safe ? 'Shusia' : input;
  const db = await initDb();
  const result = await db
    .collection(MONGO_COLLECTION)
    .updateOne({ hello: 'world' }, { $set: { hello: value } })
    .catch((err) => {});

  return `<pre>${escape(JSON.stringify(result, null, 2))}</pre>`;
};

module.exports['mongodb.Collection.prototype.findOneAndUpdate__$where'] = async function findOneAndUpdate(
  { input },
  { safe = false, noop = false } = {}
) {
  if (noop) return 'NOOP';

  const value = safe ? '() => true' : input;
  const db = await initDb();
  const result = await db
    .collection(MONGO_COLLECTION)
    .findOneAndUpdate({ $where: `() => ${value} || true` }, { $set: { hello: 'updated value' } })
    .catch((err) => {});

  return `<pre>${escape(JSON.stringify(result, null, 2))}</pre>`;
};

module.exports['mongodb.Collection.prototype.updateMany__$where'] = async function updateMany(
  { input },
  { safe = false, noop = false } = {}
) {
  if (noop) return 'NOOP';

  const value = safe ? '() => true' : input;
  const db = await initDb();
  const result = await db
    .collection(MONGO_COLLECTION)
    .updateMany({ $where: `() => ${value} || true` }, { $set: { hello: 'updated value' } })
    .catch((err) => {});

  return `<pre>${escape(JSON.stringify(result, null, 2))}</pre>`;
};

module.exports['mongodb.Collection.prototype.aggregate__$accumulator__$init'] = async function findOneAndUpdate(
  { input },
  { safe = false, noop = false } = {}
) {
  if (noop) return 'NOOP';

  const value = safe ? 'function() { return { count: 0 } }' : input;
  const db = await initDb();
  const result = await db
    .collection(MONGO_COLLECTION).aggregate([
      {
        $group: {
          _id: null,
          count: {
            $accumulator: {
              init: value,
              initArgs: [],
              accumulate: 'function(state) { return { count: state.count + 1 } }',
              accumulateArgs: [],
              merge: 'function(state1, state2) { return { count: state1.count + state2.count } }',
              finalize: 'function(state) { return state }',
              lang: 'js'
            }
          }
        }
      }
    ])
    .toArray();
  return `<pre>${escape(JSON.stringify(result, null, 2))}</pre>`;
};

module.exports['mongodb.Collection.prototype.aggregate__$accumulator__$accumulate'] = async function findOneAndUpdate(
  { input },
  { safe = false, noop = false } = {}
) {
  if (noop) return 'NOOP';

  const value = safe ? 'function(state) { return { count: state.count + 1 } }' : input;
  const db = await initDb();
  const result = await db
    .collection(MONGO_COLLECTION).aggregate([
      {
        $group: {
          _id: null,
          count: {
            $accumulator: {
              init: 'function() { return { count: 0 } }',
              initArgs: [],
              accumulate: value,
              accumulateArgs: [],
              merge: 'function(state1, state2) { return { count: state1.count + state2.count } }',
              finalize: 'function(state) { return state }',
              lang: 'js'
            }
          }
        }
      }
    ])
    .toArray();
  return `<pre>${escape(JSON.stringify(result, null, 2))}</pre>`;
};

module.exports['mongodb.Collection.prototype.aggregate__$accumulator__$merge'] = async function findOneAndUpdate(
  { input },
  { safe = false, noop = false } = {}
) {
  if (noop) return 'NOOP';

  const value = safe ? 'function(state1, state2) { return { count: state1.count + state2.count } }' : input;
  const db = await initDb();
  const result = await db
    .collection(MONGO_COLLECTION).aggregate([
      {
        $group: {
          _id: null,
          count: {
            $accumulator: {
              init: 'function() { return { count: 0 } }',
              initArgs: [],
              accumulate: 'function(state) { return { count: state.count + 1 } }',
              accumulateArgs: [],
              merge: value,
              finalize: 'function(state) { return state }',
              lang: 'js'
            }
          }
        }
      }
    ])
    .toArray();
  return `<pre>${escape(JSON.stringify(result, null, 2))}</pre>`;
};

module.exports['mongodb.Collection.prototype.aggregate__$accumulator__$finalize'] = async function findOneAndUpdate(
  { input },
  { safe = false, noop = false } = {}
) {
  if (noop) return 'NOOP';

  const value = safe ? 'function(state) { return state }' : input;
  const db = await initDb();
  const result = await db
    .collection(MONGO_COLLECTION).aggregate([
      {
        $group: {
          _id: null,
          count: {
            $accumulator: {
              init: 'function() { return { count: 0 } }',
              initArgs: [],
              accumulate: 'function(state) { return { count: state.count + 1 } }',
              accumulateArgs: [],
              merge: 'function(state1, state2) { return { count: state1.count + state2.count } }',
              finalize: value,
              lang: 'js'
            }
          }
        }
      }
    ])
    .toArray();
  return `<pre>${escape(JSON.stringify(result, null, 2))}</pre>`;
};
