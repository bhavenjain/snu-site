import React, { useState } from "react";

// Styles
import styles from "./AskTheExpert.module.css";

// Bootstrap
import { Col, Row } from "react-bootstrap";

// Components
import OpenModal from "../../Components/OpenModal/OpenModal";

const AskTheExpert = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  return (
    <div className={styles.web_container}>
      <h1 className={styles.heading}>ASK THE EXPERT ( CHOOSE A CATEGORY )</h1>
      <p>
        Which of the categories below best describes the nature of your concern?
      </p>
      <div>
        <Row>
          <Col md={4}>
            <div
              className={styles?.card}
              onClick={handleShow}
            >
              <div className={styles.card_container}>
                <p>Duty of directors</p>
                <img src="/src/assets/plus.png" width={22} height={22} />
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className={styles?.card} onClick={handleShow}>
              <div className={styles.card_container}>
                <p>Integrity and ethics related concerns</p>
                <img src="/src/assets/plus.png" width={22} height={22} />
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className={styles?.card} onClick={handleShow}>
              <div className={styles.card_container}>
                <p>Addressing minority shareholder concerns</p>
                <img src="/src/assets/plus.png" width={22} height={22} />
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className={styles?.card} onClick={handleShow}>
              <div className={styles.card_container}>
                <p>Insider trading</p>
                <img src="/src/assets/plus.png" width={22} height={22} />
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className={styles?.card} onClick={handleShow}>
              <div className={styles.card_container}>
                <p>
                  Violation of statutory provision (Companies Act, 2013, SEBI
                  LODR, other laws)
                </p>
                <img src="/src/assets/plus.png" width={22} height={22} />
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className={styles?.card} onClick={handleShow}>
              <div className={styles.card_container}>
                <p>Fraud and reporting of frauds</p>
                <img src="/src/assets/plus.png" width={22} height={22} />
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className={styles?.card} onClick={handleShow}>
              <div className={styles.card_container}>
                <p>Related party transactions</p>
                <img src="/src/assets/plus.png" width={22} height={22} />
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className={styles?.card} onClick={handleShow}>
              <div className={styles.card_container}>
                <p>Financial misconduct, bribery, corruption</p>
                <img src="/src/assets/plus.png" width={22} height={22} />
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className={styles?.card} onClick={handleShow}>
              <div className={styles.card_container}>
                <p>Risk management</p>
                <img src="/src/assets/plus.png" width={22} height={22} />
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className={styles?.card} onClick={handleShow}>
              <div className={styles.card_container}>
                <p>
                  People issues (Culture, Workplace harassment, discrimination)
                </p>
                <img src="/src/assets/plus.png" width={22} height={22} />
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className={styles?.card} onClick={handleShow}>
              <div className={styles.card_container}>
                <p>Financial oversight</p>
                <img src="/src/assets/plus.png" width={22} height={22} />
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className={styles?.card} onClick={handleShow}>
              <div className={styles.card_container}>
                <p>Audit oversight</p>
                <img src="/src/assets/plus.png" width={22} height={22} />
              </div>
            </div>
          </Col>
          <Col md={4}>
            <div className={styles?.card} onClick={handleShow}>
              <div className={styles.card_container}>
                <p>Whistleblower</p>
                <img src="/src/assets/plus.png" width={22} height={22} />
              </div>
            </div>
          </Col>
        </Row>
      </div>
      {show ? <OpenModal
        heading="Lorem Ipsum"
        body="Lorem Ipsum tipsum chipsum"
        show={show}
        handleClose={handleClose}
      /> : <></>}
    </div>
  );
};

export default AskTheExpert;
