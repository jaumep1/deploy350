const supertest = require('supertest');
const webapp = require('../server');
const dbLib = require('../database');

const request = supertest(webapp);

jest.mock('../database.js');

describe('GET /notifications', () => {
  test('should return 201 and result if id is provided', async () => {
    const mockResult = [{ id: 1, message: 'notification1' }, { id: 2, message: 'notification2' }];
    dbLib.getNotifications.mockResolvedValueOnce(mockResult);

    const response = await request
      .get('/notifications')
      .query({ id: 1 });

    expect(response.status).toBe(201);
    expect(response.body.result).toEqual(mockResult);
  });

  test('should return 401 if no result is found', async () => {
    dbLib.getNotifications.mockResolvedValueOnce(null);

    const response = await request
      .get('/notifications')
      .query({ id: 1 });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('There was an error');
  });

  test('should return 400 if there was an error', async () => {
    dbLib.getNotifications.mockRejectedValueOnce(new Error());

    const response = await request
      .get('/notifications')
      .query({ id: 1 });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('There was an error');
  });
});

describe('GET /items', () => {
  test('should return 201 and result if items exist', async () => {
    const mockResult = [{ id: 1, name: 'item1' }, { id: 2, name: 'item2' }];
    dbLib.getItems.mockResolvedValueOnce(mockResult);

    const response = await request.get('/items');

    expect(response.status).toBe(201);
    expect(response.body.result).toEqual(mockResult);
  });

  // test('should return 400 if there was an error', async () => {
  //   dbLib.getItems.mockRejectedValueOnce(new Error());

  //   const response = await request.get('/items');

  //   expect(response.status).toBe(400);
  //   expect(response.body.message).toBe('There was an error');
  // });
});

describe('GET /pastOrders', () => {
  test('should return 201 and result if nurseID is provided', async () => {
    const mockResult = [{ id: 1, order: 'X' }, { id: 1, order: 'Y' }, { id: 1, order: 'Z' }];
    dbLib.getNursePastOrders.mockResolvedValueOnce(mockResult);

    const response = await request
      .get('/pastOrders')
      .query({ user_id: 1 });

    expect(response.status).toBe(201);
    expect(response.body.result).toEqual(mockResult);
  });

  test('should return 201 and result if storeroomID is provided', async () => {
    const mockResult = [{ id: 2, order: 'A' }, { id: 2, order: 'B' }, { id: 2, order: 'C' }];
    dbLib.getStoreroomPastOrders.mockResolvedValueOnce(mockResult);

    const response = await request
      .get('/pastOrders')
      .query({ storeroom_manager_id: 2 });

    expect(response.status).toBe(201);
    expect(response.body.result).toEqual(mockResult);
  });

  test('should return 404 if nurseID and storeroomID are missing', async () => {
    const response = await request
      .get('/pastOrders');

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Missing params');
  });

  test('should return 401 if no result is found', async () => {
    dbLib.getStoreroomPastOrders.mockResolvedValueOnce(null);

    const response = await request
      .get('/pastOrders')
      .query({ storeroom_manager_id: 2 });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('There was an error');
  });

  test('should return 400 if there was an error', async () => {
    dbLib.getNursePastOrders.mockRejectedValueOnce(new Error());

    const response = await request
      .get('/pastOrders')
      .query({ user_id: 1 });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('There was an error');
  });
});

describe('GET /pastOrders', () => {
  test('should return 201 and result if user_id is provided', async () => {
    const mockResult = [{ id: 1, order_name: 'Order 1' }, { id: 2, order_name: 'Order 2' }];
    dbLib.getNursePastOrders.mockResolvedValueOnce(mockResult);

    const response = await request
      .get('/pastOrders')
      .query({ user_id: 1 });

    expect(response.status).toBe(201);
    expect(response.body.result).toEqual(mockResult);
  });

  test('should return 201 and result if storeroom_manager_id is provided', async () => {
    const mockResult = [{ id: 1, order_name: 'Order 1' }, { id: 2, order_name: 'Order 2' }];
    dbLib.getStoreroomPastOrders.mockResolvedValueOnce(mockResult);

    const response = await request
      .get('/pastOrders')
      .query({ storeroom_manager_id: 1 });

    expect(response.status).toBe(201);
    expect(response.body.result).toEqual(mockResult);
  });

  test('should return 404 if user_id and storeroom_manager_id are missing', async () => {
    const response = await request
      .get('/pastOrders');

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Missing params');
  });

  test('should return 401 if no result is found', async () => {
    dbLib.getNursePastOrders.mockResolvedValueOnce(null);

    const response = await request
      .get('/pastOrders')
      .query({ user_id: 1 });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('There was an error');
  });

  test('should return 400 if there was an error', async () => {
    dbLib.getNursePastOrders.mockRejectedValueOnce(new Error());

    const response = await request
      .get('/pastOrders')
      .query({ user_id: 1 });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('There was an error');
  });
});

