import React from 'react';
import PropTypes from 'prop-types';
import '../../../stylesheets/delivery.css';
import dollarConvert from '../../../utils/helpers';

function DeliveryCard(props) {
  const {
    date, cost, shippingDetails, orderNumber, children, width,
  } = props;
  const isFullView = (shippingDetails !== undefined) && (orderNumber !== undefined);
  const isCardLarge = width === undefined ? true : width;

  return (
    <div className={`delivery-card w-full ${isCardLarge ? 'max-w-[700px]' : 'max-w-[450px]'}`}>
      {isFullView ? (
        <div className="delivery-card-header flex justify-between h-12 px-2.5 py-1 text-xs">
          <div className="flex items-center justify-between gap-8">
            <div className="flex flex-col items-start gap-0.25">
              <div className="font-semibold">Order Placed</div>
              <div>{date}</div>
            </div>
            <div className="flex flex-col items-start gap-0.25">
              <div className="font-semibold">Total</div>
              <div>{dollarConvert(cost)}</div>
            </div>
            <div className="flex flex-col items-start gap-0.25">
              <div className="font-semibold">Ship To</div>
              <div>{shippingDetails}</div>
            </div>
          </div>
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-col items-end gap-0.25 flex-end">
              <div className="font-semibold">
                Order Number
              </div>
              <div>{orderNumber}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="delivery-card-header flex justify-between h-12 px-2.5 py-1 text-xs">
          <div className="flex items-center justify-between gap-8">
            <div className="flex flex-col items-start gap-0.25">
              <div className="font-semibold">Order Placed</div>
              <div>{date}</div>
            </div>
          </div>
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-col items-end gap-0.25 flex-end">
              <div className="flex flex-col items-end gap-0.25">
                <div className="font-semibold">Total</div>
                <div>{dollarConvert(cost)}</div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="min-h-[100px]">
        {children}
      </div>
    </div>
  );
}

DeliveryCard.propTypes = {
  date: PropTypes.string.isRequired,
  cost: PropTypes.number.isRequired,
  shippingDetails: PropTypes.string,
  orderNumber: PropTypes.number,
  children: PropTypes.node.isRequired,
  width: PropTypes.bool,
};

DeliveryCard.defaultProps = {
  shippingDetails: undefined,
  orderNumber: undefined,
  width: undefined,
};

export default DeliveryCard;
