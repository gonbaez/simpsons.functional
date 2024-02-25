import React from "react";

import { IoMdHeart } from "react-icons/io";
import { FaUser } from "react-icons/fa";

import styles from "../styles/Controls.module.css";

const Controls = ({
  onSearch,
  likes,
  characters,
  searchError,
  searchString,
}) => {
  const classNames = require("classnames");

  return (
    <>
      <div className={styles.controlsContainer}>
        <div style={{ position: "relative" }}>
          <input
            className={classNames(
              styles.searchInput,
              searchError ? styles.error : ""
            )}
            type="text"
            placeholder="Search character"
            onInput={onSearch}
            value={searchString}
          />
          <span className={styles.errorMessage}>{searchError}</span>
        </div>
        <div className={styles.counterContainer}>
          <div className={styles.likesContainer}>
            <IoMdHeart /> <span>{likes}</span>
          </div>
          <div className={styles.characterContainer}>
            <FaUser /> <span>{characters}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Controls;
