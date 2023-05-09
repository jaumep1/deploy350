/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-dupe-keys */
/* eslint-disable no-unused-vars */
/**
 * @jest-environment jsdom
 */

/* eslint-disable no-undef */
import '@testing-library/jest-dom';
import axios from 'axios';
import React from 'react';
import MockAdapter from 'axios-mock-adapter';
import { fireEvent, render, screen } from '@testing-library/react';
import {
  removeCartItem, updateQuantity,
} from '../fetcher';
import CartItem from '../components/CartItem';

const mockAxios = new MockAdapter(axios);

const MOCK_CART_DATA = [
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
  }];

describe('testing the Cart', () => {
  beforeEach(() => {
    mockAxios.reset();
  });
  afterAll(() => {
    mockAxios.restore();
  });
  const removeDisplayItem = (id) => {
    const exist = allCartItems.find((x) => x.id === id);
    // console.log('remove call');
    if (exist) {
      setAllCartItems(
        allCartItems.filter((x) => x.id !== id),
      );
      removeCartItem(id).then((res) => {
        recheckInfo();
      });
      // console.log('success');
    } else {
      // console.log('failure to remove');
    }
  };

  it('renders correctly with data from API', async () => {
    // mockAxios.get.mockResolvedValue(MOCK_CART_DATA);
    const props = {
      allCartItems: MOCK_CART_DATA,
      removeDisplayItem,
    };
  });
});

test('changing quantity of item in set', async () => {
  const data = await updateQuantity(198462, 2);
  expect(data).toStrictEqual({
    id: 198462,
    name: 'Box of Sharp Needles 40 pack',
    image: 'https://pointatech.com/wp-content/uploads/2022/02/71DEhbJBTiL._AC_SL1500_.jpg',
    description: 'typicode',
    categories: [
      'ER',
      'Urinary Catheters',
      'Cardiology'],
    inCart: true,
    description: 'BD syringes feature a clear barrel with bold scale markings, tapered plunger rod for ease of aspiration, and a positive plunger rod stop. Choice of Catheter Tip or Luer-Lok™ thread for increased secure connection, both with a Tip Shield. Latex-free.',
    freq: 2,
    image: 'https://cdn.shopify.com/s/files/1/0556/3711/4961/products/BND309653_900x.jpg?v=1646993421',
    inCart: true,
    name: '60 cc Irrigation Syringe',
    quantity: 2,
  });
});

describe('cart item tests', () => {
  test('cart item renders', () => {
    render(<CartItem itemName="testItem" lawsonNumber={100} itemQuantity={200} onRemove={() => console.log()} />);
    const element = screen.getByText(/testItem/);
    const increase = screen.getByTestId('cartincrease');
    fireEvent.click(increase);
    const decrease = screen.getByTestId('cartdecrease');
    fireEvent.click(decrease);
    const remove = screen.getByTestId('cartremove');
    fireEvent.click(remove);
    expect(element).toBeInTheDocument();
  });
});
