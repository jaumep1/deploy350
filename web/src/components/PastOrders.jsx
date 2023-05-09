/* eslint-disable no-underscore-dangle */
import { React, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Rightbar from './layout/Rightbar';
import { getStoreroomPastOrders, getNursePastOrders, getItems } from '../api/deliveryApiCalls';
import PastOrderCard from './tracking_components/cards/PastOrderCard';

function PastOrders(props) {
  const { nurseView } = props;

  const [allOrders, setAllOrders] = useState([]);
  const [pastOrderDivs, setPastOrderDivs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [storedMap, setStoredMap] = useState(new Map());

  useEffect(() => {
    getItems()
      .then((res) => {
        const itemMap = new Map();
        res.forEach((item) => {
          itemMap.set(item._id, item);
        });
        setStoredMap(itemMap);

        const getPastOrders = nurseView ? getNursePastOrders : getStoreroomPastOrders;
        getPastOrders(localStorage.getItem('userid'))
          .then((pastOrders) => {
            setAllOrders(pastOrders);
            setPastOrderDivs(pastOrders.map((order) => (
              <div key={order._id} className="w-full flex justify-center">
                <PastOrderCard
                  count={order.count}
                  date={order.date}
                  cost={order.price}
                  shippingDetails={`${order.orderer}, ${order.orderLocation}`}
                  orderNumber={order._id}
                  statusDescription={order.statusMessage}
                  itemDetails={itemMap.get(order.itemID)}
                  showButton={nurseView}
                />
              </div>
            )));
          });
      });
  }, []);

  useEffect(() => {
    if (storedMap.size > 0) {
      setPastOrderDivs(allOrders.filter((o) => storedMap.get(o.itemID).name
        .toLowerCase()
        .includes(searchTerm
          .toLowerCase()))
        .map((order) => (
          <div key={order._id} className="w-full flex justify-center">
            <PastOrderCard
              count={order.count}
              date={order.date}
              cost={order.price}
              shippingDetails={`${order.orderer}, ${order.orderLocation}`}
              orderNumber={order._id}
              statusDescription={order.statusMessage}
              itemDetails={storedMap.get(order.itemID)}
              showButton={nurseView}
            />
          </div>
        )));
    }
  }, [searchTerm]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const searchBar = (
    <div className="flex justify-center">
      <div className="mb-3 xl:w-96">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <input
            type="search"
            className="relative m-0 -mr-px block w-[1%] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-1.5 text-base font-normal text-neutral-700 outline-none transition duration-300 ease-in-out focus:border-primary-600 focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="button-addon3"
            value={searchTerm}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>
    </div>
  );

  return (
    <Rightbar>
      <div className="flex w-full items-center flex-col">
        <div className="text-2xl font-bold p-6">Past Orders</div>
        <div className="flex flex-col gap-4 items-center w-full mb-8">
          {searchBar}
          {pastOrderDivs}
        </div>
      </div>
    </Rightbar>
  );
}

PastOrders.propTypes = {
  nurseView: PropTypes.bool.isRequired,
};

export default PastOrders;
