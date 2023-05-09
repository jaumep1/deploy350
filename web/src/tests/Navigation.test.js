/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
/**
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Sidebar from '../components/layout/Sidebar';
import BottomInfo from '../components/layout/BottomInfo';
import Rightbar from '../components/layout/Rightbar';
import Navbar from '../components/layout/Navbar';

test('renders Sidebar displays all menu items', () => {
  render(<BrowserRouter><Sidebar /></BrowserRouter>);
  const linkElement = screen.getByText(/Analytics/);
  expect(linkElement).toBeInTheDocument();
  const linkElement1 = screen.getByText(/Home/);
  expect(linkElement1).toBeInTheDocument();
  const linkElement2 = screen.getByText(/Past Orders/);
  expect(linkElement2).toBeInTheDocument();
  const linkElement3 = screen.getByText(/Incoming Orders/);
  expect(linkElement3).toBeInTheDocument();
});

test('renders Bottom Info Settings Button', () => {
  render(<BrowserRouter><BottomInfo /></BrowserRouter>);
  const linkElement = screen.getByText(/Settings/);
  expect(linkElement).toBeInTheDocument();
});

test('renders Bottom Info Log Out Button', () => {
  render(<BrowserRouter><BottomInfo /></BrowserRouter>);
  const linkElement = screen.getByText(/Log Out/);
  expect(linkElement).toBeInTheDocument();
});

test('renders Bottom Info User Image', () => {
  render(<BrowserRouter><BottomInfo /></BrowserRouter>);
  const image = screen.getByAltText('user headshot');
  expect(image.src).toContain('https://theblossomingkitchen.com/wp-content/uploads/2016/05/Kara-Hatherill-Headshot-square.jpg');
  expect(image).toHaveAttribute('src', 'https://theblossomingkitchen.com/wp-content/uploads/2016/05/Kara-Hatherill-Headshot-square.jpg');
});

// CONTENT ISNT SHOWING IN THE RIGHTBAR FILE?

// test('renders right bar contents', () => {
//     render(<BrowserRouter><Rightbar /></BrowserRouter>);
//     const linkElement = screen.getByText(/content/);
//     expect(linkElement).toBeInTheDocument();
// });

// test('renders right bar button in', () => {
//     render(<BrowserRouter><Rightbar /></BrowserRouter>);
//     const linkElement = screen.getByText(/content/);
//     expect(linkElement).toBeInTheDocument();
// });

test('renders correct top bar', () => {
  render(<BrowserRouter><Navbar>Pick.it</Navbar></BrowserRouter>);
  const linkElement = screen.getByText(/Pick/);
  expect(linkElement).toBeInTheDocument();
});

test('renders rightbar correct toggle button', () => {
  render(<BrowserRouter><Rightbar /></BrowserRouter>);
  const linkElement2 = screen.getByRole('button', { name: 'open' });
  expect(linkElement2).toBeInTheDocument();
  fireEvent.click(linkElement2);
  const linkElement = screen.getByRole('button', { name: 'close' });
  expect(linkElement).toBeInTheDocument();
  fireEvent.click(linkElement);
  expect(linkElement2).toBeInTheDocument();
});
