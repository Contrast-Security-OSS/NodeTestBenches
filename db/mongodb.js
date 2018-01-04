'use strict';
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/hapitestbench';

exports.register = function mongo(server, options) {
	return new Promise(function(resolve, reject) {
		MongoClient.connect(url, function(err, db) {
			console.log('connected to mongo server'); // eslint-disable-line
			resolve(server.expose('db', db));
		});
	});
};

exports.name = 'hapitestbench.mongodb';
