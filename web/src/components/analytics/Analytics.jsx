/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import React, {
  useState, useEffect,
} from 'react';

import Overview from './Overview';
import MostUsed from './MostUsed';
import SupplyCombobox from './SupplyCombobox';
import SupplyDataLine from './SupplyDataLine';
import CategoricalBreakdown from './CategoricalBreakdown';
import Inventory from './Inventory';

import { getInventory, getSupply } from '../../api/analytics';

export default function Analytics() {
  const [dataLine, setDataLine] = useState(undefined);
  const [dataDoughnut, setDataDoughnut] = useState(undefined);
  const [inventory, setInventory] = useState(undefined);
  const [selected, setSelected] = useState('GEL ULTSOUND AQUASONIC .25L');

  useEffect(() => {
    async function getSupplyWrapper() {
      const response = await getSupply(selected);
      const newData = response?.reverse().map((item) => {
        const date = new Date(item.date);
        item.date = `${date.getMonth() + 1}-${date.getDate()}`;
        return item;
      });
      console.log('testing github actions');
      setDataLine(newData);
    }

    async function getInventoryWrapper() {
      const response = await getInventory();
      const inventoryMap = new Map();
      const inventoryList = [];

      response?.forEach((supply) => {
        if (inventoryMap.has(supply.category)) {
          inventoryMap.set(supply.category, inventoryMap.get(supply.category) + supply.quantity);
        } else {
          inventoryMap.set(supply.category, supply.quantity);
        }
      });

      inventoryMap.forEach((value, key) => {
        inventoryList.push({ name: key, quantity: value });
      });

      getSupplyWrapper();

      setDataDoughnut(inventoryList);
      setInventory(response);
    }
    getInventoryWrapper();
  }, []);

  return (
    <div data-testid="analyticsmain" className="grid grid-cols-12 grid-rows-4 gap-y-4 p-6 w-full h-full">
      <div className="rounded-lg bg-gray-50 col-span-6 mr-3">
        <Overview />
      </div>
      <div className="rounded-lg bg-gray-50 col-span-6 ml-3">
        <MostUsed />
      </div>
      <div className="rounded-lg col-span-12 p-2 pb-12 row-span-2 bg-gray-50">
        <SupplyCombobox selected={selected} setSelected={setSelected} setDataLine={setDataLine} />
        {dataLine && (
          <SupplyDataLine dataLine={dataLine} />
        )}
      </div>
      <div className="rounded-lg bg-gray-50 col-span-3 px-3 py-2">
        <CategoricalBreakdown dataDoughnut={dataDoughnut} />
      </div>
      <div className="bg-gray-50 rounded-lg col-span-9 ml-6 px-3 py-1">
        <Inventory inventory={inventory} />
      </div>
    </div>
  );
}
