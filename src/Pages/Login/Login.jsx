import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";

// Styles
import styles from "./Login.module.css";

// Components
import Loader from "../../Components/Loader/Loader";
import LoginHeader from "../../Components/LoginHeader/LoginHeader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState(false);
  const [password, setPassword] = useState("");

  // Utility functions
  /**
   * Function to handle email input
   */
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  /**
   * Function to handle password input
   */
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  // Get auth to check for user
  const getAuth = async () => {
    const url = "http://127.0.0.1:8000" + "/web/fetch/user";
    const user = await axios.get(url, {
      headers: {
        Authorization: Cookies.get("token"),
      },
    });
    return user;
  };

  // handle submit for login
  const handleSubmit = async () => {
    if (email?.length === 0 || password?.length === 0) {
      toast.error("Please enter all the details", {
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
      const url = "http://127.0.0.1:8000" + "/web/login";
      const user = await axios.post(
        url,
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (user?.data?.status) {
        Cookies.set("token", user?.data?.data?.token);
        Cookies.set(
          "user",
          JSON.stringify({
            name: user?.data?.data?.name,
            email: user?.data?.data?.email,
          })
        );

        if (user?.data?.data?.role === "admin")
          window.location.href = "/admin/add-details/portal";
        else window.location.href = "/dashboard/web-bridge-portal";
      } else {
        toast.error(user?.data?.message, {
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
      console.log(err);
      toast.error("There was some error. Please, try again.", {
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
    getAuth()
      ?.then((response) => {
        if (response) {
          if (response?.status === 200) {
            if (response?.data?.data?.role === "admin")
              window.location.href = "/admin/add-details/portal";
            else window.location.href = "/dashboard/web-bridge-portal";
          } else setLoader(false);
        }
      })
      .catch((err) => {
        setLoader(false);
      });
  }, []);

  return loader ? (
    <Loader />
  ) : (
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
          <input
            type={"email"}
            placeholder="Enter Email"
            value={email}
            onChange={handleEmail}
          />
          <input
            type={"password"}
            placeholder="Password"
            value={password}
            onChange={handlePassword}
          />
          {/* <a href={"#"} className={styles.forgot}>
            Forgot Password?
          </a> */}
          <div onClick={handleSubmit} className={styles.login_button}>
            Login
          </div>
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

export default Login;
