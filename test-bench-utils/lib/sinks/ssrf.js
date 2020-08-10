'use strict';

const axios = require('axios');
const bent = require('bent');
const fetch = require('node-fetch');
const request = require('request');
const superagent = require('superagent');
const { url: EXAMPLE_URL } = require('../content/ssrf');

/**
 * Constructs a url based on input and a part field
 * @param {string} input
 * @param {string} part which part to place input
 * @return {string} fully constructed url
 */
function formatUrl(input, part) {
  let url;
  switch (part) {
    case 'query':
      url = `${EXAMPLE_URL}?q=${input}`;
      break;
    case 'path':
      url = `${EXAMPLE_URL}/${input}`;
      break;
    default:
      url = `http://${input}`;
      break;
  }

  return url;
}

/**
 * SSRF sinks have a different signature from other sink methods since we have
 * custom route handlers.
 */

/**
 * @param {Object} params
 * @param {string} params.input user input url
 * @param {string} params.part user input part of the url to insert
 */
exports.axios = async function makeAxiosRequest({ input, part }) {
  const url = formatUrl(input, part);
  return axios.get(url).then((response) => response.data);
};

/**
 * @param {Object} params
 * @param {string} params.input user input url
 * @param {string} params.part user input part of the url to insert
 */
exports.bent = async function makeBentRequest({ input, part }) {
  const url = formatUrl(input, part);
  return bent(url, 'GET', 'string', 200)('/');
};

/**
 * @param {Object} params
 * @param {string} params.input user input url
 * @param {string} params.part user input part of the url to insert
 */
exports.fetch = async function makeFetchRequest({ input, part }) {
  const url = formatUrl(input, part);
  return fetch(url).then((res) => res.text());
};

/**
 * @param {Object} params
 * @param {string} params.input user input url
 * @param {string} params.part user input part of the url to insert
 */
exports.request = async function makeRequestRequest({ input, part }) {
  const url = formatUrl(input, part);
  return new Promise((resolve, reject) => {
    request(url, (err, response, body) => {
      if (err) reject(err);
      else resolve(body);
    });
  });
};

/**
 * @param {Object} params
 * @param {string} params.input user input url
 * @param {string} params.part user input part of the url to insert
 */
exports.superagent = async function makeSuperagentRequest({ input, part }) {
  const url = formatUrl(input, part);
  return superagent.get(url).then((res) => res.text);
};
