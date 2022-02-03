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
  if (noop) return 'NOOP';

  try {
    return await new Promise((resolve, reject) => {
      dbInit
        .then(() => {
          r.connect(connectionParams).then((conn) => {
            if (safe) {
              resolve('TBD a safe way to use it');
            } else {
              r.table('users')
                .insert(JSON.parse(input))
                .run(conn)
                .then((response) => {
                  resolve(response);
                })
                .catch((err) => {
                  reject(err);
                });
            }
          }).catch((err) => {
            reject(err);
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
  } catch(err) {
    console.log(err);
    return err;
  }
};
