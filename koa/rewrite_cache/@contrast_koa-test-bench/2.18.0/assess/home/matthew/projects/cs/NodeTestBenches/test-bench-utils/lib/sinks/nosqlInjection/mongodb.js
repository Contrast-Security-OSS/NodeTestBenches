var String = (global.ContrastString || String);var Object = (global.ContrastObject || Object);var Function = (global.ContrastFunction || Function);var JSON = (global.ContrastJSON || JSON);var ContrastMethods = (global.ContrastMethods || (() => { throw new SyntaxError('ContrastMethods undefined during compilation'); })());(function (exports, require, module, __filename, __dirname) {
    "use strict";

    const {EventEmitter} = require("events");
    const {Db, Collection} = require("mongodb");
    const escape = require("escape-html");

    const origEval = Db.prototype.eval;
    Db.prototype.eval = async function overloadedEval(code, params, opts) {
        // Stubbing as much as possible to avoid executing real command
        this.s.topology.s = { promiseLibrary: this.s.promiseLibrary };
        this.s.topology.command = function () {
            return false;
        };
        this.s.topology.hasSessionSupport = function () {
            return false;
        };
        this.s.topology.isDestroyed = function () {
            return false;
        };

        origEval.call(this, code, params, opts);
        return { code };
    };

    const origRename = Collection.prototype.rename;
    const topology = new EventEmitter();
    const db = new Db("testbench", topology, {});
    const collection = new Collection(db, topology, "testbench", "collection", null, {});
    Collection.prototype.rename = async function overloadedRename(name, options, callback) {
        // Stubbing as much as possible to avoid executing real command
        this.s.topology.s = { promiseLibrary: this.s.promiseLibrary };
        this.s.topology.command = function () {
            return false;
        };
        this.s.topology.hasSessionSupport = function () {
            return false;
        };

        origRename.call(this, name, options, callback);
        return { name };
    };

    /**
 * @param {Object} params
 * @param {string} params.input user input string
 * @param {Object} opts
 * @param {boolean=} opts.safe are we calling the sink safely?
 * @param {boolean=} opts.noop are we calling the sink as a noop?
 */
    module.exports["mongodb.Db.prototype.eval"] = async function _eval({input}, {safe = false, noop = false} = {}) {
        if (noop)
            return "NOOP";

        const fn = safe ? "function() {}" : input;
        const result = await db.eval(fn);

        return ContrastMethods.__contrastTag`<pre>${ escape(JSON.stringify(result, null, 2)) }</pre>`;
    };

    /**
 * @param {Object} params
 * @param {string} params.input user input string
 * @param {Object} opts
 * @param {boolean=} opts.safe are we calling the sink safely?
 * @param {boolean=} opts.noop are we calling the sink as a noop?
 */
    module.exports["mongodb.Collection.prototype.rename"] = async function rename({input}, {safe = false, noop = false} = {}) {
        if (noop)
            return "NOOP";

        const newName = safe ? "newName" : input;
        const result = await collection.rename(newName).catch(err => {
        });

        return ContrastMethods.__contrastTag`<pre>${ escape(JSON.stringify(result, null, 2)) }</pre>`;
    };

}.apply(this, arguments));