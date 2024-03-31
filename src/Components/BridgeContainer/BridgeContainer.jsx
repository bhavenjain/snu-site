import React from "react";

// Styles
import styles from "./BridgeContainer.module.css";

const BridgeContainer = ({ children, padding }) => {
  return (
    <div
      className={styles.bridgeCardContainer}
      style={{ padding: padding ? "20px" : "" }}
    >
      {children}
    </div>
  );
};

export default BridgeContainer;
