import React from 'react';
import PropTypes from 'prop-types';
import { AiOutlineClose } from 'react-icons/ai';
import { deleteNotification } from '../../api/deliveryApiCalls';

const indicatorMapping = new Map(Object.entries({
  0: 'bg-red-400',
  1: 'bg-yellow-400',
  2: 'bg-green-400',
}));

const messagePrefaceMapping = {
  0: 'Message: ',
  1: 'Deliver to: ',
  2: '',
};

/* 0: Nurse View
   1: Clerk View: Incoming Orders
   2: Clerk View: Current Orders
*/

function Notification({
  title,
  message,
  date,
  statusCode,
  lawsonNumber,
  productCategory,
  currentView,
  image,
  removeNotif,
}) {
  let view;
  if (!currentView) {
    if (localStorage.getItem('role') === 'nurse') {
      view = 0;
    } else {
      view = -1;
    }
  } else {
    view = currentView;
  }
  const newTitle = title.length > 35 ? `${title.slice(0, 35)}...` : title;
  const notifImage = image;
  const indicatorStyling = view > 0 ? 'bg-green-400' : indicatorMapping.get(statusCode);

  const handleNotificationClose = (e) => {
    e.preventDefault();
    deleteNotification({ date, message });
    removeNotif(date);
  };

  return (
    <div className="mt-2 px-2 py-4 bg-white rounded-sm shadow relative">
      <button type="button" className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" onClick={handleNotificationClose}>
        <AiOutlineClose />
      </button>
      <div className=" inline-flex items-center justify-between w-full">
        <div className="inline-flex items-center">
          <div className={`w-4 h-2 ${indicatorStyling} rounded-full mr-5`} />
          <img className="w-[75px]" alt="missingimage" src={notifImage} />
          <div className="flex flex-col ml-5">
            <h3 className="font-bold text-sm text-gray-800">
              {newTitle}
            </h3>
            <p className="text-xs text-gray-500 lf-5">
              {productCategory}
            </p>
            <p className="text-xs text-black-500 lf-5">
              {lawsonNumber}
            </p>
          </div>
        </div>
      </div>
      <p className="text-sm mt-4 max-w-sm">
        <b>{messagePrefaceMapping[view]}</b>
        {message}
      </p>
      <p className="text-xs text-gray-500 lf-5">
        {date}
      </p>
      {/* {currentView === 2 ? (
        <button type="submit" className="bg-green-500 hoverabg-green-700
        text-white text-sm mt-2 font-bold py-1 px-2 rounded-lg">
          Reply
        </button>
      ) : (<span />)} */}
    </div>
  );
}

Notification.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  statusCode: PropTypes.string.isRequired,
  lawsonNumber: PropTypes.string.isRequired,
  productCategory: PropTypes.string.isRequired,
  currentView: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  removeNotif: PropTypes.func.isRequired,
};

export default Notification;
