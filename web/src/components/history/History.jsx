/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';

import HistoryCard from './HistoryCard';
import getHistory from '../../api/history';

export default function History() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function getHistoryWrapper() {
      const response = await getHistory();
      setOrders(response);
    }
    getHistoryWrapper();
  }, []);

  return (
    <div data-testid="history" className="w-full h-full py-6">
      {
        orders?.map((order) => (
          <HistoryCard
            key={order._id}
            placedOn={new Date(order.placedOn)}
            total={order.total}
            shipTo={order.shipTo}
            orderNumber={order.id}
            updatedOn={order.updatedOn ? new Date(order.updatedOn) : null}
            status={order.status}
            product={order.product}
            lawson={order.lawson}
            category={order.category}
          />
        ))
      }
    </div>
  );
}
