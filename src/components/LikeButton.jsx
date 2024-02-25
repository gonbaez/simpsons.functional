import React from "react";

import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";

import styles from "../styles/LikeButton.module.css";

const LikeButton = ({ onLike, like, id }) => {
  return (
    <>
      <button onClick={() => onLike(id)} className={styles.likeButton}>
        {like ? <IoMdHeart /> : <IoMdHeartEmpty />}
      </button>
    </>
  );
};

export default LikeButton;
