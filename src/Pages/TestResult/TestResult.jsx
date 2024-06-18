import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";

// Styles
import styles from "./TestResult.module.css";

// Bootstrap Components
import { Col, Container, Modal, Row } from "react-bootstrap";

// Components
import Timer from "../../Components/Timer/Timer";
import Loader from "../../Components/Loader/Loader";

const TestResult = () => {
  const history = useNavigate();
  const { state: prevState, pathname: url } = useLocation();

  const score = (prevState?.score / prevState?.totalQuestions) * 100;

  // Cookies
  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : {};

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    window.location.href = "/login";
  };

  return (
    <main>
      <div className={styles.test_background}>
        <header className={styles.test_header_container}>
          <Row className={styles.test_header}>
            <Col className={styles.desktop_display}>
              <img src={"/SVG_Logo_Unit.svg"} width={350} />
            </Col>
            <Col className={styles.test_header_right}>
              <img src="/SVG_Profile.svg" width="30" />
              <b style={{ display: "flex", alignItems: "center" }}>
                Hello,{" "}
                {user?.name
                  ? user?.name?.length > 17
                    ? user?.name?.substr(0, 17) + "..."
                    : user?.name
                  : "User"}
              </b>
              <span className={styles.logout} onClick={logout}>
                Logout
              </span>
            </Col>
          </Row>
        </header>
        <div className={styles.header}>Result</div>
        <div className={styles.body}>
          <Container>
            <div className={styles.congrats}>
              {score >= 50 ? (
                <>
                  <img src="/congrats.png" width={"70%"} />
                  <h1>You've Scored {score}%</h1>
                </>
              ) : (
                <div className={styles.fail}>
                  <h1>Thank You for taking the test. <br/> {prevState?.message}</h1>
                  <a href="/test" className={styles.button}>
                    Try again
                  </a>
                </div>
              )}
            </div>
          </Container>
          <div className={styles.results} >
            <Col md={10}>
              <Row>
                <Col style={{minWidth:"115px"}}>
                  <h6>Score</h6>
                  <p>
                    {prevState?.score}/{prevState?.totalQuestions}
                  </p>
                </Col>
                <Col style={{minWidth:"115px"}}>
                  <h6>Time Taken</h6>
                  <p>
                    00:
                    {JSON.stringify(prevState?.minutes || 0)?.length <= 1
                      ? "0" + prevState?.minutes
                      : prevState?.minutes}
                    :
                    {JSON.stringify(prevState?.seconds || 0)?.length <= 1
                      ? "0" + prevState?.seconds
                      : prevState?.seconds}
                  </p>
                </Col>
              </Row>
            </Col>

                <a className={styles.button} href={"/solutions"+url}>Solutions</a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TestResult;
