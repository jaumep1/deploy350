import { React } from 'react';
import PropTypes from 'prop-types';
import '../../../stylesheets/delivery.css';
import PopUpModal from './PopUpModal';

function TrackingModal(props) {
  const {
    show, onHide, productNumber, status, statusDescription,
  } = props;
  const stages = ['Order Received', 'Order Processing', 'In Transit', 'Delivered'];
  const stageIndex = stages.indexOf(status);

  return (
    <PopUpModal
      show={show}
      onHide={onHide}
      title={`Order #${productNumber} Tracking`}
      className="h-24"
    >
      <div className="h-96">
        <div className="h-16 p-3 flex flex-col">
          <div className="text-xl font-semibold text-black normal-line-height">
            Order Status:
            {` ${status}`}
          </div>
          <div className="text-sm text-black normal-line-height">{statusDescription}</div>
        </div>
        <div className="flex flex-col h-80 items-center justify-evenly">
          {stages.map((stage, index) => (
            <div
              key={stage}
              className={`flex items-center ${index <= stageIndex ? 'text-green-500' : 'text-gray-300'} ${index === stageIndex ? 'font-bold' : ''}`}
            >
              <div className={`${index === stageIndex ? 'w-6 h-6' : 'w-5 h-5'} rounded-full mr-2`} style={{ backgroundColor: index <= stageIndex ? '#10B981' : '#D1D5DB' }} />
              <div>{stage}</div>
            </div>
          ))}
        </div>
      </div>
    </PopUpModal>
  );
}

TrackingModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  productNumber: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  statusDescription: PropTypes.string.isRequired,
};

export default TrackingModal;
