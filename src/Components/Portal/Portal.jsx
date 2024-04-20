import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

// Styles
import styles from "./Portal.module.css";

// Components
import OpenModal from "../OpenModal/OpenModal";
import BridgeContainer from "../BridgeContainer/BridgeContainer";

const Portal = () => {
  const [show, setShow] = useState(false);
  const [pageData, setPageData] = useState({});
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Get page data based on url
  const getPagedata = async (pageUrl) => {
    const url =
      import.meta.env.VITE_BACKEND_URL + "/web/page/fetch/card/details";
    const response = await axios.get(url, {
      headers: {
        Authorization: Cookies.get("token"),
      },
      params: {
        page_name: pageUrl?.includes("getting-started")
          ? "getting-started"
          : "laws-and-rules",
      },
    });
    return response?.data?.data;
  };

  useEffect(() => {
    getPagedata(window.location.pathname)
      .then((response) => {
        if (response) {
          setPageData(response);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [window.location.pathname]);

  return (
    <>
      <div className={styles.bridge_container}>
        {pageData?.card1 && pageData?.card1?.card_details?.length > 0 ? (
          <BridgeContainer padding={true}>
            <div className={styles.heading}>
              <h2>{pageData?.card1?.heading}</h2>
              {/* <p>
                (Snapshot of key provisions which sets accountability of
                directors)
              </p> */}
            </div>

            <ul className={styles.lists}>
              {pageData?.card1?.card_details?.map((item, key) => {
                return (
                  <li
                    key={key}
                    onClick={() => {
                      setQuestion(item?.question);
                      setAnswer(item?.answer);
                      handleShow();
                    }}
                  >
                    {item?.question}
                  </li>
                );
              })}
            </ul>
          </BridgeContainer>
        ) : (
          <></>
        )}
      </div>

      <div className={styles.bridge_container_middle}>
        {pageData?.card2 && pageData?.card2?.card_details?.length > 0 ? (
          <BridgeContainer padding={true}>
            <div className={styles.heading}>
              <h2>{pageData?.card2?.heading}</h2>
              {/* <p>
                (Snapshot of key provisions which sets accountability of
                directors)
              </p> */}
            </div>

            <ul className={styles.lists}>
              {pageData?.card2?.card_details?.map((item, key) => {
                return (
                  <li
                    key={key}
                    onClick={() => {
                      setQuestion(item?.question);
                      setAnswer(item?.answer);
                      handleShow();
                    }}
                  >
                    {item?.question}
                  </li>
                );
              })}
            </ul>
          </BridgeContainer>
        ) : (
          <></>
        )}

        {pageData?.card3 && pageData?.card3?.card_details?.length > 0 ? (
          <BridgeContainer padding={true}>
            <div className={styles.heading}>
              <h2>{pageData?.card3?.heading}</h2>
              {/* <p>
                (Snapshot of key provisions which sets accountability of
                directors)
              </p> */}
            </div>

            <ul className={styles.lists}>
              {pageData?.card3?.card_details?.map((item, key) => {
                return (
                  <li
                    key={key}
                    onClick={() => {
                      setQuestion(item?.question);
                      setAnswer(item?.answer);
                      handleShow();
                    }}
                  >
                    {item?.question}
                  </li>
                );
              })}
            </ul>
          </BridgeContainer>
        ) : (
          <></>
        )}
      </div>

      <div className={styles.bridge_container_right}>
        <BridgeContainer>
          <img
            src="/src/assets/question.png"
            className={styles.question_image}
          />
          <h2 className={styles.expert}>Ask the Expert</h2>
          <div className={styles.right_content}>
            <p>
              ‘Ask the Expert’ provides a helpline to answer your questions and
              address dilemmas you may face in due discharge of duties as
              director. While it is not a substitute for legal or financial
              advise you may need a director, it shall cater to key concerns
              which you as directors may come across. Every concern shall be
              examined by senior industry professionals and the advise will be
              aimed to help you with honest assessment of your query,
              maintaining the highest levels of confidentiality.
            </p>
            <div className={styles.button_container}>
              <Link to="/dashboard/ask-the-expert" className={styles.button}>
                Get Started
              </Link>
            </div>
          </div>
        </BridgeContainer>
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
    </>
  );
};

export default Portal;
