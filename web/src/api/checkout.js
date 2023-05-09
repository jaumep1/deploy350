/* eslint-disable no-console */
import axios from 'axios';

const { rootURL } = require('../utils/utils');

/**
 * checkout the cart
 */
const checkoutOrder = async (cart) => {
  try {
    // THIS WILL WORK WHEN LOGIN GETS CONNECTED WITH THE DATABASE AND EXPRESS SESSION
    // const currUser = await axios.get(`${rootURL}:3001/getCurrentUser`);
    // const { data } = currUser

    const data = {
      _id: '5f9f1b9b9c9d440000a1b0a1',
      name: 'John Doe',
      userid: localStorage.getItem('userid'),
    };

    const response = await axios.post(`${rootURL}/checkoutOrder`, { cart, data });
    return response.data;
  } catch (error) {
    console.error('error', error.message);
    return error;
  }
};

export default checkoutOrder;
