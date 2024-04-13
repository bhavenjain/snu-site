import React, { useEffect, useState } from "react";
import axios from "axios"
import Cookies from "js-cookie";

// Styles
import styles from "./Login.module.css";
import Loader from "../../Components/Loader/Loader";
import LoginHeader from "../../Components/LoginHeader/LoginHeader";

const Login = () => {
  const [email, setEmail] = useState("")
  const [loader, setLoader] = useState(false);
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

  const getAuth = async () => {
    const url = "http://127.0.0.1:8000" + "/web/fetch/user";
    const user = await axios.get(url, {
      headers: {
        Authorization: Cookies.get("token"),
      },
    });
    return user;
  };

  useEffect(() => {
    getAuth()
      ?.then((response) => {
        if (response) {
          if (response?.status === 200) {
            setLoader(false);
            console.log(".........", response?.data?.data?.role)
            if(response?.data?.data?.role === "admin") {
              navigate("/admin/add-details/portal");
            } else {
              navigate("/dashboard/web-bridge-portal");
            }
          } else {
            setLoader(false);
          }
        }
      })
      .catch((err) => {
        setLoader(false);
      });
  }, []);

  return loader ? <Loader /> :  (
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
