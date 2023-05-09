/* eslint-disable no-param-reassign */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-underscore-dangle */
const { MongoClient, ObjectId } = require('mongodb');

const dbURL = 'mongodb+srv://pickitproject:884c15bRtjh8DLAY@pickit.vbetktk.mongodb.net/PickIt?retryWrites=true&w=majority';

let MongoConnection;
const connect = async () => {
  try {
    MongoConnection = (await MongoClient.connect(
      dbURL,
      { useNewUrlParser: true, useUnifiedTopology: true },
    ));
    return MongoConnection;
  } catch (err) {
    return err;
  }
};

const getDB = async () => {
  if (!MongoConnection) {
    await connect();
  }
  return MongoConnection.db();
};

const closeMongoDBConnection = async () => {
  await MongoConnection.close();
};

const registerUser = async (newUser) => {
  const db = await getDB();
  let newId = await db.collection('Users').count();
  newId += 100;
  newUser.userid = newId.toString();
  const result = await db.collection('Users').insertOne(newUser);

  const userSettingsResult = await db.collection('UserSettings')
    .insertOne({
      userid: newId.toString(),
      name: newUser.name,
      photo: null,
      contactEmail: newUser.email,
      phoneNumber: 'Not Set',
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
    });
    //console.log(result);
  await db.collection('Carts').insertOne({
    _id: newId,
    cart: []
  });
  return { insertedId: result.insertedId, userid: newId.toString() };
};

const loginUser = async (userEmail) => {
  try {
    const db = await getDB();
    const result = await db.collection('Users').findOne({ email: userEmail });
    return JSON.stringify(result);
  } catch (err) {
    return err;
  }
};

const findUser = async (email) => {
  try {
    const db = await getDB();
    const result = await db.collection('Users').findOne({ email });
    return JSON.stringify(result);
  } catch (err) {
    return err;
  }
};

const getSettings = async (userId) => {
  try {
    const db = await getDB();
    const result = await db.collection('UserSettings').findOne({ userid: userId });
    return JSON.stringify(result);
  } catch (err) {
    return err;
  }
};
// --- Group 2 things ----

const searchSuggestions = async (searchparams, limit) => {
  try {
    const db = await getDB();
    const result = await db.collection('AllItems').find({
      $or: [{ nicknames: { $elemMatch: { $regex: searchparams } } },
        { name: { $regex: searchparams } }, { description: { $regex: searchparams } },
        { _id: { $regex: searchparams } }],
    }).limit(limit).toArray();

    return (JSON.stringify(result));
  } catch (err) {
    return err;
  }
};

const updateSettings = async (payload) => {
  try {
    const db = await getDB();
    const result = await db.collection('UserSettings').updateOne({ userid: payload.userid }, { $set: payload });
    return JSON.stringify(result);
  } catch (err) {
    return err;
  }
};
const searchKeyword = async (searchparams, limit, page, sortIput, order) => {
  try {
    const db = await getDB();
    let orderIput;
    if (order === 'asc') {
      orderIput = 1;
    } else {
      orderIput = -1;
    }
    const data = await db.collection('AllItems').find({
      $or: [{ nicknames: { $elemMatch: { $regex: searchparams } } },
        { name: { $regex: searchparams } }, { description: { $regex: searchparams } },
        { _id: { $regex: searchparams } }],
    }).sort({ name: orderIput }).skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    if (data) {
      for (let i = 0; i < data.length; i += 1) {
        const curr = await db.collection('Carts').findOne({ _id: 0, 'cart.id': data[i]._id });

        data[i].inCart = curr !== null;
      }
    }
    return (JSON.stringify(data));
  } catch (err) {
    return err;
  }
};
const searchKeywordNum = async (searchparams, limit, page, sortIput, order) => {
  try {
    const db = await getDB();
    let orderIput;
    if (order === 'asc') {
      orderIput = 1;
    } else {
      orderIput = -1;
    }
    const num = await db.collection('AllItems').find({
      $or: [{ nicknames: { $elemMatch: { $regex: searchparams } } },
        { name: { $regex: searchparams } }, { description: { $regex: searchparams } },
        { _id: { $regex: searchparams } }],
    }).sort({ name: orderIput }).count();

    return (JSON.stringify(num));
  } catch (err) {
    return err;
  }
};

const searchCategoryNum = async (searchparams, limit, page, sortIput, order) => {
  try {
    const db = await getDB();
    let orderIput;
    if (order === 'asc') {
      orderIput = 1;
    } else {
      orderIput = -1;
    }
    const num = await db.collection('AllItems').find({ categories: { $elemMatch: { $regex: searchparams } } }).sort({ name: orderIput }).count();

    return (JSON.stringify(num));
  } catch (err) {
    return err;
  }
};

