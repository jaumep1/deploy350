/* eslint-disable no-underscore-dangle */
const request = require('supertest');
const webapp = require('../server');

const db = require('../database');

describe('GET /getInventory', () => {
  test('invalid current user', async () => {
    const res = await request(webapp).get('/getCurrentUser');
    expect(res.status).toEqual(404);
  });
});
