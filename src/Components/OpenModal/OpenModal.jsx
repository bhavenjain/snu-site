import React from "react";

// Bootstrap
import Modal from "react-bootstrap/Modal";

const OpenModal = ({ heading, show, handleClose, body }) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{heading}</Modal.Title>
      </Modal.Header>
      <Modal.Body dangerouslySetInnerHTML={{ __html: body.replace(/\n/g, '<br>') }} />
    </Modal>
  );
};

export default OpenModal;
