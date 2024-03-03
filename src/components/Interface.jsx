import React, { useState, useEffect, useRef, useReducer } from "react";

import { getQuotes } from "../functions/getQuotes.js";

import styles from "../styles/Interface.module.css";

import LoadingComponent from "./LoadingComponent";
import Controls from "./Controls";
import Characters from "./Characters";
import { reducer, initialState } from "../appReducer.js";

const Interface = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const selectedElement = useRef();

  useEffect(() => {
    getQuotes(dispatch);
  }, []);

  useEffect(() => {
    if (selectedElement.current) {
      selectedElement.current.scrollIntoView({
        behavior: "instant",
        block: "center",
        inline: "center",
      });
    }
  }, [state.selectedIndex]);

  const onSearch = async (e) => {
    dispatch({ type: "FILTER", payload: e.target.value });
  };

  const onLike = (e) => {
    dispatch({ type: "LIKE", payload: e });
  };

  const onDelete = (e) => {
    dispatch({ type: "DELETE", payload: e });

    const timeoutId = setTimeout(() => {
      console.log("timeout");
      dispatch({ type: "DELETE", payload: e });
    }, 3000);
  };

  const onRefresh = () => {
    dispatch({ type: "RESET" });
    getQuotes(dispatch);
  };

  const onClearSearch = () => {
    dispatch({ type: "FILTER", payload: "" });
  };

  const onScroll = (e) => {
    dispatch({ type: "SELECT_INDEX", payload: e });
  };

  const onDeleteConfirm = (e) => {
    dispatch({ type: "DELETE_CONFIRM", payload: e });
  };

  if (!state || !state.quotes) {
    return (
      <div style={{ height: "100%", display: "flex", alignItems: "center" }}>
        <LoadingComponent />
      </div>
    );
  }

  const likes = state.filteredQuotes.filter((el) => el.like).length;

  return (
    <>
      <div className={styles.interface}>
        <Controls
          onSearch={onSearch}
          likes={likes}
          characters={state.filteredQuotes.length}
          searchError={state.filter.searchError}
          searchString={state.filter.searchString}
        />
        <Characters
          data={state.filteredQuotes}
          onLike={onLike}
          onDelete={onDelete}
          onDeleteConfirm={onDeleteConfirm}
          onRefresh={onRefresh}
          nonFilteredDataLength={state.quotes.length}
          onClearSearch={onClearSearch}
          onScroll={onScroll}
          selectedElement={selectedElement}
        />
      </div>
    </>
  );
};

export default Interface;
