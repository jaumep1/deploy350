/* eslint-disable prefer-destructuring */
import { React } from 'react';
import PropTypes from 'prop-types';
import '../../../stylesheets/delivery.css';
import PopUpModal from './PopUpModal';
import { cancelCurrentOrder, placeIncomingOrderOnHold } from '../../../api/deliveryApiCalls';

function StatusChangeModal(props) {
  const {
    show, onHide, onButtonClick, orderNumber, type,
  } = props;
  const titleName = type === 'Cancel' ? 'Cancellation' : 'On Hold';
  const buttonName = type === 'Cancel' ? 'Cancel Order' : 'Place On Hold';

  function buttonAction() {
    const textInput = document.getElementById(`${orderNumber}_update-text`).value;

    if (type === 'Cancel') {
      cancelCurrentOrder(orderNumber, textInput)
        .then(() => onButtonClick());
    } else {
      placeIncomingOrderOnHold(orderNumber, textInput)
        .then(() => onButtonClick());
    }
    document.getElementById(`${orderNumber}_update-text`).value = '';
    onHide();
  }

  return (
    <PopUpModal
      show={show}
      onHide={onHide}
      title={`Order #${orderNumber} ${titleName} Reasoning`}
      className="h-24"
    >
      <div className="chat-input flex h-32 items-center">
        <div className="flex w-full justify-between p-3">
          <div>
            <textarea id={`${orderNumber}_update-text`} cols="55" rows="4" className="status-update-text" placeholder={`Send reason for ${type === 'Cancel' ? 'cancelling order' : 'placing order on hold'}.`} />
          </div>
          <button type="button" className={`${type === 'Cancel' ? 'background-red text-white' : 'background-yellow text-black'} font-semibold !w-16 h-auto`} onClick={() => buttonAction()}>{buttonName}</button>
        </div>
      </div>
    </PopUpModal>
  );
}

StatusChangeModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  onButtonClick: PropTypes.func.isRequired,
  orderNumber: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default StatusChangeModal;
