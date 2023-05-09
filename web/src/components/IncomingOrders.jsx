/* eslint-disable no-underscore-dangle */
import { React, useState, useEffect } from 'react';
import Rightbar from './layout/Rightbar';
import { getItems, getIncomingOrders, getOnHoldOrders } from '../api/deliveryApiCalls';

import IncomingOrderCardStoreroom from './tracking_components/cards/IncomingOrderCardStoreroom';
import OnHoldOrderCardStoreroom from './tracking_components/cards/OnHoldOrderCardStoreroom';

function IncomingOrders() {
  const [incomingOrders, setIncomingOrders] = useState([]);
  const [incomingOrderDivs, setIncomingOrderDivs] = useState([]);
  const [onHoldOrders, setOnHoldOrders] = useState([]);
  const [onHoldDivs, setOnHoldDivs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [storedMap, setStoredMap] = useState(new Map());
  const [modifiedOrders, setModifiedOrders] = useState([]);

  useEffect(() => {
    getItems()
      .then((res) => {
        const itemMap = new Map();
        res.forEach((item) => {
          itemMap.set(item._id, item);
        });
        setStoredMap(itemMap);
        getIncomingOrders()
          .then((iOrders) => {
            setIncomingOrders(iOrders);
            setIncomingOrderDivs(iOrders.map((order) => (
              <div key={order._id} id={order.id} className="w-full">
                <IncomingOrderCardStoreroom
                  count={order.count}
                  date={order.date}
                  cost={order.price}
                  shippingDetails={`${order.orderer}, ${order.orderLocation}`}
                  orderNumber={order._id}
                  itemDetails={itemMap.get(order.itemID)}
                  onPlaceHold={(input) => {
                    setModifiedOrders([...modifiedOrders, input]);
                  }}
                  onAccept={(input) => {
                    setModifiedOrders([...modifiedOrders, input]);
                  }}
                />
              </div>
            )));
          });
        getOnHoldOrders()
          .then((oOrders) => {
            setOnHoldOrders(oOrders);
            setOnHoldDivs(oOrders.map((order) => (
              <div key={order._id} id={order.id} className="w-full">
                <OnHoldOrderCardStoreroom
                  count={order.count}
                  date={order.date}
                  cost={order.price}
                  shippingDetails={`${order.orderer}, ${order.orderLocation}`}
                  orderNumber={order._id}
                  itemDetails={itemMap.get(order.itemID)}
                  reason={order.reason}
                  onAccept={(input) => {
                    setModifiedOrders([...modifiedOrders, input]);
                  }}
                />
              </div>
            )));
          });
      });
  }, [modifiedOrders]);

  useEffect(() => {
    if (storedMap.size > 0) {
      setIncomingOrderDivs(incomingOrders.filter((o) => storedMap.get(o.itemID).name
        .toLowerCase()
        .includes(searchTerm
          .toLowerCase()))
        .map((order) => (
          <div key={order._id} id={order._id} className="w-full">
            <IncomingOrderCardStoreroom
              count={order.count}
              date={order.date}
              cost={order.price}
              shippingDetails={`${order.orderer}, ${order.orderLocation}`}
              orderNumber={order._id}
              itemDetails={storedMap.get(order.itemID)}
              onPlaceHold={(input) => {
                setModifiedOrders([...modifiedOrders, input]);
              }}
              onAccept={(input) => {
                setModifiedOrders([...modifiedOrders, input]);
              }}
            />
          </div>
        )));
      setOnHoldDivs(onHoldOrders.filter((o) => storedMap.get(o.itemID).name
        .toLowerCase()
        .includes(searchTerm
          .toLowerCase()))
        .map((order) => (
          <div key={order._id} id={order._id} className="w-full">
            <OnHoldOrderCardStoreroom
              count={order.count}
              date={order.date}
              cost={order.price}
              shippingDetails={`${order.orderer}, ${order.orderLocation}`}
              orderNumber={order._id}
              itemDetails={storedMap.get(order.itemID)}
              reason={order.reason}
              onAccept={(input) => {
                setModifiedOrders([...modifiedOrders, input]);
              }}
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
    <Rightbar notifView={1}>
      <div className="flex w-full items-center flex-col">
        <div className="text-2xl font-bold p-6">Incoming Orders</div>
        {searchBar}
        <div>
          <div className="text-xl font-bold p-6 text-center">Pending Orders</div>
          <div className="flex flex-col items-center">
            <div className="grid grid-cols-2 gap-4 w-full">
              {incomingOrderDivs}
            </div>
          </div>
        </div>
        <div>
          <div className="text-xl font-bold p-6 text-center">On Hold Orders</div>
          <div className="flex flex-col items-center">
            <div className="grid grid-cols-2 gap-4 mb-8 w-full">
              {onHoldDivs}
            </div>
          </div>
        </div>
      </div>
    </Rightbar>
  );
}

export default IncomingOrders;
