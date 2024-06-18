import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

// Styles
import styles from "./Test.module.css";

// Bootstrap Components
import { Col, Modal, Row } from "react-bootstrap";

// Components
import Timer from "../../Components/Timer/Timer";
import Loader from "../../Components/Loader/Loader";

const Test = () => {
  const history = useNavigate();

  // Cookies
  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : {};

  // States
  const [show, setShow] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(45);
  const [loader, setLoader] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [timerOver, setTimerOver] = useState(false);
  const [curQuestion, setCurQuestion] = useState(0);
  const [submitConfirmation, setSubmitConfirmation] = useState(false);

  const totalMinutes = 45;

  /**
   * Function to get the questions list from the backend API
   * @returns {Promise<void>}
   */
  const getQuestions = async () => {
    try {
      // Define the API endpoint URL
      const url = import.meta.env.VITE_BACKEND_URL + "/web/create/quiz";

      // Send a GET request to the API with the Authorization token in the headers
      const response = await axios.get(url, {
        headers: {
          Authorization: Cookies.get("token"),
        },
        params: {}, // No query parameters needed for this request
      });

      // Set the questions state with the data received from the API
      if (response?.data?.data?.questions?.length > 0) {
        let allQuestions = JSON.parse(JSON.stringify(response?.data?.data));
        let questions = allQuestions?.questions?.map((item) => ({
          ...item,
          selected: false,
          skipped: false,
        }));
        allQuestions.questions = questions;
        setQuestions(allQuestions);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    window.location.href = "/login";
  };

  const submitQuiz = async (allQuestions) => {
    setSubmitConfirmation(false);
    let body = {
      quiz_id: allQuestions?.quiz_id,
      responses: [],
    };

    if (allQuestions && allQuestions.questions) {
      allQuestions.questions.forEach((item) => {
        if (item && item.selected) {
          const selectedOption = item.options.find(
            (option) => option?.selected
          )?.option;
          if (selectedOption) {
            body.responses.push({
              question_id: item.id,
              selected_option: selectedOption,
            });
          }
        } else {
          body.responses.push({
            question_id: item.id,
          });
        }
      });
    }

    try {
      // Define the API endpoint URL
      const url = import.meta.env.VITE_BACKEND_URL + "/web/submit/quiz";

      // Send a GET request to the API with the Authorization token in the headers
      const response = await axios.post(url, body, {
        headers: {
          Authorization: Cookies.get("token"),
        },
        params: {}, // No query parameters needed for this request
      });

      history(`/test-result/${questions?.quiz_id}`, {
        state: {
          ...response?.data,
          minutes: totalMinutes - (minutes+1),
          seconds: 60 - seconds,
          totalQuestions: questions?.questions?.length,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const modalCheck = () => {
    setShow(true);
  };

  const checkQuestionStatus = (submitCheck = false) => {
    let allQuestions = JSON.parse(JSON.stringify(questions));
    if (
      questions?.questions
        ?.at(curQuestion)
        ?.options?.filter((item) => item?.selected)?.length > 0
    ) {
      allQuestions.questions.at(curQuestion).selected = true;
      allQuestions.questions.at(curQuestion).skipped = false;
      setQuestions(allQuestions);
    } else {
      allQuestions.questions.at(curQuestion).selected = false;
      allQuestions.questions.at(curQuestion).skipped = true;
      setQuestions(allQuestions);
    }

    if (submitConfirmation && !timerOver) {
      submitQuiz(allQuestions);
      return;
    }

    if (submitCheck && !timerOver) {
      modalCheck();
    }

    if (timerOver && !submitConfirmation) {
      submitQuiz(allQuestions);
    }
  };

  // handleQuestionChange
  const handleQuestionChange = (index) => {
    checkQuestionStatus();
    setCurQuestion(index);
  };

  const handleOptionSelect = (option, index) => {
    const allQuestions = JSON.parse(JSON.stringify(questions));
    let options = allQuestions?.questions?.at(curQuestion)?.options;
    if (options?.at(index)?.selected) {
      options?.map((item) => {
        return (item.selected = false);
      });
    } else {
      options?.map((item) => {
        return (item.selected = false);
      });
      options.at(index).selected = true;
    }
    allQuestions.questions.at(curQuestion).options = options;
    setQuestions(() => allQuestions);
  };

  // Submit the quiz
  const handleSubmit = () => {
    checkQuestionStatus(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  // Get the initial questions list
  useEffect(() => {
    getQuestions();
    // const handleBeforeUnload = (event) => {
    //   event.preventDefault();
    //   window.alert(
    //     "All your saved data will be lost. Do you want to reload the page?"
    //   );
    //   event.returnValue = "";
    // };
    // window.addEventListener("beforeunload", handleBeforeUnload);
    // return () => {
    //   window.removeEventListener("beforeunload", handleBeforeUnload);
    // };
  }, []);

  // Set the loader status
  useEffect(() => {
    if (!(questions?.questions?.length > 0)) {
      setLoader(false);
    }
  }, [questions]);

  // Timer to submit
  useEffect(() => {
    if (timerOver) {
      handleSubmit();
    }
  }, [timerOver]);

  useEffect(() => {
    if (submitConfirmation) checkQuestionStatus(true);
  }, [submitConfirmation]);

  return loader ? (
    <Loader />
  ) : (
    <main>
      <div className={styles.test_background}>
        <header className={styles.test_header_container}>
          <Row className={styles.test_header}>
            <Col className={styles.desktop_display}>
              <img src={"/SVG_Logo_Unit.svg"} width={350} />
            </Col>
            <Col className={styles.test_header_right}>
              <img src="/SVG_Profile.svg" width="30" />
              <b style={{ display: "flex", alignItems: "center" }}>
                Hello,{" "}
                {user?.name
                  ? user?.name?.length > 17
                    ? user?.name?.substr(0, 17) + "..."
                    : user?.name
                  : "User"}
              </b>
              <span className={styles.logout} onClick={logout}>
                Logout
              </span>
            </Col>
          </Row>
        </header>
        <div className={styles.header}>Test Yourself</div>
        <div className={styles.body}>
          <Row className={styles.test_container}>
            {/* Left side Container */}
            <Col md={4} className={styles.left_container}>
              <div className={styles.left}>
                <div className={styles.left_header}>
                  <h4>Select Question</h4>
                </div>
                <div
                  className={`${styles.left_body} ${styles.questions_container}`}
                >
                  <p>
                    <b>Total Questions:</b> {questions?.questions?.length}
                  </p>
                  <div className={styles.questions_container_content}>
                    {questions?.questions?.map((question, index) => {
                      return (
                        <div
                          onClick={() => handleQuestionChange(index)}
                          className={`${styles.question_count} ${
                            question?.selected
                              ? styles.question_selected
                              : question?.skipped
                              ? styles.question_skipped
                              : ""
                          }`}
                          key={index}
                        >
                          {index + 1}
                        </div>
                      );
                    })}
                  </div>
                  <div className={styles.question_info}>
                    <div className={styles.red_box}></div>
                    <span>Answered</span>
                    <div className={styles.green_box}></div>
                    <span>Skipped</span>
                  </div>
                </div>

                <span>
                  <b>Note:</b> Please do not Close or Refresh this page
                </span>
              </div>
            </Col>

            {/* Right Side Container */}
            <Col md={8}  className={styles.right_container}>
              <div className={styles.right}>
                <div className={styles.right_header}>
                  <h4>Question - {curQuestion + 1}</h4>
                  <Timer
                    initialMinute={45}
                    initialSeconds={0}
                    setTimerOver={setTimerOver}
                    seconds={seconds}
                    setSeconds={setSeconds}
                    setMinutes={setMinutes}
                    minutes={minutes}
                  />
                </div>
                <div className={styles.right_body}>
                  <div className={styles.question}>
                    <p>{questions?.questions?.[curQuestion]?.question}</p>
                  </div>
                  <div className={styles.options}>
                    {questions?.questions
                      ?.at(curQuestion)
                      ?.options?.map((option, index) => {
                        return (
                          <div
                            className={
                              option?.selected ? styles.selected : styles.option
                            }
                            key={index}
                            onClick={() => {
                              handleOptionSelect(option, index);
                            }}
                          >
                            <p>
                              <span>{option?.option?.toUpperCase()}</span>{" "}
                              {option?.text}
                            </p>
                          </div>
                        );
                      })}
                  </div>

                  {/* Buttons */}
                  <div className={styles.button_container}>
                    <div>
                      {curQuestion > 0 ? (
                        <div
                          onClick={() => {
                            checkQuestionStatus();
                            setCurQuestion(curQuestion - 1);
                          }}
                          className={styles.button}
                        >
                          Previous
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div>
                      {curQuestion + 1 < questions?.questions?.length ? (
                        <div
                          onClick={() => {
                            checkQuestionStatus();
                            setCurQuestion(curQuestion + 1);
                          }}
                          className={styles.button}
                        >
                          Next
                        </div>
                      ) : (
                        <></>
                      )}
                      {curQuestion === questions?.questions?.length - 1 ? (
                        <div onClick={handleSubmit} className={styles.button}>
                          Submit
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      {show ? (
        <Modal
          show={show}
          onHide={handleClose}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Do you want to submit?</Modal.Title>
          </Modal.Header>
          <Modal.Body className={styles.submit_conf}>
            <div onClick={() => setShow(false)}>No</div>
            <div
              onClick={() => {
                setSubmitConfirmation(true);
                setShow(false);
              }}
            >
              Yes
            </div>
          </Modal.Body>
        </Modal>
      ) : (
        <></>
      )}
    </main>
  );
};

export default Test;
