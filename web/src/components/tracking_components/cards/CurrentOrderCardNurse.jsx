/* eslint-disable max-len */
import { React, useState } from 'react';
import PropTypes from 'prop-types';
import '../../../stylesheets/delivery.css';
import DeliveryCard from './DeliveryCard';
import ChatboxModal from '../modals/ChatboxModal';
import TrackingModal from '../modals/TrackingModal';
import StatusChangeModal from '../modals/StatusChangeModal';

function CurrentOrderCardNurse(props) {
  const {
    date, cost, shippingDetails, orderNumber, status, statusDescription, itemDetails, onCancel, count,
  } = props;
  const {
    name: itemTitle, categories: itemCategory, _id: itemLawsonNumber, image,
  } = itemDetails;

  const [showChatbox, setShowChatbox] = useState(false);
  const handleCloseChatbox = () => setShowChatbox(false);
  const handleShowChatbox = () => setShowChatbox(true);

  const [showTracking, setShowTracking] = useState(false);
  const handleCloseTracking = () => setShowTracking(false);
  const handleShowTracking = () => setShowTracking(true);

  const [showCancellation, setShowCancellation] = useState(false);
  const handleCloseCancellation = () => setShowCancellation(false);
  const handleShowCancellation = () => setShowCancellation(true);

  return (
    <>
      <DeliveryCard
        date={date}
        cost={cost}
        shippingDetails={shippingDetails}
        orderNumber={orderNumber}
      >
        <div className="flex flex-col h-64 p-6">
          <div className="flex flex-col items-start mb-6">
            <div className="text-xl font-semibold text-black normal-line-height">
              Order Status:
              {` ${status}`}
            </div>
            <div className="text-sm text-black normal-line-height">{statusDescription}</div>
          </div>
          <div className="flex justify-between">
            <div className="flex justify-start items-start gap-4">
              <img className="w-[125px] h-[125px] object-cover object-center" alt="order" src={image} />
              <div className="flex flex-col justify-start h-24 text-start">
                <div className="text-lg font-semibold text-black">
                  {`${itemTitle} (x${count})`}
                </div>
                <div className="dark-grey text-xs font-semibold mt-1">{itemCategory[0]}</div>
                <div className="text-black text-xs font-semibold">
                  Lawson #
                  {itemLawsonNumber}
                </div>
                <div className="flex gap-4 mt-1">
                  {/* <button type="button" className="background-green font-semibold !w-24 text-white">Buy Again</button> */}
                  <button
                    type="button"
                    className="text-black font-semibold !w-24"
                    onClick={() => {
                      window.location = `/item?id=${itemLawsonNumber}`;
                    }}
                  >
                    View Item
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <button type="button" className="background-white text-black font-semibold !w-32" onClick={handleShowTracking}>Track Package</button>
              <button type="button" className="background-white text-black font-semibold !w-32" onClick={handleShowChatbox}>Chat Support</button>
              <button type="button" className="background-red font-semibold !w-32 text-white" onClick={handleShowCancellation}>Cancel Order</button>
            </div>
          </div>
        </div>
      </DeliveryCard>
      <ChatboxModal
        show={showChatbox}
        onHide={handleCloseChatbox}
        orderNumber={orderNumber}
        user={0}
      />
      <TrackingModal
        show={showTracking}
        onHide={handleCloseTracking}
        productNumber={orderNumber}
        status={status}
        statusDescription={statusDescription}
      />
      <StatusChangeModal
        show={showCancellation}
        onHide={handleCloseCancellation}
        onButtonClick={() => (onCancel(orderNumber))}
        orderNumber={orderNumber}
        type="Cancel"
      />
    </>
  );
}

CurrentOrderCardNurse.propTypes = {
  date: PropTypes.string.isRequired,
  cost: PropTypes.number.isRequired,
  shippingDetails: PropTypes.string.isRequired,
  orderNumber: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  statusDescription: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  itemDetails: PropTypes.shape({
    name: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    _id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default CurrentOrderCardNurse;
