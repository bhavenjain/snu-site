import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

// Bootstrap
import Dropdown from "react-bootstrap/Dropdown";

// Styles
import styles from "./QueryManager.module.css";

const QueryManager = () => {
  // States
  const [text, setText] = useState("");
  const [allCategories, setAllCategories] = useState([]);
  const [categoryText, setCategoryText] = useState("Select Category");

  // Function to call api to get all the categories
  const getCategories = async () => {
    const url = "http://127.0.0.1:8000" + "/web/category/fetch/all";
    const response = await axios.get(url, {
      header: {
        Authorization: "",
      },
      params: {},
    });
    setAllCategories(response?.data?.data);
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

  // Functions
  const handleSubmit = async () => {
    if (text?.length > 0 && categoryText !== "Select Category") {
      const url = 'http://127.0.0.1:8000' + '/web/create/query'
      await axios.post(
        url,
        {
          question: text,
          category: categoryText,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          params: {},
        }
      );
      toast.success("Submitted Successfuly", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      window.location.reload();
    } else {
      toast.error("Can not Submit", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <div className={styles.query_container}>
      <div className={styles.container}>
        <h1>Ask The Expert</h1>

        <div className={styles.form}>
          <p>Queries by categories</p>
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
    </div>
  );
};

export default QueryManager;
