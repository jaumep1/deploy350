/* eslint-disable no-console */
import axios from 'axios';

const { rootURL } = require('../utils/utils');

/**
 * Get the inventory from the database
 */
export const getInventory = async () => {
  try {
    console.log()
    const response = await axios.get(`${rootURL}/getInventory`);
    return response.data;
  } catch (error) {
    console.error('error', error.message);
    return error;
  }
};

/**
 * Gets a singular supply
 */
export const getSupply = async (name) => {
  try {
    const response = await axios.get(`${rootURL}/getSupply/?name=${name}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

/**
 * Gets a list of all supplies
 */
export const getAllSupplies = async () => {
  try {
    const response = await axios.get(`${rootURL}/getSupplies/`);
    return response.data;
  } catch (error) {
    return error;
  }
};

/**
 * Gets the categories
 */
export const getCategories = async () => {
  try {
    console.log("hello")
    const response = await axios.get(`${rootURL}/getCategories`);
    return response.data;
  } catch (error) {
    return error;
  }
};
