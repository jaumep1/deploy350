import axios from 'axios';

const { rootURL, serverPort } = require('../utils/utils');
/**
 * This module contains HTTP calls to the backend
 */

/**
 * Post signup details
 */
const postSignup = async (username, password, role, name) => {
  try {
    const payload = {
      username,
      password,
      role,
      name,
    };
    const response = await axios.post(`${rootURL}/api/signup`, payload);
    return response;
  } catch (err) {
    return { err: err.message };
  }
};

export default postSignup;
