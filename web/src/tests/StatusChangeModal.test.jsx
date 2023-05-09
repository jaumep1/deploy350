/* eslint-disable no-undef */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import {
  render, screen,
} from '@testing-library/react';
import React from 'react';
import StatusChangeModal from '../components/tracking_components/modals/StatusChangeModal';

import { getItems } from '../api/deliveryApiCalls';

// Mock the getOrderChatMessages API call
jest.mock('../api/deliveryApiCalls', () => ({
  getItems: jest.fn(),
}));

describe('Status Change Modal', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  const mockItems = [
    {
      id: 182645,
      name: 'Flat Top Catheter Tip Irrigation Syringe with Tip Protector 60 mL',
      image: 'https://cdn.shopify.com/s/files/1/0556/3711/4961/products/24125_500x.jpg?v=1647022262',
      description: '60cc sterile irrigation syringe packaged in a poly pouch. Features a flat-top catheter tip with tip protector. Latex-free. Tip length is 1-7/16',
      categories: [
        'Urinary Catheters',
        'ER',
        'General Hospital',
      ],
    },
    {
      id: 198462,
      name: '60 cc Irrigation Syringe',
      image: 'https://cdn.shopify.com/s/files/1/0556/3711/4961/products/BND309653_900x.jpg?v=1646993421',
      description: 'BD syringes feature a clear barrel with bold scale markings, tapered plunger rod for ease of aspiration, and a positive plunger rod stop. Choice of Catheter Tip or Luer-Lok™ thread for increased secure connection, both with a Tip Shield. Latex-free.',
      categories: [
        'ER',
        'Urinary Catheters',
        'Cardiology',
      ],
    },
    {
      id: 513458,
      name: 'Solution Saline Sterile 250Ml',
      image: 'https://cdn.shopify.com/s/files/1/0556/3711/4961/products/PCS1650_9d66eacc-5fce-4cc5-b57b-65a6bf6cf884_1000x.jpg?v=1647018413',
      description: 'Packaging: 1 Each/Each. SOLUTION, SALINE, STERILE, 250ML',
      categories: [
        'ER',
        'General Hospital',
        'Cardiology',
        'Surgery',
        'Urology',
        'Oncology',
      ],
    },
  ];
  getItems.mockResolvedValueOnce([mockItems]);

  const mockProps = {
    show: true,
    onHide: jest.fn(),
    onButtonClick: jest.fn(),
    orderNumber: 123,
    type: 'Cancel',
  };

  it('renders with expected props', () => {
    render(<StatusChangeModal {...mockProps} />);
    expect(screen.getByText(`Order #${mockProps.orderNumber} Cancellation Reasoning`)).toBeInTheDocument();
    expect(screen.getByText('Cancel Order')).toBeInTheDocument();
  });

  it('displays correct button name and title when type prop is changed', () => {
    const newProps = { ...mockProps, type: 'On Hold' };
    render(<StatusChangeModal {...newProps} />);
    expect(screen.getByText(`Order #${mockProps.orderNumber} On Hold Reasoning`)).toBeInTheDocument();
    expect(screen.getByText('Place On Hold')).toBeInTheDocument();
  });
});
