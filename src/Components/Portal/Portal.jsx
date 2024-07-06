import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

// Styles
import styles from "./Portal.module.css";

// Components
import OpenModal from "../OpenModal/OpenModal";
import BridgeContainer from "../BridgeContainer/BridgeContainer";
import { Col, Row } from "react-bootstrap";

const Portal = () => {
  // States
  const [show, setShow] = useState(false);
  const [answer, setAnswer] = useState("");
  const [pageData, setPageData] = useState({});
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
      <img
        src="/Banner_with_text.svg"
        alt="banner"
        style={{ maxWidth: "100%" }}
      />
      <Row style={{height: "60%"}}>
        <Col md={4} style={{height: "100%"}}>
          <div className={styles.bridge_container}>
            {pageData?.card1 && pageData?.card1?.card_details?.length > 0 ? (
              <BridgeContainer>
                <div className={styles.heading}>
                  <h2>{pageData?.card1?.heading}</h2>
                  {/* <p>
                (Snapshot of key provisions which sets accountability of
                directors)
              </p> */}
                </div>

                <ul className={styles.lists}>
                  {pageData?.card1?.card_details?.map((item, key) => {
                    return item?.question ? (
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
                    ) : (
                      <div key={key}></div>
                    );
                  })}
                </ul>
              </BridgeContainer>
            ) : (
              <></>
            )}
          </div>
        </Col>

        <Col md={4} style={{height: "100%"}}>
          <div className={styles.bridge_container_middle}>
            {pageData?.card2 && pageData?.card2?.card_details?.length > 0 ? (
              <BridgeContainer>
                <div className={styles.heading}>
                  <h2>{pageData?.card2?.heading}</h2>
                </div>

                <ul className={styles.lists}>
                  {pageData?.card2?.card_details?.map((item, key) => {
                    return item?.question ? (
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
                    ) : (
                      <div key={key}></div>
                    );
                  })}
                </ul>
              </BridgeContainer>
            ) : (
              <></>
            )}
          </div>
        </Col>
        <Col md={4} style={{height: "100%"}}>
          <div className={styles.bridge_container_right}>
            {pageData?.card3 && pageData?.card3?.card_details?.length > 0 ? (
              <BridgeContainer>
                <div className={styles.heading}>
                  <h2>{pageData?.card3?.heading}</h2>
                  {/* <p>
                (Snapshot of key provisions which sets accountability of
                directors)
              </p> */}
                </div>

                <ul className={styles.lists}>
                  {pageData?.card3?.card_details?.map((item, key) => {
                    return item?.question ? (
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
                    ) : (
                      <div key={key}></div>
                    );
                  })}
                </ul>
              </BridgeContainer>
            ) : (
              <></>
            )}
          </div>
        </Col>
      </Row>

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
