/* eslint-env jest */
const request = require('supertest');
const express = require('express');
const app = express();
require('../app').setup(app);

describe('sample request', function() {
  it('should return index call', async function() {
    const res = await request(app).get(
      '/cmdInjection/query/childProcessExec/unsafe?input=who'
    );

    expect(res.statusCode).toEqual(200);
  });
});
