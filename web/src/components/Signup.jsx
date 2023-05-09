import React from 'react';
import './App.css';
import SignupLayout from './Signup/SignupLayout';

function Signup() {
  return (
    <div className="flex">
      <div className="w-full -translate-x-64 sm:translate-x-0 transition-transform">
        <SignupLayout />
      </div>
    </div>
  );
}

export default Signup;
