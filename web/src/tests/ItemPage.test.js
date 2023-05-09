/* eslint-disable react/jsx-filename-extension */
/**
 * @jest-environment jsdom
 */

/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom';
import {
  render, screen,
} from '@testing-library/react';
import ItemPage, { CategoryAglom } from '../components/ItemPage';

describe('Rendering ItemPage', () => {
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
  it('renders correctly', () => {
    render(<ItemPage />);
    expect(screen.getByText('Categories Included In')).toBeInTheDocument();
  });

  it('item page button renders', () => {
    render(<ItemPage />);
    const childComponent = screen.getByTestId('ItemPageButton');
    expect(childComponent).toBeInTheDocument();
  });

  it('item page category renders', () => {
    const validProps = ['b', 'c', 'd'];

    render(<CategoryAglom categories={validProps} />);
    const childComponent = screen.getByTestId('categories');
    expect(childComponent).toBeInTheDocument();
  });

  // THIS TEST ISNT WORKING

  // it('item page add nickname click', () => {
  //   const { getByText } = render(<ItemPage />);
  //   const consoleSpy = jest.spyOn(console, 'log');
  //   fireEvent.click(getByText('Submit Nickname'));
  //   expect(consoleSpy).toHaveBeenCalledWith('triggered add');
  // });
  it('item page remove nickname render', async () => {
    render(<ItemPage />);
    const nicknameAglomComp = screen.getByTestId('nicknames');
    expect(nicknameAglomComp).toBeInTheDocument();
  });
});

// test('renders Item Page Contents', () => {
//   render(<ItemPage />);
//   const linkElement = screen.getByText(/60 cc Irrigation Syringe/);
//   expect(linkElement).toBeInTheDocument();
// });

// test('testing if Button rendered properly', () => {
//   const { getByTestId } = render(<ItemPage />);
//   const childComponent = getByTestId('ItemPageButton');
//   expect(childComponent).toBeInTheDocument();
// });
