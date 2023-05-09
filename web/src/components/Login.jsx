import React from 'react';
import './App.css';
import LoginLayout from './Login/LoginLayout';

function Login() {
  return (
    <div className="flex">
      <div className="w-full -translate-x-64 sm:translate-x-0 transition-transform">
        <LoginLayout />
      </div>
    </div>
  );
}

export default Login;
