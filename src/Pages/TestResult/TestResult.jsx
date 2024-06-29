import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";

// Styles
import styles from "./TestResult.module.css";

// Bootstrap Components
import { Col, Row } from "react-bootstrap";

const TestResult = () => {
  const { state: prevState, pathname: url } = useLocation();
  const quiz_id = url?.split("/")?.at(3);

  const score = (prevState?.score / prevState?.totalQuestions) * 100;

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

    if(response?.data?.data) {
      window.location.href = `/test/${response?.data?.data?.quiz_id}`
    }
  }

  return (
    <main style={{ width: "100%" }}>
      <div className={styles.test_background}>
        <div className={styles.header}>Result</div>
        <div className={styles.body}>
          <div className={styles.congrats}>
            {score >= 50 ? (
              <>
                <img src="/congrats.svg" width={"70%"} height={300} />
                <h1>You've Scored {parseFloat(score).toFixed(2)}%</h1>
              </>
            ) : (
              <div className={styles.fail}>
                <h1>
                  Thank You for taking the test. <br /> {prevState?.message}
                </h1>
                <div onClick={getTest} className={styles.button}>
                  Try again
                </div>
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
