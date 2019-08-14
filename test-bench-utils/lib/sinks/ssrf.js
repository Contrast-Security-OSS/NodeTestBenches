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

exports.axios = async function makeAxiosRequest(url) {
  return axios.get(url).then((response) => response.data);
};

exports.bent = async function makeBentRequest(url) {
  return bent(url, 'GET', 'string', 200)();
};

exports.fetch = async function makeFetchRequest(url) {
  return fetch(url).then((res) => res.text());
};

exports.request = async function makeRequestRequest(url) {
  return new Promise((resolve, reject) => {
    request(url, (err, response, body) => {
      if (err) reject(err);
      else resolve(body);
    });
  });
};

exports.Superagent = async function makeSuperagentRequest(url) {
  return superagent.get(url).then((res) => res.text);
};
