/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
/**
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom';
import { render, waitFor, screen } from '@testing-library/react';
import NotificationWrapper from '../components/tracking_components/NotificationWrapper';
import { getNotifications } from '../api/deliveryApiCalls';

// Mock the `getNotifications` function
jest.mock('../api/deliveryApiCalls', () => ({
  getNotifications: jest.fn(),
}));

describe('NotificationWrapper', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders a list of notifications', async () => {
    // Mock the data returned by the `getNotifications` function
    const mockNotifications = [
      {
        userID: '0',
        productTitle: 'Test Product 1',
        updateMessage: 'Test message 1',
        time: '2022-01-01T00:00:00Z',
        status: 'NEW',
        category: 'TEST',
        lawson: '123456',
        notifID: 1,
      },
      {
        userID: '0',
        productTitle: 'Test Product 2',
        updateMessage: 'Test message 2',
        time: '2022-01-02T00:00:00Z',
        status: 'IN_PROGRESS',
        category: 'TEST',
        lawson: '123457',
        notifID: 2,
      },
    ];
    getNotifications.mockResolvedValueOnce([mockNotifications]);

    render(<NotificationWrapper currentViewStatus={0} />);

    await waitFor(() => {
      expect(screen.getByText('Notifications')).toBeInTheDocument();
    });
  });

  it('renders notifications only for the logged-in user', async () => {
    const mockNotifications = [
      {
        userID: '0',
        productTitle: 'Test Product 1',
        updateMessage: 'Test message 1',
        time: '2022-01-01T00:00:00Z',
        status: 'NEW',
        category: 'TEST',
        lawson: '123456',
        notifID: 1,
      },
      {
        userID: '1',
        productTitle: 'Test Product 2',
        updateMessage: 'Test message 2',
        time: '2022-01-02T00:00:00Z',
        status: 'IN_PROGRESS',
        category: 'TEST',
        lawson: '123457',
        notifID: 2,
      },
    ];
    getNotifications.mockResolvedValueOnce([mockNotifications]);
    localStorage.setItem('userid', '0');

    render(<NotificationWrapper currentViewStatus={0} />);

    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    });

    localStorage.removeItem('userid');
  });

  it('renders no notifications when there are none for the logged-in user', async () => {
    const mockNotifications = [
      {
        userID: '1',
        productTitle: 'Test Product 1',
        updateMessage: 'Test message 1',
        time: '2022-01-01T00:00:00Z',
        status: 'NEW',
        category: 'TEST',
        lawson: '123456',
        notifID: 1,
      },
    ];
    getNotifications.mockResolvedValueOnce([mockNotifications]);
    localStorage.setItem('userid', '0');

    render(<NotificationWrapper currentViewStatus={0} />);

    await waitFor(() => {
      expect(screen.queryByText('Test Product 1')).not.toBeInTheDocument();
    });

    localStorage.removeItem('userid');
  });
  it('renders appropriate heading based on currentViewStatus prop', async () => {
    const mockNotifications = [];
    getNotifications.mockResolvedValueOnce([mockNotifications]);
    render(<NotificationWrapper currentViewStatus={1} />);

    await waitFor(() => {
      expect(screen.getByText('New Order Requests')).toBeInTheDocument();
    });
  });

  it('renders order messages when currentViewStatus is 2', async () => {
    const mockNotifications = [
      {
        userID: '0',
        productTitle: 'Test Product 1',
        updateMessage: 'Test message 1',
        time: '2022-01-01T00:00:00Z',
        status: 'NEW',
        category: 'TEST',
        lawson: '123456',
        notifID: 1,
        currentOrder: true,
      },
      {
        userID: '0',
        productTitle: 'Test Product 2',
        updateMessage: 'Test message 2',
        time: '2022-01-02T00:00:00Z',
        status: 'IN_PROGRESS',
        category: 'TEST',
        lawson: '123457',
        notifID: 2,
        currentOrder: false,
      },
    ];
    getNotifications.mockResolvedValueOnce([mockNotifications]);
    localStorage.setItem('userid', '0');

    render(<NotificationWrapper currentViewStatus={2} />);

    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    });

    localStorage.removeItem('userid');
  });

  it('renders appropriate heading for nurse role', async () => {
    const mockNotifications = [];
    getNotifications.mockResolvedValueOnce([mockNotifications]);
    localStorage.setItem('role', 'nurse');
    render(<NotificationWrapper currentViewStatus={1} />);

    await waitFor(() => {
      expect(screen.getByText('Notifications')).toBeInTheDocument();
    });

    localStorage.removeItem('role');
  });

  it('renders appropriate heading for non-nurse role', async () => {
    const mockNotifications = [];
    getNotifications.mockResolvedValueOnce([mockNotifications]);
    localStorage.setItem('role', 'non-nurse');
    render(<NotificationWrapper currentViewStatus={1} />);

    await waitFor(() => {
      expect(screen.getByText('New Order Requests')).toBeInTheDocument();
    });

    localStorage.removeItem('role');
  });

  it('renders all notifications when currentViewStatus is undefined', async () => {
    const mockNotifications = [
      {
        userID: '0',
        productTitle: 'Test Product 1',
        updateMessage: 'Test message 1',
        time: '2022-01-01T00:00:00Z',
        status: 'NEW',
        category: 'TEST',
        lawson: '123456',
        notifID: 1,
        currentOrder: true,
      },
      {
        userID: '0',
        productTitle: 'Test Product 2',
        updateMessage: 'Test message 2',
        time: '2022-01-02T00:00:00Z',
        status: 'IN_PROGRESS',
        category: 'TEST',
        lawson: '123457',
        notifID: 2,
        currentOrder: false,
      },
    ];
    getNotifications.mockResolvedValueOnce([mockNotifications]);
    localStorage.setItem('userid', '0');

    render(<NotificationWrapper currentViewStatus={undefined} />);

    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    });

    localStorage.removeItem('userid');
  });
});
