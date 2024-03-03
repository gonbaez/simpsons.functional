import React, { useState, useEffect, useRef, useReducer } from "react";

import Joi from "joi";

import { searchSchema } from "../functions/validationSchemas.js";
import { getQuotes } from "../functions/getQuotes.js";

import styles from "../styles/Interface.module.css";

import LoadingComponent from "./LoadingComponent";
import Controls from "./Controls";
import Characters from "./Characters";
import { reducer, initialState } from "../appReducer.js";

const Interface = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [quotes, setQuotes] = useState();
  const [filteredQuotes, setFilteredQuotes] = useState([]);
  const [deleteTimeoutId, setDeleteTimeoutId] = useState();
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
    const _joiInstance = Joi.object(searchSchema);
    const searchValue = e.target.value;

    try {
      await _joiInstance.validateAsync({ "Search string": searchValue });
    } catch (er) {
      dispatch({
        type: "FILTER",
        payload: {
          searchString: searchValue,
          searchError: er.details[0].message,
        },
      });

      return;
    }

    dispatch({ type: "FILTER", payload: { searchString: searchValue } });
  };

  const onLike = (e) => {
    dispatch({ type: "LIKE", payload: e });
  };

  const onDelete = (e) => {
    const data = [...quotes];
    const index = data.findIndex((el) => el.id === e);

    data[index].deleteConfirm = !data[index].deleteConfirm;

    const timeoutId = setTimeout(() => {
      console.log("timout", quotes);

      const data = [...quotes];
      const index = data.findIndex((el) => el.id === e);

      if (index === -1) return;

      data[index].deleteConfirm = !data[index].deleteConfirm;
      setQuotes(data);
    }, 3000);

    setDeleteTimeoutId(timeoutId);
    setQuotes(data);
  };

  const onRefresh = () => {
    dispatch({ type: "RESET" });
    getQuotes(dispatch);
  };

  const onClearSearch = () => {
    dispatch({ type: "FILTER", payload: { searchString: "" } });
  };

  const onScroll = (e) => {
    const data = state.filteredQuotes;
    const index = data.findIndex((el) => el.selected);

    if (index + e < 0 || index + e >= data.length) return;

    dispatch({ type: "SELECT_INDEX", payload: index + e });
  };

  const onDeleteConfirm = (e) => {
    clearTimeout(deleteTimeoutId);
    setDeleteTimeoutId(null);

    const data = [...quotes];
    const index = data.findIndex((el) => el.id === e);

    data.splice(index, 1);

    if (data.length) {
      if (index === data.length) {
        data[index - 1].selected = true;
      } else {
        data[index].selected = true;
      }
    }

    setQuotes(data);
  };

  console.log("Before Rendering", state);

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
