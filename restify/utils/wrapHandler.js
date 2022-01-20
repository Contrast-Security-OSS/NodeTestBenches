/**
 * Wraps the async handlers in a promise chain to properly send errors
 * to next
 *
 * @param {Function} handler
 */
module.exports = function wrapHandler(handler) {
  return (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch((err) => {
      res.send(err.statusCode);
    });
  };
};
