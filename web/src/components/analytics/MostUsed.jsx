/* eslint-disable jsx-a11y/aria-role */
import React, { useEffect, useState } from 'react';
import { getCategories } from '../../api/analytics';

function MostUsed() {
  const [categories, setCategories] = useState(undefined);

  useEffect(() => {
    async function getCategoriesWrapper() {
      const response = await getCategories();
      setCategories(response);
    }
    getCategoriesWrapper();
  }, []);

  return (
    <div id="mostUsed" className="mx-3 mt-2">
      <div className="text-lg tracking-wide font-semibold mb-1">
        Most Used Supplies
      </div>
      <table className="table-fixed w-full">
        <thead className="text-left">
          <tr>
            <th className="font-medium opacity-60">Category</th>
            <th className="font-medium opacity-60">Quantity Used</th>
            <th className="font-medium opacity-60">Percent Change</th>
          </tr>
        </thead>
        <tbody role="categories-table" className="bg-grey-light items-center justify-between overflow-y-scroll w-full" style={{ height: '5vh' }}>
          {
              categories?.map((item) => (
                <tr key={item.id} className="border-t-[1px] leading-7 border-gray-200">
                  <td>{item.category}</td>
                  <td>{item.change}</td>
                  <td>{item.percentage}</td>
                </tr>
              ))
            }
        </tbody>
      </table>
    </div>
  );
}

export default MostUsed;
