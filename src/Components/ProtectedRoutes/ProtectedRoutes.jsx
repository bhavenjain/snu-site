import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Outlet, useNavigate } from "react-router-dom";

// Components
import Loader from "../Loader/Loader";

const ProtectedRoutes = () => {
  const navigate = useNavigate();

  // States
  const [loader, setLoader] = useState(true);

  const getAuth = async () => {
    const url = import.meta.env.VITE_BACKEND_URL + "/web/fetch/user";
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
          } else {
            navigate("/login");
          }
        }
      })
      .catch((err) => {
        navigate("/login");
      });
  }, []);

  return loader ? <Loader /> : <Outlet />;
};

export default ProtectedRoutes;
