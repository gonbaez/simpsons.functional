import React from "react";

import styles from "../styles/Footer.module.css";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className={styles.footerContainer}>
        <small>
          &copy; <Link to="about">Gonzalo Baez</Link> 2024
        </small>
      </div>
    </>
  );
};

export default Footer;
