import React from "react";

import styles from "../styles/Characters.module.css";

import { IoRefreshCircle } from "react-icons/io5";
import { LuSearchX } from "react-icons/lu";

import Character from "./Character";
import ScrollButtom from "./ScrollButton";

const Characters = ({
  data,
  onLike,
  onDelete,
  onDeleteConfirm,
  onRefresh,
  nonFilteredDataLength,
  onClearSearch,
  onScroll,
  selectedElement,
}) => {
  if (!nonFilteredDataLength) {
    return (
      <>
        <IoRefreshCircle
          onClick={() => onRefresh()}
          className={styles.refreshButton}
        />
      </>
    );
  }

  if (!data.length) {
    return (
      <LuSearchX
        onClick={() => onClearSearch()}
        style={{ cursor: "pointer" }}
        className={styles.refreshButton}
      />
    );
  }

  return (
    <>
      <ScrollButtom direction="left" onScroll={onScroll} />
      <ul className={styles.characterList}>
        <div className={styles.emptyListItem}></div>
        {data.map((element) => {
          return (
            <Character
              {...element}
              onLike={onLike}
              onDelete={onDelete}
              onDeleteConfirm={onDeleteConfirm}
              selectedElement={selectedElement}
              key={element.id}
            />
          );
        })}
        <div className={styles.emptyListItem}></div>
      </ul>
      <ScrollButtom direction="right" onScroll={onScroll} />
    </>
  );
};

export default Characters;
