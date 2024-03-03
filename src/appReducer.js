export const initialState = {
  quotes: null,
  filteredQuotes: null,
  selectedIndex: 0,
  filter: { searchString: "" },
};

export function reducer(state, action) {
  switch (action.type) {
    case "SET_QUOTES": {
      const { selectedIndex } = state;
      const quotes = action.payload;

      quotes[selectedIndex].selected = true;

      return {
        ...state,
        quotes,
        filteredQuotes: quotes,
      };
    }

    case "FILTER": {
      const { quotes } = state;
      let { selectedIndex } = state;

      const filter = action.payload;

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
            selectedIndex = quotes.findIndex((el) => el === filteredData[0]);
            filteredData[0].selected = true;

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

      return { ...state, filteredQuotes: filteredData, filter, selectedIndex };
    }
    case "LIKE":
      const data = [...state.quotes];
      const index = data.findIndex((el) => el.id === action.payload);

      data[index].like = !data[index].like;

      return { ...state, quotes: data };

    case "SELECT_INDEX":
      const { quotes } = state;
      const idx = action.payload;

      quotes.forEach((el) => {
        el.selected = false;
      });

      quotes[idx].selected = true;

      return { ...state, selectedIndex: idx, quotes };

    case "DELETE":
      break;
    case "DELETE_CONFIRM":
      break;
    default:
      return initialState;
  }
}
