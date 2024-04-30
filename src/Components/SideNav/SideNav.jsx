import React from "react";
import { NavLink } from "react-router-dom";

// Styles
import styles from "./SideNav.module.css";

const SideNav = () => {
  return (
    <div className={styles.sidenav_container}>
      <img
        className={styles.sidenav_image}
        src={"/SVG_Logo_Unit.svg"}
        width={350}
      />
      <div className={styles.sidenav_flex}>
        <div className={styles.sidenav_links}>
          <h4> <img src="/SVG_Topic.svg" width={60} height={60} /> Topics</h4>
          <NavLink
            to="getting-started"
            className={({ isActive }) => (isActive ? styles.highlight : "")}
          >
            <img src="/started.svg" width={60} height={60} />
            <h2>Getting Started: Becoming a Director</h2>
          </NavLink>

          <NavLink
            to="laws-and-rules"
            className={({ isActive }) => (isActive ? styles.highlight : "")}
          >
            <img src="/SVG_Law.svg" width={60} height={60} />
            <h2>Laws and Rules: Life as a Director</h2>
          </NavLink>

          {/* <NavLink
          to="faqs"
          className={({isActive}) =>
            isActive ? styles.highlight : ""
          }
        >
          <h2>Frequently Asked Questions</h2>
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
        </NavLink> */}
        </div>
        <div className={styles.sidenav_links}>
          <NavLink
            to="ask-the-expert"
            className={({ isActive }) => (isActive ? styles.highlight : "")}
          >
            <img src="/SVG_Ask the expert.svg" width={60} height={60} />
            <h2>Ask The Expert</h2>

            <ul>
              <li>Ask queries by categories</li>
            </ul>
          </NavLink>

          <NavLink
            to="my-queries"
            className={({ isActive }) => (isActive ? styles.highlight : "")}
          >
            <img src="/SVG_My query.svg" width={60} height={60} />
            <h2>My Queries</h2>

            <ul>
              <li>Open query</li>
              <li>Closed query</li>
              <li>Past query</li>
            </ul>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
