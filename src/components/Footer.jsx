import React from "react";

import styles from "../styles/Footer.module.css";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className={styles.footerContainer}>
        <small>
          &copy; 2024 <Link to="about">About this page</Link>
        </small>
      </div>
    </>
  );
};

export default Footer;
