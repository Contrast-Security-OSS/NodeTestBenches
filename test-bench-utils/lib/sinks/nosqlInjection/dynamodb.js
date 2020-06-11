'use strict';

const AWS = require('aws-sdk');
function getDocClientParams(arg) {
  return {
    FilterExpression: 'id = :id',
    ExpressionAttributeValues: {
      ':id': arg
    }
  };
}

function getClientParams(arg) {
  return {
    FilterExpression: 'id = :id',
    ExpressionAttributeValues: {
      ':id': { S: arg }
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
AWS.DynamoDB.DocumentClient.prototype.makeServiceRequest = function() {
  return {};
}

const origDocClientScan = AWS.DynamoDB.DocumentClient.prototype.scan;
AWS.DynamoDB.DocumentClient.prototype.scan = function overloadedDocClientScan(params, callback) {
  origDocClientScan.call(this, params, callback);
  return params;
};

const documentClient = new AWS.DynamoDB.DocumentClient();

module.exports[
  'aws-sdk.DynamoDB.DocumentClient.prototype.scan'
] = async function scan(input, { safe = false, noop = false } = {}) {
  if (noop) return 'NOOP';

  // const fn = safe ? 'function() {}' : input;
  const result = documentClient.scan(getDocClientParams(safe ? 'safe': input));

  return `<pre>${escape(JSON.stringify(result, null, 2))}</pre>`;
};

const origMakeRequest = AWS.DynamoDB.prototype.makeRequest;
AWS.DynamoDB.prototype.makeRequest = function overloadedDbScan(
  method,
  params,
  callback
) {
  origMakeRequest.call(this, method, params, callback);
  return params;
};

const db = new AWS.DynamoDB();

module.exports['aws-sdk.DynamoDB.prototype.makeRequest'] = async function scan(
  input,
  { safe = false, noop = false } = {}
) {
  if (noop) return 'NOOP';

  const result = db.makeRequest('scan', getClientParams(safe ? 'safe' : input));

  return `<pre>${escape(JSON.stringify(result, null, 2))}</pre>`;
};

