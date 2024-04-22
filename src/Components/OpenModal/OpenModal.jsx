import React from "react";

// Bootstrap
import Modal from "react-bootstrap/Modal";

function parseText(text) {
  // Split the text by line breaks
  const lines = text.split('\n');

  // Map each line to include paragraph and anchor tags
  const parsedLines = lines.map(line => {
    // Split the line by spaces to find links
    const words = line.split(' ');

    // Map each word to include anchor tags for links
    const parsedWords = words.map(word => {
      if (word.startsWith('http://') || word.startsWith('https://')) {
        return `<a href="${word}">${word}</a>`;
      }
      return word;
    });

    // Join the words back together with spaces
    const parsedLine = parsedWords.join(' ');

    // Wrap the line with paragraph tags
    return `<p>${parsedLine}</p>`;
  });

  // Join the lines back together with <br> tags
  const parsedText = parsedLines.join('<br>');

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
      <Modal.Body dangerouslySetInnerHTML={parseText(body)} />
    </Modal>
  );
};

export default OpenModal;