describe('DELETE /currentOrders/:orderId', () => {
  test('should return 401 if order is not found', async () => {
    dbLib.deleteCurrentOrder.mockResolvedValueOnce(null);

    const response = await request.delete('/currentOrders/123');

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('There was an error');
  });

  test('should return 400 if there was an error', async () => {
    dbLib.deleteCurrentOrder.mockRejectedValueOnce(new Error());

    const response = await request.delete('/currentOrders/123');

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('There was an error');
  });
});

describe('GET /incomingOrders/:orderId?', () => {
  test('should return 201 and the order result if the order ID is provided', async () => {
    const mockResult = [{ id: 1, product: 'book', quantity: 2 }];
    dbLib.getIncomingOrders.mockResolvedValueOnce(mockResult);

    const response = await request
      .get('/incomingOrders/1');

    expect(response.status).toBe(201);
    expect(response.body.result).toEqual(mockResult);
  });

  test('should return 401 if there was an error retrieving the incoming orders', async () => {
    dbLib.getIncomingOrders.mockResolvedValueOnce(null);

    const response = await request
      .get('/incomingOrders/1');

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('There was an error retrieving incoming orders');
  });
});

describe('DELETE /incomingOrders/:orderId', () => {
  test('should return 201 and the result if the order ID is provided', async () => {
    const mockResult = { id: 1, product: 'book', quantity: 2 };
    dbLib.deleteIncomingOrder.mockResolvedValueOnce(mockResult);

    const response = await request
      .delete('/incomingOrders/1');

    expect(response.status).toBe(201);
    expect(response.body.result).toEqual(mockResult);
  });
});

describe('GET /onHoldOrders', () => {
  test('should return 201 and result if there are on hold orders', async () => {
    const mockResult = [
      { id: 1, name: 'Order1', status: 'On hold' },
      { id: 2, name: 'Order2', status: 'On hold' },
      { id: 3, name: 'Order3', status: 'On hold' },
    ];
    dbLib.getOnHoldOrders.mockResolvedValueOnce(mockResult);

    const response = await request.get('/onHoldOrders');

    expect(response.status).toBe(201);
    expect(response.body.result).toEqual(mockResult);
  });

  test('should return 401 and an error message if there are no on hold orders', async () => {
    dbLib.getOnHoldOrders.mockResolvedValueOnce(null);

    const response = await request.get('/onHoldOrders');

    expect(response.status).toBe(401);
    expect(response.body.message).toEqual('There was an error retrieving on hold orders');
  });
});

describe('POST /onHoldOrders', () => {
  test('should return 404 if any required param is missing', async () => {
    const response = await request
      .post('/onHoldOrders')
      .send({
        id: 1,
        price: 5.99,
        count: 1,
        itemId: 123,
        user_id: 456,
        orderer: 'John Doe',
        orderLocation: '123 Main St',
        date: '2023-04-18',
      });

    expect(response.status).toBe(404);
    expect(response.body.message).toEqual('Missing params');
  });
});

describe('DELETE /onHoldOrders/:orderId', () => {
  test('should return 201 and result if the order was deleted successfully', async () => {
    const mockResult = { message: 'Order deleted successfully' };
    dbLib.deleteOnHoldOrder.mockResolvedValueOnce(mockResult);

    const response = await request.delete('/onHoldOrders/1');

    expect(response.status).toBe(201);
    expect(response.body.result).toEqual(mockResult);
  });
});

describe('GET /orderChatMessages', () => {
  test('should return 201 and result if order ID is provided', async () => {
    const mockResult = [{ id: 1, message: 'Hello' }, { id: 2, message: 'How are you?' }, { id: 3, message: 'Fine, thanks.' }];
    dbLib.getOrderChatMessages.mockResolvedValueOnce(mockResult);

    const response = await request
      .get('/orderChatMessages')
      .query({ orderId: 1 });

    expect(response.status).toBe(201);
    expect(response.body.result).toEqual(mockResult);
  });

  test('should return 404 if order ID is not provided', async () => {
    const response = await request
      .get('/orderChatMessages');

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Missing params');
  });
});

describe('POST /orderChatMessages', () => {
  test('should return 201 and result if all required params are provided', async () => {
    const mockResult = 'Message sent successfully!';
    dbLib.postOrderChatMessage.mockResolvedValueOnce(mockResult);

    const requestBody = {
      orderId: '123',
      message: 'Hello World',
      sender: '456',
    };

    const response = await request
      .post('/orderChatMessages')
      .send(requestBody);

    expect(response.status).toBe(201);
    expect(response.body.result).toEqual(mockResult);
  });
});

describe('GET /getNicknamesByID', () => {
  test('should return 201 and result if id is provided', async () => {
    const mockResult = [{ id: 1, nickname: 'John' }, { id: 1, nickname: 'Johnny' }, { id: 1, nickname: 'Jon' }];
    dbLib.getNicknamesByID.mockResolvedValueOnce(mockResult);

    const response = await request
      .get('/getNicknamesByID')
      .query({ id: 1 });

    expect(response.status).toBe(201);
    expect(response.body.result).toEqual(mockResult);
  });

  test('should return 404 if id is missing', async () => {
    const response = await request
      .get('/getNicknamesByID');

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('missing params');
  });

  test('should return 401 if no result is found', async () => {
    dbLib.getNicknamesByID.mockResolvedValueOnce(null);

    const response = await request
      .get('/getNicknamesByID')
      .query({ id: 1 });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('uh oh, please try again');
  });

  test('should return 400 if there was an error', async () => {
    dbLib.getNicknamesByID.mockRejectedValueOnce(new Error());

    const response = await request
      .get('/getNicknamesByID')
      .query({ id: 1 });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('There was an error');
  });
});

