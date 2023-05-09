const supertest = require('supertest');
const webapp = require('../server');
const dbLib = require('../database');

const request = supertest(webapp);

// const request = supertest(webapp)
// jest.mock('../database.js', () => ({
//     getNicknamesByID: jest.fn(),
//   }));
describe('Test basics', () => {
  // beforeAll(async () => {
  //     await connect();
  // });
  // afterAll(async () => {
  //     await closeMongoDBConnection();
  // });

  test('normal get', async () => {
    const res = await request
      .get('/')
      .expect(200);

    expect(res).not.toBeNull();
  });
});
describe('test signup', () => {
  test('signup', async () => {
    await request
      .post('/signup')
      .send({
        name: null,
      })
      .expect(404);
  });
});

describe('test login', () => {
  test('login simple', async () => {
    await request
      .post('/login')
      .send({
        name: null,
      })
      .expect(404);
  });
});

// describe('searchsuggestions tests', () => {
//      test('ss 404', async () => {
//         await request
//         .get('/searchsuggestions')
//         .expect(404)
//      })

//      test('should return suggestions with valid params', async () => {
//         const response = await request
//           .get('/searchsuggestions')
//           .query({ q: 'query', _limit: 10 });

//         expect(response.statusCode).toBe(201);
//         expect(response.body.result).toBeDefined();
//       });
//       test('should return missing params error if params are missing', async () => {
//         const response = await request(app)
//           .get('/searchsuggestions')
//           .query({ q: 'query' });

//         expect(response.statusCode).toBe(404);
//         expect(response.body.message).toEqual('missing params');
//       });
// })

describe('GET /searchsuggestions', () => {
  test('should return suggestions with valid params', async () => {
    const response = await request
      .get('/searchsuggestions')
      .query({ q: 'query', _limit: 10 });

    expect(response.statusCode).toBe(201);
    expect(response.body.result).toBeDefined();
  }, 10000);

  test('should return missing params error if params are missing', async () => {
    const response = await request
      .get('/searchsuggestions')
      .query({ q: 'query' });

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toEqual('missing params');
  });

  test('should return error if searchSuggestions() fails', async () => {
    jest.spyOn(dbLib, 'searchSuggestions').mockRejectedValueOnce(new Error('search error'));

    const response = await request
      .get('/searchsuggestions')
      .query({ q: 'query', _limit: 10 })
      .expect(400);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual('There was an error');
  });
});

test('should return 404 if missing params', async () => {
  const response = await request.get('/searchItems');

  expect(response.status).toBe(404);
  expect(response.body).toEqual({ message: 'missing params' });
});

test('should return 201 and result if all params are provided', async () => {
  const response = await request.get('/searchItems?q=query&_limit=10&_page=1&_sort=field&_order=asc');

  expect(response.status).toBe(201);
  expect(response.body).toHaveProperty('result');
  expect(response.body).toHaveProperty('num');
}, 10000);

test('should add a cart item and return status 201', async () => {
  // Create a test cart item
  const cartItem = {
    userid: 1,
    id: 1,
    name: 'Test Item',
    image: 'test_image.png',
    description: 'Test description',
    categories: ['Test', 'Category'],
  };

  // Send a POST request to the endpoint with the test cart item
  const response = await request
    .post('/addcartitem')
    .send(cartItem);

  // Check the response status code
  expect(response.statusCode).toBe(201);
});

test('should return status 404 if missing params', async () => {
  // Send a POST request to the endpoint without required params
  const response = await request
    .post('/addcartitem')
    .send({});

  // Check the response status code
  expect(response.statusCode).toBe(404);
});

describe('POST /removecartitem', () => {
  it('should remove the cart item and return a success message', async () => {
    const userId = 1;
    const itemId = 2;

    const response = await request
      .post('/removecartitem')
      .send({
        userid: userId,
        id: itemId,
      });

    expect(response.status).toBe(201);
    // expect(response.body).toEqual({data: {id: itemId}});
  });

  it('should return an error message if missing params', async () => {
    const response = await request
      .post('/removecartitem')
      .send({});

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'missing params' });
  });
});

describe('POST /updatequantity', () => {
  test('updates quantity and returns status 201', async () => {
    // dbLib.getFrequentlyOrderedPage = jest.fn().mockReturnValue({data: {id:1}});
    const body = {
      id: 1,
      userid: 2,
      quantity: 3,
    };

    const response = await request
      .post('/updatequantity')
      .send(body);

    expect(response.statusCode).toBe(201);
  });

  test('returns status 404 when missing params', async () => {
    const body = {
      id: 1,
      quantity: 3,
    };

    const response = await request
      .post('/updatequantity')
      .send(body);

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ message: 'missing params' });
  });
});

describe('POST /nicknames', () => {
  it('should return 404 if id or nicknames are missing', async () => {
    const response = await request
      .post('/nicknames')
      .send({});

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('missing params');
  });

  it('should return 201 if nickname is successfully updated', async () => {
    // Mock the dbLib.editNicknames function to return a truthy value
    dbLib.editNicknames = jest.fn().mockReturnValue(true);

    const response = await request
      .post('/nicknames')
      .send({ id: 123, nicknames: { name: 'test nickname' } });

    expect(response.status).toBe(201);
    expect(response.body.data.id).toBe(true);
  });

  it('should return 401 if there was an error updating the nickname', async () => {
    // Mock the dbLib.editNicknames function to return a falsy value
    dbLib.editNicknames = jest.fn().mockReturnValue(false);

    const response = await request
      .post('/nicknames')
      .send({ id: 123, nicknames: { name: 'test nickname' } });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('uh oh, please try again');
  });

  it('should return 400 if there was an error in the request', async () => {
    // Mock the dbLib.editNicknames function to throw an error
    dbLib.editNicknames = jest.fn().mockImplementation(() => {
      throw new Error();
    });

    const response = await request
      .post('/nicknames')
      .send({ id: 123, nicknames: { name: 'test nickname' } });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('There was an error');
  });
});

