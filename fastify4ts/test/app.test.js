const request = require('supertest');
const { expect } = require('chai');
const build = require('../lib/app').default;

describe('Fastify4 - Typescript', async function () {
  let app = await build();
  await app.ready();

  after(async () => {
    await app.close();
  });

  describe('Command Injection', function () {
    describe('child_process.execSync', function () {
      it('SAFE', async function() {
        const response = await request(app.server).get('/cmdInjection/query/childProcessExecSync/safe?input=test%26whoami');
        expect(response.status).to.equal(200);
        expect(response.header["content-type"]).to.equal('text/html');
      });

      it('UNSAFE', async function() {
        const response = await request(app.server).get('/cmdInjection/query/childProcessExecSync/unsafe?input=test%26whoami');  
        expect(response.header['content-type']).to.equal('text/html');
        expect(response.status).to.equal(200);
        expect(response.text).to.contain(require("os").userInfo().username);
      });
    });

    describe('child_process.spawnSync', function () {
      it('SAFE', async function() {
        const response = await request(app.server).get('/cmdInjection/query/childProcessSpawnSync/safe?input=test+%26whoami');
        expect(response.header['content-type']).to.equal('text/html');
        expect(response.status).to.equal(200);
        expect(response.text).to.equal('SAFE');
      });

      it('UNSAFE', async function() {
        const response = await request(app.server).get('/cmdInjection/query/childProcessSpawnSync/unsafe?input=test+%26whoami');
        expect(response.header['content-type']).to.equal('text/html');
        expect(response.status).to.equal(200);
        });
    });
  });

  describe('Path Traversal', function () {
    describe('fs.readFileSync', function () {
      describe('Query', function () {
        it('SAFE', async function() {
          const response = await request(app.server).get('/pathTraversal/query/fsReadFileSync/safe?input=..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2Fetc%2Fpasswd');
          expect(response.header['content-type']).to.equal('text/html');
          expect(response.status).to.equal(200);
          expect(response.text.includes('stuff') || response.text.includes('Congrats, you are safe!')).to.be.true;
        });
  
        it('UNSAFE', async function() {
          const response = await request(app.server).get('/pathTraversal/query/fsReadFileSync/unsafe?input=..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2Fetc%2Fpasswd');
          expect(response.header['content-type']).to.equal('text/html');
          expect(response.status).to.equal(200);
          expect(response.text).to.contain('User Database');
          });
      });
    });

    describe('fs.writeFileSync', function () {
      describe('Query', function () {
        it('SAFE', async function() {
          const response = await request(app.server).get('/pathTraversal/query/fsWriteFileSync/safe?input=..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2Fetc%2Fpasswd');
          expect(response.header['content-type']).to.equal('text/html');
          expect(response.status).to.equal(200);
          expect(response.text).to.contain('Wrote to ..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2Fetc%2Fpasswd');
          });
  
        it('UNSAFE', async function() {
          const response = await request(app.server).get('/pathTraversal/query/fsWriteFileSync/unsafe?input=..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2F..%2Fetc%2Fpasswd');
          expect(response.header['content-type']).to.equal('text/html');
          expect(response.status).to.equal(200);
          expect(response.text).to.contain('Done!');
          });
      });
    });
  });
  
  describe('XSS', function () {
    describe('Query', function () {
      it('SAFE', async function() {
        const response = await request(app.server).get('/xss/query/reflectedXss/safe?input=%3Cscript%3Ealert(1)%3B%3C%2Fscript%3E');
        expect(response.header['content-type']).to.equal('text/html');
        expect(response.status).to.equal(200);
        expect(response.text).to.contain('%3Cscript%3Ealert(1)%3B%3C%2Fscript%3E');
        });

      it('UNSAFE', async function() {
        const response = await request(app.server).get('/xss/query/reflectedXss/unsafe?input=<script>alert(1)%3B<%2Fscript>');
        expect(response.header['content-type']).to.equal('text/html');
        expect(response.status).to.equal(200);
        expect(response.text).to.contain('alert(1)');
        });
    });
  });
});
