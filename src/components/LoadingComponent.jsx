import React from "react";

import styles from "../styles/LoadingComponent.module.css";

const LoadingComponent = () => {
  return (
    <div className={styles["lds-ellipsis"]}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default LoadingComponent;
