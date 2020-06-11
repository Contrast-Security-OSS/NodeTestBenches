'use strict';

const AWS = require('aws-sdk');
const db = new AWS.DynamoDB();
function getDocClientparams(arg) {
  return {
    FilterExpression: 'id = :id',
    ExpressionAttributeValues: {
      ':id': arg
    }
  };
}

// hooker.hook(
//   require('aws-sdk/lib/dynamodb/document_client').prototype,
//   'makeServiceRequest',
//   {
//     post() {}
//   }
// );

// hooker.hook(require('aws-sdk/lib/dynamodb/').prototype, 'makeRequest', {
//   post() {}
// });

/**
 * @param {string} input user input string
 * @param {Object} opts
 * @param {boolean=} opts.safe are we calling the sink safely?
 * @param {boolean=} opts.noop are we calling the sink as a noop?
 */
// const origDocClientScan = AWS.DynamoDB.DocumentClient.prototype.scan;
const documentClient = new AWS.DynamoDB.DocumentClient();
documentClient.scan = function overloadedDocClientScan(params, callback) {
  // Stubs go here
  debugger;
  return params;
  // origDocClientScan.call(this, params, callback);
};

module.exports[
  'aws-sdk.DynamoDB.DocumentClient.prototype.scan'
] = async function scan(input, { safe = false, noop = false } = {}) {
  if (noop) return 'NOOP';

  // const fn = safe ? 'function() {}' : input;
  const result = documentClient.scan(getDocClientparams(input));

  return `<pre>${escape(JSON.stringify(result, null, 2))}</pre>`;
};

const origDbScan = AWS.DynamoDB.prototype.scan;
AWS.DynamoDB.prototype.scan = async function overloadedDbScan(
  params,
  callback
) {
  // Stubs go here
  debugger;
  origDbScan.call(this, params, callback);
};

module.exports['aws-sdk.DynamoDB.prototype.scan'] = async function scan(
  input,
  { safe = false, noop = false } = {}
) {
  if (noop) return 'NOOP';

  // const fn = safe ? 'function() {}' : input;
  const result = await db.scan(params);

  return `<pre>${escape(JSON.stringify(result, null, 2))}</pre>`;
};

// /**
//  * @param {string} input user input string
//  * @param {Object} opts
//  * @param {boolean=} opts.safe are we calling the sink safely?
//  * @param {boolean=} opts.noop are we calling the sink as a noop?
//  */
// module.exports[
//   'aws-sdk.DynamoDB.prototype.makeRequest'
// ] = async function makeRequest(input, { safe = false, noop = false } = {}) {};
//
// /**
//  * @param {string} input user input string
//  * @param {Object} opts
//  * @param {boolean=} opts.safe are we calling the sink safely?
//  * @param {boolean=} opts.noop are we calling the sink as a noop?
//  */
// module.exports[
//   'aws-sdk.DynamoDB.DocumentClient.prototype.batchGet'
// ] = async function batchGet(input, { safe = false, noop = false } = {}) {};
//
// /**
//  * @param {string} input user input string
//  * @param {Object} opts
//  * @param {boolean=} opts.safe are we calling the sink safely?
//  * @param {boolean=} opts.noop are we calling the sink as a noop?
//  */
// module.exports[
//   'aws-sdk.DynamoDB.DocumentClient.prototype.batchWrite'
// ] = async function batchWrite(input, { safe = false, noop = false } = {}) {};
//
// /**
//  * @param {string} input user input string
//  * @param {Object} opts
//  * @param {boolean=} opts.safe are we calling the sink safely?
//  * @param {boolean=} opts.noop are we calling the sink as a noop?
//  */
// module.exports[
//   'aws-sdk.DynamoDB.DocumentClient.prototype.delete'
// ] = async function _delete(input, { safe = false, noop = false } = {}) {};
//
// /**
//  * @param {string} input user input string
//  * @param {Object} opts
//  * @param {boolean=} opts.safe are we calling the sink safely?
//  * @param {boolean=} opts.noop are we calling the sink as a noop?
//  */
// module.exports[
//   'aws-sdk.DynamoDB.DocumentClient.prototype.query'
// ] = async function query(input, { safe = false, noop = false } = {}) {};
//
// /**
//  * @param {string} input user input string
//  * @param {Object} opts
//  * @param {boolean=} opts.safe are we calling the sink safely?
//  * @param {boolean=} opts.noop are we calling the sink as a noop?
//  */
// module.exports[
//   'aws-sdk.DynamoDB.DocumentClient.prototype.scan'
// ] = async function scan(input, { safe = false, noop = false } = {}) {};
//
// /**
//  * @param {string} input user input string
//  * @param {Object} opts
//  * @param {boolean=} opts.safe are we calling the sink safely?
//  * @param {boolean=} opts.noop are we calling the sink as a noop?
//  */
// module.exports[
//   'aws-sdk.DynamoDB.DocumentClient.prototype.transactGet'
// ] = async function transactGet(input, { safe = false, noop = false } = {}) {};
//
// /**
//  * @param {string} input user input string
//  * @param {Object} opts
//  * @param {boolean=} opts.safe are we calling the sink safely?
//  * @param {boolean=} opts.noop are we calling the sink as a noop?
//  */
// module.exports[
//   'aws-sdk.DynamoDB.DocumentClient.prototype.transactWrite'
// ] = async function transactWrite(input, { safe = false, noop = false } = {}) {};
//
// /**
//  * @param {string} input user input string
//  * @param {Object} opts
//  * @param {boolean=} opts.safe are we calling the sink safely?
//  * @param {boolean=} opts.noop are we calling the sink as a noop?
//  */
// module.exports[
//   'aws-sdk.DynamoDB.DocumentClient.prototype.get'
// ] = async function get(input, { safe = false, noop = false } = {}) {};
//
// /**
//  * @param {string} input user input string
//  * @param {Object} opts
//  * @param {boolean=} opts.safe are we calling the sink safely?
//  * @param {boolean=} opts.noop are we calling the sink as a noop?
//  */
// module.exports[
//   'aws-sdk.DynamoDB.DocumentClient.prototype.update'
// ] = async function update(input, { safe = false, noop = false } = {}) {};
//
// /**
//  * @param {string} input user input string
//  * @param {Object} opts
//  * @param {boolean=} opts.safe are we calling the sink safely?
//  * @param {boolean=} opts.noop are we calling the sink as a noop?
//  */
// module.exports[
//   'aws-sdk.DynamoDB.DocumentClient.prototype.put'
// ] = async function put(input, { safe = false, noop = false } = {}) {};
