import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { NavLink } from "react-router-dom";

// Styles
import styles from "./SideNav.module.css";

const SideNav = ({ setOpen }) => {
  const [announcements, setAnnouncements] = useState([]);

  // Get page data based on url
  const getPagedata = async () => {
    const url = import.meta.env.VITE_BACKEND_URL + "/web/fetch/announcements";
    const response = await axios.get(url, {
      headers: {
        Authorization: Cookies.get("token"),
      },
      params: {
        limit: 5,
      },
    });
    return response?.data?.data;
  };

  useEffect(() => {
    getPagedata()
      .then((response) => {
        if (response) {
          setAnnouncements(response);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={styles.sidenav_container}>
      <img
        className={styles.sidenav_image}
        src={"/SVG_Logo_Unit.svg"}
        width={350}
      />
      <div className={styles.sidenav_flex}>
        <div className={styles.sidenav_links}>
          <NavLink
            to="getting-started"
            onClick={() => setOpen(false)}
            className={({ isActive }) => (isActive ? styles.highlight : "")}
          >
            <img src="/started.svg" width={60} height={60} />
            <h2>Getting Started: Becoming a Director</h2>
          </NavLink>

          <NavLink
            to="laws-and-rules"
            onClick={() => setOpen(false)}
            className={({ isActive }) => (isActive ? styles.highlight : "")}
          >
            <img src="/SVG_Law.svg" width={60} height={60} />
            <h2>Roles, Rules and the Law: Life as a Director</h2>
          </NavLink>

          {/* <NavLink
            to="faqs"
            className={({ isActive }) => (isActive ? styles.highlight : "")}
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

        {/* Announcements */}
        {announcements?.length > 0 ? (
          <div className={styles.announcements}>
            <h4>Announcements: </h4>
            {announcements?.map((item, key) => {
              return (
                <NavLink
                  onClick={() => setOpen(false)}
                  key={key}
                  to={`announcements?id=${item?.id}`}
                >
                  <img src="/SVG_Blue Arrow.png" width={17} height={17} />
                  <h2>
                    {item?.heading}
                    {item?.new ? (
                      <span className={styles.new}>New</span>
                    ) : (
                      <></>
                    )}
                  </h2>
                </NavLink>
              );
            })}
          </div>
        ) : (
          <></>
        )}

        {/* Bottom Links */}
        <div className={styles.sidenav_links}>
          <NavLink
            to="ask-the-expert"
            onClick={() => setOpen(false)}
            className={({ isActive }) => (isActive ? styles.highlight : "")}
          >
            <img src="/SVG_Ask the expert.svg" width={60} height={60} />
            <h2>Ask The Expert: Queries and Inquiries</h2>
          </NavLink>

          <NavLink
            to="my-queries"
            onClick={() => setOpen(false)}
            className={({ isActive }) => (isActive ? styles.highlight : "")}
          >
            <img src="/SVG_My query.svg" width={60} height={60} />
            <h2>My Queries</h2>

            <ul>
              <li>Open queries</li>
              <li>Closed queries</li>
            </ul>
          </NavLink>

          <NavLink
            to="test-yourself"
            onClick={() => setOpen(false)}
            className={({ isActive }) => (isActive ? styles.highlight : "")}
          >
            <img src="/bulb.svg" width={60} height={60} />
            <h2>Test Yourself</h2>
          </NavLink>

          <NavLink
            to="about"
            onClick={() => setOpen(false)}
            className={({ isActive }) => (isActive ? styles.highlight : "")}
          >
            <img
              style={{ top: "0px", left: "-27px" }}
              src="/info.png"
              width={20}
              height={20}
            />
            <h2>About Web Bridge</h2>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
