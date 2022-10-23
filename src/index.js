import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

import { Provider } from "react-redux";
import store, { persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#012641",
    },
    secondary: {
      main: "#60b3d1",
    },
    background: {
      default: "#faf8f6",
      paper: "#ffffff",
    },
    warning: {
      main: "#4dccbd",
    },
    error: {
      main: "#ff0033",
    },
    info: {
      main: "#d9b99b",
    },
    success: {
      main: "#faf104",
    },
  },
  typography: {
    subtitle1: {
      fontSize: 9,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App></App>
      </PersistGate>
    </Provider>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
