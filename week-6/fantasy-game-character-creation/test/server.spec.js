/*
   Course: WEB340 – Full Stack Development II

   Author: Jonathan Canu
   Date:   May 2nd, 2026

   Filename: server.spec.js
*/

const http = require('http');
const server = require('../src/server');

describe('Fantasy Character API TDD', () => {

  // Start server before tests
  beforeAll((done) => {
    if (!server.listening) {
      server.listen(3000, done);
    } else {
      done();
    }
  });

  // Stop server after tests to prevent port collisions
  afterAll((done) => {
    server.close(done);
  });

  // Test POST /create
  test('/create should save a character via query params', (done) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/create?charClass=Mage&gender=Female&funFact=Loves+fireball',
      method: 'POST'
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const body = JSON.parse(data);
        expect(res.statusCode).toBe(201);
        expect(body.character.charClass).toBe('Mage');
        done();
      });
    });
    req.end();
  });

  // Test GET /view
  test('/view should retrieve the character saved in Web Storage', (done) => {
    http.get('http://localhost:3000/view', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const body = JSON.parse(data);
        expect(res.statusCode).toBe(200);
        expect(body.charClass).toBe('Mage');
        done();
      });
    });
  });

  // Test DELETE
  test('/delete should remove the character from Web Storage', (done) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/delete',
      method: 'DELETE'
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const body = JSON.parse(data);
        expect(res.statusCode).toBe(200);
        expect(body.message).toBe('Character deleted successfully');
        done();
      });
    });
    req.end();
  });
});
