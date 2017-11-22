'use strict';

const glue = require('glue');
const path = require('path');
const pem = require('pem');

const PORT = process.env.PORT || 3000;

const manifest = {
	server: {
		debug: {'request': ['error', 'uncaught']}
	},
	connections: [{
		port: PORT
	}],
	registrations: [
		// hapi plugins
		{plugin: 'inert'},
		{plugin: 'vision'},
		{
			plugin: {
				register: 'visionary',
				options: {
					engines: {
						ejs: require('ejs')
					},
					allowAbsolutePaths: true,
					relativeTo: path.resolve(__dirname, 'views'),
					path: 'pages',
					partialsPath: 'partials'
				}
			}

		},

		// DB initializers
		{plugin: './db/mongodb.js'},
		{plugin: './db/mysql.js'},

		// route handlers
		{plugin: './routes/index.js'},
		{
			plugin: './routes/mongo-injection/',
			options: {routes: {prefix: '/mongoinjection'}}
		},
		{
			plugin: './routes/reflected-xss/',
			options: {routes: {prefix: '/reflectedxss'}}
		},
		{
			plugin: './routes/reflected-xss/object-sources/',
			options: {routes: {prefix: '/reflectedxss/objects'}}
		},
		{
			plugin: './routes/sql-injection/',
			options: {routes: {prefix: '/sqlinjection'}}
		},
		{
			plugin: './routes/ssjs-injection',
			options: {routes: {prefix: '/ssjs-injection'}}
		},
		{
			plugin: './routes/session/http-only.js',
			options: {
				routes: {
					prefix: '/session/httponly'
				}
			}
		},
		{
			plugin: './routes/session/secure-flag-missing.js',
			options: {
				routes: {
					prefix: '/session/secureflagmissing'
				}
			}
		}
	]
};

const options = {
	relativeTo: __dirname
};

if (process.env.SSL === '1') {
	pem.createCertificate({days: 1, selfSigned: true}, ( err, keys ) => {
		manifest.connections[0].tls = {
			key: keys.serviceKey,
			cert: keys.certificate
		};
		start();
	});
} else {
	start();
}

function start () {
	glue.compose(manifest, options, (err, server) => {
		if (err) {
			throw err;
		}

		server.start(() => {
			console.log(`Server running at: ${server.connections[0].info.uri}`); // eslint-disable-line
		});
	});
}
