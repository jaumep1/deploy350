import React from 'react';
import PropTypes from 'prop-types';
import '../../../stylesheets/delivery.css';
import DeliveryCard from './DeliveryCard';

function PastOrderCard(props) {
  const {
    date, cost, shippingDetails, orderNumber, statusDescription,
    itemDetails,
    // showButton,
    count,
  } = props;
  const {
    name: itemTitle, categories: itemCategory, _id: itemLawsonNumber, image,
  } = itemDetails;

  return (
    <DeliveryCard
      date={date}
      cost={cost}
      shippingDetails={shippingDetails}
      orderNumber={orderNumber}
      width
    >
      <div className="flex flex-col h-64 p-6">
        <div className="flex flex-col items-start mb-6">
          <div className="text-xl font-semibold text-black normal-line-height">
            Delivered
            {` ${date}`}
          </div>
          <div className="text-sm text-black normal-line-height">{statusDescription}</div>
        </div>
        <div className="flex justify-start items-start gap-4">
          <img className="w-[125px] h-[125px] object-cover object-center" alt="order" src={image} />
          <div className="flex flex-col justify-start text-start">
            <div className="text-xl font-semibold text-black">
              {`${itemTitle} (x${count})`}
            </div>
            <div className="dark-grey text-xs font-semibold mt-1">{itemCategory[0]}</div>
            <div className="text-black text-xs font-semibold">
              Lawson #
              {itemLawsonNumber}
            </div>
            {/* {showButton && (
              <button type="button" className="background-red font-semibold text-white !w-28 mt-2">
                Return Order
              </button>
            )} */}
          </div>
        </div>
      </div>
    </DeliveryCard>
  );
}

PastOrderCard.propTypes = {
  count: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  cost: PropTypes.number.isRequired,
  shippingDetails: PropTypes.string.isRequired,
  orderNumber: PropTypes.number.isRequired,
  statusDescription: PropTypes.string.isRequired,
  itemDetails: PropTypes.shape({
    name: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    _id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  // showButton: PropTypes.bool.isRequired,
};

export default PastOrderCard;
