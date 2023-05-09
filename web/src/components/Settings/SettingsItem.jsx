/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getUserSettings } from '../../api/login';

export default function SettingsItem({ item }) {
  const toRender = item;

  const navigate = useNavigate();
  const loggedInUser = localStorage.getItem('userid');

  if (loggedInUser == null) {
    navigate('/login');
  }

  const [attr, setAttr] = useState(`Default ${toRender.attr}`);

  getUserSettings(loggedInUser).then((res) => {
    setAttr(res.data[toRender.attr]);
  }).catch((err) => console.log(err));

  return (
    <div className="col-span-2">
      <p className="font-semibold">{toRender.title}</p>

      {(toRender.type === 'textbox' || toRender.type === 'dropdown')
                && <p>{attr}</p>}
      {(toRender.type === 'checkbox')
                    && toRender.values.map((object) => (
                      <div className="inline-block mr-4">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500focus:ring-2 mr-1"
                          attr={object.attr}
                          checked={attr}
                          readOnly
                        />
                        {object.title}
                      </div>
                    ))}
      {(toRender.type === 'toggle')
                    && (
                    <label htmlFor="checkbox" className="relative inline-flex items-center cursor-pointer mt-1">
                      <input
                        type="checkbox"
                        checked={attr}
                        className="sr-only peer"
                        attr={toRender.attr}
                        readOnly
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
                    </label>
                    )}
    </div>
  );
}
