'use strict';

const registry = {};

registry['mongodb.Db.prototype.eval'] = {
  attackValue: 'function() { return "hi"; }'
};
registry['r.insert'] = {
  attackValue: JSON.stringify({
    addresses: ['Blagoevgrad', 'Plovdiv'],
    age: 22,
    name: 'Daniel',
    phone: '3453453453',
    secret: 'somethingsecret-daniel'
  })
};

registry['r.update'] = {
  attackValue: JSON.stringify({
    toBeUpdated: {
      name: 'Ivaylo'
    },
    updatedValues: {
      phone: '000000000'
    }
  })
};
registry['r.filter'] = {
  attackValue: JSON.stringify({
    secret: 'somethingsecret'
  })
};
registry['r.match'] = {
  attackValue: 'Iv|^'
};
registry['r.js'] = {
  attackValue: '30'
};

registry[
  'aws-sdk.client-dynamodb.ScanCommand.ProjectionExpression'
] = {
  attackValue: JSON.stringify({
    key: 'title',
    title: 'Star Wars'
  })
};
registry[
  'aws-sdk.client-dynamodb.ScanCommand.FilterExpression'
] = {
  attackValue: JSON.stringify({
    key: 'title',
    title: 'Star Wars',
    year: '1982'
  })
};
registry[
  'aws-sdk.client-dynamodb.ScanCommand.ComparisonOperator'
] = {
  attackValue: JSON.stringify({
    title: 'Star Wars',
    comp: 'NE'
  })
};
registry['aws-sdk.DynamoDB.DocumentClient.prototype.scan'] = {
  attackValue: ':title = :title OR title'
};
registry['aws-sdk.DynamoDB.prototype.makeRequest'] = {
  attackValue: ':title = :title OR title'
};
registry['mongodb.Collection.prototype.findOneAndUpdate>$where'] = {
  attackValue: 'function() { return true })',
  description: 'This sink uses $where operator.'
};

registry['mongodb.Collection.prototype.updateMany>where'] = {
  attackValue: 'function() { return true }',
  description: 'This sink uses $where operator.'
};

const { attackValues, descriptions } = Object.entries(registry).reduce((acc, [key, value]) => {
  if (value.attackValue) {
    acc.attackValues[key] = value.attackValue;
  }

  if (value.description) {
    acc.descriptions[key] = value.description;
  }

  return acc;
}, { attackValues: {}, descriptions: {} });

module.exports = {
  attackValues,
  descriptions
};
