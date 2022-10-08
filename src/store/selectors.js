export const librarySelector = (state) => state.library;
export const searchSelector = (state) => state.search;
export const loginSelector = (state) => state.auth.login;
export const userSelector = (state) => loginSelector(state).currentUser;
export const registerSelector = (state) => state.auth.register;
export const cartSelector = (state) => state.cart;
