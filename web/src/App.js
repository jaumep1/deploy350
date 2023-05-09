/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';

import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';

import Settings from './components/Settings';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="*" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
