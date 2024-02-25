import React from "react";

import { TbTrash } from "react-icons/tb";
import { TbTrashX } from "react-icons/tb";

import styles from "../styles/DeleteButton.module.css";

const DeleteButton = ({ onDelete, onDeleteConfirm, deleteConfirm, id }) => {
  return (
    <>
      <button
        className={
          !deleteConfirm ? styles.deleteButton : styles.deleteConfirmButton
        }
        onClick={() => (!deleteConfirm ? onDelete(id) : onDeleteConfirm(id))}
      >
        {!deleteConfirm ? <TbTrash /> : <TbTrashX />}
      </button>
    </>
  );
};

export default DeleteButton;
