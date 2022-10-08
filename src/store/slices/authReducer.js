import { createSlice } from "@reduxjs/toolkit";

const authReducer = createSlice({
  name: "auth",
  initialState: {
    login: {
      currentUser: null,
      isFetching: false,
      error: "",
    },
    register: {
      isFetching: false,
      error: "",
      success: false,
    },
  },
  reducers: {
    loginStart: (state, action) => {
      state.login.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.login.isFetching = false;
      state.login.currentUser = action.payload;
      state.login.error = "";
    },
    loginFail: (state, action) => {
      state.login.isFetching = false;
      state.login.currentUser = null;
      state.login.error = action.payload;
    },
    registerStart: (state, action) => {
      state.register.isFetching = true;
    },
    registerSuccess: (state, action) => {
      state.register.isFetching = false;
      state.register.success = true;
      state.register.error = "";
    },
    registerFail: (state, action) => {
      state.register.isFetching = false;
      state.register.success = false;
      state.register.error = action.payload;
    },
    logoutStart: (state, action) => {
      state.login.isFetching = true;
    },
    logoutSuccess: (state, action) => {
      state.login.isFetching = false;
      state.login.currentUser = null;
      state.login.error = false;
    },
    logoutFail: (state, action) => {
      state.login.isFetching = false;
      state.login.error = true;
    },
  },
});

export const { loginStart, loginSuccess, loginFail } = authReducer.actions;
export const { registerStart, registerSuccess, registerFail } =
  authReducer.actions;
export const { logoutStart, logoutSuccess, logoutFail } = authReducer.actions;
export default authReducer;
