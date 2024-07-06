import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

// Styles
import styles from "./Test.module.css";

// Bootstrap Components
import { Col, Modal, Row } from "react-bootstrap";

// Components
import Timer from "../../Components/Timer/Timer";
import Loader from "../../Components/Loader/Loader";

const Test = (props) => {
  const { state: prevState, pathname: url } = useLocation();
  const quiz_id = url?.split("/")?.at(2);
  const history = useNavigate();

  // Cookies
  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : {};

  // States
  const [show, setShow] = useState(false);
  const [seconds, setSeconds] = useState(59);
  const [minutes, setMinutes] = useState(44);
  const [loader, setLoader] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [timerOver, setTimerOver] = useState(false);
  const [curQuestion, setCurQuestion] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(59);
  const [totalMinutes, setTotalMinutes] = useState(44);
  const [submitConfirmation, setSubmitConfirmation] = useState(false);

  /**
   * Function to get the questions list from the backend API
   * @returns {Promise<void>}
   */
  const getQuestions = async () => {
    setLoader(true);
    try {
      // Define the API endpoint URL
      const url =
        import.meta.env.VITE_BACKEND_URL + "/web/fetch/quiz/questions";

      // Send a GET request to the API with the Authorization token in the headers
      const response = await axios.get(url, {
        headers: {
          Authorization: Cookies.get("token"),
        },
        params: {
          quiz_id,
        }, // No query parameters needed for this request
      });

      if (!response?.data?.status) {
        toast.error(response?.data?.data, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setTimeout(() => {
          history("/dashboard/test-yourself");
        }, 3000);
      }

      let savedQuiz = localStorage.getItem(`quiz-${quiz_id}`);
      if (savedQuiz) {
        savedQuiz = JSON.parse(savedQuiz);
      }

      // Set the questions state with the data received from the API
      if (response?.data?.data?.length > 0 || savedQuiz?.length > 0) {
        let allQuestions;
        if (savedQuiz?.length > 0) {
          allQuestions = savedQuiz;
        } else {
          allQuestions = JSON.parse(JSON.stringify(response?.data?.data));
        }
        if (allQuestions?.length > 0 && !savedQuiz) {
          let questions = allQuestions?.map((item) => ({
            ...item,
            selected: false,
            skipped: false,
          }));
          allQuestions = questions;
          setQuestions(allQuestions);
        } else {
          setQuestions(allQuestions);
        }
      }
      setLoader(false);
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
      quiz_id: quiz_id,
      responses: [],
    };

    if (allQuestions) {
      allQuestions.forEach((item) => {
        if (item && item?.selected) {
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

      localStorage.removeItem(`quiz-${quiz_id}`);
      Cookies.remove("minutes");
      Cookies.remove("seconds");

      history(`/dashboard/test-result/${quiz_id}`, {
        state: {
          ...response?.data,
          minutes: minutes === 0 ? totalMinutes : totalMinutes - minutes,
          seconds: totalSeconds - seconds,
          totalQuestions: questions?.length,
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
      questions?.at(curQuestion)?.options?.filter((item) => item?.selected)
        ?.length > 0
    ) {
      allQuestions.at(curQuestion).selected = true;
      allQuestions.at(curQuestion).skipped = false;
      setQuestions(allQuestions);
    } else {
      allQuestions.at(curQuestion).selected = false;
      allQuestions.at(curQuestion).skipped = true;
      setQuestions(allQuestions);
    }
    localStorage.setItem(`quiz-${quiz_id}`, JSON.stringify(allQuestions));

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
    let options = allQuestions?.at(curQuestion)?.options;
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
    allQuestions.at(curQuestion).options = options;
    localStorage.setItem(`quiz-${quiz_id}`, JSON.stringify(allQuestions));
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
  }, []);

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
    <>
      <Loader />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
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
                    <b>Total Questions:</b> {questions?.length}
                  </p>
                  <div className={styles.questions_container_content}>
                    {questions?.map((question, index) => {
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
            <Col md={8} className={styles.right_container}>
              <div className={styles.right}>
                <div className={styles.right_header}>
                  <h4>Question - {curQuestion + 1}</h4>
                  <Timer
                    initialMinute={totalMinutes}
                    setTotalMinutes={setTotalMinutes}
                    initialSeconds={totalSeconds}
                    setTotalSeconds={setTotalSeconds}
                    setTimerOver={setTimerOver}
                    seconds={seconds}
                    setSeconds={setSeconds}
                    setMinutes={setMinutes}
                    minutes={minutes}
                  />
                </div>
                <div className={styles.right_body}>
                  <div className={styles.question}>
                    <p>{questions?.[curQuestion]?.question}</p>
                  </div>
                  <div className={styles.options}>
                    {questions
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
                      {curQuestion + 1 < questions?.length ? (
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
                      {curQuestion === questions?.length - 1 ? (
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
            <Modal.Title>Are you sure you want to submit?</Modal.Title>
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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </main>
  );
};

export default Test;
