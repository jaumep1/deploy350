/* eslint-disable react/jsx-filename-extension */
/**
 * @jest-environment jsdom
 */

/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Checkout from '../components/Checkout';
import { getCartItems } from '../fetcher';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock('../fetcher', () => ({
  getCartItems: jest.fn(),
}));

test('renders cart items fetched from server', async () => {
  const cartItems = [
    { id: 1, name: 'Item 1', price: 10 },
    { id: 2, name: 'Item 2', price: 20 },
  ];

  getCartItems.mockResolvedValue(cartItems);

  render(<Checkout />);

  await screen.findByText('Item 1');

  const item1 = screen.getByText('Item 1');
  const item2 = screen.getByText('Item 2');
  expect(item1).toBeInTheDocument();
  expect(item2).toBeInTheDocument();
});

test('renders cart items empty fetched from server', async () => {
  const cartItems = [];
  getCartItems.mockResolvedValue(cartItems);

  render(<Checkout />);
});

test('renders Checkout overall page', () => {
  render(<Checkout />);
  const linkElement = screen.getByText(/Checkout/);
  expect(linkElement).toBeInTheDocument();
});

test('renders Personal Details card', () => {
  render(<Checkout />);
  const linkElement = screen.getByText(/Personal Details/);
  expect(linkElement).toBeInTheDocument();
});
test('renders Room Details card', () => {
  render(<Checkout />);
  const linkElement = screen.getByText(/Room Details/);
  expect(linkElement).toBeInTheDocument();
});

jest.mock('../fetcher', () => ({
  getCartItems: jest.fn(),
}));

test('renders cart items fetched from server 2', async () => {
  const cartItems = [
    { id: 1, name: 'Item 1', price: 10 },
    { id: 2, name: 'Item 2', price: 20 },
  ];

  // Mock the getCartItems function to return the cart items
  getCartItems.mockResolvedValue(cartItems);

  render(<Checkout />);

  // Wait for the useEffect hook to finish fetching the cart items
  await screen.findByText('Item 1');

  // Assert that the cart items are rendered correctly
  const item1 = screen.getByText('Item 1');
  const item2 = screen.getByText('Item 2');
  expect(item1).toBeInTheDocument();
  expect(item2).toBeInTheDocument();
});
