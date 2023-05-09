/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */

// import path
const path = require('path');

const express = require('express');
const session = require('express-session');
const cors = require('cors');
const { ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

const webapp = express();
const bodyParser = require('body-parser');

webapp.use(bodyParser.urlencoded({ extended: true }));
webapp.use(bodyParser.json());
const utility = require('./utility');
const analytics = require('./analytics/routes');
const checkout = require('./checkout/routes');

webapp.use(cors({ credentials: true }));
webapp.use(express.urlencoded({ extended: true }));
webapp.use(
  session({
    secret: 'loginSecret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  }),
);
const dbLib = require('./database');

webapp.use(express.static(path.join(__dirname, './web/build')));

webapp.use(express.json({
  type: ['application/json', 'text/plain'],
}));
webapp.get('/', (req, resp) => {
  resp.json({ messge: 'server started' });
});

webapp.post('/api/signup', async (req, resp) => {
  if (!req.body.name || !req.body.email || !req.body.password || !req.body.role) {
    resp.status(404).json({ message: 'missing name, email, password, or role in the body' });
    return;
  }
  const userFound = await dbLib.findUser(req.body.email);
  if (userFound !== 'null') {
    resp.status(404).json({ message: 'user already exists' });
    return;
  }
  try {
    var hash = bcrypt.hashSync(req.body.password, salt);
    var newUser = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
        password: hash,
    };
    const result = await dbLib.registerUser(newUser);
    req.session.email = result.email;
    req.session.name = result.name;
    req.session.role = result.role;
    req.session.save();
    resp.status(201).json({ data: { id: result.userid, role: req.body.role } });
  } catch (err) {
    console.log(err);
    resp.status(400).json({ message: 'There was an error' });
  }
});

webapp.post('/api/login', async (req, resp) => {
  if (!req.body.email || !req.body.password) {
    resp.status(404).json({ message: 'missing email or password in the body' });
    return;
  }
  try {
    const currUser = {
      email: req.body.email,
      password: req.body.password,
    };
    const result = await dbLib.loginUser(currUser.email);
    if (bcrypt.compareSync(req.body.password, JSON.parse(result).password)) {
      resp.status(201).send({ data: JSON.parse(result) });
    } else {
      resp.status(401).json({ message: 'Incorrect password' });
    }
    // console.log(result)
    
  } catch (err) {
    console.log(err)
    resp.status(400).json({ message: 'There was an error' });
  }
});

// UserSettings
webapp.get('/user/:userid', async (req, res) => {
  try {
    const result = await dbLib.getSettings(req.params.userid);
    res.status(201).send({ data: JSON.parse(result) });
  } catch {
    res.status(401).send({ error: 'User not found' });
  }
});

// Update settings
webapp.put('/user/:userid', async (req, res) => {
  // Ensure request has userid
  if (req.body.userid === null) {
    res.status(401).send({ error: 'Request must have userid' });
  }

  try {
    const result = await dbLib.updateSettings(req.body);
    res.status(201).send({ data: JSON.parse(result) });
  } catch {
    res.status(401).send({ error: 'Error updating' });
  }
});

webapp.post('/logout', async (req, res) => {
  if (req.session.email === undefined) {
    res.status(400).send('no user to logout');
  } else {
    req.session.destroy();
    res.status(200).send('success');
  }
});

// ----------- GROUP 2 THINGS ------------

webapp.get('/searchsuggestions', async (req, resp) => {
  if (!req.query.q || !req.query._limit) {
    resp.status(404).json({ message: 'missing params' });
    return;
  }
  try {
    const searchparams = req.query.q;
    const limit = req.query._limit;

    const result = await dbLib.searchSuggestions(searchparams, parseInt(limit, 10));
    if (result) {
      resp.status(201).json({ result });
    } else {
      resp.status(401).json({ message: 'uh oh, please try again' });
    }
  } catch (err) {
    // console.log(err);
    resp.status(400).json({ message: 'There was an error' });
  }
});

webapp.get('/searchItems', async (req, resp) => {
  if (!req.query.q || !req.query._limit || !req.query._page
      || !req.query._sort || !req.query._order) {
    resp.status(404).json({ message: 'missing params' });
    return;
  }
  try {
    const searchparams = req.query.q;
    const limit = req.query._limit;
    const page = req.query._page;
    const sort = req.query._sort;
    const order = req.query._order;

    const result = await dbLib.searchKeyword(
      searchparams,
      parseInt(limit, 10),
      parseInt(page, 10),
      sort,
      order,
    );
    const num = await dbLib.searchKeywordNum(
      searchparams,
      parseInt(limit, 10),
      parseInt(page, 10),
      sort,
      order,
    );
    if (result && num) {
      resp.status(201).json({ result, num });
    } else {
      resp.status(401).json({ message: 'uh oh, please try again' });
    }
  } catch (err) {
    resp.status(400).json({ message: 'There was an error' });
  }
});

webapp.get('/searchCategory', async (req, resp) => {
  if (!req.query.categories_like || !req.query._limit || !req.query._page
    || !req.query._sort || !req.query._order) {
    resp.status(404).json({ message: 'missing params' });
    return;
  }
  try {
    const { categories_like } = req.query;
    const limit = req.query._limit;
    const page = req.query._page;
    const sort = req.query._sort;
    const order = req.query._order;
    /// /console.log(limit);
    const result = await dbLib.searchCategory(
      categories_like,
      parseInt(limit, 10),
      parseInt(page, 10),
      sort,
      order,
    );
    const num = await dbLib.searchCategoryNum(
      categories_like,
      parseInt(limit, 10),
      parseInt(page, 10),
      sort,
      order,
    );
    if (result && num) {
      resp.status(201).json({ result, num });
    } else {
      resp.status(401).json({ message: 'uh oh, please try again' });
    }
  } catch (err) {
    // console.log(err);
    resp.status(400).json({ message: 'There was an error' });
  }
});

webapp.get('/getItemByID', async (req, resp) => {
  /// /console.log('in here');
  if (!req.query.id) {
    resp.status(404).json({ message: 'missing params' });
    return;
  }
  try {
    const { id } = req.query;
    /// /console.log(id);
    const result = await dbLib.getItemByID(parseInt(id, 10));
    if (result) {
      resp.status(201).json({ result });
    } else {
      resp.status(401).json({ message: 'uh oh, please try again' });
    }
  } catch (err) {
    // console.log(err);
    resp.status(400).json({ message: 'There was an error' });
  }
});

webapp.get('/getNicknamesByID', async (req, resp) => {
  if (!req.query.id) {
    resp.status(404).json({ message: 'missing params' });
    return;
  }
  try {
    const { id } = req.query;

    const result = await dbLib.getNicknamesByID(parseInt(id, 10));
    if (result) {
      resp.status(201).json({ result });
    } else {
      resp.status(401).json({ message: 'uh oh, please try again' });
    }
  } catch (err) {
    // console.log(err);
    resp.status(400).json({ message: 'There was an error' });
  }
});

webapp.get('/frequentlyOrdered', async (req, resp) => {
  if (!req.query._limit || !req.query._page || !req.query._sort || !req.query._order) {
    resp.status(404).json({ message: 'missing params' });
    return;
  }
  try {
    const limit = req.query._limit;
    const page = req.query._page;
    const sort = req.query._sort;
    const order = req.query._order;
    const result = await dbLib.getFrequentlyOrderedPage(
      parseInt(limit, 10),
      parseInt(page, 10),
      parseInt(sort, 10),
      parseInt(order, 10),
    );
    if (result) {
      resp.status(201).json({ result });
    } else {
      resp.status(401).json({ message: 'uh oh, please try again' });
    }
  } catch (err) {
    resp.status(400).json({ message: 'There was an error' });
  }
});

webapp.post('/nicknames', async (req, resp) => {
  if (!req.body.id || !req.body.nicknames) {
    resp.status(404).json({ message: 'missing params' });
    return;
  }
  try {
    const result = await dbLib.editNicknames(parseInt(req.body.id, 10), req.body.nicknames);
    if (result) {
      resp.status(201).json({ data: { id: result } });
    } else {
      resp.status(401).json({ message: 'uh oh, please try again' });
    }
  } catch (err) {
    resp.status(400).json({ message: 'There was an error' });
  }
});

webapp.get('/getcartitemsbyuserid', async (req, resp) => {
  if (!req.query.id) {
    resp.status(404).json({ message: 'missing params' });
    return;
  }
  try {
    const { id } = req.query;

    const result = await dbLib.getCartsByID(id);
    
    if (result) {
      resp.status(201).json({ result });
      console.log(result);
    } else {
      resp.status(401).json({ message: 'uh oh, please try again' });
    }
  } catch (err) {
    // console.log(err);
    resp.status(400).json({ message: 'There was an error' });
  }
});

webapp.post('/addcartitem', async (req, resp) => {
  // console.log('trying to update cart rn');
  if (!req.body.userid || !req.body.id || !req.body.name
     || !req.body.image || !req.body.description || !req.body.categories) {
    resp.status(404).json({ message: 'missing params' });
    return;
  }
  try {
    const result = await dbLib.addCartItem(
      parseInt(req.body.userid, 10),
      parseInt(req.body.id, 10),
      req.body.name,
      req.body.image,
      req.body.description,
      req.body.categories,
    );

    if (result) {
      resp.status(201).json();
    } else {
      resp.status(401).json({ message: 'Incorrect password' });
    }
  } catch (err) {
    resp.status(400).json({ message: 'uh oh, please try again' });
  }
});

webapp.post('/removecartitem', async (req, resp) => {
  if (!req.body.userid || !req.body.id) {
    resp.status(404).json({ message: 'missing params' });
    return;
  }
  try {
    // console.log('oooooo');
    const result = await dbLib.removeCartItem(
      parseInt(req.body.userid, 10),
      parseInt(req.body.id, 10),
    );
    if (result) {
      resp.status(201).json({ data: { id: result } });
    } else {
      resp.status(401).json({ message: 'uh oh, please try again' });
    }
  } catch (err) {
    resp.status(400).json({ message: 'There was an error' });
  }
});

webapp.post('/updatequantity', async (req, resp) => {
  // console.log('trying to update quantity rn');
  if (!req.body.id || !req.body.userid || !req.body.quantity) {
    resp.status(404).json({ message: 'missing params' });
    return;
  }
  try {
    const result = await dbLib.updateQuantity(
      parseInt(req.body.userid, 10),
      parseInt(req.body.id, 10),
      parseInt(req.body.quantity, 10),
    );
    if (result) {
      resp.status(201).json({ data: { id: result } });
    } else {
      resp.status(401).json({ message: 'uh oh, please try again' });
    }
  } catch (err) {
    resp.status(400).json({ message: 'There was an error' });
  }
});

// ----------- END OF GROUP 2 THINGS ------------

// ----------- GROUP 3 THINGS ------------

webapp.get('/notifications', async (req, res) => {
  const { id } = req.query;
  try {
    const result = await dbLib.getNotifications(id);
    if (result) {
      res.status(201).json({ result });
    } else {
      res.status(401).json({ message: 'There was an error' });
    }
  } catch (err) {
    res.status(400).json({ message: 'There was an error' });
  }
});

webapp.get('/items', async (req, res) => {
  try {
    const result = await dbLib.getItems();
    if (result) {
      res.status(201).json({ result });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'There was an error' });
  }
});

webapp.get('/api/pastOrders', async (req, res) => {
  const nurseID = req.query.user_id;
  const storeroomID = req.query.storeroom_manager_id;
  if (!nurseID && !storeroomID) {
    res.status(404).json({ message: 'Missing params' });
    return;
  }
  const db_function = nurseID ? dbLib.getNursePastOrders : dbLib.getStoreroomPastOrders;
  const user_id = nurseID || storeroomID;

  try {
    const result = await db_function(user_id);
    if (result) {
      res.status(201).json({ result });
    } else {
      res.status(401).json({ message: 'There was an error' });
    }
  } catch (err) {
    // console.log(err);
    res.status(400).json({ message: 'There was an error' });
  }
});

webapp.get('/api/currentOrders/:orderId?', async (req, res) => {
  const { orderId } = req.params;
  const { storeroom_manager_id } = req.query;
  const nurseID = req.query.user_id;

  if (!nurseID && !storeroom_manager_id && !orderId) {
    res.status(404).json({ message: 'Missing params' });
    return;
  }
  let db_function;
  let user_id;

  if (nurseID) {
    db_function = dbLib.getNurseCurrentOrders;
    user_id = nurseID;
  } else if (storeroom_manager_id) {
    db_function = dbLib.getStoreroomCurrentOrders;
    user_id = storeroom_manager_id;
  } else {
    db_function = dbLib.getCurrentOrdersByID;
    user_id = orderId;
  }
  console.log("working");
  try {
    const result = await db_function(user_id);
    if (result) {
      res.status(201).json({ result });
      console.log(result);
    } else {
      res.status(401).json({ message: 'There was an error' });
    }
  } catch (err) {
    // console.log(err);
    res.status(400).json({ message: err });
  }
});

webapp.delete('/api/currentOrders/:orderId', async (req, res) => {
  const { orderId } = req.params;
  if (!orderId) {
    res.status(404).json({ message: 'Missing params' });
    return;
  }

  try {
    const result = await dbLib.deleteCurrentOrder(orderId);
    if (result) {
      res.status(201).json({ result });
    } else {
      res.status(401).json({ message: 'There was an error' });
    }
  } catch (err) {
    // console.log(err);
    res.status(400).json({ message: 'There was an error' });
  }
});

webapp.post('/currentOrders', async (req, res) => {
  const { id } = req.body;
  const { date } = req.body;
  const { storeroom_manager_id } = req.body;
  const { price } = req.body;
  const { count } = req.body;
  const itemId = req.body.itemID;
  const { user_id } = req.body;
  const { orderer } = req.body;
  const { orderLocation } = req.body;
  const { status } = req.body;
  const { statusMessage } = req.body;

  if (!id || !storeroom_manager_id || !price || !count || !itemId
     || !user_id || !orderer || !orderLocation || !status || !statusMessage || !date) {
    res.status(404).json({ message: 'Missing params' });
    return;
  }

  const newCurrentOrder = {
    _id: new ObjectId(id),
    storeroom_manager_id,
    price,
    count,
    date,
    itemID: itemId,
    user_id,
    orderer,
    orderLocation,
    status,
    statusMessage,
  };

  try {
    const result = await dbLib.postCurrentOrder(newCurrentOrder);
    if (result) {
      res.status(201).json({ result });
    } else {
      res.status(401).json({ message: 'There was an error' });
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

webapp.get('/api/incomingOrders/:orderId?', async (req, res) => {
  const { orderId } = req.params;
  try {
    const result = await dbLib.getIncomingOrders(orderId);
    if (result) {
      res.status(201).json({ result });
    } else {
      res.status(401).json({ message: 'There was an error retrieving incoming orders' });
    }
  } catch (err) {
    // console.log(err);
    res.status(400).json({ message: err });
  }
});

webapp.delete('/api/incomingOrders/:orderId', async (req, res) => {
  const { orderId } = req.params;
  if (!orderId) {
    res.status(404).json({ message: 'Missing params' });
    return;
  }

  try {
    const result = await dbLib.deleteIncomingOrder(orderId);
    if (result) {
      res.status(201).json({ result });
    } else {
      res.status(401).json({ message: 'There was an error deleting incoming order' });
    }
  } catch (err) {
    // console.log(err);
    res.status(400).json({ message: err });
  }
});

webapp.get('/onHoldOrders/:orderId?', async (req, res) => {
  const order_id = req.params.orderId;
  try {
    const result = await dbLib.getOnHoldOrders(order_id);
    if (result) {
      res.status(201).json({ result });
    } else {
      res.status(401).json({ message: 'There was an error retrieving on hold orders' });
    }
  } catch (err) {
    // console.log(err);
    res.status(400).json({ message: err });
  }
});

webapp.delete('/onHoldOrders/:orderId', async (req, res) => {
  const { orderId } = req.params;
  if (!orderId) {
    res.status(404).json({ message: 'Missing params' });
    return;
  }

  try {
    const result = await dbLib.deleteOnHoldOrder(orderId);
    if (result) {
      res.status(201).json({ result });
    } else {
      res.status(401).json({ message: 'There was an error deleting incoming order' });
    }
  } catch (err) {
    // console.log(err);
    res.status(400).json({ message: err });
  }
});

webapp.post('/onHoldOrders', async (req, res) => {
  const { id } = req.body;
  const { price } = req.body;
  const { count } = req.body;
  const itemId = req.body.itemID;
  const { user_id } = req.body;
  const { orderer } = req.body;
  const { orderLocation } = req.body;
  const { date } = req.body;
  const { reason } = req.body;

  if (!id || !price || !count || !itemId || !user_id || !orderer
     || !orderLocation || !date || !reason) {
    res.status(404).json({ message: 'Missing params' });
    return;
  }

  const newOnHoldOrder = {
    _id: new ObjectId(id),
    price,
    count,
    itemID: itemId,
    user_id,
    orderer,
    orderLocation,
    date,
    reason,
  };

  try {
    const result = await dbLib.postOnHoldOrder(newOnHoldOrder);
    if (result) {
      res.status(201).json({ result });
    } else {
      res.status(401).json({ message: 'There was an error in adding a new on hold order' });
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

webapp.get('/orderChatMessages', async (req, res) => {
  const orderID = req.query.orderId;

  if (!orderID) {
    res.status(404).json({ message: 'Missing params' });
    return;
  }

  try {
    const result = await dbLib.getOrderChatMessages(orderID);
    if (result) {
      res.status(201).json({ result });
    } else {
      res.status(401).json({ message: 'There was an error retrieving order chat messages' });
    }
  } catch (err) {
    res.status(401).json({ message: err });
  }
});

webapp.post('/orderChatMessages', async (req, res) => {
  const newMessageOrderID = req.body.orderId;
  const newMessage = req.body.message;
  const newMessageSenderID = req.body.sender;

  if (!newMessageOrderID || !newMessage || !toString(newMessageSenderID)) {
    res.status(404).json({ message: 'Missing params' });
    return;
  }

  try {
    const result = await dbLib.postOrderChatMessage(
      newMessageOrderID,
      newMessageSenderID,
      newMessage,
    );
    if (result) {
      res.status(201).json({ result });
    } else {
      res.status(401).json({ message: 'There was an error sending order chat message' });
    }
  } catch (err) {
    res.status(401).json({ message: err });
  }
});

webapp.post('/api/pastOrders', async (req, res) => {
  const { id } = req.body;
  const { price } = req.body;
  const { count } = req.body;
  const itemId = req.body.itemID;
  const { storeroom_manager_id } = req.body;
  const { orderer } = req.body;
  const { orderLocation } = req.body;
  const { date } = req.body;
  const { user_id } = req.body;
  const { statusMessage } = req.body;

  const newPastOrder = {
    _id: id,
    storeroom_manager_id,
    price,
    count,
    itemID: itemId,
    orderer,
    orderLocation,
    user_id,
    date,
    statusMessage,
  };

  if (!id || !storeroom_manager_id || !price || !count || !itemId || !user_id
     || !orderer || !orderLocation || !date || !statusMessage) {
    res.status(404).json({ message: 'Missing params' });
    return;
  }

  try {
    const result = await dbLib.postPastOrder(newPastOrder);
    if (result) {
      res.status(201).json({ result });
    } else {
      res.status(401).json({ message: 'There was an error' });
    }
  } catch {
    res.status(400).json({ message: 'There was an error' });
  }
});

webapp.patch('/api/currentOrders/:orderId', async (req, res) => {
  const { orderId } = req.params;
  const newStatus = req.body.status;
  const newStatusMessage = req.body.statusMessage;

  if (!orderId || !newStatus || !newStatusMessage) {
    res.status(404).json({ message: 'Missing params' });
    return;
  }

  try {
    const result = await dbLib.patchCurrentOrders(orderId, newStatusMessage, newStatus);
    if (result) {
      res.status(201).json({ result });
    } else {
      res.status(401).json({ message: 'There was an error updating current orders' });
    }
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

webapp.post('/addNotification', async (req, res) => {
  const { itemid } = req.body;
  const time = new Date();
  const { message } = req.body;
  const { status } = req.body;
  const { currUser } = req.body;
  const { orderid } = req.body;

  const newNotification = {
    itemID: parseInt(itemid, 10),
    time: time.toISOString(),
    status,
    userID: currUser,
    updateMessage: message,
  };
  console.log(newNotification);

  try {
    dbLib.addNotification(newNotification, orderid);
    res.status(201).json({ message: 'Notification added' });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
});

webapp.delete('/deleteNotification', async (req, res) => {
  const { message } = req.query;
  const { time } = req.query;
  console.log(message);
  console.log(time);

  try {
    dbLib.deleteNotification({ message, time });
    res.status(201).json({ message: 'Notification deleted' });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

webapp.post('/updateNotification', async (req, res) => {
  const { notifID } = req.body;
  const newMessage = req.body.message;
  const newStatus = req.body.status;

  try {
    dbLib.updateNotification(notifID, newStatus, newMessage);
    res.status(201).json({ message: 'Notification updated' });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

webapp.post('/chatNotification', async (req, res) => {
  const { orderid } = req.body;
  const { userid } = req.body;
  const { message } = req.body;
  const time = new Date();

  try {
    const receiverID = await dbLib.findReceiverChat(orderid, userid);
    if (!receiverID) {
      res.status(404).json({ message: 'Could not find matching order' });
      return;
    }
    const response = await dbLib.getNotificationByOrderID(orderid);
    const itemid = response[0].itemID;
    const currstatus = response[0].status;

    const newNotification = {
      updateMessage: message,
      itemID: itemid,
      status: currstatus,
      userID: receiverID,
      time: time.toISOString(),
    };

    await dbLib.createChatNotification(newNotification, orderid);
    return res.status(201).json({ message: 'Chat message successfully sent' });
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

// Group 4
webapp.get('/getCurrentUser', utility.getCurrentUser);
webapp.get('/getInventory', analytics.getInventory);
webapp.get('/getSupplies', analytics.getSupplies);
webapp.get('/getSupply', analytics.getSupply);
webapp.get('/getCategories', analytics.getCategories);
webapp.post('/checkoutOrder', checkout.checkoutOrder);

// add wildcard endpoint – serve react files
webapp.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/web/build/index.html'));
});


module.exports = webapp;
