/* eslint-disable no-underscore-dangle */
const supertest = require('supertest');
const webapp = require('../server');

const request = supertest(webapp);
const db = require('../database');

describe('GET /getInventory', () => {
  test('should return 201 and data', async () => {
    const expectedResponse = [
      {
        _id: 1,
        name: 'GEL ULTSOUND AQUASONIC .25L',
        lawson: 200279,
        category: 'Respiratory',
        quantity: 20,
      },
      {
        _id: 2,
        name: 'GAUZE COMBAT Z FOLD 4INX4IN',
        lawson: 241177,
        category: 'Neurologic',
        quantity: 23,
      },
      {
        _id: 3,
        name: 'RESP INHALR GINGER',
        lawson: 259513,
        category: 'Orthapedics',
        quantity: 14,
      },
      {
        _id: 4,
        name: 'TB CORRUGATED FLEX 6IN',
        lawson: 40000635,
        category: 'Respiratory',
        quantity: 18,
      },
      {
        _id: 5,
        name: 'MSK FACE O2 MULTI-VENT',
        lawson: 264363,
        category: 'Orthapedics',
        quantity: 25,
      },
      {
        _id: 6,
        name: 'CIRT VT MONTR ADPT W/TB 6IN',
        lawson: 163623,
        category: 'Neurologic',
        quantity: 60,
      },
      {
        _id: 7,
        name: 'APPL SWAB ORAL INDIV 6MM',
        lawson: 236234,
        category: 'Respiratory',
        quantity: 15,
      },
    ];

    const response = await request.get('/getInventory');

    expect(response.statusCode).toBe(201);
    expect(response._body).toEqual(expectedResponse);
  });
});

describe('GET /getSupplies', () => {
  test('should return 201 and data', async () => {
    const expectedResponse = {
      "_id": "643e46abd2ab4386b067e693",
      "date": 1677715200000,
      "id": 1,
      "quantity": 10,
    };

    const response = await request.get('/getSupplies');

    expect(response.statusCode).toBe(201);
    // expect(response._body[0]).toEqual(expectedResponse);
  });
});

describe('GET /getSupply', () => {
  test('should return 201 and data', async () => {
    const expectedResponse = {
      "_id": "643e46abd2ab4386b067e693",
      "date": 1677715200000,
      "id": 1,
      name: 'GEL ULTSOUND AQUASONIC .25L',
      date: 1677456000000,
      quantity: 10,
    };

    const response = await request.get('/getSupply').query({ name: 'GEL ULTSOUND AQUASONIC .25L' });

    expect(response.statusCode).toBe(201);
    // expect(response._body[0]).toEqual(expectedResponse);
  });
});

describe('GET /getCategories', () => {
  test('should return 201 and data', async () => {
    const expectedResponse = [
      {
        _id: '643e48b3d2ab4386b06db734',
        id: 3,
        category: 'Orthapedic',
        change: 10000,
        percentage: 4.3,
      },
      {
        _id: '643e48b3d2ab4386b06db733',
        id: 2,
        category: 'Neurologic',
        change: 22000,
        percentage: 2.5,
      },
      {
        _id: '643e48b3d2ab4386b06db732',
        id: 1,
        category: 'Respiratory',
        change: 26000,
        percentage: 3.2,
      },

    ];
    const response = await request.get('/getCategories');

    expect(response.statusCode).toBe(201);
    // expect(response._body).toEqual(expectedResponse);
  });
});

beforeAll((done) => {
  done();
});

afterAll((done) => {
  // Closing the DB connection allows Jest to exit successfully.
  db.closeMongoDBConnection();
  done();
});
