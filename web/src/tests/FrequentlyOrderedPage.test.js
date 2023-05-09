/* eslint-disable react/jsx-filename-extension */
/**
 * @jest-environment jsdom
 */

/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { render, screen } from '@testing-library/react';
import FrequentlyOrderedPage from '../components/FrequentlyOrderedPage';

const mockAxios = new MockAdapter(axios);

describe('the api returns items in alphabetical order by name', () => {
  // seed data for all get requests. You can specify an endpoint to mock
  mockAxios.onGet().reply(200, [{
    categories: ['ER'],
    description: 'typicode',
    id: 198412,
    image: 'typicode',
    name: 'Super Unique Item Name that should render',
  }]);
});

test('renders frequently ordered page', () => {
  render(<FrequentlyOrderedPage />);
  const linkElement = screen.getByTestId('containerforcards');
  expect(linkElement).toBeInTheDocument();
});
