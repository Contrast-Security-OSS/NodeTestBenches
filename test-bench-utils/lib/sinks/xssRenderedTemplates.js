'use strict';

const Pug = require('pug');
const Ejs = require('ejs');
const Handlebars = require('handlebars');

/**
 * @param {Object} params
 * @param {string} params.input user input string
 * @param {Object} opts
 * @param {boolean=} opts.safe are we calling the sink safely?
 * @param {boolean=} opts.noop are we calling the sink as a noop?
 */
module.exports.pug = async function pug(
  { input },
  { safe = false, noop = false } = {}
) {
  if (noop) return 'NOOP';

  const template = safe ? 'p #{input}' : 'p !{input}';
  return Pug.compile(template)({ input });
};

/**
 * @param {Object} params
 * @param {string} params.input user input string
 * @param {Object} opts
 * @param {boolean=} opts.safe are we calling the sink safely?
 * @param {boolean=} opts.noop are we calling the sink as a noop?
 */
module.exports.ejs = async function ejs(
  { input },
  { safe = false, noop = false } = {}
) {
  if (noop) return 'NOOP';

  const template = safe ? '<p><%=input%></p>' : '<p><%-input%></p>';
  return Ejs.render(template, { input });
};

/**
 * @param {Object} params
 * @param {string} params.input user input string
 * @param {Object} opts
 * @param {boolean=} opts.safe are we calling the sink safely?
 * @param {boolean=} opts.noop are we calling the sink as a noop?
 */
module.exports.handlebars = async function handlebars(
  { input },
  { safe = false, noop = false } = {}
) {
  if (noop) return 'NOOP';

  const template = safe ? '<p>{{input}}</p>' : '<p>{{{input}}}</p>';
  return Handlebars.compile(template)({ input });
};
