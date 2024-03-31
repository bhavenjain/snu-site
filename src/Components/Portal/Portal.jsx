import React, { useState } from "react";
import { Link } from "react-router-dom";

// Styles
import styles from "./Portal.module.css";

// Components
import BridgeContainer from "../BridgeContainer/BridgeContainer"
import OpenModal from "../OpenModal/OpenModal"

const Portal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className={styles.bridge_container}>
        <BridgeContainer padding={true}>
          <div className={styles.heading}>
            <h2>Laws that affect you</h2>
            <p>
              (Snapshot of key provisions which sets accountability of
              directors)
            </p>
          </div>

          <ul className={styles.lists}>
            <li onClick={handleShow}>Companies Act</li>
            <li onClick={handleShow}>Securities laws (LODR/ Insider Trading/ Takeover)</li>
            <li onClick={handleShow}>Insolvency laws</li>
            <li onClick={handleShow}>FCRA</li>
            <li onClick={handleShow}>PMLA</li>
            <li onClick={handleShow}>Competition laws</li>
            <li onClick={handleShow}>IPC</li>
            <li onClick={handleShow}>Information Technology</li>
            <li onClick={handleShow}>Data Protection</li>
            <li onClick={handleShow}>Environmental laws</li>
            <li onClick={handleShow}>Income Tax Laws</li>
          </ul>
        </BridgeContainer>
      </div>

      <div className={styles.bridge_container_middle}>
        <BridgeContainer padding={true}>
          <div className={styles.heading}>
            <h2>Getting certified as Independent Director</h2>
          </div>
          <ul className={styles.lists}>
            <li onClick={handleShow}>The process of certification</li>
            <li onClick={handleShow}>Relevant rules for certification</li>
            <li onClick={handleShow}>Booking the exam</li>
            <li onClick={handleShow}>Relevant links (IICA, IOD)</li>
            <li onClick={handleShow}>A tutorial</li>
            <li onClick={handleShow}>Key resources</li>
          </ul>
        </BridgeContainer>

        <BridgeContainer padding={true}>
          <div className={styles.heading}>
            <h2>Latest developments</h2>
          </div>
          <ul className={styles.lists}>
            <li onClick={handleShow}>FAQs on key regulations impacting directors</li>
            <li onClick={handleShow}>Including Guidance notes</li>
          </ul>
        </BridgeContainer>
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
              <Link to="/dashboard/ask-the-expert" className={styles.button}>Get Started</Link>
            </div>
          </div>
        </BridgeContainer>
      </div>
      {show ? <OpenModal
        heading="Lorem Ipsum"
        body="Lorem Ipsum tipsum chipsum"
        show={show}
        handleClose={handleClose}
      /> : <></>}
    </>
  );
};

export default Portal;
