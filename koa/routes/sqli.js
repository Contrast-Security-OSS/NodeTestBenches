const util = require('util');
const hooker = require('hooker');
const mysql = require('mysql');

// mock the sql query so the app does not require a database connection
hooker.hook(require('mysql/lib/Connection').prototype, 'query', {
  post: function(result, sql, cb) {
    cb(null, [{
      query: sql
    }]);
  }
});

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root'
});

// pretend we already connected
connection._connectCalled = true;

connection.connect();

/**
 * @vulnerability: sql-injection
 */
module.exports = ({ router }) => {
  router.get('/sqli', (ctx, next) => {
    return ctx.render('sqli');
  });

  router.get('/sqli-test', async (ctx, next) => {
    const data = await new Promise(resolve => {
      connection.query(`SELECT "${ctx.query.name}" as "test";`,
		       function(error, rows, fields) {
			resolve('The solution is: ' + util.inspect(rows));
		       }
                      );
    });
    ctx.body = data;
  });

  router.get('/sqli-test-safe', async (ctx, next) => {
    const data = await new Promise(resolve => {
      connection.query(`SELECT "?" as "test";`, [ctx.query.name],
		       function(error, rows, fields) {
			resolve('The solution is: ' + util.inspect(rows));
		       }
                      );
    });
    ctx.body = data;
  });
};
