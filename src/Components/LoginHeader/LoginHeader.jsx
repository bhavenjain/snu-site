import React from "react";

// Styles
import styles from "./LoginHeader.module.css";

// Images
import logo from "../../assets/SNU-logo.png";
import womenLogo from "../../assets/womenLogo.png";

const LoginHeader = () => {
  return (
    <div className={styles.header}>
      <img src={logo} width={150} />
      <img src={womenLogo} width={150} />
    </div>
  );
};

export default LoginHeader;
