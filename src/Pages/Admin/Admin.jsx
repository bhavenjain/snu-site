import React, { useState } from "react";

// Images
import womensLogo from "../../assets/womensLogoWhite.png";

// Bootstrap
import Dropdown from "react-bootstrap/Dropdown";
import Accordion from "react-bootstrap/Accordion";

// Styles
import styles from "./Admin.module.css";

const Admin = () => {
  const [curr, setCurr] = useState(0);
  const [answer, setAnswer] = useState("");
  const [sortBy, setSortBy] = useState("open");
  const [question, setQuestion] = useState("");
  const [answerFaq, setAnswerFaq] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [categoryText, setCategoryText] = useState("Select Category");

  // Functions
  const signout = () => {};

  return (
    <div className={styles.admin}>
      {/* header */}
      <div className={styles.header}>
        <h1>Admin Panel</h1>
        <div className={styles.signout} onClick={signout}>
          Sign Out
        </div>
      </div>

      <div className={styles.admin_container}>
        {/* Side Panel */}
        <div className={styles.sidePanel}>
          <div className={styles.sidePanel_container}>
            <div
              onClick={() => setCurr(0)}
              style={{ background: curr === 0 ? "#fff" : "" }}
            >
              Add Category
            </div>
            <div
              onClick={() => setCurr(1)}
              style={{ background: curr === 1 ? "#fff" : "" }}
            >
              Add Faq
            </div>
            <div
              onClick={() => setCurr(2)}
              style={{ background: curr === 2 ? "#fff" : "" }}
            >
              Answer Queries
            </div>
          </div>
          <img src={womensLogo} width={200} />
        </div>

        <div className={styles.form_container}>
          {curr === 0 ? (
            <>
              <h2>Add Category</h2>
              <div className={styles.form}>
                <span>Enter category name: </span>
                <input
                  className={styles.inputs}
                  type="text"
                  placeholder="category name"
                  onChange={(e) => setCategoryName(e.target.value)}
                />
                <div className={styles.submit}>Submit</div>
              </div>
            </>
          ) : (
            <></>
          )}
          {curr === 1 ? (
            <>
              <h2>Add Faq</h2>
              <div className={styles.form}>
                <p>Select Category Name: </p>
                <div className={styles.category_dropdown}>
                  <Dropdown>
                    <Dropdown.Toggle className={styles.dropdown_button}>
                      {categoryText}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => setCategoryText("Text")}>
                        Action
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>

                <div className={styles.input_container}>
                  <span>Add Question: </span>
                  <input
                    className={styles.inputs}
                    type="text"
                    placeholder="Add Question"
                    onChange={(e) => setQuestion(e.target.value)}
                  />
                </div>

                <div className={styles.input_container}>
                  <span>Add Answer: </span>
                  <textarea
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="About Query"
                  />
                </div>

                <div className={styles.submit}>Submit</div>
              </div>
            </>
          ) : (
            <></>
          )}
          {curr === 2 ? (
            <>
              <h2>Answer Question</h2>
              <Dropdown>
                <Dropdown.Toggle className={styles.dropdown_button}>
                  {sortBy}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setSortBy("open")}>
                    Open
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setSortBy("closed")}>
                    closed
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <div className={styles.accordian_container}>
                <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>How do we get this?</Accordion.Header>
                    <Accordion.Body>
                      <h5>How do we get this</h5>
                      <textarea
                        onChange={(e) => setAnswerFaq(e.target.value)}
                        placeholder="Answer Query"
                        className={styles.textareaAnswer}
                      />
                      <div
                        className={styles.submit}
                        style={{ background: "#262626", color: "#fff" }}
                      >
                        Submit
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
