/* eslint-disable consistent-return */
import axios from 'axios';

const { rootURL } = require('./utils/utils');

const getSearchResultSuggestions = async (searchparams) => {
  try {
    const res = await axios.get(`${rootURL}/searchsuggestions?q=`.concat(searchparams).concat('&_limit=6'));
    // console.log(res.data);
    return JSON.parse(res.data.result);
  } catch (error) {
    return error;
  }
};

const getSearchResults = async (searchparams, alignment, page) => {
  try {
    if (alignment === 'A-Z') {
      const res = await axios.get(`${rootURL}/searchItems?q=`.concat(searchparams).concat('&_sort=').concat('name').concat('&_order=asc')
        .concat('&_limit=9&_page=')
        .concat(page));
      // console.log(res);
      return { data: JSON.parse(res.data.result), num: JSON.parse(res.data.num) };
    } if (alignment === 'Z-A') {
      const res = await axios.get(`${rootURL}/searchItems?q=`.concat(searchparams).concat('&_sort=').concat('name').concat('&_order=desc')
        .concat('&_limit=9&_page=')
        .concat(page));
      //  console.log(res);
      return { data: JSON.parse(res.data.result), num: JSON.parse(res.data.num) };
    }
  } catch (error) {
    return error;
  }
};

const getSearchByCategoryResults = async (searchparams, alignment, page) => {
  try {
    if (alignment === 'A-Z') {
      const res = await axios.get(`${rootURL}/searchCategory?categories_like=`.concat(searchparams).concat('&_sort=').concat('name').concat('&_order=asc')
        .concat('&_limit=9&_page=')
        .concat(page));
      return { data: JSON.parse(res.data.result), num: JSON.parse(res.data.num) };
    }
    if (alignment === 'Z-A') {
      const res = await axios.get(`${rootURL}/searchCategory?categories_like=`.concat(searchparams).concat('&_sort=').concat('name').concat('&_order=desc')
        .concat('&_limit=9&_page=')
        .concat(page));
      return { data: JSON.parse(res.data.result), num: JSON.parse(res.data.num) };
    }
  } catch (error) {
    return error;
  }
};

const getItemByID = async (id) => {
  try {
    const res = await axios.get(`${rootURL}/getItemByID?id=`.concat(id));
    return JSON.parse(res.data.result);
  } catch (error) {
    return error;
  }
};

const getNicknamesByID = async (id) => {
  try {
    const res = await axios.get(`${rootURL}/getNicknamesByID?id=`.concat(id));
    // console.log(res.data);
    return JSON.parse(res.data.result);
  } catch (error) {
    return error;
  }
};

const getFrequentlyOrdered = async () => {
  try {
    const res = await axios.get(`${rootURL}/frequentlyOrdered?_sort=freq&_order=desc&_limit=9&_page=1`);
    return JSON.parse(res.data.result);
  } catch (error) {
    return error;
  }
};

const editNicknamesByID = async (id, nicknames) => {
  try {
    const params = {
      id,
      nicknames,
    };
    const res = await axios.post(`${rootURL}/nicknames`, params);
    if (res) {
      try {
        const res2 = await axios.get(`${rootURL}/getNicknamesByID?id=`.concat(id));
        // console.log(res.data);
        return JSON.parse(res2.data.result);
      } catch (error) {
        return error;
      }
    }
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
const getCartItems = async () => {
  try {
    const res = await axios.get(`${rootURL}/getcartitemsbyuserid?id=`.concat(localStorage.getItem('userid')));
    console.log(res.data);
    return JSON.parse(res.data.result).cart;
  } catch (error) {
    return error;
  }
};

const getCartItemByID = async (id) => {
  try {
    const res = await axios.get(`${rootURL}/cartitems/`.concat(id));
    return res;
  } catch (error) {
    return error;
  }
};

const addCartItem = async (id, name, image, description, categories) => {
  try {
    const params = {
      userid: localStorage.getItem('userid'),
      id,
      name,
      image,
      description,
      categories,

    };
    const res = await axios.post(`${rootURL}/addcartitem`, params);
    return res.data;
  } catch (error) {
    return error;
  }
};

const removeCartItem = async (id) => {
  try {
    const params = {
      userid: localStorage.getItem('userid'),
      id,
    };
    const res = await axios.post(`${rootURL}/removecartitem`, params);
    return res.data;
  } catch (error) {
    return error;
  }
};

const updateQuantity = async (id, quantity) => {
  try {
    const params = {
      userid: localStorage.getItem('userid'),
      id,
      quantity,
    };
    const res = await axios.post(`${rootURL}/updatequantity`, params);
    return res;
  } catch (error) {
    return error;
  }
};

export {
  getSearchResultSuggestions,
  getSearchResults,
  getItemByID,
  getNicknamesByID,
  editNicknamesByID,
  getSearchByCategoryResults,
  getCartItems, addCartItem,
  getCartItemByID,
  removeCartItem,
  updateQuantity,
  getFrequentlyOrdered,
};
