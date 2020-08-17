'use strict';

const axios = require('axios');
const bent = require('bent');
const fetch = require('node-fetch');
const request = require('request');
const superagent = require('superagent');
const { url: EXAMPLE_URL } = require('../content/ssrf');

/**
 * Constructs a url based on input and a part field
 * @param {Object} params
 * @param {string} params.input user input url
 * @param {string} params.part user input part of the url to insert
 * @return {string} fully constructed url
 */
const formatUrl = ({ input, part }) => {
  switch (part) {
    case 'query':
      return `${EXAMPLE_URL}?q=${input}`;
    case 'path':
      return `${EXAMPLE_URL}/${input}`;
    default:
      return `http://${input}`;
  }
};

/**
 * SSRF sinks have a different signature from other sink methods since we have
 * custom route handlers.
 */

/**
 * @param {Object} params
 * @param {string} params.input user input url
 * @param {string} params.part user input part of the url to insert
 */
exports.axios = async function makeAxiosRequest(params) {
  const url = formatUrl(params);
  return axios.get(url).then((response) => response.data);
};

/**
 * @param {Object} params
 * @param {string} params.input user input url
 * @param {string} params.part user input part of the url to insert
 */
exports.bent = async function makeBentRequest(params) {
  const url = formatUrl(params);
  return bent(url, 'GET', 'string', 200)('/');
};

/**
 * @param {Object} params
 * @param {string} params.input user input url
 * @param {string} params.part user input part of the url to insert
 */
exports.fetch = async function makeFetchRequest(params) {
  const url = formatUrl(params);
  return fetch(url).then((res) => res.text());
};

/**
 * @param {Object} params
 * @param {string} params.input user input url
 * @param {string} params.part user input part of the url to insert
 */
exports.request = async function makeRequestRequest(params) {
  const url = formatUrl(params);
  return new Promise((resolve, reject) => {
    request(url, (err, response, body) => (err ? reject(err) : resolve(body)));
  });
};

/**
 * @param {Object} params
 * @param {string} params.input user input url
 * @param {string} params.part user input part of the url to insert
 */
exports.superagent = async function makeSuperagentRequest(params) {
  const url = formatUrl(params);
  return superagent.get(url).then((res) => res.text);
};