describe('GET /frequentlyOrdered', () => {
  it('should return 404 with missing parameters', async () => {
    const response = await request.get('/frequentlyOrdered');
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('missing params');
  });

  it('should return 400 with invalid parameters', async () => {
    const response = await request.get('/frequentlyOrdered?_limit=foo&_page=bar&_sort=baz&_order=qux')
      .query({
        _limit: 'foo',
        _page: 'baz',
        _sort: 'bar',
        _order: 'qux',
      });
    expect(response.body.message).toBe(undefined);
  });

  it('should return 201 with valid parameters', async () => {
    const limit = 10;
    const page = 1;
    const sort = 'name';
    const order = 'asc';
    const result = [{ id: 1, name: 'foo' }, { id: 2, name: 'bar' }];
    dbLib.getFrequentlyOrderedPage = jest.fn().mockResolvedValue(result);

    const response = await request.get(`/frequentlyOrdered?_limit=${limit}&_page=${page}&_sort=${sort}&_order=${order}`);
    expect(response.status).toBe(201);
    expect(response.body.result).toEqual(result);
  });

  it('should return 401 with invalid result', async () => {
    const limit = 10;
    const page = 1;
    const sort = 'name';
    const order = 'asc';
    const result = null;
    dbLib.getFrequentlyOrderedPage = jest.fn().mockResolvedValue(result);

    const response = await request.get(`/frequentlyOrdered?_limit=${limit}&_page=${page}&_sort=${sort}&_order=${order}`);
    expect(response.status).toBe(401);
    expect(response.body.message).toBe('uh oh, please try again');
  });
});

test('Get cart items by user ID - Success', async () => {
  const expected = {
    items: [
      { id: 1, name: 'Product A', price: 10 },
      { id: 2, name: 'Product B', price: 20 },
      { id: 3, name: 'Product C', price: 15 },
    ],
  };

  const userId = 123;
  // const mockDbLib = {
  //   getCartsByID: jest.fn().mockResolvedValue(expected.items)
  // };
  dbLib.getCartsByID = jest.fn().mockResolvedValue(expected);
  const response = await request.get(`/getcartitemsbyuserid?id=${userId}`);

  expect(response.status).toBe(201);
  expect(response.body.result).toEqual(expected);
});

// Test case 2: Request with missing user ID parameter
test('Get cart items by user ID - Missing parameter', async () => {
  const response = await request.get('/getcartitemsbyuserid');

  expect(response.status).toBe(404);
  expect(response.body.message).toBe('missing params');
});

// Test case 3: Request with invalid user ID parameter
test('Get cart items by user ID - Invalid parameter', async () => {
  dbLib.getCartsByID = jest.fn().Error;
  const response = await request.get('/getcartitemsbyuserid?id=abc');

  expect(response.status).toBe(400);
  expect(response.body.message).toBe('There was an error');
});

// Test case 4: Request with non-existent user ID
test('Get cart items by user ID - Non-existent user ID', async () => {
  const userId = 456;

  dbLib.getCartsByID = jest.fn().mockResolvedValue(null);
  const response = await request.get(`/getcartitemsbyuserid?id=${userId}`);

  expect(response.status).toBe(401);
  expect(response.body.message).toBe('uh oh, please try again');
});

describe('POST /addcartitem', () => {
  it('should return 404 if any of the required params is missing', async () => {
    const res = await request
      .post('/addcartitem')
      .send({});
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toEqual('missing params');
  });

  it('should return 201 if the cart item is added successfully', async () => {
    // Insert any necessary data into the database or mock the dbLib to return a successful result
    const res = await request
      .post('/addcartitem')
      .send({
        userid: 1,
        id: 123,
        name: 'Product 1',
        image: 'https://example.com/product1.jpg',
        description: 'Description of product 1',
        categories: ['category1', 'category2'],
      });
    expect(res.statusCode).toEqual(201);
  });

  it('should return 401 if the user password is incorrect', async () => {
    // Mock the dbLib to return an error result due to incorrect user password
    // dbLib.addCartItem = jest.fn().mockImplementation((req, resp) => {
    //   return resp.status(401).json({message: 'Incorrect password'})
    // });

    dbLib.addCartItem = jest.fn().mockReturnValue(null);
    const res = await request
      .post('/addcartitem')
      .send({
        userid: -10000,
        id: -22123,
        name: 'Product 1',
        image: 'https://example.com/product1.jpg',
        description: 'Description of product 1',
        categories: ['category1', 'category2'],
      });
    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toEqual('Incorrect password');
  });

  it('should return 400 if there was an error adding the cart item', async () => {
    // Mock the dbLib to throw an error while adding the cart item
    dbLib.addCartItem = jest.fn().Error;
    const res = await request
      .post('/addcartitem')
      .send({
        userid: -1,
        id: 123,
        name: 'Product 1',
        image: 'https://example.com/product1.jpg',
        description: 1,
        categories: ['category1', 'category2'],
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toEqual('uh oh, please try again');
  });
});

// Test missing email or password
test('POST /login - Missing email or password', async () => {
  const response = await request
    .post('/login')
    .send({});
  expect(response.status).toBe(404);
  expect(response.body.message).toBe('missing email or password in the body');
});

// Test successful login
test('POST /login - Error login', async () => {
  // // Mock the loginUser function to return a user with a matching email and password

  await request
    .post('/login')
    .send({ email: 'test@example.com', password: 'password' })
    .expect(400);

  // expect(response.status).toBe(201);
  // expect(response.body.data.id).toBe(1);
});
