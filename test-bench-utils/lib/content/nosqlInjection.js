module.exports[
  'mongodb.Db.prototype.eval'
] = `(function(){var date = new Date(); do{curDate = new Date();}while(curDate-date<10000); return Math.max();})()`;
