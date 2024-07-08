import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";

// Styles
import styles from "./Solutions.module.css";

// Bootstrap Components
import { Col, Container, Row } from "react-bootstrap";

// // Components
// import Timer from "../../Components/Timer/Timer";
// import Loader from "../../Components/Loader/Loader";

function parseText(text) {
  // Split the text by line breaks
  const lines = text?.split("\n");

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

const Solutions = () => {
  // const navigate = useNavigate();
  const { pathname: url } = useLocation();

  // Cookies
  // const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : {};

  // States
  const [questions, setQuestions] = useState({});
  const [curQuestion, setCurQuestion] = useState(0);

  const getSolutions = async () => {
    const quiz_id = url?.split("/")?.at(4);
    const apiUrl = `${
      import.meta.env.VITE_BACKEND_URL
    }/web/fetch/quiz/summary/${quiz_id}`;
    // Send a GET request to the API with the Authorization token in the headers
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: Cookies.get("token"),
      },
      params: {}, // No query parameters needed for this request
    });
    setQuestions(response?.data?.data);
    return response.data;
  };

  useEffect(() => {
    getSolutions();
  }, []);

  return (
    <main style={{ width: "100%" }}>
      <div className={styles.test_background}>
        <div className={styles.header}>View the correct answer and its explanation</div>
        <div className={styles.body}>
          <div className={styles.body_header}>
            <Container>
              <Row>
                <Col md={2}>
                  <h4
                    style={{
                      margin: 0,
                      fontSize: "16px",
                      marginBottom: "10px",
                    }}
                  >
                    <b>View Solutions</b>
                  </h4>
                </Col>
                <Col md={9} className={styles.questions_container}>
                  {questions?.responses?.map((item, index) => (
                    <div
                      className={
                        item?.selected_option === item?.correct_option
                          ? styles.correct
                          : item?.selected_option
                          ? styles.wrong
                          : ""
                      }
                      key={index}
                      onClick={() => setCurQuestion(index)}
                    >
                      {index + 1}
                    </div>
                  ))}
                </Col>
              </Row>
            </Container>
          </div>
          <div className={styles.body_content}>
            <Container>
              <h3>
                <b>Question - {curQuestion + 1}</b>
              </h3>
              <p className={styles.question}>
                {questions?.responses?.at(curQuestion)?.question}
              </p>
              <div className={styles.option_container}>
                <div
                  className={
                    questions?.responses?.at(curQuestion)?.correct_option ===
                    "a"
                      ? styles.correct_highlight
                      : questions?.responses?.at(curQuestion)
                          ?.selected_option === "a"
                      ? styles.wrong_highlight
                      : ""
                  }
                >
                  <p>A. {questions?.responses?.at(curQuestion)?.option_a}</p>
                  <div className={styles.option_status}>
                    <p>
                      {questions?.responses?.at(curQuestion)?.correct_option ===
                      "a"
                        ? "Correct Answer"
                        : ""}
                    </p>
                    <p>
                      {questions?.responses?.at(curQuestion)
                        ?.selected_option === "a"
                        ? "Your Answer"
                        : ""}
                    </p>
                  </div>
                </div>
                <div
                  className={
                    questions?.responses?.at(curQuestion)?.correct_option ===
                    "b"
                      ? styles.correct_highlight
                      : questions?.responses?.at(curQuestion)
                          ?.selected_option === "b"
                      ? styles.wrong_highlight
                      : ""
                  }
                >
                  <p>B. {questions?.responses?.at(curQuestion)?.option_b}</p>
                  <div className={styles.option_status}>
                    <p>
                      {questions?.responses?.at(curQuestion)?.correct_option ===
                      "b"
                        ? "Correct Answer"
                        : ""}
                    </p>
                    <p>
                      {questions?.responses?.at(curQuestion)
                        ?.selected_option === "b"
                        ? "Your Answer"
                        : ""}
                    </p>
                  </div>
                </div>
                <div
                  className={
                    questions?.responses?.at(curQuestion)?.correct_option ===
                    "c"
                      ? styles.correct_highlight
                      : questions?.responses?.at(curQuestion)
                          ?.selected_option === "c"
                      ? styles.wrong_highlight
                      : ""
                  }
                >
                  <p>C. {questions?.responses?.at(curQuestion)?.option_c}</p>
                  <div className={styles.option_status}>
                    <p>
                      {questions?.responses?.at(curQuestion)?.correct_option ===
                      "c"
                        ? "Correct Answer"
                        : ""}
                    </p>
                    <p>
                      {questions?.responses?.at(curQuestion)
                        ?.selected_option === "c"
                        ? "Your Answer"
                        : ""}
                    </p>
                  </div>
                </div>
                <div
                  className={
                    questions?.responses?.at(curQuestion)?.correct_option ===
                    "d"
                      ? styles.correct_highlight
                      : questions?.responses?.at(curQuestion)
                          ?.selected_option === "d"
                      ? styles.wrong_highlight
                      : ""
                  }
                >
                  <p>D. {questions?.responses?.at(curQuestion)?.option_d}</p>
                  <div className={styles.option_status}>
                    <p>
                      {questions?.responses?.at(curQuestion)?.correct_option ===
                      "d"
                        ? "Correct Answer"
                        : ""}
                    </p>
                    <p>
                      {questions?.responses?.at(curQuestion)
                        ?.selected_option === "d"
                        ? "Your Answer"
                        : ""}
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.body_explain}>
                <h4>Explanation: </h4>
                <div
                  dangerouslySetInnerHTML={parseText(
                    questions?.responses?.at(curQuestion)?.explanation || ""
                  )}
                />
              </div>
            </Container>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Solutions;
