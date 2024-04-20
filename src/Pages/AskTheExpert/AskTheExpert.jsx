import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

// Styles
import styles from "./AskTheExpert.module.css";

// Bootstrap
import Dropdown from "react-bootstrap/Dropdown";
import Accordion from "react-bootstrap/Accordion";

const AskTheExpert = () => {
  // States
  const [allFaqs, setAllFaqs] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [categoryText, setCategoryText] = useState("Select Category");

  // Function to call api to get all the categories
  const getCategories = async () => {
    const url = import.meta.env.VITE_BACKEND_URL + "/web/fetch/category/faq";
    const response = await axios.get(url, {
      headers: {
        Authorization: Cookies.get("token"),
      },
      params: {},
    });
    setAllCategories(response?.data?.data);
    if (response?.data?.data?.length > 0)
      setCategoryText(response?.data?.data?.at(0));

    return response?.data?.data;
  };

  // Function to call api to get all faqs
  const getFaqs = async () => {
    const url = import.meta.env.VITE_BACKEND_URL + `/web/faq/fetch/all`;
    const response = await axios.get(url, {
      headers: {
        Authorization: Cookies.get("token"),
      },
      params: {
        category: categoryText
      },
    });
    setAllFaqs(response?.data?.data);

    return response?.data?.data;
  };

  // Get All Categories
  useEffect(() => {
    try {
      getCategories();
    } catch (err) {
      console.log(err);
    }
  }, []);

  /**
   * Check if category text has been changed
   * and call faqs according to that
   */
  useEffect(() => {
    if (categoryText !== "Select Category") {
      try {
        getFaqs();
      } catch (err) {
        console.log(err);
      }
    }
  }, [categoryText]);

  return (
    <div className={styles.web_container}>
      <h1 className={styles.heading}>Frequently Asked Questions</h1>
      <p>
        Which of the categories below best describes the nature of your concern?
      </p>

      {/* Category Dropdown */}
      {allCategories?.length > 0 ? (
        <div className={styles.category_dropdown}>
          <Dropdown>
            <Dropdown.Toggle className={styles.dropdown_button}>
              {categoryText}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {allCategories?.map((item, key) => {
                return (
                  <Dropdown.Item
                    key={key}
                    onClick={() => setCategoryText(item)}
                  >
                    {item}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      ) : (
        <></>
      )}

      {/* All Faqs */}
      <div className={styles.question_container}>
        <Accordion defaultActiveKey="0">
          {allFaqs?.length > 0 ? (
            allFaqs?.map((item, key) => {
              return (
                <Accordion.Item key={key} eventKey={key}>
                  <Accordion.Header>{item?.question}</Accordion.Header>
                  <Accordion.Body dangerouslySetInnerHTML={{ __html: item?.answer.replace(/\n/g, '<br>') }} />
                </Accordion.Item>
              );
            })
          ) : (
            <></>
          )}
        </Accordion>
      </div>
    </div>
  );
};

export default AskTheExpert;
