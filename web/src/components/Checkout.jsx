import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cart from './Cart';
import PersonalInfoCard from './Checkout/PersonalInfo';
import RoomDetailsCard from './Checkout/RoomDetails';
import './App.css';
import { getCartItems, removeCartItem } from '../fetcher';
import checkoutOrder from '../api/checkout';

function Checkout() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCartItems().then((res) => {
      if (res.length > 0) {
        setCart(res);
      } else {
        setCart([]);
      }
    });
  }, []);

  const removeDisplayItem = (id) => {
    const exist = cart.find((x) => x.id === id);

    if (exist) {
      const newCart = cart.filter((x) => x.id !== id);
      setCart(newCart);
      removeCartItem(id);
      return undefined;
    }
    return undefined;
  };

  const onClickCheckout = () => {
    checkoutOrder(cart);
    navigate('/confirmation');
  };

  return (
    <>
      <header className="relative m-0 pb-3 mb-0 pl-5 pt-3 pr-5">
        <div className="text-2xl font font-bold pt-0 mt-2 text-black pb-1">
          Checkout
        </div>
      </header>
      <div className="my-6 mx-8 gap-4 grid grid-flow-row-dense grid-cols-4 ...">
        <div className="col-span-2">
          <PersonalInfoCard
            title="Personal Details"
            items={[{ title: 'Full Name', type: 'textbox' },
              { title: 'Email Address', type: 'textbox' }]}
          />
          <div className="my-4">
            <RoomDetailsCard
              title="Room Details"
              items={[{ title: 'Delivery Unit', type: 'dropdown' },
                { title: 'Delivery Room Number', type: 'dropdown' }]}
            />
          </div>
          <button type="button" onClick={onClickCheckout} className="bg-green-300 hover:bg-green-400 text-gray-900 rounded w-full p-0.5">
            <span className="mx-2">Confirm</span>
          </button>
        </div>

        <div className="col-span-2">
          <div
            className="block rounded-lg bg-white "
          >
            <div
              className="border-b-2 rounded-tr-lg rounded-tl-lg border-neutral-100 bg-gray-100 py-3 px-6   font-semibold"
            >
              <div>
                Order Summary
              </div>
            </div>
          </div>
          <Cart allCartItems={cart} removeDisplayItem={removeDisplayItem} />
        </div>
      </div>
    </>
  );
}

export default Checkout;
