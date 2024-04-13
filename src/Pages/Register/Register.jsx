import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

// Styles
import styles from "./Register.module.css";

// Components
import Loader from "../../Components/Loader/Loader";
import LoginHeader from "../../Components/LoginHeader/LoginHeader";

const Register = () => {
  const navigate = useNavigate();

  // States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState(false);
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [loaderText, setLoaderText] = useState(false)

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
    if (
      email?.length === 0 ||
      password?.length === 0 ||
      name?.length === 0 ||
      rePassword?.length === 0
    ) {
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
    }else if(password?.length < 8) {
      toast.error("Password must be of 8 characters", {
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

    if (password !== rePassword) {
      toast.error("Passwords do not match", {
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
      const url = "http://127.0.0.1:8000" + "/web/register/user";
      const user = await axios.post(
        url,
        {
          name,
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
        setLoaderText(true)
        setLoader(true);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
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
    <Loader register={loaderText} />
  ) : (
    <div className={`${styles.container}`}>
      {/* Login header logos */}
      <LoginHeader />

      <div className={`container ${styles.login_body}`}>
        <h1>
          Register to the <span>WEB BRIDGE</span> platform
        </h1>
        <div className={styles.login_form}>
          <input
            type={"text"}
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <input
            type={"password"}
            placeholder="Re-enter Password"
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
          />
          {/* <a href={"#"} className={styles.forgot}>
            Forgot Password?
          </a> */}
          <div onClick={handleSubmit} className={styles.login_button}>
            Register
          </div>
          <p style={{ marginTop: "20px" }}>
            Already a user? <Link to="/login">Login</Link>
          </p>
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

export default Register;
