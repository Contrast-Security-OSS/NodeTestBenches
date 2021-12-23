'use strict';

const { r, dbInit, connectionParams, dotJsFnString } = require('./dbInit');
const Joi = require('joi');

/**
 * @param {Object} params
 * @param {string} params.input user input string
 * @param {Object} opts
 * @param {boolean} [opts.safe] are we calling the sink safely?
 * @param {boolean} [opts.noop] are we calling the sink as a noop?
 */
module.exports = function reDbQuery(
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
            const safeInput = Joi.number()
              .integer()
              .min(0)
              .max(100);
            const minAge = safeInput.validate(input);
            if (minAge.error) {
              resolve(minAge.error);
            }
            r.table('users')
              .filter(function(user) {
                return user('age').gt(minAge.value);
              })
              .run(conn)
              .then((response) => {
                response.toArray().then((formattedResponse) => {
                  const result = formattedResponse.map(
                    ({ name, age, addresses }) => ({
                      name,
                      age,
                      addresses
                    })
                  );
                  resolve(result);
                });
              })
              .catch((err) => reject(err));
          } else {
            const jsString = dotJsFnString(input);
            r.table('users')
              .filter(r.js(jsString, { timeout: 3 }))
              .run(conn)
              .then((response) => {
                response.toArray().then((formattedResponse) => {
                  const result = formattedResponse.map(
                    ({ name, age, addresses }) => ({
                      name,
                      age,
                      addresses
                    })
                  );
                  resolve(JSON.stringify(result));
                });
              })
              .catch((err) => reject(err));
          }
        }).catch((err) => reject(err));
      })
      .catch((err) => {
        reject(err);
      });
  });
  return result;
};
