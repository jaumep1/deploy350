/* eslint-disable react/jsx-filename-extension */
/**
 * @jest-environment jsdom
 */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import '@testing-library/jest-dom';
import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import ResizeObserver from '../mocks/ResizeObserver';
import Analytics from '../components/analytics/Analytics';
import Inventory from '../components/analytics/Inventory';
import { renderCustomizedLabel } from '../components/analytics/AnalyticsUtils';

import {
  getInventory, getAllSupplies, getSupply, getCategories,
} from '../api/analytics';
import SupplyDataLine from '../components/analytics/SupplyDataLine';
import SupplyCombobox from '../components/analytics/SupplyCombobox';
import CategoricalBreakdown from '../components/analytics/CategoricalBreakdown';
import MostUsed from '../components/analytics/MostUsed';

jest.mock('../api/analytics');

describe('Analytics tests', () => {
  test('renders analytics', async () => {
    await render(<Analytics />);

    await waitFor(() => {
      const element = screen.getByTestId('analyticsmain');
      expect(element.children.length).toBe(5);
    });
  });

  test('renders analytics with supplies', async () => {
    const response = [{
      id: 1, name: 'GEL ULTSOUND AQUASONIC .25L', date: 1677715200000, quantity: 10,
    },
    {
      id: 2, name: 'GEL ULTSOUND AQUASONIC .25L', date: 1677628800000, quantity: 7,
    },
    {
      id: 3, name: 'GEL ULTSOUND AQUASONIC .25L', date: 1677542400000, quantity: 3,
    }];
    getAllSupplies.mockResolvedValueOnce(response);
    await render(<Analytics />);

    await waitFor(() => {
      const element = screen.getByText(/Overview/);
      expect(element).toBeInTheDocument();
    });
  });

  test('renders analytics with singular supply', async () => {
    const response = [{
      id: 1, name: 'GEL ULTSOUND AQUASONIC .25L', date: 1677715200000, quantity: 10,
    }];
    getSupply.mockResolvedValueOnce(response);
    await render(<Analytics />);

    await waitFor(() => {
      const element = screen.getByText(/Overview/);
      expect(element).toBeInTheDocument();
    });
  });

  test('get inventory with response', async () => {
    const response = [{
      id: 1, name: 'GEL ULTSOUND AQUASONIC .25L', lawson: 200279, category: 'Respiratory', quantity: 20,
    },
    {
      id: 2, name: 'GAUZE COMBAT Z FOLD 4INX4IN', lawson: 241177, category: 'Neurologic', quantity: 23,
    },
    {
      id: 3, name: 'RESP INHALR GINGER', lawson: 259513, category: 'Orthapedics', quantity: 14,
    },
    {
      id: 4, name: 'TB CORRUGATED FLEX 6IN', lawson: 40000635, category: 'Respiratory', quantity: 18,
    }];
    getInventory.mockResolvedValueOnce(response);
    await render(<Analytics />);

    await waitFor(() => {
      const element = screen.getByText(/Overview/);
      expect(element).toBeInTheDocument();
    });
  });

  // test('renders mostused', async () => {
  //   await render(<Analytics />);
  //   const element = screen.getByTestId('mostused');
  //   expect(element).toBeInTheDocument();
  // });
});

// test('renders learn react link', async () => {
//   expect(1).toBe(1);
// });

describe('Supply Data Line tests', () => {
  test('renders supply data line', async () => {
    render(<SupplyDataLine dataLine={[]} />);
    const element = screen.getByText(/chart/);
    expect(element).toBeInTheDocument();
  });
});

