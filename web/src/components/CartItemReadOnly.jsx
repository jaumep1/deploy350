/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { updateQuantity } from '../fetcher';

export default function CartItemReadOnly({
  itemName, lawsonNumber, itemQuantity, itemImg,
}) {
  const [quantity, setQuantity] = useState(itemQuantity);

  const updateDisplayQuantity = (id, newQuantity) => {
    if (newQuantity > 1 || newQuantity === 1) {
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
              <div className="text-md  font-bold text-gray-900 mt-1 mb-0 pb-0">
                {quantity}
                {' '}
                x
                {' '}
                {itemName}
              </div>
              <div className="font-['Work Sans'] text-base font-medium text-gray-500 pb-2 pt-0 mt-0 mb-0 ">
                Lawson:
                {' '}
                { lawsonNumber}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
