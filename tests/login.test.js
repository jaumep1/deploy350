const request = require('supertest');
const { closeMongoDBConnection, connect } = require('../database');
const webapp = require('../server');

const testUserSettings = {
  email: 'ttt@cis.upenn.edu',
  password: '1234',
  role: 'Nurse',
  name: 'ttt',
};

let mongo;
describe('changing user settings', () => {
  let res;
  let db;

  beforeAll(async () => {
    mongo = await connect();
    db = mongo.db();
  });

  afterAll(async () => {
    await db.collection('Users').deleteMany({ name: testUserSettings.name });
    await db.collection('UserSettings').deleteMany({ name: testUserSettings.name });
    var id = await db.collection('Users').count() + 100;
    await db.collection('Carts').deleteMany({ _id: id });
    await mongo.close();
    await closeMongoDBConnection();
  });

  test('sanity check for database', async () => {
    await request(webapp).get('/').then((resp) => {
      expect(resp.status).toEqual(200);
      expect(resp.type).toBe('application/json');
      expect(resp.header.connection).toBe('close');
      expect(resp.text).toBe('{"messge":"server started"}');
    });
  });

  test('registers user', async () => {
    res = await request(webapp).post('/signup')
      .send(testUserSettings);
    expect(res.status).toEqual(201);
    expect(res.type).toBe('application/json');
  });

  test('correct user login', async () => {
    res = await request(webapp).post('/login')
    .send({
      email: 'ttt@cis.upenn.edu',
      password: '1234',
    });
    expect(res.status).toEqual(201);
    expect(res.type).toBe('application/json');
  });

  test('incorrect password 401', async () => {
    res = await request(webapp).post('/login')
      .send({
        email: 'ttt@cis.upenn.edu',
        password: '12345',
      });
    expect(res.status).toEqual(401);
  });

  test('missing password 404', async () => {
    res = await request(webapp).post('/login')
      .send({
        email: 'ttt@cis.upenn.edu',
      });
    expect(res.status).toEqual(404);
  });

  // test('register user', async () => {
  //   res = await request(webapp).post(`/signup`)
  //   .send(testUserSettings)
  //   expect(res.status).toEqual(201);
  // });

  test('register user error', async () => {
    res = await request(webapp).post('/signup')
      .send({
        email: 'ttt@cis.upenn.edu',
        password: '1234',
        role: 'Nurse',
      });
    expect(res.status).toEqual(404);
  });

  test('get settings', async () => {
    var id = await db.collection('Users').count() + 100 - 1;
    await request(webapp).get('/user/'+id.toString()).then((res) => {
      expect(res.status).toEqual(201);
      expect(res.type).toBe('application/json');
      expect(res.header.connection).toBe('close');
      console.log(res.text);
      expect(res.text).toContain('"contactEmail":"ttt@cis.upenn.edu"');
    });
  });
  test('update settings', async () => {
    var id = await db.collection('Users').count() + 100 - 1;
    await request(webapp).put('/user/'+id.toString()).send({
      userid: id.toString(),
      name: 'ttt',
      photo: null,
      contactEmail: 'ttt@cis.upenn.edu',
      phoneNumber: '1234567890',
      notificationOn: false,
      doNotDisturbBegin: 1800,
      doNotDisturbEnd: 2200,
      defaultDeliveryLocation: 'Not Set',
      defaultDeliveryRoom: 'Not Set',
      doNotDisturb: true,
      emailNofication: true,
      phoneNofication: false,
      appNofication: false,
      emailNotification: false,
      phoneNotification: false,
      appNotification: false,
    }).then((res) => {
      expect(res.status).toEqual(201);
      expect(res.type).toBe('application/json');
      expect(res.header.connection).toBe('close');
      expect(res.text).toContain('"acknowledged":true');
    });

    await request(webapp).get('/user/'+id.toString()).then((res) => {
      expect(res.status).toEqual(201);
      expect(res.type).toBe('application/json');
      expect(res.header.connection).toBe('close');
      // console.log(res.text);
      expect(res.text).toContain('"phoneNumber":"1234567890"');
    });
  });
});
