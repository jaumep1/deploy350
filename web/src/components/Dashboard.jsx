import React, { useEffect } from 'react';
import {
  Routes, Route, useNavigate,
} from 'react-router-dom';

import Analytics from './analytics/Analytics';
import Checkout from './Checkout';
import History from './history/History';
import Navbar from './layout/Navbar';
import Sidebar from './layout/Sidebar';
import BottomInfo from './layout/BottomInfo';
import Home from './Home';
import SearchPage from './SearchPage';
import ItemPage from './ItemPage';
import FrequentlyOrderedPage from './FrequentlyOrderedPage';
import Confirm from './Confirm';
import CurrentOrdersNurse from './CurrentOrdersNurse';
import IncomingOrders from './IncomingOrders';
import CurrentOrders from './CurrentOrders';
import PastOrders from './PastOrders';
import Settings from './Settings';

function Dashboard() {
  const navigate = useNavigate();
  const isNurseView = localStorage.getItem('role') === 'Nurse';
  // const [allCartItems, setAllCartItems] = useState([]);

  // const recheckInfo = () => {
  //   getCartItems().then(res => {
  //     if (res.length > 0) {
  //       setAllCartItems(res);
  //     } else {
  //       setAllCartItems([]);
  //     }
  //   });
  // };

  useEffect(() => {
    const loggedInUser = localStorage.getItem('userid');
    if (loggedInUser === 'null' || loggedInUser === null) {
      navigate('/login');
    }

    // recheckInfo();
  }, []);

  // const removeDisplayItem = id => {
  //   const exist = allCartItems.find(x => x.id === id);
  //   if (exist) {
  //     setAllCartItems(
  //       allCartItems.filter(x => x.id !== id),
  //     );
  //     removeCartItem(id).then(res => {
  //       recheckInfo();
  //     });
  //   }
  // };

  return (
    <div className="flex">
      {!(localStorage.getItem('userid') === 'null' || localStorage.getItem('userid') === null) && (
        <>
          <div className="flex-none w-64 -translate-x-64 sm:translate-x-0 transition-transform">
            <Sidebar isNurseView={isNurseView}>
              <BottomInfo />
            </Sidebar>
          </div>
          <div className="w-full -translate-x-64 sm:translate-x-0 transition-transform overflow-hidden">
            <Navbar>Pick.it</Navbar>
            <div className="mainComponent h-[93vh] w-[100vh - 16rem] overflow-scroll">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/frequent" element={<FrequentlyOrderedPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/item" element={<ItemPage />} />
                <Route path="/confirmation" element={<Confirm />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/productHistory" element={<History />} />
                <Route path="/tracking" element={<CurrentOrdersNurse />} />
                <Route path="/incomingOrders" element={<IncomingOrders />} />
                <Route path="/currentOrders" element={<CurrentOrders />} />
                <Route path="/pastOrders" element={<PastOrders nurseView={isNurseView} />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
