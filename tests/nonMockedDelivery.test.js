/* eslint-disable radix */
/* eslint-disable no-underscore-dangle */
const supertest = require('supertest');
const webapp = require('../server');
const dbLib = require('../database');
const request = supertest(webapp);
describe('getAllItems', () => {
  test('get all items', async () => {
    const res = await request
      .get('/items')
      .expect(201);
    expect(JSON.parse(res.body.result)).not.toBeNull();
  });
});
describe('getCurrentOrders', () => {
  test('get current orders by nurse id', async () => {
    const testNurseID = '998';
    const res = await request
      .get(`/currentOrders/?user_id=${testNurseID}`)
      .expect(201);
    const parsed = JSON.parse(res.body.result);
    expect(parsed.length >= 1).toBe(true);
    expect(parsed[0]._id).toBe('64582db1315d27fb81b8b077');
  });
  test('get current orders by storeroom manager id', async () => {
    const testStoreroomID = '999';
    const res = await request
      .get(`/currentOrders/?storeroom_manager_id=${testStoreroomID}`)
      .expect(201);
    const parsed = JSON.parse(res.body.result);
    expect(parsed).toHaveLength(1);
    expect(parsed[0]._id).toBe('64582db1315d27fb81b8b077');
  });
  test('get current order by order id', async () => {
    const orderID = '64582db1315d27fb81b8b077';
    const res = await request
      .get(`/currentOrders/${orderID}`)
      .expect(201);
    const parsed = JSON.parse(res.body.result);
    expect(parsed._id).toBe('64582db1315d27fb81b8b077');
  });
});
describe('getOrderChatMessages', () => {
  test('getOrderMessages', async () => {
    const testOrderID = '64582db1315d27fb81b8b077';
    const res = await request
      .get(`/orderChatMessages?orderId=${testOrderID}`)
      .expect(201);
    const parsed = JSON.parse(res.body.result);
    expect(parsed.length >= 1).toBe(true);
    expect(parsed[0].order_id).toBe(testOrderID);
  });
});
describe('getIncomingOrders', () => {
  test('get all incoming orders', async () => {
    const res = await request
      .get('/incomingOrders/')
      .expect(201);
    const parsed = JSON.parse(res.body.result);
    expect(parsed.length > 1).toBe(true);
  });
  test('get incoming order by order id', async () => {
    const res = await request
      .get('/incomingOrders/6457ed38de6a2683df8cc81b')
      .expect(201);
    const parsed = JSON.parse(res.body.result);
    expect(parsed).toHaveLength(1);
    expect(parsed[0]._id).toBe('6457ed38de6a2683df8cc81b');
  });
});
describe('getPastOrders', () => {
  test('get past orders by storeroom manager id', async () => {
    const testStoreroomID = '999';
    const res = await request
      .get(`/pastOrders?storeroom_manager_id=${testStoreroomID}`)
      .expect(201);
    const parsed = JSON.parse(res.body.result);
    expect(parsed).toHaveLength(1);
    expect(parsed[0]._id).toBe('64582f70315d27fb81b8b07a');
  });
});
describe('getOnHoldOrders', () => {
  test('get on hold orders by order id', async () => {
    const orderID = '645830bd315d27fb81b8b07b';
    const res = await request
      .get(`/onHoldOrders/${orderID}`)
      .expect(201);
    const parsed = JSON.parse(res.body.result);
    expect(parsed).toHaveLength(1);
    expect(parsed[0]._id).toBe(orderID);
  });
  test('get all on hold orders', async () => {
    const res = await request
      .get('/onHoldOrders/')
      .expect(201);
    const parsed = JSON.parse(res.body.result);
    expect(parsed.length >= 1).toBe(true);
  });
});
describe('postOrderChatMessage', () => {
  test('post order chat message and delete', async () => {
    const testOrderID = '64582db1315d27fb81b8b077';
    const testUserID = '998';
    const testMessage = 'test message';
    await request
      .post('/orderChatMessages')
      .send({
        order_id: testOrderID,
        user_id: testUserID,
        message: testMessage,
      });
    const res2 = await request
      .get(`/orderChatMessages?orderId=${testOrderID}`);
    const allOrderChatMessages = JSON.parse(res2.body.result);
    expect(allOrderChatMessages.find(
      (message) => message.order_id === parseInt(testOrderID),
    )).not.toBeNull();
    dbLib.deleteOrderChatMessage(parseInt(testOrderID));
  });
});
describe('postPastOrders', () => {
  test('post past order and delete', async () => {
    const newPastOrder = {
      id: 989898,
      price: 50.2,
      count: 1,
      itemID: 765123,
      user_id: '983',
      storeroom_manager_id: '987',
      orderer: 'Michael Lu',
      orderLocation: 'UPenn',
      date: '4/18/23',
      statusMessage: 'Order delivered!',
    };
    await request
      .post('/pastOrders')
      .send(newPastOrder)
      .expect(201);
    const res2 = await request
      .get('/pastOrders?storeroom_manager_id=987');
    const parsed = JSON.parse(res2.body.result);
    expect(parsed).not.toBeNull();
    dbLib.deletePastOrder(989898);
  });
});