import { React } from 'react';
import PropTypes from 'prop-types';
import '../../../stylesheets/delivery.css';
import DeliveryCard from './DeliveryCard';
import { acceptOnHoldOrder } from '../../../api/deliveryApiCalls';

function OnHoldOrderCardStoreroom(props) {
  const {
    date, cost, itemDetails, shippingDetails, reason, orderNumber, onAccept, count,
  } = props;
  const {
    name: itemTitle, categories: itemCategory, _id: itemLawsonNumber, image,
  } = itemDetails;

  function acceptOrder() {
    acceptOnHoldOrder(orderNumber, localStorage.getItem('userid'))
      .then(onAccept(orderNumber));
  }

  return (
    <DeliveryCard
      date={date}
      cost={cost}
      width={false}
    >
      <div className="flex flex-col h-64 p-6">
        <div className="flex justify-start items-start gap-4">
          <img className="w-[125px] h-[125px] object-cover object-center" alt="order" src={image} />
          <div className="flex flex-col justify-start h-24 text-start">
            <div className="text-xl font-semibold text-black">
              {`${itemTitle} (x${count})`}
            </div>
            <div className="dark-grey text-xs font-semibold mt-1">{itemCategory[0]}</div>
            <div className="text-black text-xs font-semibold">
              Lawson #
              {itemLawsonNumber}
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <div className="flex flex-col items-start mr-12">
            <div className="text-xs font-semibold text-black">Ship To</div>
            <div className="text-xs text-black">{shippingDetails}</div>
          </div>
          <div className="flex flex-col items-start mr-12">
            <div className="text-xs font-semibold text-black">Reason</div>
            <div className="text-xs text-black">{reason}</div>
          </div>
          <div className="flex flex-col gap-2">
            <button type="button" className="background-green font-semibold !w-28 text-white" onClick={() => acceptOrder()}>Accept Order</button>
          </div>
        </div>
      </div>
    </DeliveryCard>
  );
}

OnHoldOrderCardStoreroom.propTypes = {
  count: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  cost: PropTypes.number.isRequired,
  shippingDetails: PropTypes.string.isRequired,
  reason: PropTypes.string.isRequired,
  orderNumber: PropTypes.number.isRequired,
  itemDetails: PropTypes.shape({
    name: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    _id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  onAccept: PropTypes.func.isRequired,
};

export default OnHoldOrderCardStoreroom;
