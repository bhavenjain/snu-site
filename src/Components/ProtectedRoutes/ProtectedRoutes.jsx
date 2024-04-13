import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

// Components
import Loader from "../Loader/Loader";

const ProtectedRoutes = () => {
  const navigate = useNavigate();

  const getAuth = async () => {
    const url = "http://127.0.0.1:8000" + "/web/fetch/user";
    const user = await axios.get(url, {
      headers: {
        "Authorization" : ""
      },
    });

    console.log("................", user)
    return user?.data
  };

  useEffect(() => {
    getAuth()?.then(response => {
      if(response) {
        console.log("......user inside", response)
      }
    }).catch(err => {
      console.log("......error", err)
    })
  }, []);

  return <Outlet />;
};

export default ProtectedRoutes;
