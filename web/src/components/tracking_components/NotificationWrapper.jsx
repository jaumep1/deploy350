import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Notification from './Notification';
import { getNotifications } from '../../api/deliveryApiCalls';

const headingMapping = {
  0: 'Notifications',
  1: 'New Order Requests',
  2: 'Order Messages',
};

function NotificationWrapper({ currentViewStatus }) {
  const [notifData, setNotifData] = useState([]);
  const currentUser = localStorage.getItem('userid');

  useEffect(() => {
    getNotifications(currentUser)
      .then((res) => {
        setNotifData(res);
        console.log(res);
      });
  }, [currentUser]);

  const deleteNotification = (date) => {
    setNotifData(notifData.filter((notif) => notif.time !== date));
  };

  let displayedNotifs = notifData;
  if (currentViewStatus !== undefined) {
    if (currentViewStatus === 2) {
      displayedNotifs = displayedNotifs?.filter((notif) => notif.currentOrder !== undefined);
    } else {
      displayedNotifs = displayedNotifs?.filter((notif) => notif.currentOrder === undefined);
    }
  }
  let newView;
  if (localStorage.getItem('role') === 'nurse') {
    newView = 0;
  } else {
    newView = currentViewStatus;
  }

  return (
    <div className="w-70">
      <b><h1 className="text-center mb-4 mt-4">{headingMapping[newView]}</h1></b>
      {
      displayedNotifs?.map(({
        productTitle,
        updateMessage,
        time,
        status,
        category,
        lawson,
        notifID,
        currentOrder,
        productImage,
      }) => {
        if (newView === undefined) {
          newView = currentOrder ? 2 : 1;
        }
        return (
          <Notification
            key={notifID}
            title={productTitle}
            message={updateMessage}
            date={time}
            statusCode={status}
            lawsonNumber={lawson}
            productCategory={category}
            notificationID={notifID}
            currentView={newView}
            image={productImage}
            removeNotif={() => deleteNotification(time)}
          />
        );
      })
    }
    </div>
  );
}

NotificationWrapper.propTypes = {
  currentViewStatus: PropTypes.number,
};

NotificationWrapper.defaultProps = {
  currentViewStatus: undefined,
};

export default NotificationWrapper;
