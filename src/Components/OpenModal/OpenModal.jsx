import React from "react";

// Bootstrap
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

// Styles
import styles from "./OpenModal.module.css";

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
      <Modal.Body>{body}</Modal.Body>
    </Modal>
  );
};

export default OpenModal;
