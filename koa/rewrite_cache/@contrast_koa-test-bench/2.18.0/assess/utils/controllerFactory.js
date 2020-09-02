var String = (global.ContrastString || String);var Object = (global.ContrastObject || Object);var Function = (global.ContrastFunction || Function);var JSON = (global.ContrastJSON || JSON);var ContrastMethods = (global.ContrastMethods || (() => { throw new SyntaxError('ContrastMethods undefined during compilation'); })());(function (exports, require, module, __filename, __dirname) {
    "use strict";

    const {routes, utils} = require("@contrast\/test-bench-utils");

    /**
 * Custom response functions allow you to change the functionality or return
 * value of a sink endpoint.
 *
 * @callback ResponseFn
 * @param {any} result return value of the sink method
 * @param {koa.Context} ctx koa context object
 * @param {Function} next `next` function
 */

    /**
 * @type {ResponseFn}
 */
    const defaultRespond = (result, ctx, next) => {
        ctx.body = result;
    };

    /**
 * Configures a route to handle sinks configured by our shared test-bench-utils
 * module.
 *
 * @param {string} vulnerability the vulnerability or rule being tested
 * @param {Object} opts
 * @param {Object} opts.locals additional locals to provide to EJS
 * @param {ResponseFn} opts.respond if provided, a custom return or response
 */
    module.exports = function controllerFactory(vulnerability, {locals = {}, respond = defaultRespond} = {}) {
        const sinkData = utils.getSinkData(vulnerability, "koa");
        const groupedSinkData = utils.groupSinkData(sinkData);
        const routeMeta = utils.getRouteMeta(vulnerability);
        const responsePreparer = utils.getResponsePreparer(vulnerability);

        return ({router}) => {
            router.get(routes[ContrastMethods.__forceCopy(vulnerability)].base, (ctx, next) => {
                const {
                    request: {res}
                } = ctx;
                if (responsePreparer) {
                    responsePreparer(res);
                }

                return ctx.render(vulnerability, {
                    ...routeMeta,
                    sinkData,
                    groupedSinkData,
                    res,
                    ...locals
                });
            });

            if (ContrastMethods.__tripleEqual(routeMeta.type, "response-scanning")) {
                return;
            }

            sinkData.forEach(({method, params, url, sink, key}) => {
                router[ContrastMethods.__forceCopy(method)](ContrastMethods.__contrastTag`${ url }/safe`, async (ctx, next) => {
                    const inputs = utils.getInput(ctx, key, params, { locals });
                    const result = await sink(inputs, { safe: true });
                    respond(result, ctx, next);
                });

                router[ContrastMethods.__forceCopy(method)](ContrastMethods.__contrastTag`${ url }/unsafe`, async (ctx, next) => {
                    const inputs = utils.getInput(ctx, key, params, { locals });
                    const result = await sink(inputs);
                    respond(result, ctx, next);
                });

                router[ContrastMethods.__forceCopy(method)](ContrastMethods.__contrastTag`${ url }/noop`, async (ctx, next) => {
                    const inputs = utils.getInput(ctx, key, params, { noop: true });
                    const result = await sink(inputs, { noop: true });
                    respond(result, ctx, next);
                });
            });
        };
    };

}.apply(this, arguments));