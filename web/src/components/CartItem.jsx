/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { updateQuantity } from '../fetcher';

export default function CartItem({
  itemName, lawsonNumber, itemQuantity, itemImg, onRemove,
}) {
  const [quantity, setQuantity] = useState(itemQuantity);

  const updateDisplayQuantity = (id, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(id, newQuantity).then(() => {
        if (newQuantity >= 1) {
          setQuantity(newQuantity);
        }
      });
    }
  };
  return (
    <div>
      <div className="mb-3 mt-3 pt-3 pb-3 group flex bg-white  rounded-xl pl-3 pr-3" id={lawsonNumber}>
        <div className=" col-6 flex p-0 min-w-fit">
          <img className="static aspect-square w-24 min-w-0" src={itemImg} alt="React" />
        </div>
        <div className="col-6 ml-2 flex w-full pl-6">
          <div className="container">
            <div className="pb-0 mb-0 rounded-lg">
              <div className="text-md  font-bold text-gray-900 mt-1 mb-0 pb-0">{itemName}</div>
              <div className="font-['Work Sans'] text-base font-medium text-gray-500 pb-2 pt-0 mt-0 mb-0 ">
                Lawson:
                {' '}
                { lawsonNumber}
              </div>
              <div className="flex justify-left">
                <div className="flex justify-center">
                  <div>
                    <img data-testid="cartincrease" alt="placeholder" src="https://cdn-icons-png.flaticon.com/512/649/649762.png" onClick={() => updateDisplayQuantity(lawsonNumber, quantity + 1)} width="15" />
                    <img data-testid="cartdecrease" alt="placeholder" src="https://cdn-icons-png.flaticon.com/512/9694/9694611.png" onClick={() => updateDisplayQuantity(lawsonNumber, quantity - 1)} width="15" />
                  </div>
                  <div className="mt-0.5 ml-2 text-base font-bold">
                    {' '}
                    {quantity}
                    {' '}
                  </div>
                </div>
                <div className="text-xs text-black-500 ml-3">
                  <button data-testid="cartremove" type="submit" onClick={() => { console.log(lawsonNumber); onRemove(lawsonNumber); }} className="text-white  bg-red-700 hover:bg-red-800  font-medium rounded-lg text-sm px-2 py-1 "> Remove from Cart</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
