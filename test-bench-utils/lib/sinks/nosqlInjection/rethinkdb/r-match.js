'use strict';

const { r, dbInit, connectionParams } = require('./dbInit');

/**
 * @param {Object} params
 * @param {string} params.input user input string
 * @param {Object} opts
 * @param {boolean} [opts.safe] are we calling the sink safely?
 * @param {boolean} [opts.noop] are we calling the sink as a noop?
 */
module.exports = async function reDbQuery(
  { input },
  { safe = false, noop = false } = {}
) {
  const result = new Promise((resolve, reject) => {
    dbInit
      .then(() => {
        r.connect(connectionParams).then((conn) => {
          if (noop) {
            resolve('NOOP');
          }
          if (safe) {
            resolve('TBD a safe way to use it');
          } else {
            r.table('users')
              .filter(function(doc) {
                return doc('name').match(input);
              })
              .run(conn)
              .then((response) => {
                response.toArray().then((formattedResponse) => {
                  const endResult = formattedResponse.map(
                    ({ name, age, addresses }) => ({
                      name,
                      age,
                      addresses
                    })
                  );
                  resolve(endResult);
                });
              })
              .catch((err) => reject(err));
          }
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
  return result;
};
