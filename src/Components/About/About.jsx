import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

// Styles
import styles from "./About.module.css";

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

const About = () => {
  // States
  const [heading, setHeading] = useState("");

  return (
    <>
      <img src="/Banner_with_text.svg" alt="banner" />

      <div className={styles.announcements}>
        <h3>About</h3>

        <div className={styles.announcements_body}>
          <h5>{heading}</h5>
          <p>About the Web bridge Platform</p>
        </div>
      </div>
    </>
  );
};

export default About;
