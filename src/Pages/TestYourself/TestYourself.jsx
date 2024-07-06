import React from "react";
import axios from "axios";
import Cookies from "js-cookie";

// Styles
import styles from "./TestYourself.module.css";

// Bootstrap
import { Col, Row } from "react-bootstrap";

const TestYourself = () => {
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

  return (
    <div className={styles.container}>
      <div className={styles.header}>Test Yourself</div>
      <div className={styles.body}>
        <div className={styles.content}>
          <div className={styles.info_card}>
            <h2>32</h2>
            <p>Questions</p>
          </div>
          <div className={styles.info_card}>
            <h2>45</h2>
            <p>Minutes</p>
          </div>
        </div>
        <div className={styles.content}>
          <div onClick={getTest}>Start Test</div>
        </div>
        <div className={styles.footer_info}>
          <h5>
            <b>Disclaimer:</b> Due care and diligence in preparing this test but no
            representation or warranty is made to their accuracy, completeness
            or correctness and hence, project partners cannot be held
            responsible for omissions or errors. Readers are encouraged to
            inform the project partners about any inaccuracies or to provide
            additional information for changes.
          </h5>
          <br />
          <p className={styles.disclaimer}>Disclaimer:</p>
          <Row>
            <Col>
              <p>Duration: 45 minutes</p>
              <p>Closure: 45 minutes or submission.</p>
              <p>Total number of questions: 32</p>
            </Col>
            <Col>
              <p>Question type: MCQ</p>
              <p>Weightage of questions: 1 Mark each</p>
              <p>Passing marks: 50% (16 marks)</p>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default TestYourself;
