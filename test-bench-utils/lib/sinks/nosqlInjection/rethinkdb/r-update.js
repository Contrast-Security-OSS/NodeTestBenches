'use strict';

const { r, dbInit, connectionParams } = require('./dbInitiation');

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
            resolve('For now no safe option possible');
          } else {
            const { toBeUpdated, updatedValues } = JSON.parse(input);
            r.table('users')
              .filter(toBeUpdated)
              .update(updatedValues)
              .run(conn)
              .then((response) => {
                resolve(response);
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