const searchCategory = async (searchparams, limit, page, sortIput, order) => {
  try {
    const db = await getDB();
    let orderIput;
    if (order === 'asc') {
      orderIput = 1;
    } else {
      orderIput = -1;
    }
    const data = await db.collection('AllItems').find({ categories: { $elemMatch: { $regex: searchparams } } }).sort({ name: orderIput }).skip((page - 1) * limit)
      .limit(limit)
      .toArray();
    if (data) {
      for (let i = 0; i < data.length; i += 1) {
        const curr = await db.collection('Carts').findOne({ _id: 0, 'cart.id': data[i]._id });

        data[i].inCart = curr !== null;
      }
    }

    return (JSON.stringify(data));
  } catch (err) {
    return err;
  }
};

const getItemByID = async (id) => {
  try {
    const db = await getDB();
    const data = await db.collection('AllItems').findOne({ _id: id });

    if (data) {
      const curr = await db.collection('Carts').findOne({ _id: 0, 'cart.id': data._id });
      data.inCart = curr !== null;
    }

    return (JSON.stringify(data));
  } catch (err) {
    return err;
  }
};

const getNicknamesByID = async (id) => {
  try {
    const db = await getDB();
    const data = await db.collection('AllItems').findOne({ _id: id }, { projection: { nicknames: 1, _id: 1 } });

    return (JSON.stringify(data));
  } catch (err) {
    return err;
  }
};

const getFrequentlyOrderedPage = async (limit, page, sortIput, order) => {
  try {
    const db = await getDB();
    let orderIput;
    if (order === 'asc') {
      orderIput = 1;
    } else {
      orderIput = -1;
    }
    const data = await db.collection('AllItems').find().sort({ freq: orderIput }).skip((page - 1) * limit)
      .limit(limit)
      .toArray();
    if (data) {
      for (let i = 0; i < data.length; i += 1) {
        const curr = await db.collection('Carts').findOne({ _id: 0, 'cart.id': data[i]._id });

        data[i].inCart = curr !== null;
      }
    }

    return (JSON.stringify(data));
  } catch (err) {
    return err;
  }
};

const editNicknames = async (id, nicknames) => {
  try {
    const db = await getDB();

    const data = await db.collection('AllItems').updateOne(
      { _id: id },
      { $set: { nicknames } },
    );

    return (JSON.stringify(data));
  } catch (err) {
    return err;
  }
};

const getCartsByID = async (id) => {
  try {
    const db = await getDB();
    const data = await db.collection('Carts').findOne({ _id: parseInt(id, 10) }, { projection: { cart: 1, _id: 0 } });
    // console.log(data);

    return (JSON.stringify(data));
  } catch (err) {
    return err;
  }
};

const addCartItem = async (userid, id, name, image, description, categories) => {
  try {
    const newitem = {
      id, name, image, description, categories, quantity: 1,
    };
    const db = await getDB();
    const data = await db.collection('Carts').updateOne({ _id: userid }, { $push: { cart: newitem } });

    return (JSON.stringify(data));
  } catch (err) {
    return err;
  }
};

const removeCartItem = async (userid, itemid) => {
  try {
    const db = await getDB();
    const data = await db.collection('Carts').updateOne({ _id: userid }, { $pull: { cart: { id: itemid } } });

    return (JSON.stringify(data));
  } catch (err) {
    return err;
  }
};

const updateQuantity = async (userid, itemid, quantity) => {
  try {
    const db = await getDB();

    const data = await db.collection('Carts').updateOne(
      { _id: userid, 'cart.id': itemid },
      { $set: { 'cart.$.quantity': quantity } },
    );

    return (JSON.stringify(data));
  } catch (err) {
    return err;
  }
};
// --- End of Group 2 things ----

// -- Start of Group 3 DB calls --

const getNotifications = async (userID) => {
  try {
    const db = await getDB();
    const data = await db.collection('Notifications').find({ userID }).toArray();

    const output = await data.map(async (item) => {
      const itemData = await db.collection('AllItems').findOne({ _id: item.itemID });
      return {
        productTitle: itemData.name,
        productImage: itemData.image,
        ...item,
      };
    });

    const resolved = await Promise.all(output);
    return JSON.stringify(resolved);
  } catch (err) {
    return err;
  }
};

const getItems = async () => {
  try {
    const db = await getDB();
    const data = await db.collection('AllItems').find({}).toArray();
    return JSON.stringify(data);
  } catch (err) {
    return err;
  }
};

const getNursePastOrders = async (userID) => {
  try {
    const db = await getDB();
    const data = await db.collection('PastOrders').find({ user_id: userID }).toArray();
    return JSON.stringify(data);
  } catch (err) {
    return err;
  }
};

