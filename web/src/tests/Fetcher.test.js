/**
 * @jest-environment jsdom
 */

/* eslint-disable no-undef */
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  getSearchResultSuggestions,
  getSearchResults,
  getNicknamesByID,
  getSearchByCategoryResults,
  editNicknamesByID,
  getCartItems,
  getFrequentlyOrdered,
  getItemByID,
  getCartItemByID,
} from '../fetcher';

// This sets the mock adapter on the default axios instance
const mockAxios = new MockAdapter(axios);

describe('the api returns items in alphabetical order by name', () => {
  // seed data for all get requests. You can specify an endpoint to mock
  mockAxios.onGet().reply(200, [{
    categories: ['ER'],
    description: 'typicode',
    _id: 198412,
    image: 'typicode',
    name: 'A Box of Sharp Needles 40 pack',
  }, {
    categories: ['ER'],
    description: 'typicode',
    _id: 118462,
    image: 'typicode',
    name: 'Box of Sharp Needles 40 pack',
  }, {
    categories: ['Cardiology'],
    description: 'typicode',
    _id: 198462,
    image: 'typicode',
    name: 'heart medecine',
  }]);
  mockAxios.onGet('http://localhost:8080/cartitems/').reply(200, [
    {
      id: 182645,
      name: 'Box of Needles 20 pack',
      image: 'https://pointatech.com/wp-content/uploads/2022/02/71DEhbJBTiL._AC_SL1500_.jpg',
      description: 'A box of needles is just a box of needles.',
      categories: [
        'Ford',
        'BMW',
        'Fiat',
      ],
      quantity: 5,
    },
    {
      id: 198462,
      name: 'Box of Sharp Needles 40 pack',
      image: 'https://pointatech.com/wp-content/uploads/2022/02/71DEhbJBTiL._AC_SL1500_.jpg',
      description: 'typicode',
      categories: [],
      quantity: 1,
    }]);

  mockAxios.onPatch('http://localhost:8080/cartitem/198462').reply(
    200,
    {
      id: 198462,
      name: 'Box of Sharp Needles 40 pack',
      image: 'https://pointatech.com/wp-content/uploads/2022/02/71DEhbJBTiL._AC_SL1500_.jpg',
      description: 'typicode',
      categories: [],
      quantity: 2,
    },
  );
});

test('search result suggestions (async/await)', async () => {
  const data = await getSearchResultSuggestions('Box of Sharp Needles 40 pack');
  console.log(data);
  expect(data[1].name).toBe('Box of Sharp Needles 40 pack');
  expect(data.length).toBe(3);
});

test('alphabetical search (async/await)', async () => {
  const data = await getSearchResults(198462, 'A-Z', 1);
  console.log(data);
  expect(data.data[0].name).toBe('A Box of Sharp Needles 40 pack');
});

test('reverse alphabetical search (async/await)', async () => {
  const data = await getSearchResults(198462, 'Z-A', 1);
  console.log(data);
  expect(data.data[2].name).toBe('heart medecine');
});

test('alphabetical search by category (async/await)', async () => {
  const data = await getSearchByCategoryResults('ER', 'A-Z', 1);
  console.log(data);
  expect(data.data[0].name).toBe('A Box of Sharp Needles 40 pack');
  expect(data.data[1].name).toBe('Box of Sharp Needles 40 pack');
});

test('reverse alphabetical search by category (async/await)', async () => {
  const data = await getSearchByCategoryResults('ER', 'Z-A', 1);
  console.log(data);
  expect(data.data[0].name).toBe('A Box of Sharp Needles 40 pack');
  expect(data.data[1].name).toBe('Box of Sharp Needles 40 pack');
});

test('nickname by id (async/await)', async () => {
  const data = await getNicknamesByID(198412);
  expect(data[1].name).toBe('Box of Sharp Needles 40 pack');
});

test('get item by id (async/await)', async () => {
  const data = await getItemByID(198412);
  expect(data[1].name).toBe('Box of Sharp Needles 40 pack');
});

test('edit nickname by id without previous nicknames (async/await)', async () => {
  const expectedError = undefined;
  axios.post = jest.fn().mockRejectedValue(expectedError);
  const data = await editNicknamesByID(198412, 'sharp bois');
  expect(data).toEqual(expectedError);
});

test('get frequently ordered', async () => {
  const data = await getFrequentlyOrdered();
  expect(data.length).toBe(3);
});

test('getting items from the cart', async () => {
  const data = await getCartItems();
  expect(data.length).toBe(3);
});

test('get cart item by id (async/await)', async () => {
  const data = await getCartItemByID(198412);
  console.log(data);
  expect(data.data[1].name).toBe('Box of Sharp Needles 40 pack');
});
