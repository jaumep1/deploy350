/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const { rootURL } = require('../../utils/utils');

export default function LoginLayout() {
  const domain = rootURL;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    if (event.key === 'Enter' || event.target.id === 'submit') {
      if (username.length === 0) {
        toast.error('Username must be filled', { duration: 1000 });
      } else if (password.length === 0) {
        toast.error('Password must be filled', { duration: 1000 });
      } else {
        const payload = {
          email: username,
          password,
        };
        fetch(`${domain}/api/login`, {
          method: 'POST',
          mode: 'cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }).then((res) => {
          if (res.status === 201) {
            res.json().then((data) => {
              localStorage.setItem('userid', data.data.userid);
              localStorage.setItem('role', data.data.role);
              toast.success('Logged in!');
              navigate('/');
            });
          } else {
            toast.error('Username or password is incorrect', { duration: 1000 });
          }
        });
      }
    }
  };

  return (
    <div style={{ height: '100vh', padding: '5vh' }} className="w-100">
      <div
        className="d-flex mb-[20vh] w-fit mx-auto justify-content-center"
      >
        <svg width="32" height="32" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M776.533 998.4C750.933 998.4 733.867 981.333 733.867 955.733V866.133C733.867 840.533 750.933 823.467 776.533 823.467C802.133 823.467 819.2 840.533 819.2 866.133V955.733C819.2 981.333 797.867 998.4 776.533 998.4Z" fill="#59D189" />
          <path d="M366.933 998.4H320C243.2 998.4 179.2 934.4 179.2 857.6V533.333C179.2 507.733 196.267 490.667 221.867 490.667C247.467 490.667 264.533 507.733 264.533 533.333V857.6C264.533 887.466 290.133 913.066 320 913.066H366.933C396.8 913.066 422.4 887.466 422.4 857.6V780.8C422.4 755.2 439.467 738.133 465.067 738.133C490.667 738.133 507.733 755.2 507.733 780.8V857.6C507.733 934.4 443.733 998.4 366.933 998.4ZM132.267 537.6C123.733 537.6 115.2 533.333 106.667 529.066C38.4 482.133 0 401.067 0 320V85.3332C0 59.7332 17.0667 42.6665 42.6667 42.6665H157.867C183.467 42.6665 200.533 59.7332 200.533 85.3332C200.533 110.933 183.467 128 157.867 128H85.3333V320C85.3333 375.467 110.933 426.667 157.867 456.533C179.2 469.333 183.467 494.933 166.4 516.267C157.867 529.067 145.067 537.6 132.267 537.6Z" fill="#2B4832" />
          <path d="M221.867 576C196.267 576 179.2 558.933 179.2 533.333C179.2 507.733 196.267 490.667 221.867 490.667C315.733 490.667 388.267 413.867 388.267 324.267V128H320C294.4 128 277.333 110.933 277.333 85.3332C277.333 59.7332 294.4 42.6665 320 42.6665H435.2C460.8 42.6665 477.867 59.7332 477.867 85.3332V320C473.6 460.8 362.667 576 221.867 576ZM776.533 891.733C699.733 891.733 635.733 827.733 635.733 750.933V328.533C635.733 302.933 652.8 285.866 678.4 285.867C704 285.867 721.067 302.933 721.067 328.533V750.933C721.067 780.8 746.667 806.4 776.533 806.4C806.4 806.4 832 780.8 832 750.933V264.533H674.133C648.533 264.533 631.467 247.466 631.467 221.867C631.467 196.267 648.533 179.2 674.133 179.2H874.667C900.267 179.2 917.333 196.267 917.333 221.867V755.2C917.333 832 853.333 891.733 776.533 891.733Z" fill="#2B4832" />
          <path d="M776.533 264.533C750.933 264.533 733.867 247.467 733.867 221.867V102.4C733.867 76.8001 750.933 59.7334 776.533 59.7334C802.133 59.7334 819.2 76.8001 819.2 102.4V221.867C819.2 243.2 797.867 264.533 776.533 264.533Z" fill="#2B4832" />
          <path d="M951.467 264.534H597.333C571.733 264.534 554.667 247.467 554.667 221.867C554.667 196.267 571.733 179.2 597.333 179.2H947.2C972.8 179.2 989.867 196.267 989.867 221.867C989.867 247.467 972.8 264.534 951.467 264.534Z" fill="#2B4832" />
          <path d="M465.067 802.133C392.533 802.133 337.067 742.4 337.067 674.133C337.067 601.6 396.8 546.133 465.067 546.133C537.6 546.133 593.067 605.867 593.067 674.133C593.067 746.667 537.6 802.133 465.067 802.133ZM465.067 631.466C439.467 631.466 422.4 652.8 422.4 674.133C422.4 699.733 443.733 716.8 465.067 716.8C490.667 716.8 507.733 695.467 507.733 674.133C507.733 648.533 490.667 631.466 465.067 631.466ZM776.533 793.6C750.933 793.6 733.867 776.533 733.867 750.933V546.133C733.867 520.533 750.933 503.467 776.533 503.467C802.133 503.467 819.2 520.533 819.2 546.133V750.933C819.2 776.533 797.867 793.6 776.533 793.6ZM874.667 128H674.133C648.533 128 631.467 110.933 631.467 85.3332C631.467 59.7332 648.533 42.6665 674.133 42.6665H874.667C900.267 42.6665 917.333 59.7332 917.333 85.3332C917.333 110.933 896 128 874.667 128Z" fill="#59D189" />
        </svg>
      </div>
      <div className="text-center mb-4 text-2xl font-semibold">Pick.It Login</div>
      <div className="mx-auto w-[22vw]">
        <div className="relative my-4">
          <input
            type="text"
            id="username"
            className="block px-2.5 pb-3 py-4 mt-4 pl-3 w-full border border-1 text-gray-900 bg-transparent rounded border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-teal-500 peer"
            placeholder=" "
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleSubmit}
          />
          <label htmlFor="floating_outlined" className="pointer-events-none bg-white absolute text-gray-500 duration-100 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-whitepx-2 peer-focus:px-2 peer-focus:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-4 peer-focus:left-2">Username</label>
        </div>
        <div className="relative my-4">
          <input
            type="password"
            id="password"
            className="block px-2.5 pb-3 py-4 mt-4 pl-3 w-full border border-1 text-gray-900 bg-transparent rounded border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-teal-500 peer"
            placeholder=" "
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleSubmit}
          />
          <label htmlFor="floating_outlined" className="pointer-events-none bg-white absolute text-gray-500 duration-100 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-whitepx-2 peer-focus:px-2 peer-focus:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-4 peer-focus:left-2">Password</label>
        </div>
      </div>
      <div className="m-auto text-center mb-3">
        <button
          type="button"
          id="submit"
          onClick={(e) => handleSubmit(e)}
          className="text-white w-[22vw] bg-teal-600 mt-4 active:scale-95 hover:bg-teal-500 duration-150 font-medium rounded px-5 py-4 focus:outline-none"
        >
          Continue
        </button>
      </div>
      <p className="m-auto text-center text-sm">
        Dont have an account?
        {' '}
        <a href="/signup" className="text-teal-500 no-underline hover:underline">
          Sign up
        </a>
      </p>
    </div>
  );
}