const getStoreroomPastOrders = async (userID) => {
  try {
    const db = await getDB();
    const data = await db.collection('PastOrders').find({ storeroom_manager_id: userID }).toArray();
    return JSON.stringify(data);
  } catch (err) {
    return err;
  }
};

const getNurseCurrentOrders = async (userID) => {
  try {
    const db = await getDB();
    const data = await db.collection('CurrentOrders').find({ user_id: userID }).toArray();
    return JSON.stringify(data);
  } catch (err) {
    return err;
  }
};

const getCurrentOrdersByID = async (orderId) => {
  try {
    const db = await getDB();
    const objectOrderId = new ObjectId(orderId);
    const data = await db.collection('CurrentOrders').findOne({ _id: objectOrderId });
    return JSON.stringify(data);
  } catch (err) {
    return err;
  }
};

const getStoreroomCurrentOrders = async (userID) => {
  try {
    const db = await getDB();
    const data = await db.collection('CurrentOrders').find({ storeroom_manager_id: userID }).toArray();
    return JSON.stringify(data);
  } catch (err) {
    return err;
  }
};

const deleteCurrentOrder = async (orderId) => {
  try {
    const db = await getDB();
    const objectOrderId = new ObjectId(orderId);
    const data = await db.collection('CurrentOrders').deleteOne({ _id: objectOrderId });
    return JSON.stringify(data);
  } catch (err) {
    return err;
  }
};

const getIncomingOrders = async (orderId) => {
  if (!orderId) {
    try {
      const db = await getDB();
      const data = await db.collection('IncomingOrders').find().toArray();
      return JSON.stringify(data);
    } catch (err) {
      return err;
    }
  } else {
    const objectOrderId = new ObjectId(orderId);
    try {
      const db = await getDB();
      const data = await db.collection('IncomingOrders').find({ _id: objectOrderId }).toArray();
      return JSON.stringify(data);
    } catch (err) {
      return err;
    }
  }
};

const deleteIncomingOrder = async (orderId) => {
  try {
    const objectOrderId = new ObjectId(orderId);
    const db = await getDB();
    const data = await db.collection('IncomingOrders').deleteOne({ _id: objectOrderId });
    return JSON.stringify(data);
  } catch (err) {
    return err;
  }
};

const getOnHoldOrders = async (orderId) => {
  if (!orderId) {
    try {
      const db = await getDB();
      const data = await db.collection('OnHoldOrders').find().toArray();
      return JSON.stringify(data);
    } catch (err) {
      return err;
    }
  } else {
    const objectOrderId = new ObjectId(orderId);
    try {
      const db = await getDB();
      const data = await db.collection('OnHoldOrders').find({ _id: objectOrderId }).toArray();
      return JSON.stringify(data);
    } catch (err) {
      return err;
    }
  }
};

const deleteOnHoldOrder = async (orderId) => {
  try {
    const objectOrderId = new ObjectId(orderId);
    const db = await getDB();
    const data = await db.collection('OnHoldOrders').deleteOne({ _id: objectOrderId });
    return JSON.stringify(data);
  } catch (err) {
    return err;
  }
};

const getOrderChatMessages = async (orderId) => {
  try {
    const db = await getDB();
    const objectOrderId = new ObjectId(orderId);
    const data = await db.collection('OrderChatMessages').find({ order_id: objectOrderId }).toArray();
    return JSON.stringify(data);
  } catch (err) {
    return err;
  }
};

const postOrderChatMessage = async (orderID, userID, message) => {
  try {
    const db = await getDB();
    const data = await db.collection('OrderChatMessages')
      .insertOne(
        {
          order_id: new ObjectId(orderID),
          sender: parseInt(userID, 10),
          message,
        },
      );
    return JSON.stringify(data);
  } catch (err) {
    return err;
  }
};

const postCurrentOrder = async (newCurrentOrder) => {
  try {
    const db = await getDB();
    const data = await db.collection('CurrentOrders').insertOne(newCurrentOrder);
    return JSON.stringify(data);
  } catch (err) {
    return err;
  }
};

const postOnHoldOrder = async (newOnHoldOrder) => {
  try {
    const db = await getDB();
    const data = await db.collection('OnHoldOrders').insertOne(newOnHoldOrder);
    return JSON.stringify(data);
  } catch (err) {
    return err;
  }
};

const postPastOrder = async (newPastOrder) => {
  try {
    const db = await getDB();
    const data = await db.collection('PastOrders').insertOne(newPastOrder);
    return JSON.stringify(data);
  } catch (err) {
    return err;
  }
};

const patchCurrentOrders = async (orderId, newStatusMessage, newStatus) => {
  try {
    const db = await getDB();
    const objectOrderId = new ObjectId(orderId);
    const data = await db.collection('CurrentOrders').updateOne(
      {
        _id: objectOrderId,
      },
      {
        $set:
        {
          statusMessage: newStatusMessage,
          status: newStatus,
        },
      },
    );
    return JSON.stringify(data);
  } catch (err) {
    return err;
  }
};

