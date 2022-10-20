module.exports['r.insert'] = JSON.stringify({
  addresses: ['Blagoevgrad', 'Plovdiv'],
  age: 22,
  name: 'Daniel',
  phone: '3453453453',
  secret: 'somethingsecret-daniel'
});
module.exports['r.update'] = JSON.stringify({
  toBeUpdated: { name: 'Ivaylo' },
  updatedValues: { phone: '000000000' }
});
module.exports['r.filter'] = JSON.stringify({
  secret: 'somethingsecret'
});
module.exports['r.match'] = 'Iv|^';
module.exports['r.js'] = '30';

module.exports[
  'aws-sdk.client-dynamodb.ScanCommand.ProjectionExpression'
] = JSON.stringify({
  key: 'title',
  title: 'Star Wars'
});
module.exports[
  'aws-sdk.client-dynamodb.ScanCommand.FilterExpression'
] = JSON.stringify({
  key: 'title',
  title: 'Star Wars',
  year: '1982'
});
module.exports[
  'aws-sdk.client-dynamodb.ScanCommand.ComparisonOperator'
] = JSON.stringify({
  title: 'Star Wars',
  comp: 'NE'
});
module.exports['aws-sdk.DynamoDB.DocumentClient.prototype.scan'] =
  ':title = :title OR title';
module.exports['aws-sdk.DynamoDB.prototype.makeRequest'] =
  ':title = :title OR title';
