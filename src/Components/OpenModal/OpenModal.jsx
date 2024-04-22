import React from "react";

// Bootstrap
import Modal from "react-bootstrap/Modal";

// Styles
import styles from "./OpenModal.module.css";

function parseText(text) {
  // Split the text by line breaks
  const lines = text.split("\n");

  // Map each line to include paragraph and anchor tags
  let parsedLines = lines.map((line) => {
    // Split the line by spaces to find links
    const words = line.split(" ");

    // Map each word to include anchor tags for links
    const parsedWords = words.map((word) => {
      return word.replace(
        /(\b(?:https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|]|www\.[A-Z0-9.-]+\.[A-Z]{2,})/gi,
        (match, link) => {
          return `<a href="${
            link?.startsWith("www") ? "https://" + link : link
          }" target="__blank" rel="noopener noreferrer">${link}</a>`;
        }
      );
    });

    // Join the words back together with spaces
    let parsedLine = parsedWords.join(" ");
    if (parsedLine?.length > 0) {
      return `<p>${parsedLine}</p>`;
    }
  });

  parsedLines = parsedLines?.filter((item) => {
    return item?.length > 0;
  });

  // Join the lines back together with <br> tags
  const parsedText = parsedLines.join("<br>");

  // Return the parsed text
  return { __html: parsedText };
}

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
      <Modal.Body>
        <div
          className={styles.body}
          dangerouslySetInnerHTML={parseText(body)}
        />
      </Modal.Body>
    </Modal>
  );
};

export default OpenModal;
