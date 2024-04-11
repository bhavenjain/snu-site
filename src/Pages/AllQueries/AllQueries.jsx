import React, { useState } from "react";

// Styles
import styles from "./AllQueries.module.css";

// Bootstrap
import Dropdown from "react-bootstrap/Dropdown";
import OpenModal from "../../Components/OpenModal/OpenModal";

const AllQueries = () => {
  // States
  const [show, setShow] = useState(false);
  const [categoryText, setCategoryText] = useState("Select Category");

  const question =
    "How to become a director as per the current guidelines aksjhfbaksjdbf sdakf askf aksd fa";

  // Modal Functions
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className={styles.queries}>
      <div className={styles.queries_container}>
        <h1>My Queries</h1>

        {/* Dropdown */}
        <div className={styles.category_dropdown}>
          <Dropdown>
            <Dropdown.Toggle className={styles.dropdown_button}>
              {categoryText}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setCategoryText("All Queries")}>
                All Queries
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setCategoryText("Open Queries")}>
                Open Queries
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setCategoryText("Closed Queries")}>
                Closed Queries
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        {/* Queries */}
        <div className={styles.question_container}>
          <div className={styles.card}>
            <div className={styles.question}>
              <div className={styles.info_container}>
                <p className={styles.text_date}>Jan 12, 2024</p>
                <p className={styles.text_question}>
                  {question?.length > 150
                    ? question?.substring(0, 150) + "..."
                    : question}
                </p>
                <p className={styles.text_category}>
                  Category: Duty Of Directors
                </p>
              </div>
              <div className={styles.status_container}>
                <p className={styles.status} style={{ background: "green" }}>
                  Open
                </p>
              </div>

            </div>
              <div className={styles.answer}>
                {/* <span>Your Question has been answered</span> */}
                <div onClick={handleShow}>View Details</div>
              </div>
          </div>
        </div>
      </div>

      {show ? (
        <OpenModal
          heading="Lorem Ipsum"
          body="Lorem Ipsum tipsum chipsum"
          show={show}
          handleClose={handleClose}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default AllQueries;
