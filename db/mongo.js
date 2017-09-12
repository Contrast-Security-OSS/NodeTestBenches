'use strict';
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/hapitestbench';

exports.register = function mongo(server, options, next) {
	MongoClient.connect(url, function(err, db) {
		console.log('connected to mongo server'); // eslint-disable-line
		server.expose('db', db);
		next();
	});
};

exports.register.attributes = {
	name: 'hapitestbench-mongo'
};
