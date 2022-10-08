import { createSlice } from "@reduxjs/toolkit";

const cartReducer = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      state.push({ ...action.payload.book, rating: action.payload.rating });
    },
    clearCart: (state, action) => {
      state.splice(0, state.length);
    },
  },
});

export default cartReducer;
