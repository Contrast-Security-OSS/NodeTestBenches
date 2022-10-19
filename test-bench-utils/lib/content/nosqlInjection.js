'use strict';

module.exports['mongodb.Db.prototype.eval'] = {
  attackValue: 'function() { return "hi"; }'
};
module.exports['r.insert'] = {
  attackValue: JSON.stringify({
    addresses: ['Blagoevgrad', 'Plovdiv'],
    age: 22,
    name: 'Daniel',
    phone: '3453453453',
    secret: 'somethingsecret-daniel'
  })
};

module.exports['r.update'] = {
  attackValue: JSON.stringify({
    toBeUpdated: {
      name: 'Ivaylo'
    },
    updatedValues: {
      phone: '000000000'
    }
  })
};
module.exports['r.filter'] = {
  attackValue: JSON.stringify({
    secret: 'somethingsecret'
  })
};
module.exports['r.match'] = {
  attackValue: 'Iv|^'
};
module.exports['r.js'] = {
  attackValue: '30'
};

module.exports[
  'aws-sdk.client-dynamodb.ScanCommand.ProjectionExpression'
] = {
  attackValue: JSON.stringify({
    key: 'title',
    title: 'Star Wars'
  })
};
module.exports[
  'aws-sdk.client-dynamodb.ScanCommand.FilterExpression'
] = {
  attackValue: JSON.stringify({
    key: 'title',
    title: 'Star Wars',
    year: '1982'
  })
};
module.exports[
  'aws-sdk.client-dynamodb.ScanCommand.ComparisonOperator'
] = {
  attackValue: JSON.stringify({
    title: 'Star Wars',
    comp: 'NE'
  })
};
module.exports['aws-sdk.DynamoDB.DocumentClient.prototype.scan'] = {
  attackValue: ':title = :title OR title'
};
module.exports['aws-sdk.DynamoDB.prototype.makeRequest'] = {
  attackValue: ':title = :title OR title'
};
module.exports['mongodb.Collection.prototype.findOneAndUpdate>$where'] = {
  attackValue: 'function() { return true })',
  description: 'This sink uses $where operator.'
};

module.exports['mongodb.Collection.prototype.updateMany>where'] = {
  attackValue: 'function() { return true }',
  description: 'This sink uses $where operator.'
};
