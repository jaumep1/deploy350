/* eslint-disable react/jsx-no-bind */
/* eslint-disable prefer-destructuring */
import { React, useState } from 'react';
import PropTypes from 'prop-types';
import '../../../stylesheets/delivery.css';
import Form from 'react-bootstrap/Form';
import { RiErrorWarningFill } from 'react-icons/ri';
import DeliveryCard from './DeliveryCard';
import ChatboxModal from '../modals/ChatboxModal';
import { updateCurrentOrderStatus } from '../../../api/deliveryApiCalls';

function CurrentOrderCardStoreroom(props) {
  const {
    date, cost, shippingDetails, orderNumber, status, statusDescription, itemDetails, count,
  } = props;
  const {
    name: itemTitle, categories: itemCategory, _id: itemLawsonNumber, image,
  } = itemDetails;
  const orderStatusMap = {
    'Order Received': 0,
    'Order Processing': 1,
    'In Transit': 2,
  };

  const [cardStatus, setCardStatus] = useState(status);
  const [cardStatusDescription, setCardStatusDescription] = useState(statusDescription);

  const [showChatbox, setShowChatbox] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const handleCloseChatbox = () => setShowChatbox(false);
  const handleShowChatbox = () => setShowChatbox(true);

  function updateStatus() {
    const statusText = document.getElementById(`${orderNumber}_update-text`).value;
    const statusDropdown = document.getElementById(`${orderNumber}_status-dropdown`).value;
    if (statusDropdown !== '' && statusText !== '') {
      setCardStatus(statusDropdown);
      setCardStatusDescription(statusText);

      updateCurrentOrderStatus(orderNumber, statusDropdown, statusText);

      document.getElementById(`${orderNumber}_update-text`).value = '';
      setShowWarning(false);
    }
  }

  function handleDropdownChange() {
    const statusDropdown = document.getElementById(`${orderNumber}_status-dropdown`).value;
    if (orderStatusMap[statusDropdown] < orderStatusMap[cardStatus]) {
      setShowWarning(true);
    } else {
      setShowWarning(false);
    }
  }

  return (
    <div>
      <DeliveryCard
        date={date}
        cost={cost}
        shippingDetails={shippingDetails}
        orderNumber={orderNumber}
      >
        <div className="flex">
          <div className="w-1/2 h-64 p-6 flex flex-col items-start gap-2 section-border">
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
              </div>
            </div>
            <div className="relative">
              <button type="button" className="background-dark-grey !w-20 relative text-white font-semibold" onClick={handleShowChatbox}>Open Chat</button>
            </div>
            <div className="text-start">
              <div className="text-lg font-semibold text-black">
                Order Status:
                {` ${cardStatus}`}
              </div>
              <div className="text-black font-normal text-xs">{cardStatusDescription}</div>
            </div>
          </div>
          <div className="w-1/2 h-64 p-6 flex flex-col items-start gap-3 section-border">
            <div className="text-xl font-semibold text-black">Send Status Update</div>
            <Form.Select className="status-dropdown" id={`${orderNumber}_status-dropdown`} onChange={handleDropdownChange} defaultValue={cardStatus}>
              <option value="Order Received">Order Received</option>
              <option value="Order Processing">Order Processing</option>
              <option value="In Transit">In Transit</option>
              <option value="Delivered">Delivered</option>
            </Form.Select>
            <div>
              <textarea id={`${orderNumber}_update-text`} cols="40" rows="3" className="status-update-text" placeholder="Send client updated delivery status message." />
            </div>
            <div className="flex gap-4">
              <div>
                <button type="button" className="update-btn text-white font-semibold" onClick={updateStatus}>Update</button>
              </div>
              {showWarning && (
                <div className="flex gap-1 align-start">
                  <RiErrorWarningFill className="text-red-500 text-2xl h-8 w-8" />
                  <div className="text-xs text-red-500">Warning: You are moving order status a step back.</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </DeliveryCard>
      <ChatboxModal
        show={showChatbox}
        onHide={handleCloseChatbox}
        orderNumber={orderNumber}
        user={1}
      />
    </div>
  );
}

CurrentOrderCardStoreroom.propTypes = {
  date: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  cost: PropTypes.number.isRequired,
  shippingDetails: PropTypes.string.isRequired,
  orderNumber: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  statusDescription: PropTypes.string.isRequired,
  itemDetails: PropTypes.shape({
    name: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    _id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default CurrentOrderCardStoreroom;
