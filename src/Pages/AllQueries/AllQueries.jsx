import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import Cookies from "js-cookie";

// Styles
import styles from "./AllQueries.module.css";

// Bootstrap
import Dropdown from "react-bootstrap/Dropdown";
import OpenModal from "../../Components/OpenModal/OpenModal";

const AllQueries = () => {
  // States
  const [show, setShow] = useState(false);
  const [allData, setAllData] = useState([])
  const [answer, setAnswer] = useState("");
  const [sortby, setSortBy] = useState("all");
  const [queries, setQueries] = useState([]);
  const [question, setQuestion] = useState("");
  const [categoryText, setCategoryText] = useState("All Queries");

  // Modal Functions
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getQueries = async () => {
    const url = import.meta.env.VITE_BACKEND_URL + `/web/fetch/all/query/user`;
    const response = await axios.get(url, {
      headers: {
        Authorization: Cookies.get("token"),
      },
      params: {},
    });
    setAllData(response?.data?.data)
    setQueries(response?.data?.data);
    return response?.data?.data;
  };

  useEffect(() => {
    try {
      getQueries();
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
      if(sortby === "all") {
        setQueries(allData)
      } else {
        setQueries(allData?.filter(item => { return item?.status === sortby}))
      }
  }, [sortby])

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
              <Dropdown.Item
                onClick={() => {
                  setSortBy("all");
                  setCategoryText("All Queries");
                }}
              >
                All Queries
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setSortBy("open");
                  setCategoryText("Open Queries");
                }}
              >
                Open Queries
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setSortBy("closed");
                  setCategoryText("Closed Queries");
                }}
              >
                Closed Queries
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        {/* Queries */}
        <div className={styles.question_container}>
          {queries?.length > 0 ? (
            queries?.map((item, key) => (
              <div className={styles.card} key={key}>
                <div className={styles.question}>
                  <div className={styles.info_container}>
                    <p className={styles.text_question}>
                      {item?.question?.length > 150
                        ? item?.question?.substring(0, 150) + "..."
                        : item?.question}
                    </p>
                    <p className={styles.text_category}>
                      Category | {item?.category}
                    </p>
                    <p className={styles.text_date}>
                      Raised on{" "}
                      {moment(item?.raised_on).format(
                        "MMM DD, YYYY, h:mm:ss a"
                      )}
                    </p>
                  </div>
                  <div className={styles.status_container}>
                    <p
                      className={styles.status}
                      style={{
                        background:
                          item?.status === "closed" ? "green" : "#dd5100",
                      }}
                    >
                      {item?.status}
                    </p>
                  </div>
                </div>
                <div className={styles.answer}>
                  <div
                    onClick={() => {
                      setQuestion(item?.question);
                      setAnswer(item?.answer);
                      handleShow();
                    }}
                  >
                    View Details
                  </div>
                </div>
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>

      {show ? (
        <OpenModal
          heading={question}
          body={answer}
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
