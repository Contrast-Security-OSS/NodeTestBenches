'use strict';

const attackValues = {
  'mongodb.Db.prototype.eval': 'function() { return "hi"; }',
  'r.insert': JSON.stringify({
    addresses: ['Blagoevgrad', 'Plovdiv'],
    age: 22,
    name: 'Daniel',
    phone: '3453453453',
    secret: 'somethingsecret-daniel'
  }),
  'r.update': JSON.stringify({
    toBeUpdated: {
      name: 'Ivaylo'
    },
    updatedValues: {
      phone: '000000000'
    }
  }),
  'r.filter': JSON.stringify({
    secret: 'somethingsecret'
  }),
  'r.match': 'Iv|^',
  'r.js': '30',
  'aws-sdk.client-dynamodb.ScanCommand.ProjectionExpression': JSON.stringify({
    key: 'title',
    title: 'Star Wars'
  }),
  'aws-sdk.client-dynamodb.ScanCommand.FilterExpression': JSON.stringify({
    key: 'title',
    title: 'Star Wars',
    year: '1982'
  }),
  'aws-sdk.client-dynamodb.ScanCommand.ComparisonOperator': JSON.stringify({
    title: 'Star Wars',
    comp: 'NE'
  }),
  'aws-sdk.DynamoDB.DocumentClient.prototype.scan': ':title = :title OR title',
  'aws-sdk.DynamoDB.prototype.makeRequest': ':title = :title OR title',
  'mongodb.Collection.prototype.findOneAndUpdate__$where': 'function() { return true })',
  'mongodb.Collection.prototype.updateMany__$where': 'function() { return true }',
};

const descriptions = {
  'mongodb.Collection.prototype.findOneAndUpdate__$where': 'This sink uses $where operator.',
  'mongodb.Collection.prototype.updateMany__$where': 'This sink uses $where operator.',
};

module.exports = {
  attackValues,
  descriptions
};
