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
      <div className={styles.header}>Test Yourself</div>
      <div className={styles.body}>
        <h2
          style={{
            width: "100%",
            textAlign: "center",
            fontSize: "18px",
            fontWeight: 800,
            marginRight: "20px"
          }}
        >
          Start a new test
        </h2>

        <div className={styles.content}>
          <div className={styles.info_card}>
            <h2>32</h2>
            <p style={{fontWeight: 600}}>Questions</p>
          </div>
          <div className={styles.info_card}>
            <h2>45</h2>
            <p style={{fontWeight: 600}}>Minutes</p>
          </div>
        </div>
        <div className={styles.content}>
          {/* {prevTests?.length > 0 ? (
            <div onClick={() => setShow(true)}>My Attempts</div>
          ) : (
            <></>
          )} */}
          <div style={{padding: "10px 20px", fontWeight: 700}} onClick={getTest}>Start Test</div>
        </div>
        <div className={styles.footer_info}>
          <h5>
            <b>Disclaimer:</b> Due care and diligence in preparing this test but
            no representation or warranty is made to their accuracy,
            completeness or correctness and hence, project partners cannot be
            held responsible for omissions or errors. Readers are encouraged to
            inform the project partners about any inaccuracies or to provide
            additional information for changes.
          </h5>
          <br />
          <p className={styles.disclaimer}>Test Details:</p>
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

        {prevTests?.length > 0 ? (
          <div className="mt-5">
          <h2
              style={{
                width: "100%",
                textAlign: "center",
                fontSize: "18px",
                fontWeight: 800,
                margin: "20px 0",
                marginLeft: "5px"
              }}
            >
              Previous Attempts
            </h2>
            <div className={styles.all_attempts}>
              <div className={styles.stat_card}>
                <p style={{ fontSize: "16px", fontWeight: 600 }}>Best Score</p>
                <p
                  style={{
                    marginTop: "10px",
                    fontSize: "28px",
                    fontWeight: 600,
                  }}
                >
                  {prevData?.best_score}
                </p>
              </div>
              <div className={styles.stat_card}>
                <p style={{ fontSize: "16px", fontWeight: 600 }}>
                  Total Attempts
                </p>
                <p
                  style={{
                    marginTop: "10px",
                    fontSize: "28px",
                    fontWeight: 600,
                  }}
                >
                  {prevData?.attempts}
                </p>
              </div>
            </div>

            <h2
              style={{
                width: "100%",
                textAlign: "leftt",
                fontSize: "16px",
                fontWeight: 600,
                margin: "20px 0"
              }}
            >
              Latest Five Submissions
            </h2>
            <ul className={styles.prev_tests_ul}>
              {prevTests?.map((item, index) => {
                return (
                  <li key={index}>
                    <a
                      className={styles.to_solutions}
                      href={`/dashboard/solutions/test-result/${item?.quiz_id}`}
                    >
                      <span>
                        <span
                          className={
                            item?.status === "Passed"
                              ? styles.passed
                              : styles.failed
                          }
                        >
                          {item?.status}
                        </span>{" "}
                        Score: {item?.score}
                      </span>
                      <span>View Solutions</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <></>
        )}
      </div>

      {show ? (
        <Modal
          show={show}
          onHide={() => setShow(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>My Previous Tests</Modal.Title>
          </Modal.Header>
          <Modal.Body className={styles.prev_tests}>
            <ul className={styles.prev_tests_ul}>
              {prevTests?.map((item, index) => {
                return (
                  <li key={index}>
                    <a
                      className={styles.to_solutions}
                      href={`/dashboard/solutions/test-result/${item?.quiz_id}`}
                    >
                      <span>Score: {item?.score}</span>
                      <span>View Solutions</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </Modal.Body>
        </Modal>
      ) : (
        <></>
      )}
    </div>
  );
};

export default TestYourself;
