/* eslint-disable react/jsx-filename-extension */
/**
 * @jest-environment jsdom
 */

/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import Home from '../components/Home';

test('renders homepage contents', () => {
  render(<Home />);
  const linkElement = screen.getByText(/Item Search/);
  expect(linkElement).toBeInTheDocument();
});

test('search bar input working', async () => {
  render(<Home />);
  userEvent.type(screen.getByPlaceholderText('Search for an item by name, Lawson number or nickname'), 'needles');
  expect(screen.getByPlaceholderText('Search for an item by name, Lawson number or nickname')).toHaveProperty('value', 'needles');
});
