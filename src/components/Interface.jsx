import React, { useState, useEffect, useRef } from "react";

import axios from "axios";
import Joi from "joi";

import offlineData from "../offlineData.json";
import { searchSchema } from "../functions/validationSchemas.js";

import styles from "../styles/Interface.module.css";

import LoadingComponent from "./LoadingComponent";
import Controls from "./Controls";
import Characters from "./Characters";

const Interface = () => {
  const [quotes, setQuotes] = useState();
  const [filteredQuotes, setFilteredQuotes] = useState([]);
  const [deleteTimeoutId, setDeleteTimeoutId] = useState();
  const [filter, setFilter] = useState({ searchString: "" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedElement = useRef();

  const getQuotes = async (count = 50) => {
    const response = await axios.get(
      `https://thesimpsonsquoteapi.glitch.me/quotes?count=${count}`
    );

    if (!response.data.length) {
      console.log("Using offline data");
      response.data = offlineData;
    }

    response.data.map((el, idx) => {
      el.id = idx;
      return el;
    });

    setQuotes(response.data);
  };

  useEffect(() => {
    if (selectedElement.current) {
      selectedElement.current.scrollIntoView({
        behavior: "instant",
        block: "center",
        inline: "center",
      });
    }
  }, [filteredQuotes]);

  useEffect(() => {
    if (!quotes) return;

    let filteredData = quotes;

    if (!filter.searchError && filter.searchString) {
      filteredData = quotes.filter((el) => {
        const name = el.character.toLowerCase();
        return name.includes(filter.searchString.toLowerCase());
      });
    }

    if (filteredData.length > 0) {
      switch (filteredData.filter((el) => el.selected).length) {
        case 0:
          const indexInQuotes = quotes.findIndex(
            (el) => el === filteredData[0]
          );
          filteredData[0].selected = true;

          setSelectedIndex(indexInQuotes);
          break;
        case 1:
          break;
        default:
          filteredData = filteredData.map((el) => {
            el.selected = false;
            return el;
          });
          filteredData[selectedIndex].selected = true;
      }
    }

    setFilteredQuotes(filteredData);
  }, [quotes, filter, selectedIndex]);

  useEffect(() => {
    getQuotes();
  }, []);

  const onSearch = async (e) => {
    const _joiInstance = Joi.object(searchSchema);
    const searchValue = e.target.value;

    try {
      await _joiInstance.validateAsync({ "Search string": searchValue });
    } catch (er) {
      setFilter({
        searchString: searchValue,
        searchError: er.details[0].message,
      });
      return;
    }

    setFilter({ searchString: searchValue });
  };

  const onLike = (e) => {
    const data = [...quotes]; // WHY?!
    const index = data.findIndex((el) => el.id === e);

    data[index].like = !data[index].like;

    setQuotes(data);
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
    setQuotes();
    getQuotes();
  };

  const onClearSearch = () => {
    setFilter({ searchString: "" });
  };

  const onScroll = (e) => {
    const data = [...filteredQuotes];
    const index = data.findIndex((el) => el.selected);

    if (index + e < 0 || index + e >= data.length) return;

    data[index].selected = false;
    data[index + e].selected = true;

    setFilteredQuotes(data);
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

  if (!quotes) {
    return (
      <div style={{ height: "100%", display: "flex", alignItems: "center" }}>
        <LoadingComponent />
      </div>
    );
  }

  const likes = quotes.filter((el) => el.like).length;

  return (
    <>
      <div className={styles.interface}>
        <Controls
          onSearch={onSearch}
          likes={likes}
          characters={filteredQuotes.length}
          searchError={filter.searchError}
          searchString={filter.searchString}
        />
        <Characters
          data={filteredQuotes}
          onLike={onLike}
          onDelete={onDelete}
          onDeleteConfirm={onDeleteConfirm}
          onRefresh={onRefresh}
          nonFilteredDataLength={quotes.length}
          onClearSearch={onClearSearch}
          onScroll={onScroll}
          selectedElement={selectedElement}
        />
      </div>
    </>
  );
};

export default Interface;
