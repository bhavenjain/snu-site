import React, { useState } from "react";
import Cookies from "js-cookie";
import Hamburger from "hamburger-react";

// Styles
import styles from "./Header.module.css";

const Header = ({isOpen, setOpen}) => {
  
  const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : {};

  const handleLogout = () => {
    Cookies.set("token", "");
    Cookies.set("user", "");
    window.location.href = "/login";
  };

  return (
    <div className={styles.header}>
      <b style={{ display: "flex", alignItems: "center" }}>
        <div className={styles.mobile_display}>
          <Hamburger toggled={isOpen} toggle={setOpen} size={20} />
        </div>
        <img
          src={"/SVG_Profile.svg"}
          width={25}
          height={25}
          style={{ marginRight: "10px" }}
        />
        Hello,{" "}
        {user?.name
          ? user?.name?.length > 17
            ? user?.name?.substr(0, 17) + "..."
            : user?.name
          : "User"}
      </b>
      <span className={styles.logout} onClick={handleLogout}>
        Logout
      </span>
    </div>
  );
};

export default Header;
