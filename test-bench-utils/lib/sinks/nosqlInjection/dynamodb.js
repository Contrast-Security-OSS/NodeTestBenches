'use strict';

const localTableConfig = {
  region: 'us-east-1',
  endpoint: 'http://localhost:8000'
};

// Config for aws-sdk @3.x
const {
  DynamoDBClient,
  ExecuteStatementCommand,
  ScanCommand
} = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient(
  Object.assign(localTableConfig, {
    credentials: {
      accessKeyId: 'accessKeyId',
      secretAccessKey: 'secretAccessKey'
    }
  })
);

// Config for aws-sdk @2.x
const AWS = require('aws-sdk');
AWS.config.update(
  Object.assign(localTableConfig, {
    accessKeyId: 'accessKeyId',
    secretAccessKey: 'secretAccessKey',
  })
);

const db = new AWS.DynamoDB();
const documentClient = new AWS.DynamoDB.DocumentClient();

const createTable = async () => {
  try {
    await db
      .createTable({
        TableName: 'Movies',
        KeySchema: [
          { AttributeName: 'released_year', KeyType: 'HASH' },
          { AttributeName: 'title', KeyType: 'RANGE' } //Sort key
        ],
        AttributeDefinitions: [
          { AttributeName: 'released_year', AttributeType: 'N' },
          { AttributeName: 'title', AttributeType: 'S' }
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 10,
          WriteCapacityUnits: 10
        }
      })
      .promise();
  } catch (err) {
    // most-likely the table already exists
    console.log(err.code);
  }
};

(async function() {
  await createTable();
})();

function getDocClientParams(arg) {
  return {
    FilterExpression: `${arg} = :title`,
    ExpressionAttributeValues: {
      ':title': 'Gladiator'
    },
    TableName: 'Movies'
  };
}

function getClientParams(arg) {
  return {
    TableName: 'Movies',
    FilterExpression: `${arg} = :title`,
    ExpressionAttributeValues: {
      ':title': { S: 'Gladiator' }
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
  const params = getDocClientParams(safe ? 'title' : input);
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
module.exports[
  'aws-sdk.DynamoDB.prototype.executeStatement'
] = async function scan({ input }, { safe = false, noop = false } = {}) {
  if (noop) return 'NOOP';
  let params = {};

  if (safe) {
    params = {
      Statement: 'SELECT * from Movies WHERE title= ?',
      Parameters: [{ S: input }]
    };
  } else {
    params = {
      Statement: `SELECT * from Movies WHERE title='${input}'`
    };
  }

  return await db.executeStatement(params).promise();
};

/**
 * @param {Object} params
 * @param {string} params.input user input string
 * @param {Object} opts
 * @param {boolean} [opts.safe] are we calling the sink safely?
 * @param {boolean} [opts.noop] are we calling the sink as a noop?
 */
module.exports[
  'aws-sdk.client-dynamodb.ScanCommand.ComparisonOperator'
] = async function scan({ input }, { safe = false, noop = false } = {}) {
  if (noop) return 'NOOP';

  const data = JSON.parse(input);
  if (safe) data.comp = 'EQ';

  return await client.send(
    new ScanCommand({
      TableName: 'Movies',
      Select: 'ALL_ATTRIBUTES',
      ScanFilter: {
        'title': {
          'AttributeValueList': [{ 'S': data.title }],
          'ComparisonOperator': data.comp
        }
      }
    })
  );
};

/**
 * @param {Object} params
 * @param {string} params.input user input string
 * @param {Object} opts
 * @param {boolean} [opts.safe] are we calling the sink safely?
 * @param {boolean} [opts.noop] are we calling the sink as a noop?
 */
module.exports[
  'aws-sdk.client-dynamodb.ScanCommand.FilterExpression'
] = async function scan({ input }, { safe = false, noop = false } = {}) {
  if (noop) return 'NOOP';

  const data = JSON.parse(input);
  if (safe) data.key = 'title';

  return await client.send(
    new ScanCommand({
      TableName: 'Movies',
      FilterExpression:
        data.key + ' = :title AND released_year = :released_year',
      ExpressionAttributeValues: {
        ':title': { 'S': data.title },
        ':released_year': { 'N': data.year }
      }
    })
  );
};

/**
 * @param {Object} params
 * @param {string} params.input user input string
 * @param {Object} opts
 * @param {boolean} [opts.safe] are we calling the sink safely?
 * @param {boolean} [opts.noop] are we calling the sink as a noop?
 */
module.exports[
  'aws-sdk.client-dynamodb.ScanCommand.ProjectionExpression'
] = async function scan({ input }, { safe = false, noop = false } = {}) {
  if (noop) return 'NOOP';

  const data = JSON.parse(input);
  if (safe) data.key = 'title';

  return await client.send(
    new ScanCommand({
      TableName: 'Movies',
      FilterExpression: 'title = :title',
      ProjectionExpression: `released_year, ${data.key}`,
      ExpressionAttributeValues: {
        ':title': { 'S': data.title }
      }
    })
  );
};

/**
 * @param {Object} params
 * @param {string} params.input user input string
 * @param {Object} opts
 * @param {boolean} [opts.safe] are we calling the sink safely?
 * @param {boolean} [opts.noop] are we calling the sink as a noop?
 */
module.exports[
  'aws-sdk.client-dynamodb.ExecuteStatementCommand'
] = async function scan({ input }, { safe = false, noop = false } = {}) {
  if (noop) return 'NOOP';

  //Title1%27%20OR%20Title=%27Title2
  let params = {};

  if (safe) {
    params = {
      Statement: `SELECT * from Movies WHERE title= ?`,
      Parameters: [{ S: input }]
    };
  } else {
    params = { Statement: `SELECT * from Movies WHERE title='${input}'` };
  }

  return await client.send(new ExecuteStatementCommand(params));
};
