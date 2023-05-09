import React, { useState, useEffect } from 'react';
import CartReadOnly from './CartReadOnly';
import './App.css';
import { getCartItems } from '../fetcher';

function Confirm() {
  const [cart, setCart] = useState([]);
  const currentUser = localStorage.getItem('userid');

  useEffect(() => {
    getCartItems().then((res) => {
      if (res.length > 0) {
        setCart(res);
      } else {
        setCart([]);
      }
    });
  }, []);

  return (
    <>
      <header className="relative m-0 pb-3 mb-0 pl-5 pt-3 pr-5">
        <div className="text-2xl font font-bold pt-0 mt-2 text-black pb-1">
          Confirmation
        </div>
      </header>
      <div className="my-4 mx-8 gap-4 grid grid-flow-row-dense grid-cols-4">
        {/* NEED TO PUT ORDER CONFIRMATION INFO - I.E. WHICH ROOM IT WENT TO */}
        <div className="col-span-2">
          <p className="my-2">
            Order # 1535 for $
            {currentUser}
            {' '}
            has been processed. Please proceed to “Tracking” to monitor your order.
          </p>
          <div
            className="block rounded-lg bg-white"
          >
            <div
              className="border-b-2 rounded-tr-lg rounded-tl-lg border-neutral-100 bg-gray-100 py-3 px-6   font-semibold"
            >
              <div>
                Order Summary
              </div>
            </div>
          </div>
          <CartReadOnly allCartItems={cart} removeDisplayItem={() => { }} />
        </div>
      </div>
    </>
  );
}

export default Confirm;
