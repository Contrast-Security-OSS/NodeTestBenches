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
  await db.collection(MONGO_COLLECTION).insertOne({
    hello: 'world2'
  });
  await db.collection(MONGO_COLLECTION).insertOne({
    hello: 'world3'
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
module.exports[
  'mongodb.Db.prototype.find (Expansion Query)'
] = async function _eval(input, { safe = false, noop = false } = {}) {
  if (noop) return 'NOOP';
  // const query = safe ? `${input}` : input;
  const db = await initDb();

  const result = await db
    .collection(MONGO_COLLECTION)
    .find(input)
    .toArray();
  // let result = await db.collection(MONGO_COLLECTION).find({hello: input}).toArray();

  return `<pre>${escape(JSON.stringify(result, null, 2))}</pre>`;
};
