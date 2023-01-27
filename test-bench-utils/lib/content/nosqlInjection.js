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
  'mongodb.Collection.prototype.findOneAndUpdate__$where': 'function() { return true }',
  'mongodb.Collection.prototype.updateMany__$where': 'function() { return true }',
  'mongodb.Collection.prototype.findOne__$function': 'function() { return true }',
  'mongodb.Collection.prototype.findOneAndUpdate__$function': 'function() { return true }',
  'mongodb.Collection.prototype.aggregate__$accumulator__$init': 'function() { return { count: 0 } }',
  'mongodb.Collection.prototype.aggregate__$accumulator__$accumulate': 'function(state) { return { count: state.count + 1 } }',
  'mongodb.Collection.prototype.aggregate__$accumulator__$merge': 'function(state1, state2) { return { count: state1.count + state2.count } }',
  'mongodb.Collection.prototype.aggregate__$accumulator__$finalize': 'function(state) { return state }',
};

const descriptions = {
  'mongodb.Collection.prototype.findOneAndUpdate__$where': 'This sink uses $where operator.',
  'mongodb.Collection.prototype.updateMany__$where': 'This sink uses $where operator.',
  'mongodb.Collection.prototype.findOne__$function': 'This sink uses the $function operator.',
  'mongodb.Collection.prototype.findOneAndUpdate__$function': 'This sink uses $function operator.',
  'mongodb.Collection.prototype.aggregate__$accumulator': 'This sink is using the $accumulator operator.',
  'mongodb.Collection.prototype.aggregate__$accumulator__$init':
    'This sink is using the $accumulator operator and tests the init property.',
  'mongodb.Collection.prototype.aggregate__$accumulator__$accumulate':
    'This sink is using the $accumulator operator and tests the accumulate property.',
  'mongodb.Collection.prototype.aggregate__$accumulator__$merge':
    'This sink is using the $accumulator operator and tests the merge property.',
  'mongodb.Collection.prototype.aggregate__$accumulator__$finalize':
    'This sink is using the $accumulator operator and tests the finalize property.'
};

module.exports = {
  attackValues,
  descriptions
};
