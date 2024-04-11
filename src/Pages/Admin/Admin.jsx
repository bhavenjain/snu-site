import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

// Images
import womensLogo from "../../assets/womensLogoWhite.png";

// Bootstrap
import Dropdown from "react-bootstrap/Dropdown";
import Accordion from "react-bootstrap/Accordion";

// Styles
import styles from "./Admin.module.css";

// Admin Panel
const Admin = () => {
  const [curr, setCurr] = useState(0);
  const [answer, setAnswer] = useState("");
  const [sortBy, setSortBy] = useState("open");
  const [question, setQuestion] = useState("");
  const [answerFaq, setAnswerFaq] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [allCategories, setAllCategories] = useState([]);
  const [categoryText, setCategoryText] = useState("Select Category");

  // Functions
  const signout = () => {};

  // Category Submit
  const handleCategorySubmit = async () => {
    if (categoryName?.length === 0) {
      toast.error("Please enter category name.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
    try {
      const url = "http://127.0.0.1:8000" + "/web/create/category";
      const response = await axios.post(
        url,
        {
          name: categoryName,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          params: {},
        }
      );

      if (response?.data?.status) {
        toast.success(response?.data?.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setCategoryName("");
      } else {
        toast.error(response?.data?.message, {
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
    } catch (err) {
      toast.error(response?.data?.message, {
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

        {/* Main Form */}
        <div className={styles.form_container}>
          {curr === 0 ? (
            <>
              <h2>Add Category</h2>
              <div className={styles.form}>
                <span>Enter category name: </span>
                <input
                  className={styles.inputs}
                  type="text"
                  value={categoryName}
                  placeholder="category name"
                  onChange={(e) => setCategoryName(e.target.value)}
                />
                <div onClick={handleCategorySubmit} className={styles.submit}>
                  Submit
                </div>
              </div>
            </>
          ) : (
            <></>
          )}

          {curr === 1 ? (
            <Faq
              categoryText={categoryText}
              setCategoryText={setCategoryText}
              setAnswer={setAnswer}
              setQuestion={setQuestion}
              answer={answer}
              question={question}
              allCategories={allCategories}
              setAllCategories={setAllCategories}
            />
          ) : (
            <></>
          )}

          {curr === 2 ? (
            <Queries
              answer={answer}
              sortBy={sortBy}
              setSortBy={setSortBy}
              setAnswerFaq={setAnswerFaq}
            />
          ) : (
            <></>
          )}
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

const Faq = ({
  categoryText,
  setCategoryText,
  setAnswer,
  setQuestion,
  answer,
  question,
  allCategories,
  setAllCategories,
}) => {
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

  const handleSubmit = async () => {
    try {
      if (
        categoryText !== "Select Category" &&
        question?.length > 0 &&
        answer?.length > 0
      ) {
        const url = "http://127.0.0.1:8000" + "/web/create/faq";
        const response = await axios.post(
          url,
          {
            question: question,
            answer: answer,
            category: categoryText,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            params: {},
          }
        );
        if (response?.data?.status) {
          toast.success(response?.data?.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setCategoryText("Select Category");
          setAnswer("");
          setQuestion("");
        } else {
          toast.error(response?.data?.message, {
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
      } else {
        toast.error("Please enter all the details.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        return;
      }
    } catch (err) {
      toast.error(err?.message, {
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
    <>
      <h2>Add Faq</h2>
      <div className={styles.form}>
        <p>Select Category Name: </p>
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
                      onClick={() => setCategoryText(item?.name)}
                    >
                      {item?.name}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        ) : (
          <></>
        )}

        <div className={styles.input_container}>
          <span>Add Question: </span>
          <input
            className={styles.inputs}
            type="text"
            placeholder="Add Question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>

        <div className={styles.input_container}>
          <span>Add Answer: </span>
          <textarea
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="About Query"
            value={answer}
          />
        </div>

        <div onClick={handleSubmit} className={styles.submit}>
          Submit
        </div>
      </div>
    </>
  );
};

const Queries = ({ answer, sortBy, setSortBy, setAnswerFaq }) => {
  return (
    <>
      <h2>Answer Question</h2>
      <Dropdown>
        <Dropdown.Toggle className={styles.dropdown_button}>
          {sortBy}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setSortBy("open")}>Open</Dropdown.Item>
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
  );
};

export default Admin;
