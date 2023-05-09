/* eslint-disable react/jsx-filename-extension */
/**
 * @jest-environment jsdom
 */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import React from 'react';
import '@testing-library/jest-dom';
import {
  render, screen, waitFor,
} from '@testing-library/react';
import History from '../components/history/History';
import getHistory from '../api/history';

jest.mock('../api/history');

describe('History component', () => {
  test('calls setOrders with the response from getHistory', async () => {
    const response = [{ id: 1, total: 10 }, { id: 2, total: 20 }];
    getHistory.mockResolvedValueOnce(response);

    render(<History />);

    await waitFor(() => {
      expect(screen.getByTestId('history').children.length).toBe(response.length);
    });
  });

  it('renders with null updatedOn when order updatedOn is undefined', async () => {
    const response = [{ id: 1, total: 10, updatedOn: null }, { id: 2, total: 20, updatedOn: null }];
    getHistory.mockResolvedValueOnce(response);

    render(<History />);

    await waitFor(() => {
      expect(screen.getByTestId('history').children.length).toBe(response.length);
    });
  });

  it('status delivered', async () => {
    const response = [{
      id: 1, product: 'GEL ULTSOUND AQUASONIC .25L', lawson: 200279, category: 'Respiratory', placedOn: 1677715200000, status: 'delivered', updatedOn: 1677715200000, total: 153.29, shipTo: 'Beth Sheridan', quantity: 20,
    }];
    getHistory.mockResolvedValueOnce(response);

    await render(<History />);

    await waitFor(() => {
      const element = screen.getByText(/Delivered/);
      expect(element).toBeInTheDocument();
    });
  });

  it('status picked up', async () => {
    const response = [{
      id: 2, product: 'GAUZE COMBAT Z FOLD 4INX4IN', lawson: 241177, category: 'Neurologic', placedOn: 1677715200000, status: 'pickedUp', updatedOn: 1677715200000, total: 153.29, shipTo: 'Beth Sheridan', quantity: 20,
    }];
    getHistory.mockResolvedValueOnce(response);

    await render(<History />);

    await waitFor(() => {
      const element = screen.getByText(/Picked/);
      expect(element).toBeInTheDocument();
    });
  });

  it('status pending pickup', async () => {
    const response = [{
      id: 3, product: 'RESP INHALR GINGER', lawson: 259513, category: 'Orthapedics', placedOn: 1677715200000, status: 'pendingPickUp', updatedOn: null, total: 153.29, shipTo: 'Beth Sheridan', quantity: 20,
    }];
    getHistory.mockResolvedValueOnce(response);

    await render(<History />);

    await waitFor(() => {
      const element = screen.getByText(/Pending/);
      expect(element).toBeInTheDocument();
    });
  });
});