describe('Inventory tests', () => {
  test('renders inventory', async () => {
    const inventory = [{
      id: 1, name: 'GEL ULTSOUND AQUASONIC .25L', lawson: 200279, category: 'Respiratory', quantity: 20,
    },
    {
      id: 2, name: 'GAUZE COMBAT Z FOLD 4INX4IN', lawson: 241177, category: 'Neurologic', quantity: 23,
    },
    {
      id: 3, name: 'RESP INHALR GINGER', lawson: 259513, category: 'Orthapedics', quantity: 14,
    },
    {
      id: 4, name: 'TB CORRUGATED FLEX 6IN', lawson: 40000635, category: 'Respiratory', quantity: 18,
    },
    {
      id: 5, name: 'MSK FACE O2 MULTI-VENT', lawson: 264363, category: 'Orthapedics', quantity: 25,
    }];
    render(<Inventory inventory={inventory} />);

    const element = screen.getByRole('table-body');
    expect(element.children.length).toBe(3);
  });

  test('renders inventory and clicks right button', async () => {
    const inventory = [{
      id: 1, name: 'GEL ULTSOUND AQUASONIC .25L', lawson: 200279, category: 'Respiratory', quantity: 20,
    },
    {
      id: 2, name: 'GAUZE COMBAT Z FOLD 4INX4IN', lawson: 241177, category: 'Neurologic', quantity: 23,
    },
    {
      id: 3, name: 'RESP INHALR GINGER', lawson: 259513, category: 'Orthapedics', quantity: 14,
    },
    {
      id: 4, name: 'TB CORRUGATED FLEX 6IN', lawson: 40000635, category: 'Respiratory', quantity: 18,
    },
    {
      id: 5, name: 'MSK FACE O2 MULTI-VENT', lawson: 264363, category: 'Orthapedics', quantity: 25,
    }];
    render(<Inventory inventory={inventory} />);
    const button = screen.getByRole('right-button');
    const initialTable = screen.getByRole('table-body');
    expect(initialTable.children.length).toBe(3);
    fireEvent.click(button);
    const element = screen.getByRole('table-body');
    expect(element.children.length).toBe(2);
  });

  test('renders inventory and clicks left button', async () => {
    const inventory = [{
      id: 1, name: 'GEL ULTSOUND AQUASONIC .25L', lawson: 200279, category: 'Respiratory', quantity: 20,
    },
    {
      id: 2, name: 'GAUZE COMBAT Z FOLD 4INX4IN', lawson: 241177, category: 'Neurologic', quantity: 23,
    },
    {
      id: 3, name: 'RESP INHALR GINGER', lawson: 259513, category: 'Orthapedics', quantity: 14,
    },
    {
      id: 4, name: 'TB CORRUGATED FLEX 6IN', lawson: 40000635, category: 'Respiratory', quantity: 18,
    },
    {
      id: 5, name: 'MSK FACE O2 MULTI-VENT', lawson: 264363, category: 'Orthapedics', quantity: 25,
    }];
    render(<Inventory inventory={inventory} />);
    const button = screen.getByRole('left-button');
    const initialTable = screen.getByRole('table-body');
    expect(initialTable.children.length).toBe(3);
    fireEvent.click(button);
    const element = screen.getByRole('table-body');
    expect(element.children.length).toBe(3);
  });
});

describe('Most Used tests', () => {
  test('renders most used', async () => {
    const response = [{
      id: 1, category: 'Respiratory', change: 26000, percentage: 3.2,
    },
    {
      id: 2, category: 'Neurologic', change: 22000, percentage: 2.5,
    },
    {
      id: 3, category: 'Orthapedic', change: 10000, percentage: 4.3,
    }];
    getCategories.mockResolvedValueOnce(response);
    await render(<MostUsed />);

    await waitFor(() => {
      const element = screen.getByRole('categories-table');
      expect(element.children.length).toBe(3);
    });
  });
});

describe('Categorical Breakdown Tests', () => {
  test('renders categorical breakdown', async () => {
    const response = [{ name: 'Respiratory', quantity: 26000 }, { name: 'Neurologic', quantity: 22000 }];

    await render(<CategoricalBreakdown dataDoughnut={response} />);

    await waitFor(() => {
      const element = screen.getByText(/Categorical Breakdown/);
      expect(element).toBeInTheDocument();
    });

    // const button = screen.getByRole('right-button');
    // const initialTable = screen.getByRole('table-body');
    // expect(initialTable.children.length).toBe(3);
    // fireEvent.click(button);
    // const element = screen.getByRole('table-body');
    // expect(element.children.length).toBe(2);
  });
});

describe('Supply Combobox tests', () => {
  test('combobox query', async () => {
    // Mock the supplies state
    const response = [
      {
        id: 1, name: 'GAUZE COMBAT Z FOLD 4INX4IN', date: 1677283200000, quantity: 2,
      },
      {
        id: 2, name: 'RESP INHALR GINGER', date: 1677715200000, quantity: 2,
      },
      {
        id: 3, name: 'TB CORRUGATED FLEX 6IN', date: 1677715200000, quantity: 3,
      },
    ];
    getAllSupplies.mockResolvedValueOnce(response);

    // Render the component
    await render(<SupplyCombobox />);

    // Find the input field and enter a query
    const inputField = screen.getByPlaceholderText('Select a supply...');
    fireEvent.change(inputField, { target: { value: 'G' } });

    // Check that the filtered options are rendered
    const filteredOption1 = screen.getByText(/Nothing/);
    expect(filteredOption1).toBeInTheDocument();
  });
});

describe('utils testing', () => {
  test('renderCustomizedLabel input testing cx > cy', () => {
    renderCustomizedLabel({
      cx: 1000, cy: 1, midAngle: 1, innerRadius: 0, outerRadius: 0, percecnt: 1, index: 1,
    });
    expect(renderCustomizedLabel).toBeDefined();
  });

  test('renderCustomizedLabel input testing cx < cy', () => {
    renderCustomizedLabel({
      cx: 1, cy: 2, midAngle: 1, innerRadius: 1, outerRadius: 1, percecnt: 1, index: 1,
    });
    expect(renderCustomizedLabel).toBeDefined();
  });
});
