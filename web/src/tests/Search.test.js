/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
/**
 * @jest-environment jsdom
 */
/* eslint-disable no-undef */

import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import SearchPage from '../components/SearchPage';
import SearchResultsDropDown from '../components/SearchResultsDropDown';

describe('Rendering Search page', () => {
  const mockLocation = {
    pathname: '/mock-path',
    search: '?mock=search',
    hash: '#mock-hash',
  };
  beforeAll(() => {
    // Redefine the `window.location` object with the mock location.
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { ...window.location, ...mockLocation },
    });
  });
  afterAll(() => {
    // Restore the original `window.location` object.
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { ...window.location },
    });
  });
  it('renders search page correctly', () => {
    render(<SearchPage />);
    const linkElement = screen.getByText(/A-Z/);
    expect(linkElement).toBeInTheDocument();
  });

  it('renders search page title correctly', () => {
    render(<SearchPage />);
    const linkElement = screen.getByText(/A-Z/);
    expect(linkElement).toBeInTheDocument();
  });

  it('search page pagination', () => {
    render(<SearchPage />);
    const linkElement = screen.getByTestId('paginationchange');
    // fireEvent.click(linkElement);
    expect(linkElement).toBeInTheDocument();
  });
});

describe('Rendering Search Drop down component', () => {
  const mockLocation = {
    pathname: '/mock-path',
    search: '?mock=search',
    hash: '#mock-hash',
  };
  beforeAll(() => {
    // Redefine the `window.location` object with the mock location.
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { ...window.location, ...mockLocation },
    });
  });
  afterAll(() => {
    // Restore the original `window.location` object.
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { ...window.location },
    });
  });

  const props = {
    data: [{ name: 'item1', id: '1' }],
  };

  it('renders search results drop down correctly', () => {
    render(<SearchResultsDropDown {...props} />);
    const linkElement = screen.getByText(/item1/);
    expect(linkElement).toBeInTheDocument();
    const linkElement1 = screen.getByRole('button', { name: 'item1' });
    expect(linkElement1).toBeInTheDocument();
    fireEvent.click(linkElement1);
    expect(window.location).toEqual('/item?id=1');
  });

  const prop1 = {
    data: [],
  };

  it('renders search results drop down correctly with empty dataset', () => {
    render(<SearchResultsDropDown {...prop1} />);
    const linkElement = screen.getByTestId('no-results');
    expect(linkElement).toBeInTheDocument();
  });
});
