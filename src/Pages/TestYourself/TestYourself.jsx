import React from "react";

// Styles
import styles from "./TestYourself.module.css";
import { Col, Row } from "react-bootstrap";

const TestYourself = () => {
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
          <a href="/test">Start Test</a>
        </div>
        <div className={styles.footer_info}>
          <h5>
            The test is designed to assess your knowledge, concepts and
            understanding of the Companies Act, 2013, and test your familiarity
            with the rules, responsibilities and duties as a director, in
            dealing with matters relating to the discharge of duties as a board
            member among other things relating to being an effective director.
          </h5>

          <p className={styles.disclaimer}>Disclaimer:</p>
          <Row>
            <Col>
                <p>Duration of Test: 45 minutes</p>
                <p>Closure of Test: 45 minutes or submission of test by pressing the Submit button.</p>
                <p>Total number of questions in Test: 32</p>
            </Col>
            <Col>
                <p>Question type: All questions of multiple choice type</p>
                <p>Weightage of each question: Each carry equal weightage – 1 Mark each</p>
                <p>Passing marks: 50 per cent – 16 marks</p>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default TestYourself;
