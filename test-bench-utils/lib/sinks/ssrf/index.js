'use strict';

const axios = require('axios');
const bent = require('bent');
const fetch = require('node-fetch');
const request = require('request');
const superagent = require('superagent');

exports.makeAxiosRequest = (url) =>
  axios.get(url).then((response) => response.data);

exports.makeBentRequest = (url) => bent(url, 'GET', 'string', 200)();

exports.makeFetchRequest = (url) => fetch(url).then((res) => res.text());

exports.makeRequestRequest = (url) =>
  new Promise((resolve, reject) => {
    request(url, (err, response, body) => {
      if (err) reject(err);
      else resolve(body);
    });
  });

exports.makeSuperagentRequest = (url) =>
  superagent.get(url).then((res) => res.text);
