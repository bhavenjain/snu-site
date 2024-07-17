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
  const [section, setSection] = useState("");
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

  // section Submit
  const handleSectionSubmit = async () => {
    if (section?.length === 0) {
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
      const url = import.meta.env.VITE_BACKEND_URL + "/web/create/quiz/section";
      const response = await axios.post(
        url,
        {
          name: section,
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
        setSection("");
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
            else window.location.href = "/dashboard/getting-started";
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
              Getting Started: Becoming a director
            </div>

            <div
              onClick={() => setCurr(4)}
              style={{ background: curr === 4 ? "#fff" : "" }}
            >
              Laws and Rules: Life as a Director
            </div>

            <div
              onClick={() => setCurr(5)}
              style={{ background: curr === 5 ? "#fff" : "" }}
            >
              Add Anouncement
            </div>

            <div
              onClick={() => setCurr(6)}
              style={{ background: curr === 6 ? "#fff" : "" }}
            >
              Add Quiz Section
            </div>
            <div
              onClick={() => setCurr(7)}
              style={{ background: curr === 7 ? "#fff" : "" }}
            >
              Add Quiz Question
            </div>
            <div
              onClick={() => setCurr(8)}
              style={{ background: curr === 8 ? "#fff" : "" }}
            >
              Delete Quiz Question
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
              setCategoryText={setCategoryText}
              categoryText={categoryText}
              allCategories={allCategories}
              setAllCategories={setAllCategories}
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

          {/* Announcement */}
          {curr === 5 ? (
            <Announcements
              setAnswer={setAnswer}
              setQuestion={setQuestion}
              answer={answer}
              question={question}
            />
          ) : (
            <></>
          )}

          {/* Quiz section */}
          {curr === 6 ? (
            <>
              <h2>Add Quiz Section</h2>
              <div className={styles.form}>
                <span>Enter section name: </span>
                <input
                  className={styles.inputs}
                  type="text"
                  value={section}
                  placeholder="Section Name"
                  onChange={(e) => setSection(e.target.value)}
                />
                <div onClick={handleSectionSubmit} className={styles.submit}>
                  Submit
                </div>
              </div>
            </>
          ) : (
            <></>
          )}

          {/* Becoming a director */}
          {curr === 7 ? (
            <CreateQuestion
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

          {/* Delete Question */}
          {curr === 8 ? <DeleteQuestion /> : <></>}
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
    const url = import.meta.env.VITE_BACKEND_URL + "/web/fetch/all/card_names";
    const response = await axios.get(url, {
      headers: {
        Authorization: Cookies.get("token"),
      },
      params: {
        page_name: "getting-started",
      },
    });
    setAllCategories(response?.data?.data);
    return response?.data?.data;
  };

  // Get All Categories
  useEffect(() => {
    try {
      setAllCategories([]);
      setCategoryText("Select Category");
      setQuestion("");
      setAnswer("");

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
        const url =
          import.meta.env.VITE_BACKEND_URL + "/web/create/card/detail";
        const response = await axios.post(
          url,
          {
            page_name: "getting-started",
            question: question,
            answer: answer,
            card_name: categoryText,
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
      <h2>Add to page Getting Started: Becoming a director</h2>
      <div className={styles.form}>
        <p>Select Card Name </p>
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

        <div className={styles.input_container}>
          <p>Add Bulletpoint </p>
          <input
            className={styles.inputs}
            type="text"
            placeholder="Add Bulletpoint"
            style={{ width: "100%", marginLeft: "0" }}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>

        <div className={styles.input_container}>
          <span>Add Details/Answer </span>
          <textarea
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Write Details/Answer"
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
    const url = import.meta.env.VITE_BACKEND_URL + "/web/fetch/all/card_names";
    const response = await axios.get(url, {
      headers: {
        Authorization: Cookies.get("token"),
      },
      params: {
        page_name: "laws-and-rules",
      },
    });
    setAllCategories(response?.data?.data);
    return response?.data?.data;
  };

  // Get All Categories
  useEffect(() => {
    try {
      setAllCategories([]);
      setCategoryText("Select Category");
      setQuestion("");
      setAnswer("");

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
        const url =
          import.meta.env.VITE_BACKEND_URL + "/web/create/card/detail";
        const response = await axios.post(
          url,
          {
            page_name: "laws-and-rules",
            question: question,
            answer: answer,
            card_name: categoryText,
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
      <h2>Add to page Laws and Rules: Life as a Director</h2>
      <div className={styles.form}>
        <p>Select Card Name </p>
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

        <div className={styles.input_container}>
          <p>Add Bulletpoint </p>
          <input
            className={styles.inputs}
            type="text"
            placeholder="Add Bulletpoint"
            style={{ width: "100%", marginLeft: "0" }}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>

        <div className={styles.input_container}>
          <span>Add Details/Answer </span>
          <textarea
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Write Details/Answer"
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
  categoryText,
  setCategoryText,
  setQueries,
  answerFaq,
  allCategories,
  setAllCategories,
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

  useEffect(() => {
    try {
      setAllCategories([]);
      setCategoryText("Select Category");
      setQueries([]);
      setAnswerFaq("");
      setSortBy("open");

      // Get API Data
      getCategories();
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
    if (categoryText !== "Select Category") {
      setAllQueries(
        allQueries?.filter(
          (item) => item?.category === categoryText && item?.status === sortBy
        )
      );
    } else {
      setAllQueries(queries?.filter((item) => item?.status === sortBy));
    }
  }, [sortBy, categoryText]);

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
      <div style={{ display: "flex" }}>
        <Dropdown>
          <Dropdown.Toggle className={styles.dropdown_button}>
            {sortBy}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setSortBy("open")}>
              Open
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setSortBy("closed")}>
              Closed
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        {allCategories?.length > 0 ? (
          <div style={{ marginLeft: 40 }}>
            {/* <div className={styles.category_dropdown}> */}
            <Dropdown>
              <Dropdown.Toggle className={styles.dropdown_button}>
                {categoryText}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => setCategoryText("Select Category")}
                >
                  Select Category
                </Dropdown.Item>
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
            {/* </div> */}
          </div>
        ) : (
          <></>
        )}
      </div>

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

const Announcements = ({ setAnswer, setQuestion, answer, question }) => {
  const handleSubmit = async () => {
    try {
      if (question?.length > 0 && answer?.length > 0) {
        const url =
          import.meta.env.VITE_BACKEND_URL + "/web/create/announcement";
        const response = await axios.post(
          url,
          {
            heading: question,
            content: answer,
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

  useEffect(() => {
    setAnswer("");
    setQuestion("");
  }, []);

  return (
    <>
      <h2>Add Announcements</h2>
      <div className={styles.input_container}>
        <p>Add Announcements </p>
        <input
          className={styles.inputs}
          type="text"
          placeholder="Add Announcements"
          style={{ width: "100%", marginLeft: "0" }}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </div>

      <div className={styles.input_container}>
        <span>Add Details </span>
        <textarea
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Write Details"
          value={answer}
        />
      </div>

      <div onClick={handleSubmit} className={styles.submit}>
        Submit
      </div>
    </>
  );
};

// Becoming A director
const CreateQuestion = ({
  categoryText,
  setCategoryText,
  setAnswer,
  setQuestion,
  answer,
  question,
  allCategories,
  setAllCategories,
}) => {
  // States
  const [sectionCategory, setSectionCategory] = useState("");
  const [quizQuestion, setQuizQuestion] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [optionD, setOptionD] = useState("");
  const [explanation, setExplanation] = useState("");
  const [correctOption, setCorrectOption] = useState("");

  // Function to call api to get all the categories
  const getCategories = async () => {
    const url =
      import.meta.env.VITE_BACKEND_URL + "/web/fetch/all/quiz/sections";
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
      setAllCategories([]);
      setCategoryText("Select Section");
      setQuestion("");
      setAnswer("");

      getCategories();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleSubmit = async () => {
    try {
      if (
        categoryText !== "Select Section" &&
        correctOption !== "" &&
        quizQuestion?.length > 0 &&
        optionA?.length > 0 &&
        optionB?.length > 0 &&
        optionC?.length > 0 &&
        optionD?.length > 0
      ) {
        const url =
          import.meta.env.VITE_BACKEND_URL + "/web/create/quiz/question";
        const response = await axios.post(
          url,
          {
            question: quizQuestion,
            option_a: optionA,
            option_b: optionB,
            option_c: optionC,
            option_d: optionD,
            correct_option: correctOption,
            explanation: explanation,
            section_id: sectionCategory,
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
          setCategoryText("Select Section");
          setOptionA("");
          setOptionB("");
          setOptionC("");
          setOptionD("");
          setExplanation("");
          setCorrectOption("");
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

  const handleCorrect = (e) => {
    setCorrectOption(e.target.name);
  };

  return (
    <div style={{ height: "85vh", overflowY: "scroll" }}>
      <h2>Add Quiz Question</h2>
      <div className={styles.form}>
        <p>Select Section </p>
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
                      onClick={() => {
                        setSectionCategory(item?.section_id);
                        setCategoryText(item?.name);
                      }}
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
          <p>Enter Question</p>
          <input
            className={styles.inputs}
            type="text"
            placeholder="Add Question"
            style={{ width: "100%", marginLeft: "0" }}
            value={quizQuestion}
            onChange={(e) => setQuizQuestion(e.target.value)}
          />
        </div>

        <div className={styles.input_container}>
          <p>Enter Option A</p>
          <input
            className={styles.inputs}
            type="text"
            placeholder="Option A"
            style={{ width: "100%", marginLeft: "0" }}
            value={optionA}
            onChange={(e) => setOptionA(e.target.value)}
          />
          <div style={{ marginTop: "10px" }}>
            <input
              type="radio"
              name="a"
              value={correctOption}
              checked={correctOption === "a"}
              onChange={handleCorrect}
            />
            <span style={{ marginLeft: "10px" }}>Mark Correct</span>
          </div>
        </div>

        <div className={styles.input_container}>
          <p>Enter Option B</p>
          <input
            className={styles.inputs}
            type="text"
            placeholder="Option B"
            style={{ width: "100%", marginLeft: "0" }}
            value={optionB}
            onChange={(e) => setOptionB(e.target.value)}
          />
          <div style={{ marginTop: "10px" }}>
            <input
              type="radio"
              checked={correctOption === "b"}
              name="b"
              value={correctOption}
              onChange={handleCorrect}
            />
            <span style={{ marginLeft: "10px" }}>Mark Correct</span>
          </div>
        </div>

        <div className={styles.input_container}>
          <p>Enter Option C</p>
          <input
            className={styles.inputs}
            type="text"
            placeholder="Option C"
            style={{ width: "100%", marginLeft: "0" }}
            value={optionC}
            onChange={(e) => setOptionC(e.target.value)}
          />
          <div style={{ marginTop: "10px" }}>
            <input
              type="radio"
              name="c"
              checked={correctOption === "c"}
              value={correctOption}
              onChange={handleCorrect}
            />
            <span style={{ marginLeft: "10px" }}>Mark Correct</span>
          </div>
        </div>

        <div className={styles.input_container}>
          <p>Enter Option D</p>
          <input
            className={styles.inputs}
            type="text"
            placeholder="Option D"
            style={{ width: "100%", marginLeft: "0" }}
            value={optionD}
            onChange={(e) => setOptionD(e.target.value)}
          />
          <div style={{ marginTop: "10px" }}>
            <input
              type="radio"
              name="d"
              value={correctOption}
              checked={correctOption === "d"}
              onChange={handleCorrect}
            />
            <span style={{ marginLeft: "10px" }}>Mark Correct</span>
          </div>
        </div>

        <div className={styles.input_container}>
          <span>Add Explanation </span>
          <textarea
            onChange={(e) => setExplanation(e.target.value)}
            placeholder="Write Explanation"
            value={explanation}
          />
        </div>

        <div onClick={handleSubmit} className={styles.submit}>
          Submit
        </div>
      </div>
    </div>
  );
};

// Delete Quesion
const DeleteQuestion = () => {
  const [question, setQuestion] = useState("");
  const [allQuestions, setAllQuestions] = useState([]);
  const [showQuestions, setShowQuestions] = useState([]);

  const getQuestions = async () => {
    const url =
      import.meta.env.VITE_BACKEND_URL + "/web/fetch/all/quiz/questions";
    const response = await axios.get(url, {
      headers: {
        Authorization: Cookies.get("token"),
      },
    });
    if (response?.data?.data) setAllQuestions(response?.data?.data);
  };

  const deleteQuestion = async (id) => {
    const url = import.meta.env.VITE_BACKEND_URL + "/web/delete/quiz/question";
    const response = await axios.delete(url, {
      headers: {
        Authorization: Cookies.get("token"),
      },
      params: {
        id,
      },
      body: {
        id,
      },
    });
    getQuestions()
  };

  useEffect(() => {
    getQuestions();
  }, []);

  useEffect(() => {
    if (allQuestions) {
      const questionsToShow = allQuestions.filter((item) =>
        item?.question?.includes(question)
      );
      setShowQuestions(questionsToShow);
    }
  }, [question, allQuestions]);

  return (
    <div style={{ height: "85vh", overflowY: "scroll" }}>
      <h2>Delete Quiz Question</h2>
      <div className={styles.delete_Container}>
        <p>Search Question</p>
        <input
          type={"text"}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Search Question"
        />
      </div>

      <div className={styles.delete_question_container}>
        {showQuestions?.length > 0 ? (
          showQuestions?.map((item) => (
            <div
              key={item._id}
              className={styles.delete_question}
              onClick={() => {}}
            >
              <p>{item?.question}</p>
              <div
                onClick={() => deleteQuestion(item?.id)}
                className={styles.delete_btn}
              >
                Delete Question
              </div>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Admin;