const deleteOrderChatMessage = async (orderId) => {
  try {
    const db = await getDB();
    const data = await db.collection('OrderChatMessages').deleteOne(
      {
        order_id: parseInt(orderId, 10),
      },
    );
    return JSON.stringify(data);
  } catch (err) {
    return err;
  }
};

const deletePastOrder = async (orderId) => {
  try {
    const db = await getDB();
    const data = await db.collection('PastOrders').deleteOne(
      {
        _id: parseInt(orderId, 10),
      },
    );
    return JSON.stringify(data);
  } catch (err) {
    return err;
  }
};

const addNotification = async (newNotification, orderid) => {
  try {
    const db = await getDB();
    newNotification._id = new ObjectId(orderid);
    console.log('THIS IS THE NEW NOTIFICATION', newNotification);
    const data = await db.collection('Notifications').insertOne(newNotification);
    return JSON.stringify(data);
  } catch (err) {
    console.log(err);
    return err;
  }
};

const deleteNotification = async (notificationObject) => {
  try {
    const db = await getDB();
    console.log(notificationObject);
    const data = await db.collection('Notifications').deleteOne(
      {
        updateMessage: notificationObject.message,
        time: notificationObject.time,
      },
    );
    return JSON.stringify(data);
  } catch (err) {
    console.log(err);
    return err;
  }
};

const updateNotification = async (notificationId, newStatus, newMessage) => {
  const object = new ObjectId(String(notificationId));
  try {
    const db = await getDB();
    const data = await db.collection('Notifications').updateOne(
      { _id: object },
      { $set: { status: newStatus, updateMessage: newMessage } },
    );
    return data;
  } catch (err) {
    return err;
  }
};

const getNotificationByOrderID = async (orderId) => {
  const object = new ObjectId(orderId);

  try {
    const db = await getDB();
    const data = await db.collection('Notifications').find({ _id: object }).toArray();
    console.log(data);
    return data;
  } catch (err) {
    console.log('ERROR FROM GET NOTIFICATION BY ORDER ID', err);
    return err;
  }
};

const createChatNotification = async (newNotification, orderid) => {
  try {
    const db = await getDB();
    newNotification._id = new ObjectId(`${orderid}`);
    const options = { upsert: true };
    const filter = { orderid: newNotification._id, userID: newNotification.userID };
    const update = {
      $set: {
        currentOrder: true,
        updateMessage: newNotification.updateMessage,
        itemID: newNotification.itemID,
        status: newNotification.status,
        time: newNotification.time,
        userID: newNotification.userID,
        orderid: newNotification._id,
      },
    };
    const result = await db.collection('Notifications').updateOne(filter, update, options);
    return JSON.stringify(result);
  } catch (err) {
    console.log('ERROR IN CREATING CHAT NOTIFICATION', err);
    return err;
  }
};

const findReceiverChat = async (orderid, sender) => {
  try {
    const db = await getDB();
    const data = await db.collection('CurrentOrders').findOne({ _id: new ObjectId(orderid) });
    if (!data) {
      return null;
    }
    console.log('THIS IS THE SENDER', sender);
    console.log('this is the data', data);
    if (sender === data.storeroom_manager_id) {
      return data.user_id;
    }
    return data.storeroom_manager_id;
  } catch (err) {
    console.log('ERROR FROM GET RECEIVER', err);
    return err;
  }
};
// -- End of Group 3 DB calls --

module.exports = {
  closeMongoDBConnection,
  getDB,
  connect,
  registerUser,
  loginUser,
  getSettings,
  updateSettings,
  searchSuggestions,
  searchKeyword,
  searchKeywordNum,
  searchCategory,
  searchCategoryNum,
  getItemByID,
  getNicknamesByID,
  getFrequentlyOrderedPage,
  editNicknames,
  getCartsByID,
  addCartItem,
  removeCartItem,
  updateQuantity,
  findUser,
  getNotifications,
  getItems,
  getNursePastOrders,
  getStoreroomPastOrders,
  getNurseCurrentOrders,
  getStoreroomCurrentOrders,
  deleteCurrentOrder,
  getIncomingOrders,
  deleteIncomingOrder,
  getOnHoldOrders,
  deleteOnHoldOrder,
  getOrderChatMessages,
  postOrderChatMessage,
  postCurrentOrder,
  postOnHoldOrder,
  getCurrentOrdersByID,
  postPastOrder,
  patchCurrentOrders,
  deleteOrderChatMessage,
  deletePastOrder,
  addNotification,
  deleteNotification,
  updateNotification,
  getNotificationByOrderID,
  createChatNotification,
  findReceiverChat,
};
