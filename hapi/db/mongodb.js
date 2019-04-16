'use strict';
const MongoClient = require('mongodb').MongoClient;

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/';

exports.register = async function mongo(server, options) {
	const client = await MongoClient.connect(url);
	const db = client.db('hapitestbench');
	console.log('connected to mongo server'); // eslint-disable-line
	server.expose('db', db);
};

exports.name = 'hapitestbench.mongodb';
