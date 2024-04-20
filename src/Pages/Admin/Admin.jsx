import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";

// Images
import womensLogo from "../../assets/womensLogoWhite.png";

// Bootstrap
import Dropdown from "react-bootstrap/Dropdown";
import Accordion from "react-bootstrap/Accordion";

// Styles
import styles from "./Admin.module.css";
import Loader from "../../Components/Loader/Loader";

// Admin Panel
const Admin = () => {
  // User
  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : {};

  // States
  const [curr, setCurr] = useState(0);
  const [answer, setAnswer] = useState("");
  const [queries, setQueries] = useState([]);
  const [loader, setLoader] = useState(true);
  const [sortBy, setSortBy] = useState("open");
  const [question, setQuestion] = useState("");
  const [answerFaq, setAnswerFaq] = useState("");
  const [allQueries, setAllQueries] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [allCategories, setAllCategories] = useState([]);
  const [categoryText, setCategoryText] = useState("Select Category");

  // Functions
  const signout = () => {
    Cookies.set("token", "");
    Cookies.set("user", "");
    window.location.href = "/login";
  };

  // Get auth to check for user
  const getAuth = async () => {
    const url = import.meta.env.VITE_BACKEND_URL + "/web/fetch/user";
    const user = await axios.get(url, {
      headers: {
        Authorization: Cookies.get("token"),
      },
    });
    return user;
  };

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
      const url = import.meta.env.VITE_BACKEND_URL + "/web/create/category";
      const response = await axios.post(
        url,
        {
          name: categoryName,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: Cookies.get("token"),
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

  // useEffect for the initial Apis
  useEffect(() => {
    if (window.location.hash === "#answer") {
      setCurr(2);
    }

    getAuth()
      ?.then((response) => {
        if (response) {
          if (response?.status === 200) {
            if (response?.data?.data?.role === "admin") setLoader(false);
            else window.location.href = "/dashboard/web-bridge-portal";
          } else {
            window.location.href = "/login";
          }
        }
      })
      .catch((err) => {
        window.location.href = "/login";
      });
  }, []);

  return loader ? (
    <Loader />
  ) : (
    <div className={styles.admin}>
      {/* header */}
      <div className={styles.header}>
        <h1>Admin Panel</h1>
        <div>
          <span>Hi, {user?.name ? user?.name : "Admin"}</span>
          <div className={styles.signout} onClick={signout}>
            Logout
          </div>
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
            <div
              onClick={() => setCurr(3)}
              style={{ background: curr === 3 ? "#fff" : "" }}
            >
              Becoming a director
            </div>

            <div
              onClick={() => setCurr(4)}
              style={{ background: curr === 4 ? "#fff" : "" }}
            >
              Laws and Rules
            </div>
          </div>
          <img src={womensLogo} width={200} />
        </div>

        {/* Main Form */}
        <div className={styles.form_container}>
          {/* ADD Category */}
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

          {/* Add FAQ */}
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

          {/* Answer Queries */}
          {curr === 2 ? (
            <Queries
              sortBy={sortBy}
              setSortBy={setSortBy}
              answerFaq={answerFaq}
              queries={queries}
              setQueries={setQueries}
              allQueries={allQueries}
              setAnswerFaq={setAnswerFaq}
              setAllQueries={setAllQueries}
            />
          ) : (
            <></>
          )}

          {/* Becoming a director */}
          {curr === 3 ? (
            <BecomingADirector
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

          {/* law and rules */}
          {curr === 4 ? (
            <LawsAndRules
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

// Add FAQ
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
    const url = import.meta.env.VITE_BACKEND_URL + "/web/category/fetch/all";
    const response = await axios.get(url, {
      headers: {
        Authorization: Cookies.get("token"),
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
        const url = import.meta.env.VITE_BACKEND_URL + "/web/create/faq";
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
              Authorization: Cookies.get("token"),
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
          <p>Add Question: </p>
          <input
            className={styles.inputs}
            type="text"
            placeholder="Add Question"
            style={{ width: "100%", marginLeft: "0" }}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>

        <div className={styles.input_container}>
          <span>Add Answer: </span>
          <textarea
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Answer FAQ"
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

// Becoming A director
const BecomingADirector = ({
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
    const url = import.meta.env.VITE_BACKEND_URL + "/web/category/fetch/all";
    const response = await axios.get(url, {
      headers: {
        Authorization: Cookies.get("token"),
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
        const url = import.meta.env.VITE_BACKEND_URL + "/web/create/faq";
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
              Authorization: Cookies.get("token"),
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
          <p>Add Question: </p>
          <input
            className={styles.inputs}
            type="text"
            placeholder="Add Question"
            style={{ width: "100%", marginLeft: "0" }}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>

        <div className={styles.input_container}>
          <span>Add Answer: </span>
          <textarea
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Answer FAQ"
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

// Laws And Rules
const LawsAndRules = ({
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
    const url = import.meta.env.VITE_BACKEND_URL + "/web/category/fetch/all";
    const response = await axios.get(url, {
      headers: {
        Authorization: Cookies.get("token"),
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
        const url = import.meta.env.VITE_BACKEND_URL + "/web/create/faq";
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
              Authorization: Cookies.get("token"),
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
          <p>Add Question: </p>
          <input
            className={styles.inputs}
            type="text"
            placeholder="Add Question"
            style={{ width: "100%", marginLeft: "0" }}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>

        <div className={styles.input_container}>
          <span>Add Answer: </span>
          <textarea
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Answer FAQ"
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

// Answer queries
const Queries = ({
  sortBy,
  setSortBy,
  queries,
  setQueries,
  answerFaq,
  setAnswerFaq,
  allQueries,
  setAllQueries,
}) => {
  const getQueries = async () => {
    const url = import.meta.env.VITE_BACKEND_URL + "/web/fetch/all/query";
    const response = await axios.get(url, {
      headers: {
        Authorization: Cookies.get("token"),
      },
      params: {},
    });
    setQueries(response?.data?.data);
    setAllQueries(
      response?.data?.data?.filter((item) => item?.status === "open")
    );
    return response?.data?.data;
  };

  useEffect(() => {
    try {
      getQueries();
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
  }, []);

  useEffect(() => {
    setAllQueries(queries?.filter((item) => item?.status === sortBy));
  }, [sortBy]);

  const handleSubmit = async (id) => {
    if (answerFaq?.length === 0) {
      toast.error("Please answer the question first", {
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
      const url = import.meta.env.VITE_BACKEND_URL + "/web/answer/query";
      const response = await axios.put(
        url,
        {
          id: id,
          answer: answerFaq,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: Cookies.get("token"),
          },
          params: {},
        }
      );

      if (response?.data?.status) {
        window.location.href = "/admin/add-details/portal#answer";
        window.location.reload();
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
      <h2>Answer Question</h2>
      <Dropdown>
        <Dropdown.Toggle className={styles.dropdown_button}>
          {sortBy}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setSortBy("open")}>Open</Dropdown.Item>
          <Dropdown.Item onClick={() => setSortBy("closed")}>
            Closed
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <div className={styles.accordian_container}>
        <Accordion defaultActiveKey="0">
          {allQueries?.length > 0 ? (
            allQueries?.map((item, key) => {
              return (
                <Accordion.Item key={key} eventKey={key}>
                  <Accordion.Header>
                    {item?.question?.length > 100
                      ? `${item?.question?.substr(0, 100)}...`
                      : item?.question}
                  </Accordion.Header>
                  <Accordion.Body>
                    <h5>{item?.question}</h5>
                    <p style={{ color: "rgba(0,0,0,0.4)", fontSize: "12px" }}>
                      Raised on{" "}
                      {moment(item?.raised_on).format(
                        "MMM DD, YYYY, h:mm:ss a"
                      )}{" "}
                      by {item?.raised_by}
                    </p>
                    {item?.status === "open" ? (
                      <textarea
                        onChange={(e) => setAnswerFaq(e.target.value)}
                        placeholder="Answer Query"
                        value={answerFaq}
                        className={styles.textareaAnswer}
                      />
                    ) : (
                      <p>{item?.answer}</p>
                    )}
                    {item?.status === "open" ? (
                      <div
                        onClick={() => handleSubmit(item?.id)}
                        className={styles.submit}
                        style={{ background: "#262626", color: "#fff" }}
                      >
                        Submit
                      </div>
                    ) : (
                      <>
                        <p
                          style={{ color: "rgba(0,0,0,0.4)", fontSize: "12px" }}
                        >
                          Answered on{" "}
                          {moment(item?.answered_on).format(
                            "MMM DD, YYYY, h:mm:ss a"
                          )}{" "}
                          by {item?.answered_by}{" "}
                        </p>
                      </>
                    )}
                  </Accordion.Body>
                </Accordion.Item>
              );
            })
          ) : (
            <></>
          )}
        </Accordion>
      </div>
    </>
  );
};

export default Admin;
