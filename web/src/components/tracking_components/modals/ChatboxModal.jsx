/* eslint-disable prefer-destructuring */
import { React, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../../../stylesheets/delivery.css';
import PopUpModal from './PopUpModal';
import { getOrderChatMessages, postNewChatMessage } from '../../../api/deliveryApiCalls';

function ChatboxModal(props) {
  const {
    show, onHide, orderNumber, user,
  } = props;

  const [messageList, setMessageList] = useState([]);
  const [messageDivs, setMessageDivs] = useState([]);

  function messageToDiv(mess, index) {
    const { sender, message } = mess;
    return (
      <div key={`${sender}_${index}`} className={`flex flex-col items-${sender === user ? 'end' : 'start'}`}>
        <div className={`text-sm normal-line-height p-2 rounded-xl max-w-xs whitespace-normal ${sender === user ? 'text-right' : ''} bg-${sender === user ? 'blue-text' : 'gray-300'}`}>{message}</div>
      </div>
    );
  }

  function sendMessage() {
    const message = document.getElementById(`${orderNumber}_chat-update-text`).value;
    if (message !== '') {
      setMessageList([...messageList, { sender: user, message }]);
      postNewChatMessage(orderNumber, message, user);
      document.getElementById(`${orderNumber}_chat-update-text`).value = '';
    }
  }

  useEffect(() => {
    getOrderChatMessages(orderNumber)
      .then((receivedMessages) => {
        setMessageList(receivedMessages);
        setMessageDivs(receivedMessages.map((message, index) => messageToDiv(message, index)));
      });
  }, []);

  useEffect(() => {
    setMessageDivs(messageList.map((message, index) => messageToDiv(message, index)));
  }, [messageList]);

  return (
    <PopUpModal
      show={show}
      onHide={onHide}
      title={`Product/Order #${orderNumber} Chat`}
      className="h-24"
    >
      <div className="h-96">
        <div className="h-64 p-3 flex flex-col gap-2 overflow-y-scroll">
          {messageDivs}
        </div>
        <div className="chat-input flex h-32 items-center">
          <div className="flex w-full justify-between p-3">
            <div>
              <textarea id={`${orderNumber}_chat-update-text`} cols="55" rows="3" className="status-update-text" placeholder="Send message to other user." />
            </div>
            <button type="button" className="chatbox background-green font-semibold !w-16 text-white" onClick={sendMessage}>Send</button>
          </div>
        </div>
      </div>
    </PopUpModal>
  );
}

ChatboxModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  orderNumber: PropTypes.number.isRequired,
  user: PropTypes.number.isRequired,
};

export default ChatboxModal;
