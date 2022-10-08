import { createSlice } from "@reduxjs/toolkit";
import { createStateLibrary } from "../../utils/createState";

export const libraryReducer = createSlice({
  name: "library",
  initialState: {
    isFetching: false,
    books: [],
    statistic: {
      revenue: 0,
      numberBooksSold: 0,
      totalRating: 0,
      totalRater: 0,
    },
  },
  reducers: {
    setLibrary: (state, action) => {
      const { libName, books, statistic } = action.payload;
      console.log(libName, books, statistic);
      return createStateLibrary(libName, books, statistic);
    },
    setBooksPending: (state, action) => {
      state.isFetching = true;
    },
    setBooksSucceeded: (state, action) => {
      state.isFetching = false;
      state.books = [...action.payload];
    },
  },
});

export const { setBooksPending, setBooksSucceeded } = libraryReducer.actions;
