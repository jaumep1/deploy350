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
import userEvent from '@testing-library/user-event';
import PastOrderCard from '../components/tracking_components/cards/PastOrderCard';

describe('PastOrderCard component', () => {
  const mockProps = {
    date: '2022-03-20',
    cost: 25.99,
    shippingDetails: '123 Main St, Anytown USA',
    orderNumber: 1234567890,
    statusDescription: 'Delivered',
    itemDetails: {
      name: 'Test Item',
      categories: ['Category 1', 'Category 2'],
      id: 987654321,
      image: 'https://www.example.com/test.jpg',
    },
    showButton: true,
  };

  test('renders PastOrderCard component with all props', () => {
    render(<PastOrderCard {...mockProps} />);
    const orderDate = screen.getByText(/Delivered 2022-03-20/i);
    const itemTitle = screen.getByText(/Test Item/i);
    const itemCategory = screen.getByText(/Category 1/i);
    const lawsonNumber = screen.getByText(/Lawson #987654321/i);
    const returnButton = screen.getByRole('button', { name: /Return Order/i });
    expect(orderDate).toBeInTheDocument();
    expect(itemTitle).toBeInTheDocument();
    expect(itemCategory).toBeInTheDocument();
    expect(lawsonNumber).toBeInTheDocument();
    expect(returnButton).toBeInTheDocument();
  });

  test('renders PastOrderCard component without return button', () => {
    const { showButton, ...rest } = mockProps;
    render(<PastOrderCard {...rest} />);
    const orderDate = screen.getByText(/Delivered 2022-03-20/i);
    const itemTitle = screen.getByText(/Test Item/i);
    const itemCategory = screen.getByText(/Category 1/i);
    const lawsonNumber = screen.getByText(/Lawson #987654321/i);
    const returnButton = screen.queryByRole('button', { name: /Return Order/i });
    expect(orderDate).toBeInTheDocument();
    expect(itemTitle).toBeInTheDocument();
    expect(itemCategory).toBeInTheDocument();
    expect(lawsonNumber).toBeInTheDocument();
    expect(returnButton).not.toBeInTheDocument();
  });

  test('clicking return button calls handler', () => {
    const mockHandler = jest.fn();
    render(<PastOrderCard {...mockProps} onReturn={mockHandler} />);
    const returnButton = screen.getByRole('button', { name: /Return Order/i });
    userEvent.click(returnButton);
    expect(mockHandler).toHaveBeenCalledTimes(0);
  });
});
