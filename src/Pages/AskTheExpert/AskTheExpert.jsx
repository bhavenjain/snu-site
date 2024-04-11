import React, { useEffect, useState } from "react";
import axios from "axios";

// Styles
import styles from "./AskTheExpert.module.css";

// Bootstrap
import Dropdown from "react-bootstrap/Dropdown";
import Accordion from "react-bootstrap/Accordion";

// Components
import OpenModal from "../../Components/OpenModal/OpenModal";

const AskTheExpert = () => {
  // States
  const [show, setShow] = useState(false);
  const [allCategories, setAllCAtegories] = useState({});
  const [categoryText, setCategoryText] = useState("Select Category");

  // Modal Functions
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getCategories = async () => {
    const url = "http://127.0.0.1:8000" + "/web/fetch/category/faq";
    const response = await axios.get(url, {
      header: {
        Authorization: "",
      },
      params: {},
    });
    setAllCAtegories(response?.data?.data);
    return response?.data?.data;
  };

  useEffect(() => {
    try {
      getCategories();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div className={styles.web_container}>
      <h1 className={styles.heading}>Frequently Asked Questions</h1>
      <p>
        Which of the categories below best describes the nature of your concern?
      </p>
      <div className={styles.category_dropdown}>
        <Dropdown>
          <Dropdown.Toggle className={styles.dropdown_button}>
            {categoryText}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {allCategories?.map((item, key) => {
              return (
                <Dropdown.Item key={key} onClick={() => setCategoryText(item)}>
                  {item}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <div className={styles.question_container}>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Accordion Item #1</Accordion.Header>
            <Accordion.Body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
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

export default AskTheExpert;
