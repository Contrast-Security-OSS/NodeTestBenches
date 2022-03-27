'use strict';

// pragma: allowlist secret
const localTableConfig = {
  region: 'us-east-1',
  accessKeyId: 'accessKeyId',
  secretAccessKey: 'secretAccessKey',
  endpoint: 'http://localhost:8000',
};

// Config for aws-sdk @3.x
const {
  DynamoDBClient,
  ScanCommand
} = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient(localTableConfig);

// Config for aws-sdk @2.x
const AWS = require('aws-sdk');
AWS.config.update(localTableConfig);

const db = new AWS.DynamoDB();
const documentClient = new AWS.DynamoDB.DocumentClient();

const createTable = async () => {
  try {
    await db.createTable({
      TableName: 'Movies',
      KeySchema: [
        { AttributeName: "released_year", KeyType: "HASH" },
        { AttributeName: "title", KeyType: "RANGE" }  //Sort key
      ],
      AttributeDefinitions: [
        { AttributeName: "released_year", AttributeType: "N" },
        { AttributeName: "title", AttributeType: "S" }
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
      }
    }).promise();
  } catch (err) {
    // most-likely the table already exists
    console.log(err.code);
  }
};

(async function() { await createTable(); }());

function getDocClientParams(arg) {
  return {
    FilterExpression: 'id = :id',
    ExpressionAttributeValues: {
      ':id': arg
    },
    TableName: 'Movies'
  };
}

function getClientParams(arg) {
  return {
    TableName: 'Movies',
    FilterExpression: 'id = :id',
    ExpressionAttributeValues: {
      ':id': { S: arg }
    }
  };
}

process.on('unhandledRejection', function(err, data) {
  console.log(err, data);
});

/**
 * @param {Object} params
 * @param {string} params.input user input string
 * @param {Object} opts
 * @param {boolean} [opts.safe] are we calling the sink safely?
 * @param {boolean} [opts.noop] are we calling the sink as a noop?
 */
module.exports[
  'aws-sdk.DynamoDB.DocumentClient.prototype.scan'
] = async function scan({ input }, { safe = false, noop = false } = {}) {
  if (noop) return 'NOOP';

  //await db.deleteTable({'TableName': 'Movies'}).promise();
  const params = getDocClientParams(safe ? 'safe' : input);
  return await documentClient.scan(params).promise();
};

/**
 * @param {Object} params
 * @param {string} params.input user input string
 * @param {Object} opts
 * @param {boolean} [opts.safe] are we calling the sink safely?
 * @param {boolean} [opts.noop] are we calling the sink as a noop?
 */
module.exports['aws-sdk.DynamoDB.prototype.makeRequest'] = async function scan(
  { input },
  { safe = false, noop = false } = {}
) {
  if (noop) return 'NOOP';

  const params = getClientParams(safe ? 'safe' : input);
  return await db.makeRequest('scan', params).promise();
};

/**
 * @param {Object} params
 * @param {string} params.input user input string
 * @param {Object} opts
 * @param {boolean} [opts.safe] are we calling the sink safely?
 * @param {boolean} [opts.noop] are we calling the sink as a noop?
 */
module.exports['aws-sdk.client-dynamodb.ScanCommand.ComparisonOperator'] = async function scan(
  { input },
  { safe = false, noop = false } = {}
) {
  if (noop) return 'NOOP';

  // title=Something&comp=NE
  const query = require('querystring').parse(input);

  // Query by value is safe, but if there is ALSO control on the
  // comparison operator, then this could be exploited
  if (safe) query.comp = 'EQ';

  return await client.send(new ScanCommand({
    TableName: 'Movies',
    Select: 'ALL_ATTRIBUTES',
    ScanFilter: {
      'title': {
        'AttributeValueList': [{'S': query.title }],
        'ComparisonOperator': query.comp
      }
    }
  }));
};

/**
 * @param {Object} params
 * @param {string} params.input user input string
 * @param {Object} opts
 * @param {boolean} [opts.safe] are we calling the sink safely?
 * @param {boolean} [opts.noop] are we calling the sink as a noop?
 */
module.exports['aws-sdk.client-dynamodb.ScanCommand.FilterExpression'] = async function scan(
  { input },
  { safe = false, noop = false } = {}
) {
  if (noop) return 'NOOP';

  // key=title&title=Star%20Wars&year=1982
  const query = require('querystring').parse(input);

  if (safe) query.key = 'title';

  return await client.send(new ScanCommand({
    TableName: 'Movies',
    FilterExpression: query.key + " = :title AND released_year = :released_year",
    ExpressionAttributeValues: {
      ":title": { "S": query.title },
      ":released_year": { "N": query.year }
    }
  }));
};

/**
 * @param {Object} params
 * @param {string} params.input user input string
 * @param {Object} opts
 * @param {boolean} [opts.safe] are we calling the sink safely?
 * @param {boolean} [opts.noop] are we calling the sink as a noop?
 */
module.exports['aws-sdk.client-dynamodb.ScanCommand.ProjectionExpression'] = async function scan(
  { input },
  { safe = false, noop = false } = {}
) {
  if (noop) return 'NOOP';

  // key=title&title=Star%20Wars
  const query = require('querystring').parse(input);

  if (safe) query.key = 'title';

  return await client.send(new ScanCommand({
    TableName: 'Movies',
    FilterExpression: 'title = :title',
    ProjectionExpression: `released_year, ${query.key}`,
    ExpressionAttributeValues: {
      ":title": { "S": query.title }
    }
  }));
};
