import { createSlice } from "@reduxjs/toolkit";

const cartReducer = createSlice({
  name: "cart",
  initialState: {
    books: [],
  },
  reducers: {
    addToCart: (state, action) => {
      state.books.push({
        ...action.payload.book,
        rating: action.payload.rating,
        numberOrdered: action.payload.number,
      });
    },
    removeFromCart: (state, action) => {
      console.log(action.payload);
      state.books = state.books.filter((cartItem) => {
        return cartItem._id !== action.payload;
      });
    },
    clearCart: (state) => {
      state.books.splice(0, state.books.length);
    },
  },
});

export default cartReducer;
