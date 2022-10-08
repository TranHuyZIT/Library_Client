import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { libraryReducer } from "./slices/libraryReducer";
import { searchReducer } from "./slices/searchReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import authReducer from "./slices/authReducer";
import cartReducer from "./slices/cartReducer";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  library: libraryReducer.reducer,
  search: searchReducer.reducer,
  auth: authReducer.reducer,
  cart: cartReducer.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});
export const persistor = persistStore(store);
export default store;
