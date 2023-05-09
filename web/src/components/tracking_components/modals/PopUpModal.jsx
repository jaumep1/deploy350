import React from 'react';
import PropTypes from 'prop-types';
import '../../../stylesheets/modal.css';
import Modal from 'react-bootstrap/Modal';

function PopUpModal(props) {
  const {
    show, onHide, children, title,
  } = props;

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
    </Modal>
  );
}

PopUpModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default PopUpModal;
