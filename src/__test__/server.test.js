const request = require('supertest');
const app = require('../server/server');

describe('Test express server', () => {
  test('Get endpoint test', async done => {
    request(app).get('/test').then((response) => {
      expect(response.statusCode).toBe(200);
      done()
    });
  });
});
