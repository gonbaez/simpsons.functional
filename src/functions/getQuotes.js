import axios from "axios";
import offlineData from "../offlineData";

export const getQuotes = async (dispatchFun, count = 50) => {
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

  dispatchFun({ type: "SET_QUOTES", payload: response.data });
};
