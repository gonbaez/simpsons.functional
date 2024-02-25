import React from "react";

import styles from "../styles/Header.module.css";

const Header = () => {
  return (
    <>
      <img className={styles.logo} src="the_simpsons.png" alt="The Simpsons" />
    </>
  );
};

export default Header;
