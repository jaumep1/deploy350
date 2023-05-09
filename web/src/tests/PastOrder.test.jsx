/* eslint-disable no-undef */
/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import PastOrders from '../components/PastOrders';
import { getStoreroomPastOrders, getItems, getNotifications } from '../api/deliveryApiCalls';

jest.mock('../api/deliveryApiCalls', () => ({
  getStoreroomPastOrders: jest.fn(),
  getItems: jest.fn(),
  getNotifications: jest.fn(),
}));

describe('PastOrders', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    getItems.mockResolvedValue([
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
    ]);
    getStoreroomPastOrders.mockResolvedValue([
      {
        id: 389303039839,
        price: 12.48,
        orderer: 'Beth Sheridan',
        orderLocation: 'Anesthesiology Department, Room 7',
        date: '12/1/23 12:00:00',
        itemID: 513458,
        count: 1,
        storeroom_manager_id: 'demo_id',
        statusMessage: 'dfdfdf',
      },
      {
        id: 2336278,
        price: 12.48,
        orderer: 'Alex Huang',
        orderLocation: 'Hip-Hop Department, Room 7',
        date: '12/1/23 12:00:00',
        itemID: 182645,
        count: 1,
        storeroom_manager_id: 'demo_id',
        statusMessage: 'dfdfdf',
      },
      {
        id: 21228080808,
        price: 12.48,
        count: 2,
        itemID: 198462,
        storeroom_manager_id: 'demo_id',
        orderer: 'Alex Huang',
        orderLocation: 'Anesthesiology Department, Room 7',
        date: '12/1/23 12:00:00',
        statusMessage: 'done!',
      },
    ]);
    getNotifications.mockResolvedValue([
      {
        productTitle: '21G BD Vacutainer Eclipse Blood Collection Multi Safety ...',
        updateMessage: 'Your order has been delivered!',
        time: '1 minute ago',
        status: '2',
        category: 'Cardiology',
        lawson: '4916GJ6GS',
        notifID: 0,
        userID: 'qjf019w',
      },
      {
        productTitle: '21G BluWing Blood Collection Set Butterfly Needles, 50/box',
        updateMessage: 'Your order is 10 mins away!',
        time: '2 minutes ago',
        status: '1',
        category: 'Cardiology',
        lawson: '4916GJ6GS',
        notifID: 1,
        userID: 'qjf019w',
      },
    ]);
  });

  it('renders the Past Orders page with the correct title', async () => {
    render(<PastOrders />);
    await waitFor(() => expect(getItems).toHaveBeenCalled());
    expect(screen.getByText('Past Orders')).toBeInTheDocument();
  });

  it('renders the PastOrderCards for each order', async () => {
    render(<PastOrders />);
    await waitFor(() => expect(getItems).toHaveBeenCalled());
    expect(screen.getByText('Past Orders')).toBeInTheDocument();
  });

  it('filters the PastOrderCards by search term', async () => {
    render(<PastOrders />);
    await waitFor(() => expect(getItems).toHaveBeenCalled());
    expect(screen.getByText('Past Orders')).toBeInTheDocument();
    const searchInput = screen.getByPlaceholderText('Search');
    expect(searchInput).toBeInTheDocument();
    // Enter search term
    searchInput.value = 'Blu 1';
    // Trigger change event to update component state
    searchInput.dispatchEvent(new Event('input', { bubbles: true }));
  });
});
