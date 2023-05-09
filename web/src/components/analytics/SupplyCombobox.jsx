/* eslint-disable react/prop-types */
/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/role-has-required-aria-props */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import React, { Fragment, useState, useEffect } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import Check from '../../assets/Check';
import ThreeDots from '../../assets/ThreeDots';

import { getSupply, getAllSupplies } from '../../api/analytics';

function SupplyCombobox({ selected, setSelected, setDataLine }) {
  const [query, setQuery] = useState('');
  const [supplies, setSupplies] = useState([]);

  const filteredSupplies = query === ''
    ? supplies
    : supplies.filter((supply) => supply.toLowerCase().includes(query.toLowerCase()));

  function changeSelected(supply) {
    async function getSupplyWrapper() {
      const response = await getSupply(supply);
      const newData = response?.reverse().map((item) => {
        const date = new Date(item.date);
        item.date = `${date.getMonth() + 1}-${date.getDate()}`;
        return item;
      });

      setDataLine(newData);
      setSelected(supply);
    }
    getSupplyWrapper();
  }

  useEffect(() => {
    async function getAllSuppliesWrapper() {
      const response = await getAllSupplies();
      const namedSupplies = new Set();
      response?.forEach((item) => {
        namedSupplies.add(item.name);
      });
      setSupplies(Array.from(namedSupplies));
    }
    getAllSuppliesWrapper();
  }, []);

  return (
    <Combobox data-testid="supplycombobox" className="bg-gray-50 w-1/3" onChange={(supply) => changeSelected(supply)}>
      <div className="relative">
        <div
          className="relative w-full cursor-default p-1 overflow-hidden rounded-lg
          text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white
          focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm"
        >
          <Combobox.Input
            id="supplycombobox"
            role="combobox"
            className="w-full border-none bg-white py-2 pl-3 pr-10 text-sm leading-5  text-gray-900"
            displayValue={() => selected}
            placeholder={`${selected || 'Select a supply...'}`}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ThreeDots />
          </Combobox.Button>
        </div>
        {/* Options for the combobox */}
        <Transition
          role="option"
          as={Fragment}
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery('')}
          style={{ zIndex: 10 }}
        >
          <Combobox.Options
            role="option"
            className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1
            text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            {/* Filter the courses based on the query and display the courses that you found */}
            {filteredSupplies.length === 0 && query !== '' ? (
              <div role="option" className="relative cursor-default select-none py-2 px-4 text-gray-700">
                Nothing found.
              </div>
            ) : (
              filteredSupplies.map((course) => (
                <Combobox.Option
                  role="option"
                  key={course.id + course.name}
                  className={({ active }) => `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-teal-600 text-white' : 'text-gray-900'
                  }`}
                  value={course}
                >
                  <>
                    <span role="option" className={`block truncate ${selected === course ? 'font-medium' : 'font-normal'}`}>
                      {course}
                    </span>
                    {selected === course
                      ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-teal-400">
                          <Check />
                        </span>
                      )
                      : null}
                  </>
                </Combobox.Option>
              )))}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
}

export default SupplyCombobox;
