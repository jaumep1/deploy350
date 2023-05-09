const supertest = require('supertest');
const webapp = require('../server');
const { closeMongoDBConnection, connect } = require('../database');

const request = supertest(webapp);
const db = require('../checkout/database');

describe('POST /checkoutOrder', () => {
  test('should return 201 for valid checkout', async () => {
    const mockResult = [{
      _id: '1000',
      userid: '1000',
      name: 'Eric Fouh',
      defaultDeliveryLocation: '1234 Main St, Atlanta, GA 30332',
    }];
    const response = await request.post('/checkoutOrder').send({
      cart: [{
        id: 518611,
        name: 'Cardinal Health IV Pole',
        image: 'https://cdn.shopify.com/s/files/1/0556/3711/4961/products/ISG10170_900x.jpg?v=1646997187',
        description: 'Chrome-plated',
        quantity: 1,
      }],
      data: {
        _id: '1000',
        userid: '1000',
        name: 'Eric Fouh',
        defaultDeliveryLocation: '1234 Main St, Atlanta, GA 30332',
      },
    });

    expect(response.statusCode).toBe(201);
  });
});

describe('nonmocked tests', () => {
  test('normal post', async () => {
    const res = await request.post('/checkoutOrder').send({
      cart: [{
        id: 518611,
        name: 'Cardinal Health IV Pole',
        image: 'https://cdn.shopify.com/s/files/1/0556/3711/4961/products/ISG10170_900x.jpg?v=1646997187',
        description: 'Chrome-plated',
        quantity: 1,
      }],
      data: {
        _id: '1000',
        userid: '1000',
        name: 'Eric Fouh',
        defaultDeliveryLocation: '1234 Main St, Atlanta, GA 30332',
      },
    });

    expect(res.status).toEqual(201);
  });
});
