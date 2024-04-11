import React, { useState } from "react";

// Bootstrap
import Dropdown from "react-bootstrap/Dropdown";

// Styles
import styles from "./QueryManager.module.css";

const QueryManager = () => {
  // States
  const [text, setText] = useState("");
  const [categoryText, setCategoryText] = useState("Select Category");

  // Functions
  const handleSubmit = () => {};

  return (
    <div className={styles.query_container}>
      <div className={styles.container}>
        <h1>Ask The Expert</h1>

        <div className={styles.form}>
          <p>Queries by categories</p>
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
          <textarea
            onChange={(e) => setText(e.target.value)}
            placeholder="About Query"
          />
        </div>

        <div className={styles.submit_container}>
          <div className={styles.submit} onClick={handleSubmit}>
            Submit
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueryManager;
