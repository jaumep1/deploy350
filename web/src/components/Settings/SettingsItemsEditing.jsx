/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/no-unknown-property */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getUserSettings } from '../../api/login';

export default function SettingsItemEditing({ item }) {
  const toRender = item;

  const navigate = useNavigate();
  const loggedInUser = localStorage.getItem('userid');

  if (loggedInUser == null) {
    navigate('/login');
  }

  const [attr, setAttr] = useState(false);

  useEffect(() => {
    getUserSettings(loggedInUser).then((res) => {
      setAttr(res.data[toRender.attr]);
    }).catch((err) => err);
  }, []);

  return (
    <div className="col-span-2">
      <p className="font-semibold">{toRender.title}</p>
      {(toRender.type === 'textbox')
                && (
                <input
                  className="border rounded p-1.5 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  attr={toRender.attr}
                  value={attr}
                  onChange={(e) => setAttr(e.target.value)}
                />
                )}
      {(toRender.type === 'dropdown')
                && (
                <select
                  className="block w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                  attr={toRender.attr}
                  value={attr}
                  onChange={(e) => setAttr(e.target.value)}
                >
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </select>
                )}
      {(toRender.type === 'checkbox')
                && toRender.values.map((object) => (
                  <div className="inline-block mr-4">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 mr-1"
                      attr={object.attr}
                      checked={attr}
                      onChange={(e) => setAttr(e.target.checked)}
                    />
                    {object.title}
                  </div>
                ))}
      {(toRender.type === 'toggle')
                && (
                // eslint-disable-next-line jsx-a11y/label-has-associated-control
                <label className="relative inline-flex items-center cursor-pointer mt-1">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    attr={toRender.attr}
                    checked={attr}
                    onChange={(e) => setAttr(e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
                </label>
                )}
    </div>
  );
}
