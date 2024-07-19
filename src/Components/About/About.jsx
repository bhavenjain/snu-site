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
  return (
    <>
      <img src="/Banner_with_text.svg" alt="banner" />

      <div className={styles.announcements}>
        <h3>About</h3>

        <div className={styles.announcements_body}>
          <div>
            <h5>The Program</h5>
            <p>
              The program aims to provide women leaders with the skills and
              knowledge they need to successfully transition from executive
              positions to corporate board roles.
            </p>

            <p>
              The program also offers women leaders on the Board a chance to
              enhance their skills and optimize their performance as directors ,
              both for their own enterprises and for other companies.
            </p>

            <p>The program will enable participants to</p>
            <ul>
              <li>
                understand roles and responsibilities of corporate directors and
                board committees
              </li>
              <li>
                match their skills and talents to the specific needs of the
                board
              </li>
              <li>
                carry out board tasks and engage in collaborative decision
                making
              </li>
              <li>
                add value to an organization as overseers of its leadership
                ,strategy and overseers of performances
              </li>
              <li>
                navigate the challenges and put laws and perspectives into
                practice
              </li>
              <li>
                manage personal reputation as a board director and mitigate
                their own risks
              </li>
              <li>
                learn from global experts on how to read a corporate board and
                take decisions in a multi-cultural environment
              </li>
            </ul>

            <h5>WEB Bridge</h5>
            <p>
              This is a portal that will guide you on any professional dilemma
              or questions that you may face while discharging duties as a
              director. The portal contains a library of materials relevant to
              Board practices and applicable laws and relevant preparatory tools
              for qualifying for the Independent Director’s examination
              conducted by the Indian Institute of Corporate Affairs (IICA). You
              will be able to learn at your own pace. A test preparedness quiz
              is provided with which you can test yourself to align your
              preparation strategy appropriately.
            </p>
            <p>
              The Ask the Expert feature allows you to pose questions to our
              experts which they will answer through the portal. All your
              questions will be dealt with while always maintaining the highest
              levels of confidentiality.
            </p>

            <p>
              Over the course of the calendar year, different learning
              opportunities will be offered. These include:
            </p>

            <ul>
              <li>Masterclasses</li>
              <li>
                1x1 learning clinics (in finance, governance and similar areas)
              </li>
              <li>Updates on legal/policy development</li>
              <li>And much more</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
