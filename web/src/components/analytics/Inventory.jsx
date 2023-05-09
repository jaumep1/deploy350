/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/aria-role */
import React, { useState } from 'react';

function Inventory({ inventory }) {
  const [page, setPage] = useState(0);

  return (
    <>
      <div id="inventory" className="flex flex-row">
        <div className="text-lg tracking-wide font-semibold">
          Current Inventory
        </div>
        <div className="ml-auto w-fit mr-1">
          <ul className="inline-flex items-center -space-x-px">
            <li>
              <button role="left-button" type="button" onClick={() => setPage(Math.max(0, page - 1))} className="block py-1 text-gray-500 rounded-l-lg hover:text-gray-700">
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              </button>
            </li>
            <li>
              <button role="right-button" type="button" onClick={() => setPage(Math.min(Math.floor(inventory.length / 3), page + 1))} href="/" className="block py-1 leading-tight text-gray-500 rounded-r-lg hover:text-gray-700">
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <table className="table-fixed w-full">
        <thead className="text-left">
          <tr>
            <th className="w-[50%] font-medium opacity-60">Product</th>
            <th className="font-medium opacity-60">Lawson #</th>
            <th className="font-medium opacity-60">Category</th>
            <th className="font-medium opacity-60">Quantity</th>
          </tr>
        </thead>
        <tbody role="table-body" className="bg-grey-light items-center justify-between overflow-y-scroll w-full" style={{ height: '5vh' }}>
          {
              inventory?.slice(page * 3, page * 3 + 3)?.map((item) => (
                <tr key={item.id} className="border-t-[1px] leading-8 border-gray-200">
                  <td>{item.name}</td>
                  <td>{item.lawson}</td>
                  <td>{item.category}</td>
                  <td>{item.quantity}</td>
                </tr>
              ))
            }
        </tbody>
      </table>
    </>
  );
}

export default Inventory;
