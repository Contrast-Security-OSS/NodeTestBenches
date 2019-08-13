'use strict';

const axios = require('axios');
const bent = require('bent');
const fetch = require('node-fetch');
const request = require('request');
const superagent = require('superagent');

/**
 * SSRF sinks have a different signature from other sink methods since we have
 * custom route handlers.
 */

exports.axios = function makeAxiosRequest(url) {
  return axios.get(url).then((response) => response.data);
};

exports.bent = function makeBentRequest(url) {
  return bent(url, 'GET', 'string', 200)();
};

exports.fetch = function makeFetchRequest(url) {
  return fetch(url).then((res) => res.text());
};

exports.request = function makeRequestRequest(url) {
  return new Promise((resolve, reject) => {
    request(url, (err, response, body) => {
      if (err) reject(err);
      else resolve(body);
    });
  });
};

exports.Superagent = function makeSuperagentRequest(url) {
  return superagent.get(url).then((res) => res.text);
};
