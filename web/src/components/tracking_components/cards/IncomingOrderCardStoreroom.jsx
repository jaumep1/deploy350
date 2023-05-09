import { React, useState } from 'react';
import PropTypes from 'prop-types';
import '../../../stylesheets/delivery.css';
import DeliveryCard from './DeliveryCard';
import StatusChangeModal from '../modals/StatusChangeModal';
import { acceptIncomingOrder } from '../../../api/deliveryApiCalls';

function IncomingOrderCardStoreroom(props) {
  const {
    date, cost, itemDetails, shippingDetails, orderNumber, onPlaceHold, onAccept, count,
  } = props;
  const {
    name: itemTitle, categories: itemCategory, _id: itemLawsonNumber, image,
  } = itemDetails;

  const [showOnHold, setShowOnHold] = useState(false);
  const handleCloseOnHold = () => setShowOnHold(false);
  const handleShowOnHold = () => setShowOnHold(true);

  async function acceptOrder() {
    await acceptIncomingOrder(orderNumber, localStorage.getItem('userid'))
      .then(onAccept(orderNumber));
  }

  return (
    <div>
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
            <div className="flex flex-col gap-2">
              <button type="button" className="background-green font-semibold !w-28 text-white" onClick={() => acceptOrder()}>Accept Order</button>
              <button type="button" className="background-yellow text-black font-semibold !w-28" onClick={handleShowOnHold}>Place On Hold</button>
            </div>
          </div>
        </div>
      </DeliveryCard>
      <StatusChangeModal
        show={showOnHold}
        onHide={handleCloseOnHold}
        onButtonClick={() => (onPlaceHold(orderNumber))}
        orderNumber={orderNumber}
        type="On Hold"
      />
    </div>
  );
}

IncomingOrderCardStoreroom.propTypes = {
  count: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  cost: PropTypes.number.isRequired,
  shippingDetails: PropTypes.string.isRequired,
  orderNumber: PropTypes.number.isRequired,
  itemDetails: PropTypes.shape({
    name: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    _id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  onPlaceHold: PropTypes.func.isRequired,
  onAccept: PropTypes.func.isRequired,
};

export default IncomingOrderCardStoreroom;
