/* eslint-disable react/prop-types */
import React from 'react';

export default function HistoryCard({
  placedOn,
  total,
  shipTo,
  orderNumber,
  updatedOn,
  status,
  product,
  lawson,
  category,
}) {
  return (
    <div className="mx-auto w-[60vw] my-4">
      <div className="rounded-t-2xl h-16 flex flex-row border border-1 bg-gray-100 items-center">
        <div className="grid grid-cols-1 mx-6 h-fit py-auto">
          <span className="text-sm">
            Order Placed:
          </span>
          <span>
            {placedOn.toLocaleDateString(undefined, {
              year: 'numeric', month: 'long', day: 'numeric',
            })}
          </span>
        </div>
        <div className="grid grid-cols-1 mx-6 h-fit py-auto">
          <span className="text-sm">
            Total:
          </span>
          <span>
            $
            {total}
          </span>
        </div>
        <div className="grid grid-cols-1 mx-6 h-fit py-auto">
          <span className="text-sm">
            Ship To:
          </span>
          <span>
            {shipTo}
          </span>
        </div>
        <div className="grid grid-cols-1 ml-auto mr-6 h-fit py-auto">
          <span className="text-sm">
            Order Number:
          </span>
          <span>
            {orderNumber}
          </span>
        </div>
      </div>
      <div className="rounded-b-2xl h-56 border border-1 p-4 px-6 border-t-0 flex flex-row">
        <div>
          {
          status === 'delivered' && (
            <>
              <h1 className="text-xl font-semibold">
                Delivered on
                {' '}
                {updatedOn.toLocaleDateString(undefined, {
                  month: 'long', day: 'numeric',
                })}
                ,&nbsp;
                {
                   updatedOn.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', minimumIntegerDigits: 1 })
                }
              </h1>
              <div className="text-sm">Product was placed in pickup zone</div>
            </>
          )
        }
          {
          status === 'pickedUp' && (
            <>
              <h1 className="text-2xl">
                Picked up on
                {' '}
                {updatedOn.toLocaleDateString(undefined, {
                  weekday: 'long', time: 'long',
                })}
              </h1>
              <div className="text-sm">Product is on its way!</div>
            </>
          )
        }
          {
          status === 'pendingPickUp' && (
            <>
              <h1 className="text-2xl">
                Pending
              </h1>
              <div className="text-sm">Product has not been picked up yet</div>
            </>
          )
        }
          <div className="flex flex-row py-4">
            <div className="px-auto py-auto w-28 h-28 bg-red-500">
              <img src="https://cdn.dotmed.com/images/listingpics2/4/5/0/5/4505631.jpg" alt="product" />
            </div>
            <div className="flex flex-col px-2">
              <div className="font-semibold text-lg">{product}</div>
              <div className="opacity-60 -mt-1 font-semibold">{category}</div>
              <div className="mb-2 text-sm font-semibold">
                Lawson #
                {lawson}
                {' '}
&nbsp;
              </div>
              <div className="flex flex-row">
                <button type="button" className="text-white bg-blue-700 border border-blue-700 hover:border-blue-800 hover:bg-blue-800 shadow-md mr-2 font-medium h-fit rounded-lg text-sm px-4 py-2">Buy Again</button>
                <button type="button" className="text-gray-800 border border-gray-400 hover:bg-gray-100 shadow-md font-medium h-fit rounded-lg text-sm px-4 py-2">View Item</button>
              </div>
            </div>
          </div>
        </div>
        <div className="ml-auto flex flex-col mt-4">
          <button type="button" className="text-gray-800 border my-4 border-gray-400 hover:bg-gray-100 shadow-md font-medium h-fit rounded-lg text-sm px-8 py-2">Return Supply</button>
          <button type="button" className="text-gray-800 border border-gray-400 hover:bg-gray-100 shadow-md font-medium h-fit rounded-lg text-sm px-8 py-2">Get Support</button>
        </div>
      </div>
    </div>
  );
}
