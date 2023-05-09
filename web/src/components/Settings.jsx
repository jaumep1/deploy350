import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './layout/Navbar';
import SettingsLayout from './Settings/SettingsLayout';

export default function Settings() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('userid');
    localStorage.removeItem('role');
    navigate('/login');
  };

  // useEffect(() => {
  //   const loggedInUser = localStorage.getItem('userid');
  //   if (loggedInUser === 'null' || loggedInUser === null) {
  //     navigate('/login');
  //   }
  // }, []);

  return (
    <div className="flex">
      <div className="flex-none w-64 bg-gray-50 h-screen">
        <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
          <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50">
            <div className="mx-3 my-4 gap-2 grid grid-flow-row-dense grid-cols-4 ...">
              <div className="col-span-4">
                <a href="/">
                  <button type="button" className="text-gray-600 rounded w-full p-0.5">
                    <svg className="fixed w-6 items-center cursor-pointer left-5 z-50 hover:" viewBox="0 0 20 20">
                      <path d="M11.739,13.962c-0.087,0.086-0.199,0.131-0.312,0.131c-0.112,0-0.226-0.045-0.312-0.131l-3.738-3.736c-0.173-0.173-0.173-0.454,0-0.626l3.559-3.562c0.173-0.175,0.454-0.173,0.626,0c0.173,0.172,0.173,0.451,0,0.624l-3.248,3.25l3.425,3.426C11.911,13.511,11.911,13.789,11.739,13.962 M18.406,10c0,4.644-3.763,8.406-8.406,8.406S1.594,14.644,1.594,10S5.356,1.594,10,1.594S18.406,5.356,18.406,10 M17.521,10c0-4.148-3.373-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.148,3.374,7.521,7.521,7.521C14.147,17.521,17.521,14.148,17.521,10" />
                    </svg>
                    <span className="hover:font-semibold">Back to Home Page</span>
                  </button>
                </a>
              </div>
            </div>
          </div>
          <div className="fixed w-64 left-0 bg-gray-50 bottom-0">
            <div className="mx-5 my-8 gap-2 grid grid-flow-row-dense grid-cols-4 ...">
              <div className="col-span-4">
                <button type="button" className="bg-gray-300 hover:bg-gray-400 text-gray-600 rounded w-full p-0.5" onClick={logout}>
                  <svg className="w-5 h-5 inline" viewBox="0 0 20 20" transform="matrix(-1,0,0,1,0,0)">
                    <path d="M1 1L8 1V2L2 2L2 13H8V14H1L1 1ZM10.8536 4.14645L14.1932 7.48614L10.8674 11.0891L10.1326 10.4109L12.358 8L4 8V7L12.2929 7L10.1464 4.85355L10.8536 4.14645Z" fill="#000000" />
                  </svg>
                  <span className="mx-2">Log Out</span>
                </button>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <div className="w-full -translate-x-64 sm:translate-x-0 transition-transform">
        <Navbar className="relative top-0">Settings</Navbar>
        <div className="mainComponent h-[93vh] w-[100vh - 16rem] overflow-scroll">
          <SettingsLayout />
        </div>
      </div>
    </div>
  );
}
