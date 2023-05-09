import axios from 'axios';

const { rootURL } = require('../utils/utils');

// getItems
const getItems = async () => {
  try {
    const res = await axios.get(`${rootURL}/items`);
    return JSON.parse(res.data.result);
  } catch (error) {
    return error;
  }
};
// getPastOrders (storeroom & nurse)
const getNursePastOrders = async (userId) => {
  try {
    const res = await axios.get(`${rootURL}/api/pastOrders?user_id=`.concat(userId));
    return JSON.parse(res.data.result);
  } catch (error) {
    return error;
  }
};
const getStoreroomPastOrders = async (storeroomManagerId) => {
  try {
    const res = await axios.get(`${rootURL}/api/pastOrders?storeroom_manager_id=`.concat(storeroomManagerId));
    return JSON.parse(res.data.result);
  } catch (error) {
    return error;
  }
};
// getCurrentOrders (storeroom & nurse)
const getNurseCurrentOrders = async (userId) => {
  try {
    const res = await axios.get(`${rootURL}/api/currentOrders?user_id=`.concat(userId));
    return JSON.parse(res.data.result);
  } catch (error) {
    return error;
  }
};
const getStoreroomCurrentOrders = async (storeroomManagerId) => {
  try {
    const res = await axios.get(`${rootURL}/api/currentOrders?storeroom_manager_id=`.concat(storeroomManagerId));
    return JSON.parse(res.data.result);
  } catch (error) {
    return error;
  }
};
// getIncomingOrders
const getIncomingOrders = async () => {
  try {
    const res = await axios.get(`${rootURL}/api/incomingOrders/`);
    return JSON.parse(res.data.result);
  } catch (error) {
    return error;
  }
};
// getOnHoldOrders
const getOnHoldOrders = async () => {
  try {
    const res = await axios.get(`${rootURL}/onHoldOrders/`);
    return JSON.parse(res.data.result);
  } catch (error) {
    return error;
  }
};
// getChatMessages
const getOrderChatMessages = async (orderId) => {
  try {
    const res = await axios.get(`${rootURL}/orderChatMessages?orderId=`.concat(orderId));
    return JSON.parse(res.data.result);
  } catch (error) {
    return error;
  }
};
// postNewChatMessage
const postNewChatMessage = async (orderId, message, user) => {
  try {
    const res = await axios.post(`${rootURL}/orderChatMessages/`, {
      orderId,
      message,
      sender: user,
    });

    const currentUser = localStorage.getItem('userid');

    // Chat Notif Logic
    await axios.post(`${rootURL}/chatNotification`, {
      orderid: orderId,
      userid: currentUser,
      message,
    });

    return JSON.parse(res.data.result);
  } catch (error) {
    return error;
  }
};
// Accept Incoming Order
const acceptIncomingOrder = async (orderId, storeroomManagerId) => {
  try {
    const info = await axios.get(`${rootURL}/api/incomingOrders/`.concat(orderId));
    const incomingOrder = JSON.parse(info.data.result)[0];

    let res = await axios.delete(`${rootURL}/api/incomingOrders/`.concat(orderId));

    res = await axios.post(`${rootURL}/api/currentOrders/`, {
      id: orderId,
      date: incomingOrder.date,
      storeroom_manager_id: storeroomManagerId,
      price: incomingOrder.price,
      count: incomingOrder.count,
      itemID: incomingOrder.itemID,
      user_id: incomingOrder.user_id,
      orderer: incomingOrder.orderer,
      orderLocation: incomingOrder.orderLocation,
      status: 'Order Received',
      statusMessage: 'The storeroom manager has received your order.',
    });

    // Notif logic
    await axios.post(`${rootURL}/addNotification/`, {
      orderid: orderId,
      itemid: incomingOrder.itemID,
      message: 'Your order has been accepted by the storeroom manager.',
      status: '0',
      currUser: incomingOrder.user_id,
    });
    return JSON.parse(res.data.result);
  } catch (error) {
    return error;
  }
};
// Accept On Hold Order
const acceptOnHoldOrder = async (orderId, storeroomManagerId) => {
  try {
    const info = await axios.get(`${rootURL}/onHoldOrders/`.concat(orderId));
    const onHoldOrder = JSON.parse(info.data.result)[0];
    let res = await axios.delete(`${rootURL}/onHoldOrders/`.concat(orderId));

    res = await axios.post(`${rootURL}/api/currentOrders/`, {
      id: orderId,
      date: onHoldOrder.date,
      storeroom_manager_id: storeroomManagerId,
      price: onHoldOrder.price,
      count: onHoldOrder.count,
      itemID: onHoldOrder.itemID,
      user_id: onHoldOrder.user_id,
      orderer: onHoldOrder.orderer,
      orderLocation: onHoldOrder.orderLocation,
      status: 'Order Received',
      statusMessage: 'The storeroom manager has received your order.',
    });
    // Creating a notification for the user
    await axios.post(`${rootURL}/addNotification/`, {
      orderid: orderId,
      itemid: onHoldOrder.itemID,
      message: 'The storeroom manager has received your order.',
      status: '0',
      currUser: onHoldOrder.user_id,
    });

    return JSON.parse(res.data.result);
  } catch (error) {
    return error;
  }
};
// Put Incoming Order On Hold
const placeIncomingOrderOnHold = async (orderId, reason) => {
  try {
    const incomingOrder = await axios.get(`${rootURL}/api/incomingOrders/`.concat(orderId));
    let res = await axios.delete(`${rootURL}/api/incomingOrders/`.concat(orderId));

    const info = JSON.parse(incomingOrder.data.result)[0];
    console.log(info);

    res = await axios.post(`${rootURL}/onHoldOrders/`, {
      id: orderId,
      price: info.price,
      count: info.count,
      itemID: info.itemID,
      user_id: info.user_id,
      orderer: info.orderer,
      orderLocation: info.orderLocation,
      date: info.date,
      reason,
    });
    return JSON.parse(res.data.result);
  } catch (error) {
    return error;
  }
};
// Cancel Current Order
const cancelCurrentOrder = async (orderId) => {
  try {
    const res = await axios.delete(`${rootURL}/api/currentOrders/`.concat(orderId));
    return JSON.parse(res.data.result);
  } catch (error) {
    return error;
  }
};
// Update Current Order Status
const updateCurrentOrderStatus = async (orderId, status, statusMessage) => {
  try {
    if (status === 'Delivered') {
      const currentOrder = await axios.get(`${rootURL}/api/currentOrders/`.concat(orderId));
      let res = await axios.delete(`${rootURL}/api/currentOrders/`.concat(orderId));

      const info = JSON.parse(currentOrder.data.result);

      res = await axios.post(`${rootURL}/api/pastOrders/`, {
        id: orderId,
        price: info.price,
        count: info.count,
        itemID: info.itemID,
        storeroom_manager_id: info.storeroom_manager_id,
        orderer: info.orderer,
        orderLocation: info.orderLocation,
        date: info.date,
        user_id: info.user_id,
        statusMessage,
      });

      let notifStatus = '0';
      if (status === 'Order Processing' || status === 'In Transit') {
        notifStatus = '1';
      } else if (status === 'Delivered') {
        notifStatus = '2';
      }

      await axios.post(`${rootURL}/updateNotification/`, {
        notifID: orderId,
        status: notifStatus,
        message: statusMessage,
      });
      return JSON.parse(res.data.result);
    }
    const res = await axios.patch(`${rootURL}/api/currentOrders/`.concat(orderId), {
      id: orderId,
      status,
      statusMessage,
    });

    let notifStatus = '0';
    if (status === 'Order Processing' || status === 'In Transit') {
      notifStatus = '1';
    } else if (status === 'Delivered') {
      notifStatus = '2';
    }
    await axios.post(`${rootURL}/updateNotification/`, {
      notifID: orderId,
      status: notifStatus,
      message: statusMessage,
    });

    return JSON.parse(res.data.result);
  } catch (error) {
    return error;
  }
};

// getNotifications
const getNotifications = async (userID) => {
  try {
    const res = await axios.get(`${rootURL}/notifications/?id=`.concat(userID));
    return JSON.parse(res.data.result);
  } catch (error) {
    return error;
  }
};

const deleteNotification = async (notificationObject) => {
  try {
    const queryParams = `?time=${notificationObject.date}&message=${notificationObject.message}`;
    const res = await axios.delete(`${rootURL}/deleteNotification/${queryParams}`);
    return JSON.parse(res.data.result);
  } catch (err) {
    console.log(err);
    return err;
  }
};

export {
  getItems,
  getNursePastOrders,
  getNurseCurrentOrders,
  getStoreroomPastOrders,
  getStoreroomCurrentOrders,
  getIncomingOrders,
  getOnHoldOrders,
  getOrderChatMessages,
  getNotifications,
  postNewChatMessage,
  acceptIncomingOrder,
  acceptOnHoldOrder,
  placeIncomingOrderOnHold,
  cancelCurrentOrder,
  updateCurrentOrderStatus,
  deleteNotification,
};
