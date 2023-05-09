import axios from 'axios';

const { rootURL, serverPort } = require('../utils/utils');
/**
 * This module contains HTTP calls to the backend
 */

/**
 * Post login details
 */
export const postLogin = async (username, password) => {
  try {
    const payload = {
      username,
      password,
    };
    const response = await axios.post(`${rootURL}/api/login`, payload);
    return response;
  } catch (err) {
    return { err: err.message };
  }
};

/**
 * Get user setttings
 */
export const getUserSettings = async (userid) => {
  try {
    const response = await axios.get(`${rootURL}/user/${userid}`);
    return response.data;
  } catch (err) {
    return { err: err.message };
  }
};

/**
 * Put updated user setttings
 */
export const putUserSettings = async (userid, payload) => {
  try {
    const response = await axios.put(`${rootURL}/user/${userid}`, payload);
    return response;
  } catch (err) {
    return { err: err.message };
  }
};

/**
 * Gets the current logged in user
 */
export const getCurrentUser = async () => {
  try {
    const response = await axios.get(`${rootURL}/getCurrentUser`);
    return response;
  } catch (err) {
    return err;
  }
};
