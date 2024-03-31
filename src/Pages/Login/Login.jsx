import React, { useState } from "react";

// Styles
import styles from "./Login.module.css";
import LoginHeader from "../../Components/LoginHeader/LoginHeader";

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // Utility functions

  /**
   * Function to handle email input
   */
  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  /**
   * Function to handle password input
   */
  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  return (
    <div className={`${styles.container}`}>
      {/* Login header logos */}
      <LoginHeader />

      <div className={`container ${styles.login_body}`}>
        <h1>
          Welcome to the <span>WEB BRIDGE</span> platform
        </h1>
        <h2>
          Here you will find information, advise and answers to your questions
          to support your board journey
        </h2>
        <div className={styles.login_form}>
          <input type={"email"} placeholder="Enter Email" value={email} onChange={handleEmail} />
          <input type={"password"} placeholder="Password" value={password} onChange={handlePassword} />
          <a href={"#"} className={styles.forgot}>Forgot Password?</a>
          <a href="#" className={styles.login_button}>Login</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
