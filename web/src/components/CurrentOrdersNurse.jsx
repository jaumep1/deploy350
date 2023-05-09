/* eslint-disable no-underscore-dangle */
import { React, useState, useEffect } from 'react';
import RightBar from './layout/Rightbar';
import { getItems, getNurseCurrentOrders } from '../api/deliveryApiCalls';
import { getCartItems, removeCartItem } from '../fetcher';
import CurrentOrderCardNurse from './tracking_components/cards/CurrentOrderCardNurse';

function CurrentOrdersNurse() {
  const [allOrders, setAllOrders] = useState([]);
  const [currentOrderDivs, setCurrentOrderDivs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [storedMap, setStoredMap] = useState(new Map());
  const [modifiedOrders, setModifiedOrders] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    getCartItems().then((res) => {
      if (res.length > 0) {
        setCart(res);
      } else {
        setCart([]);
      }
    });
  }, []);

  useEffect(() => {
    getItems()
      .then((res) => {
        const itemMap = new Map();
        res.forEach((item) => {
          itemMap.set(item._id, item);
        });
        setStoredMap(itemMap);
        getNurseCurrentOrders(localStorage.getItem('userid'))
          .then((currentOrders) => {
            setAllOrders(currentOrders);
            setCurrentOrderDivs(currentOrders.map((order) => (
              <div key={order._id} className="w-full flex justify-center">
                <CurrentOrderCardNurse
                  count={order.count}
                  date={order.date}
                  cost={order.price}
                  shippingDetails={`${order.orderer}, ${order.orderLocation}`}
                  orderNumber={order._id}
                  status={order.status}
                  statusDescription={order.statusMessage}
                  itemDetails={itemMap.get(order.itemID)}
                  onCancel={(input) => {
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
      setCurrentOrderDivs(allOrders.filter((o) => storedMap.get(o.itemID).name
        .toLowerCase()
        .includes(searchTerm
          .toLowerCase()))
        .map((order) => (
          <div key={order._id} className="w-full flex justify-center">
            <CurrentOrderCardNurse
              count={order.count}
              date={order.date}
              cost={order.price}
              shippingDetails={`${order.orderer}, ${order.orderLocation}`}
              orderNumber={order._id}
              status={order.status}
              statusDescription={order.statusMessage}
              itemDetails={storedMap.get(order.itemID)}
              onCancel={(input) => {
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

  const removeDisplayItem = (id) => {
    const exist = cart.find((x) => x.id === id);

    if (exist) {
      setCart(
        cart.filter((x) => x.id !== id),
      );
      removeCartItem(id);
      console.log('success');
    } else {
      console.log('failure to remove');
    }
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
    <div className="flex w-full items-center flex-col">
      <RightBar removeDisplayItem={removeDisplayItem} allCartItems={cart} />
      <div className="text-2xl font-bold p-6">Current Orders</div>
      <div className="flex flex-col gap-4 items-center w-full mb-8">
        {searchBar}
        {currentOrderDivs}
      </div>
    </div>
  );
}

export default CurrentOrdersNurse;
