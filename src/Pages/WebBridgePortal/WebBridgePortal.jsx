import React from "react";
import { Outlet } from "react-router-dom";

// Styles
import styles from "./WebBridgePortal.module.css";

// Components
import Header from "../../Components/Header/Header";
import SideNav from "../../Components/SideNav/SideNav";

const WebBridgePortal = () => {
  return (
    <div className={styles.web_container}>
      <SideNav />
      <div className={styles.right_container}>
        <Header />
        <div className={styles.bridge_body}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default WebBridgePortal;
