import React from "react";
import { useLocation } from "react-router-dom";

// Styles
import styles from "./TestResult.module.css";

// Bootstrap Components
import { Col, Row } from "react-bootstrap";

const TestResult = () => {
  const { state: prevState, pathname: url } = useLocation();
  const quiz_id = url?.split("/")?.at(3);

  const score = (prevState?.score / prevState?.totalQuestions) * 100;

  return (
    <main style={{ width: "100%" }}>
      <div className={styles.test_background}>
        <div className={styles.header}>Result</div>
        <div className={styles.body}>
          <div className={styles.congrats}>
            {score >= 50 ? (
              <>
                <img src="/congrats.png" width={"70%"} />
                <h1>You've Scored {score}%</h1>
              </>
            ) : (
              <div className={styles.fail}>
                <h1>
                  Thank You for taking the test. <br /> {prevState?.message}
                </h1>
                <a href="/test" className={styles.button}>
                  Try again
                </a>
              </div>
            )}
          </div>
          <div className={styles.results}>
            <Col md={4}>
              <Row>
                <Col style={{ minWidth: "115px" }}>
                  <h6>Score</h6>
                  <p>
                    {prevState?.score}/{prevState?.totalQuestions}
                  </p>
                </Col>
                <Col style={{ minWidth: "115px" }}>
                  <h6>Time Taken</h6>
                  <p>
                    00:
                    {JSON.stringify(prevState?.minutes || 0)?.length <= 1
                      ? "0" + prevState?.minutes
                      : prevState?.minutes}
                    :
                    {JSON.stringify(prevState?.seconds || 0)?.length <= 1
                      ? "0" + prevState?.seconds
                      : prevState?.seconds}
                  </p>
                </Col>
              </Row>
            </Col>
              <a
                className={styles.button}
                href={"/dashboard/solutions/test-result/" + quiz_id}
              >
                View Solutions
              </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TestResult;
