/* eslint-disable quote-props */
/* eslint-disable quotes */
/* eslint-disable no-underscore-dangle */
const { getDB } = require('../database');

const checkoutOrder = async (cart, userInfo) => {
  try {
    // For now, we assign random prices, storeroom_manager_id
    const db = await getDB();
    const user = await db.collection('UserSettings').findOne({ userid: userInfo.userid });
    const insertItems = cart.map((item) => ({
      storeroom_manager_id: Math.floor(Math.random() * 1000000),
      price: Math.floor(Math.random() * 100),
      count: item.quantity,
      date: new Date().toDateString(),
      itemID: item.id,
      user_id: user.userid,
      orderer: user.name,
      orderLocation: user.defaultDeliveryLocation,
      status: 'Order Processing',
      statusMessage: 'Reverting.',
    }));

    const result = await db.collection('IncomingOrders').insertMany(insertItems);

    cart.forEach(async (item) => {
      const itemId = item.id;
      const { quantity } = item;
      await db.collection('AllItems').updateOne({ _id: itemId }, { "$inc": { freq: quantity } });
    });

    await db.collection('Carts').updateOne({ _id: Number(user.userid) }, { "$set": { "cart": [] } });
    return result;
  } catch (err) {
    return err;
  }
};

const database = {
  checkoutOrder,
};

module.exports = database;
