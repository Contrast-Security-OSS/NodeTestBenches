'use strict';

const { r, dbInit, connectionParams } = require('./dbInit');
const Joi = require('joi');

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
          r.connect(connectionParams)
            .then((conn) => {
              if (safe) {
                // We should change this when we start propagating joi custom validation
                const safeInput = Joi.string().valid('Ivaylo');
                const name = safeInput.validate(input);
                if (name.error) {
                  resolve(name.error);
                }
                r.table('users')
                  .filter({ name: name.value })
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
              } else {
                r.table('users')
                  .filter(input)
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
            })
            .catch((err) => reject(err));
        })
        .catch((err) => {
          reject(err);
        });
    });
  } catch (err) {
    console.log(err);
    return err;
  }
};
