const request = require('supertest');
const app = require('../client/js/app');

describe('Test express server', () => {
  test('Get endpoint test', done => {
    request(app).get('/test').then((response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
});
