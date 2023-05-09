/* eslint-disable react/prop-types */
import React from 'react';
import SettingsItem from '../Settings/SettingsItem';

export default function PersonalInfoCard({ items, title }) {
  const toRender = items;

  return (
    <div className="w-full">
      <div
        className="rounded-lg bg-white shadow-lg pb-2"
      >
        <div
          className="border-b-2 rounded-tr-lg rounded-tl-lg border-neutral-100 bg-gray-100 py-3 px-6"
        >
          <div className="flex inline-center justify-between font-semibold">
            {title}
          </div>
        </div>
        <div className="my-4 mx-6 grid grid-cols-4 gap-4">
          {toRender.map((object, i) => <SettingsItem item={object} key={`${i + object}`} />)}
        </div>
      </div>

    </div>
  );
}