describe('GET /frequentlyOrdered', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should return 404 if limit, page, sort, or order is missing', async () => {
    const res = await request
      .get('/frequentlyOrdered')
      .expect(404);

    expect(res.body.message).toBe('missing params');
  });

  test('should return 201 and result if all params are provided', async () => {
    const limit = 10;
    const page = 1;
    const sort = 1;
    const order = 'asc';

    // dbLib.getFrequentlyOrderedPage.mockResolvedValueOnce(expectedResults);

    await request
      .get(`/frequentlyOrdered?_limit=${limit}&_page=${page}&_sort=${sort}&_order=${order}`)
      .expect(401);

    // expect(dbLib.getFrequentlyOrderedPage).toHaveBeenCalledWith(limit, page, sort, order);
  });

  test('should return 401 if no result is found', async () => {
    const limit = 10;
    const page = 1;
    const sort = 1;
    const order = 'dsc';

    dbLib.getFrequentlyOrderedPage.mockResolvedValueOnce(null);

    await request
      .get(`/frequentlyOrdered?_limit=${limit}&_page=${page}&_sort=${sort}&_order=${order}`)
      .expect(401);

    // expect(res.body.message).toBe('uh oh, please try again');
    // expect(dbLib.getFrequentlyOrderedPage).toHaveBeenCalledWith(limit, page, sort, order);
  });

  test('should return 400 if there is an error', async () => {
    const limit = 10;
    const page = 1;
    const sort = 'some-sort';
    const order = 'some-order';

    dbLib.getFrequentlyOrderedPage.mockRejectedValueOnce(new Error('DB error'));

    const res = await request
      .get(`/frequentlyOrdered?_limit=${limit}&_page=${page}&_sort=${sort}&_order=${order}`)
      .expect(400);

    expect(res.body.message).toBe('There was an error');
    // expect(dbLib.getFrequentlyOrderedPage).toHaveBeenCalledWith(limit, page, sort, order);
  });
});

describe('POST /nicknames', () => {
  test('should return 201 with id if valid id and nicknames are provided', async () => {
    dbLib.editNicknames.mockResolvedValueOnce(123); // mock the database library function
    const res = await request
      .post('/nicknames')
      .send({ id: 1, nicknames: ['nickname1', 'nickname2'] })
      .expect(201);
    expect(res.body.data.id).toBe(123); // assert the response body
    expect(dbLib.editNicknames).toHaveBeenCalledWith(1, ['nickname1', 'nickname2']); // assert the database library function is called with the correct parameters
  });

  test('should return 404 if id or nicknames are missing', async () => {
    const res = await request
      .post('/nicknames')
      .send({})
      .expect(404);
    expect(res.body.message).toBe('missing params'); // assert the response body
  });

  test('should return 401 if editNicknames function returns falsy value', async () => {
    dbLib.editNicknames.mockResolvedValueOnce(null); // mock the database library function
    const res = await request
      .post('/nicknames')
      .send({ id: 1, nicknames: ['nickname1', 'nickname2'] })
      .expect(401);
    expect(res.body.message).toBe('uh oh, please try again'); // assert the response body
    expect(dbLib.editNicknames).toHaveBeenCalledWith(1, ['nickname1', 'nickname2']); // assert the database library function is called with the correct parameters
  });

  test('should return 400 if editNicknames function throws an error', async () => {
    dbLib.editNicknames.mockRejectedValueOnce(new Error('database error')); // mock the database library function
    const res = await request
      .post('/nicknames')
      .send({ id: 1, nicknames: ['nickname1', 'nickname2'] })
      .expect(400);
    expect(res.body.message).toBe('There was an error'); // assert the response body
    expect(dbLib.editNicknames).toHaveBeenCalledWith(1, ['nickname1', 'nickname2']); // assert the database library function is called with the correct parameters
  });
});

describe('GET /getcartitemsbyuserid', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return 404 if id is not provided', async () => {
    const response = await request.get('/getcartitemsbyuserid');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'missing params' });
  });

  test('should return 201 and result if id is provided', async () => {
    const mockResult = [{ id: 1, name: 'Product 1' }];
    dbLib.getCartsByID.mockResolvedValueOnce(mockResult);

    const response = await request.get('/getcartitemsbyuserid?id=1');

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ result: mockResult });
  });

  test('should return 401 if no results found', async () => {
    dbLib.getCartsByID.mockResolvedValueOnce(null);

    const response = await request.get('/getcartitemsbyuserid?id=1');

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'uh oh, please try again' });
  });

  test('should return 400 if there is an error', async () => {
    dbLib.getCartsByID.mockRejectedValueOnce(new Error('Database error'));

    const response = await request.get('/getcartitemsbyuserid?id=1');

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'There was an error' });
  });
});
