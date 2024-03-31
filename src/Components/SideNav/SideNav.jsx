import React, { useEffect, useState } from "react";

// Styles
import styles from "./SideNav.module.css";

// Images
import womensLogo from "../../assets/womensLogoWhite.png";
import { Link, NavLink } from "react-router-dom";

const SideNav = () => {
  const [pathname, setPathname] = useState("");

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  return (
    <div className={styles.sidenav_container}>
      <img src={womensLogo} width={200} />

      <div className={styles.sidenav_links}>
        <NavLink
          to="web-bridge-portal"
          className={({isActive}) =>
            isActive
              ? styles.highlight
              : ""
          }
        >
          <h2>WEB BRIDGE PORTAL</h2>
          <ul>
            <li>Laws that affect you</li>
            <li>Getting certified as Independent Director</li>
            <li>Latest developments</li>
            <li>Ask the Expert</li>
          </ul>
        </NavLink>

        <NavLink
          to="ask-the-expert"
          className={({isActive}) =>
            isActive ? styles.highlight : ""
          }
        >
          <h2>ASK THE EXPERT</h2>
          <p>All queries by categories</p>
          <ul>
            <li>Duty of directors</li>
            <li>Integrity and ethics</li>
            <li>Insider trading</li>
            <li>Minority shareholders</li>
            <li>
              Violation of statutory provision Fraud and reporting of frauds
              Whistleblower
            </li>
            <li>Financial misconduct, bribery Management excesses</li>
            <li>Audit oversight</li>
            <li>Financial oversight</li>
            <li>Risk management</li>
            <li>People issues</li>
            <li>Related party transactions</li>
          </ul>
        </NavLink>

        <NavLink
          to="query-manager"
          className={({isActive}) =>
            isActive ? styles.highlight : ""
          }
        >
          <h2>QUERY MANAGER</h2>

          <ul>
            <li>Open query</li>
            <li>Closed query</li>
            <li>Past query</li>
            <li>All queries by categories</li>
          </ul>
        </NavLink>
      </div>
    </div>
  );
};

export default SideNav;
