/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import NotificationWrapper from '../tracking_components/NotificationWrapper';
import Cart from '../Cart';

export default function Rightbar({
  children, allCartItems, removeDisplayItem, notifView,
}) {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div>
      {showSidebar ? (
        <button
          type="button"
          aria-label="close"
          className="fixed w-8 items-center cursor-pointer right-10 top-3 z-50 ease-in-out duration-150"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <svg className="svg-icon" viewBox="0 0 20 20">
            <path d="M10.185,1.417c-4.741,0-8.583,3.842-8.583,8.583c0,4.74,3.842,8.582,8.583,8.582S18.768,14.74,18.768,10C18.768,5.259,14.926,1.417,10.185,1.417 M10.185,17.68c-4.235,0-7.679-3.445-7.679-7.68c0-4.235,3.444-7.679,7.679-7.679S17.864,5.765,17.864,10C17.864,14.234,14.42,17.68,10.185,17.68 M10.824,10l2.842-2.844c0.178-0.176,0.178-0.46,0-0.637c-0.177-0.178-0.461-0.178-0.637,0l-2.844,2.841L7.341,6.52c-0.176-0.178-0.46-0.178-0.637,0c-0.178,0.176-0.178,0.461,0,0.637L9.546,10l-2.841,2.844c-0.178,0.176-0.178,0.461,0,0.637c0.178,0.178,0.459,0.178,0.637,0l2.844-2.841l2.844,2.841c0.178,0.178,0.459,0.178,0.637,0c0.178-0.176,0.178-0.461,0-0.637L10.824,10z" />
          </svg>
        </button>
      ) : (
        <button
          type="button"
          aria-label="open"
          className="fixed w-8 items-center cursor-pointer right-10 top-3 z-50 ease-in-out duration-150"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <svg className="svg-icon" viewBox="0 0 20 20">
            <path d="M10,1.445c-4.726,0-8.555,3.829-8.555,8.555c0,4.725,3.829,8.555,8.555,8.555c4.725,0,8.555-3.83,8.555-8.555C18.555,5.274,14.725,1.445,10,1.445 M10,17.654c-4.221,0-7.654-3.434-7.654-7.654c0-4.221,3.433-7.654,7.654-7.654c4.222,0,7.654,3.433,7.654,7.654C17.654,14.221,14.222,17.654,10,17.654 M14.39,10c0,0.248-0.203,0.45-0.45,0.45H6.06c-0.248,0-0.45-0.203-0.45-0.45s0.203-0.45,0.45-0.45h7.879C14.187,9.55,14.39,9.752,14.39,10 M14.39,12.702c0,0.247-0.203,0.449-0.45,0.449H6.06c-0.248,0-0.45-0.202-0.45-0.449c0-0.248,0.203-0.451,0.45-0.451h7.879C14.187,12.251,14.39,12.454,14.39,12.702 M14.39,7.298c0,0.248-0.203,0.45-0.45,0.45H6.06c-0.248,0-0.45-0.203-0.45-0.45s0.203-0.45,0.45-0.45h7.879C14.187,6.848,14.39,7.051,14.39,7.298" />
          </svg>
        </button>
      )}
      <div className="grid grid-cols-8 gap-1">
        <div className={`fixed z-40 overflow-scroll ${
          showSidebar ? 'h-[93vh]' : 'invisible'
        } right-0 bg-gray-50 ...  px-4 w-[32rem]`}
        >
          <div className="flex justify-center text-lg mt-4 font-bold text-bold pb-4 border-b-2 w-full">Your Notifications</div>
          <NotificationWrapper currentViewStatus={notifView} />
          <div className="flex justify-center text-lg mt-4 font-bold text-bold pb-4 border-b-2 w-full">Your Cart</div>
          <div className="h-fit">
            <Cart allCartItems={allCartItems} removeDisplayItem={removeDisplayItem} />
          </div>
          <div className="flex border-t-2 justify-center text-lg mt-4 font-bold text-bold mb-4">
            <a href="/checkout">
              <button type="submit" onClick={() => {}} className="text-white  bg-black hover:bg-slate-800  font-lg rounded-lg text-l g mt-3 px-8 py-2 "> Proceed to Checkout </button>
            </a>
          </div>
        </div>
        <div className={`flex col-start-1 ${
          showSidebar ? 'col-span-6' : 'col-span-9'
        }  ...`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
