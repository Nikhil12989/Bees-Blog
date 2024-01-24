import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice.js";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  user: userReducer, // Corrected the import and usage of userReducer
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer); // Changed the variable name to avoid conflict

export const store = configureStore({
  reducer: persistedReducer, // Use persistedReducer here
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
