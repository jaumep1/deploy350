/* eslint-disable react/jsx-filename-extension */
/**
 * @jest-environment jsdom
 */

/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ItemCardAglom from '../components/ItemCardAglom';

const searchResults = [{
  _id: 182645,
  name: 'Flat Top Catheter Tip Irrigation Syringe with Tip Protector 60 mL',
  image: 'https://cdn.shopify.com/s/files/1/0556/3711/4961/products/24125_500x.jpg?v=1647022262',
  description: '60cc sterile irrigation syringe packaged in a poly pouch. Features a flat-top catheter tip with tip protector. Latex-free. Tip length is 1-7/16',
  categories: [
    'Urinary Catheters',
    'ER',
    'General Hospital',
  ],

  quantity: 0,
  freq: 1,
},
{
  _id: 198462,
  name: '60 cc Irrigation Syringe',
  image: 'https://cdn.shopify.com/s/files/1/0556/3711/4961/products/BND309653_900x.jpg?v=1646993421',
  description: 'BD syringes feature a clear barrel with bold scale markings, tapered plunger rod for ease of aspiration, and a positive plunger rod stop. Choice of Catheter Tip or Luer-Lok™ thread for increased secure connection, both with a Tip Shield. Latex-free.',
  categories: [
    'ER',
    'Urinary Catheters',
    'Cardiology',
  ],
  quantity: 1,
  freq: 2,
}];
test('renders category buttons', () => {
  render(<ItemCardAglom items={searchResults} passDownFunc={() => {}} />);
  // const linkElement = screen.getAllByText(/Cardiology/);
  // expect(linkElement).toBeInTheDocument();
  const linkElement1 = screen.getByTestId('182645');
  expect(linkElement1).toBeInTheDocument();
  const linkElement2 = screen.getByTestId('198462');
  expect(linkElement2).toBeInTheDocument();
  const linkElement3 = screen.getByText(/182645/);
  expect(linkElement3).toBeInTheDocument();
  const linkElement4 = screen.getByText(/198462/);
  expect(linkElement4).toBeInTheDocument();
  const linkElement5 = screen.getByText(/60 cc Irrigation Syringe/);
  expect(linkElement5).toBeInTheDocument();
  const linkElement6 = screen.getByText(/Flat Top Catheter Tip Irrigation Syringe with Tip Protector 60 mL/);
  expect(linkElement6).toBeInTheDocument();
  const linkElement7 = screen.getByTestId('https://cdn.shopify.com/s/files/1/0556/3711/4961/products/BND309653_900x.jpg?v=1646993421');
  expect(linkElement7).toBeInTheDocument();
  const linkElement8 = screen.getByTestId('https://cdn.shopify.com/s/files/1/0556/3711/4961/products/24125_500x.jpg?v=1647022262');
  expect(linkElement8).toBeInTheDocument();
});

test('renders addtocart/already in cart buttons', () => {
  render(<ItemCardAglom items={searchResults} passDownFunc={() => {}} />);
  // const linkElement = screen.getAllByText(/Cardiology/);
  // expect(linkElement).toBeInTheDocument();
  const linkElement1 = screen.getByTestId('addtocartbutton');
  expect(linkElement1).toBeInTheDocument();
  const linkElement2 = screen.getByTestId('alreadyincartbutton');
  expect(linkElement2).toBeInTheDocument();
  const linkElement3 = screen.getAllByTestId('LawsonHolder');
  expect(linkElement3.length > 1).toBe(true);
});

test('renders no items', () => {
  const iput = [];
  render(<ItemCardAglom items={iput} passDownFunc={() => {}} />);
  // const linkElement = screen.getAllByText(/Cardiology/);
  // expect(linkElement).toBeInTheDocument();
  const linkElement1 = screen.getByTestId('eerr');
  expect(linkElement1).toBeInTheDocument();
});
