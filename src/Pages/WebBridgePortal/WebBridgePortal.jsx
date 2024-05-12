import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

// Styles
import styles from "./WebBridgePortal.module.css";

// Components
import Header from "../../Components/Header/Header";
import SideNav from "../../Components/SideNav/SideNav";

const WebBridgePortal = () => {
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    if(window.location.pathname === "/dashboard") {
      window.location.href = "/dashboard/getting-started"
    }
  }, [])
  
  return (
    <div className={styles.web_container}>
      <div className={styles.mobile_display}>
        <SideNav />
      </div>
      <div className={styles.right_container}>
        <Header isOpen={isOpen} setOpen={setOpen} />
        <div className={styles.bridge_body}>
          <Outlet />
        </div>
      </div>

      {isOpen ? <div className={styles.hamburger}>
        <SideNav />
      </div> : <></>}
    </div>
  );
};

export default WebBridgePortal;
