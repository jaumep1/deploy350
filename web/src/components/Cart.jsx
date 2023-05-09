/* eslint-disable react/prop-types */
import React from 'react';
import CartItem from './CartItem';

export default function Cart({ allCartItems, removeDisplayItem }) {
  if (allCartItems !== undefined) {
    if (allCartItems.length === 0) {
      return (
        <div className="mt-6 p-2 font-medium text-md">
          Your cart is currently empty.
          You can add items to your cart using the green
          button on an item page or in search results.
        </div>
      );
    }
    return (
      <div className="max-w-42">
        {
          allCartItems.map(({
            id, name, image, description, quantity,
          }) => (
            <CartItem
              key={id}
              lawsonNumber={id}
              itemName={name}
              itemDescription={description}
              itemImg={image}
              itemQuantity={quantity}
              onRemove={removeDisplayItem}
            />
          ))
        }
      </div>
    );
  }
}
