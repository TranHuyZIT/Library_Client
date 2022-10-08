import { createSlice } from "@reduxjs/toolkit";

export const searchReducer = createSlice({
  name: "search",
  initialState: "",
  reducers: {
    setSearch: (state, action) => {
      return { search: action.payload };
    },
  },
});
