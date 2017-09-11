'use strict';

const glue = require('glue');
const path = require('path');

const manifest = {
	server: {
		debug: {'request': ['error', 'uncaught']}
	},
	connections: [{
		port: 3000
	}],
	registrations: [
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
		{plugin: './routes/index.js'},
		{
			plugin: './routes/reflected-xss/',
			options: {
				routes: {
					prefix: '/reflectedxss'
				}
			}
		}
	]
};

const options = {
	relativeTo: __dirname
};

glue.compose(manifest, options, (err, server) => {
	if (err) {
		throw err;
	}
	server.start(() => {
		console.log(`Server running at: ${server.info.uri}`); // eslint-disable-line
	});
});
