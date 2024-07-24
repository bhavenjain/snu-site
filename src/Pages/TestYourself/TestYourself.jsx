import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

// Styles
import styles from "./TestYourself.module.css";

// Bootstrap
import { Col, Modal, Row } from "react-bootstrap";

const TestYourself = () => {
  const [show, setShow] = useState(false);
  const [prevData, setPrevData] = useState({});
  const [prevTests, setPrevTests] = useState([]);

  // Get Tests function
  const getTest = async () => {
    // Define the API endpoint URL
    const url = import.meta.env.VITE_BACKEND_URL + "/web/create/quiz";

    // Send a GET request to the API with the Authorization token in the headers
    const response = await axios.get(url, {
      headers: {
        Authorization: Cookies.get("token"),
      },
      params: {}, // No query parameters needed for this request
    });

    if (response?.data?.data) {
      window.location.href = `/test/${response?.data?.data?.quiz_id}`;
    }
  };

  const myTest = async () => {
    // Define the API endpoint URL
    const url = import.meta.env.VITE_BACKEND_URL + "/web/fetch/user/quiz";

    // Send a GET request to the API with the Authorization token in the headers
    const response = await axios.get(url, {
      headers: {
        Authorization: Cookies.get("token"),
      },
      params: {
        limit: 5,
      }, // No query parameters needed for this request
    });

    if (response?.data?.data?.latest_quizzes) {
      setPrevData(response?.data?.data);
      setPrevTests(response?.data?.data?.latest_quizzes);
    }
  };

  useEffect(() => {
    myTest();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.yourself_container}>
        <h4>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="Layer_1"
            data-name="Layer 1"
            viewBox="100 50 100 100"
            height={30}
            width={30}
          >
            <defs>
              <style>
                {".cls-2{fill:#6d1b1d;stroke-width:0;fill-rule:evenodd}"}
              </style>
            </defs>
            <path
              d="M148.31 60.13a.7.7 0 0 1-.7-.69l-.04-3.74c0-.39.31-.7.69-.7.39 0 .7.31.7.69l.04 3.74a.7.7 0 0 1-.69.7ZM156.25 61.46a.712.712 0 0 1-.43-.89l.67-1.89c.13-.36.53-.55.89-.43.36.13.55.53.43.89l-.67 1.89c-.13.36-.53.55-.89.43ZM163.24 65.42a.689.689 0 0 1-.09-.98l2.38-2.89c.24-.3.68-.34.98-.09.3.25.34.69.09.98l-2.38 2.89c-.24.3-.68.34-.98.09ZM168.46 71.54c-.2-.33-.08-.76.25-.96l1.52-.9c.33-.2.76-.08.95.25.2.33.08.76-.25.96l-1.52.9a.69.69 0 0 1-.95-.25ZM171.27 79.07c-.07-.38.18-.74.56-.81l3.68-.68c.38-.07.74.18.81.56.07.38-.18.74-.56.81l-3.68.68a.694.694 0 0 1-.81-.56ZM173.06 88.11l-1.16-.2a.686.686 0 0 1-.57-.8c.06-.38.42-.64.8-.57l1.16.2c.38.06.64.42.57.8-.06.38-.42.64-.8.57ZM172.15 97.49l-3.25-1.85a.701.701 0 0 1-.26-.95c.19-.33.62-.45.95-.26l3.25 1.85c.33.19.45.62.26.95s-.62.45-.95.26ZM164.4 103.01l-.97-1.15a.697.697 0 0 1 .08-.98c.29-.25.73-.21.98.08l.97 1.15c.25.29.21.73-.08.98s-.73.21-.98-.08ZM131.79 103.4a.689.689 0 0 1-.09-.98l1.07-1.28c.25-.3.69-.34.98-.09.3.25.34.69.09.98l-1.07 1.28c-.25.3-.69.34-.98.09ZM124.11 97.5a.713.713 0 0 1 .25-.96l3.23-1.89c.33-.19.76-.08.95.25.19.33.08.76-.25.95l-3.23 1.89c-.33.19-.76.08-.95-.25ZM122.15 88.02c-.07-.38.18-.74.56-.81l2.25-.41c.38-.07.74.18.81.56.07.38-.18.74-.56.81l-2.25.41a.694.694 0 0 1-.81-.56ZM124.93 79.9l-3.69-.64a.708.708 0 0 1-.57-.81c.07-.38.43-.63.81-.57l3.69.64c.38.07.63.43.57.81-.07.38-.43.63-.81.57ZM127.51 72.02l-1.64-.94a.701.701 0 0 1-.26-.95c.19-.33.62-.45.95-.26l1.65.94c.33.19.45.62.26.95-.19.33-.62.45-.95.26ZM132.63 65.5l-2.41-2.86a.697.697 0 0 1 .08-.98c.29-.25.73-.21.98.08l2.41 2.86c.25.29.21.73-.08.98s-.73.21-.98-.08ZM139.71 61.07l-.51-1.79c-.1-.37.11-.76.48-.86.37-.11.76.11.86.48l.51 1.79a.69.69 0 0 1-.48.86.69.69 0 0 1-.86-.48Z"
              className="cls-2"
            />
            <path
              d="M140.12 112.32s-.57-6.4-4.46-11.62c0 0-10.83-7.2-6.76-24.53 0 0 4.07-14.13 19.34-14.65 15.28.24 19.61 14.28 19.61 14.28 4.39 17.25-6.3 24.66-6.3 24.66-3.79 5.29-4.25 11.7-4.25 11.7l-17.18.16ZM142.76 124.01c.02 1.66 1.11 3 2.44 2.99l7.23-.07c1.33-.01 2.39-1.37 2.38-3.03l-.05-5.41-12.04.11.05 5.41Z"
              className="cls-2"
            />
            <path
              d="M139.73 120.77c.02 1.66 1.38 3 3.04 2.98l12.03-.11c1.66-.02 3-1.38 2.98-3.04l-.08-8.77-18.05.17.08 8.77Z"
              className="cls-2"
            />
            <path
              d="m157.97 113.61-18.52 1.61c-.23.02-.41.23-.41.47v.75c0 .24.2.42.42.4l18.52-1.61c.23-.02.41-.23.41-.47v-.75c0-.24-.2-.42-.42-.4ZM157.99 116.19l-18.52 1.61c-.23.02-.41.23-.41.47v.75c0 .24.2.42.42.4l18.52-1.61c.23-.02.41-.23.41-.47v-.75c0-.24-.19-.42-.42-.4ZM158.06 118.78l-18.52 1.61c-.23.02-.41.23-.41.47v.75c0 .24.2.42.42.4l18.52-1.61c.23-.02.41-.23.41-.47v-.75c0-.24-.2-.42-.42-.4Z"
              className="cls-2"
            />
            <path
              d="M139.81 111.42h17.8c.42 0 .75.34.75.75v.17c0 .42-.34.76-.76.76h-17.8a.76.76 0 0 1-.76-.76v-.17c0-.42.34-.76.76-.76Z"
              style={{
                fill: "#6d1b1d",
                strokeWidth: 0,
              }}
              transform="rotate(-.54 148.024 111.047)"
            />
          </svg>{" "}
          Test Yourself
        </h4>
        <p>
          The test is designed to assess your knowledge, concepts, and
          understanding of the Companies Act, 2013, and test your familiarity
          with the rules, responsibilities, and duties as a director, in dealing
          with matters relating to the discharge of duties as a board member
          among other things relating to being an effective director. Any number
          of attempts for this test can be taken.
        </p>
      </div>

      <div className={styles.mid}>
        <div className={styles.stat_card} onClick={getTest}>
          Start Test ›
        </div>

        <div className={styles.stat}>
          <p>Total Questions: 32</p>
          <p>Passing Marks: 16 (50%)</p>
          <p>Test Duration : 45 Minutes</p>
        </div>
      </div>

      <div className={styles.disclaimer_container}>
        <p className={styles.disclaimer}>Disclaimer: </p>
        <p className={styles.disclaimer_text}>
          Due care and diligence have been exercised while developing this test.
          The project partners do not make any representation or warranty as to
          the accuracy or correctness of the information contained in the test
          and cannot be held responsible for any omissions or errors. Users are
          encouraged to inform the project partners about inaccuracies they may
          come across.
        </p>
      </div>
    </div>
  );
};

export default TestYourself;
