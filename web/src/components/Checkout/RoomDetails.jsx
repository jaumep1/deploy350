/* eslint-disable react/prop-types */
import React from 'react';
import SettingsItemsEditing from '../Settings/SettingsItemsEditing';

export default function RoomDetailsCard({ items, title }) {
  const toRender = items;

  return (
    <div
      className="block rounded-lg bg-white shadow-lg pb-2"
    >
      <div
        className="border-b-2 rounded-tr-lg rounded-tl-lg border-neutral-100 bg-gray-100 py-3 px-6 font-semibold"
      >
        <div>
          {title}
        </div>
      </div>
      <div className="my-4 mx-6 grid grid-cols-4 gap-0.5">
        {toRender.map((object, i) => <SettingsItemsEditing item={object} key={`${i + object}`} />)}
      </div>
    </div>
  );
}
