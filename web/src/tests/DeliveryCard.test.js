/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
/**
 * @jest-environment jsdom
 */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
// eslint-disable-next-line import/no-extraneous-dependencies

import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import DeliveryCard from '../components/tracking_components/cards/DeliveryCard';

describe('DeliveryCard component', () => {
  const props = {
    date: '2022-01-01',
    cost: 100,
    shippingDetails: '123 Main St, Anytown USA',
    orderNumber: 123,
    children: <div>Test content</div>,
  };

  it('should render the DeliveryCard component correctly in full view', () => {
    render(<DeliveryCard {...props} />);
    expect(screen.getByText('Order Placed')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
    expect(screen.getByText('Ship To')).toBeInTheDocument();
    expect(screen.getByText('Order #123')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('should render the DeliveryCard component correctly in condensed view', () => {
    render(<DeliveryCard
      {...props}
      shippingDetails={undefined}
      orderNumber={undefined}
    />);
    expect(screen.getByText('Order Placed')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('should render the DeliveryCard component with a large card width', () => {
    const { container } = render(<DeliveryCard {...props} />);
    expect(container.firstChild).toHaveClass('max-w-[700px]');
  });

  it('should render the DeliveryCard component with a small card width', () => {
    const { container } = render(<DeliveryCard {...props} width={false} />);
    expect(container.firstChild).toHaveClass('max-w-[450px]');
  });
});
