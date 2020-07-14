const express = require('express');
const app = express();
require('../app').setup(app);
const request = require('supertest')(app);

const { expect } = require('chai');

describe('sample request', function() {
  it('should return index call', async function() {
    const res = await request.get('/cmdInjection/query/childProcessExec/unsafe?input=who');

    expect(res.statusCode).to.equal(200);

  });
});
